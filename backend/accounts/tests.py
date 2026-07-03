"""Tests pédagogiques pour l'app accounts.

Ces tests servent d'exemples : signup, login, logout, accès protégé et export
RGPD des données personnelles.
Lancez : pytest accounts/
"""

import io
import json
import zipfile

import pytest
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from quizzes.models import Question, Quiz

from .models import DataRequest, TeacherSuggestion

pytestmark = pytest.mark.django_db


@pytest.fixture
def client() -> APIClient:
    return APIClient()


@pytest.fixture
def user(db) -> User:
    return User.objects.create_user(
        username="alice", email="alice@test.com", password="motdepasse123"
    )


@pytest.fixture
def exported_user(db) -> User:
    user = User.objects.create_user(
        username="hugo@test.local", email="hugo@test.local", password="motdepasse123"
    )
    quiz = Quiz.objects.create(
        user=user,
        title="Quiz RGPD",
        source_text="Cours de droit numérique pour le test d'export.",
        score=8,
        status="completed",
        progress_step=5,
    )
    Question.objects.create(
        quiz=quiz,
        index=1,
        prompt="Question 1 ?",
        options=["A", "B", "C", "D"],
        correct_index=2,
        selected_index=1,
    )
    Question.objects.create(
        quiz=quiz,
        index=2,
        prompt="Question 2 ?",
        options=["A2", "B2", "C2", "D2"],
        correct_index=0,
        selected_index=None,
    )
    return user


@pytest.fixture
def auth_client(user) -> APIClient:
    client = APIClient()
    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    return client


@pytest.fixture
def exported_auth_client(exported_user) -> APIClient:
    client = APIClient()
    token = Token.objects.create(user=exported_user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    return client


@pytest.fixture
def staff_user(db) -> User:
    return User.objects.create_user(
        username="prof@test.local",
        email="prof@test.local",
        password="motdepasse123",
        is_staff=True,
    )


@pytest.fixture
def staff_client(staff_user) -> APIClient:
    client = APIClient()
    token = Token.objects.create(user=staff_user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    return client


@pytest.fixture
def learner(db) -> User:
    user = User.objects.create_user(
        username="learner@test.local",
        email="learner@test.local",
        password="motdepasse123",
    )
    quiz = Quiz.objects.create(
        user=user,
        title="Bases du droit",
        source_text="Texte de cours",
        score=4,
        status="completed",
        progress_step=5,
    )
    for index in range(1, 11):
        Question.objects.create(
            quiz=quiz,
            index=index,
            prompt=f"Question {index} ?",
            options=["A", "B", "C", "D"],
            correct_index=0,
            selected_index=1 if index <= 4 else 0,
        )
    return user


def test_signup_creates_user(client):
    # Lot 3 : inscription par EMAIL (username = email en interne).
    response = client.post(
        "/api/accounts/signup/",
        {
            "email": "bob@test.com",
            "password": "motdepasse123",
        },
        format="json",
    )
    assert response.status_code == 201, response.data
    assert User.objects.filter(email="bob@test.com").exists()


def test_signup_requires_email(client):
    response = client.post(
        "/api/accounts/signup/",
        {"password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 400


def test_login_returns_token(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "motdepasse123"},
        format="json",
    )
    assert response.status_code == 200, response.data
    assert "token" in response.data
    assert response.data["user"]["email"] == "alice@test.com"


def test_login_with_wrong_password(client, user):
    response = client.post(
        "/api/accounts/login/",
        {"email": "alice@test.com", "password": "wrong"},
        format="json",
    )
    assert response.status_code == 400


def test_me_requires_auth(client):
    response = client.get("/api/accounts/me/")
    assert response.status_code in (401, 403)


def test_me_with_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.get("/api/accounts/me/")
    assert response.status_code == 200
    assert response.data["username"] == "alice"


def test_logout_invalidates_token(client, user):
    from rest_framework.authtoken.models import Token

    token = Token.objects.create(user=user)
    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = client.post("/api/accounts/logout/")
    assert response.status_code == 204
    # Le token n'existe plus
    assert not Token.objects.filter(key=token.key).exists()


def test_me_export_json_returns_structured_data(exported_auth_client, exported_user):
    other_user = User.objects.create_user(
        username="other@test.local", email="other@test.local", password="motdepasse123"
    )
    Quiz.objects.create(
        user=other_user,
        title="Quiz à ne pas exporter",
        source_text="Texte privé d'un autre utilisateur.",
        status="completed",
        progress_step=5,
    )

    response = exported_auth_client.get("/api/accounts/me/export/")
    assert response.status_code == 200, response.content
    assert response["Content-Type"].startswith("application/json")

    payload = json.loads(response.content)
    assert payload["account"]["email"] == exported_user.email
    assert "quizzes" in payload
    assert "questions" in payload
    assert "answers" in payload
    assert "reports" in payload
    assert "audit_logs" in payload
    assert "data_requests" in payload

    quiz_titles = {quiz["title"] for quiz in payload["quizzes"]}
    assert "Quiz RGPD" in quiz_titles
    assert "Quiz à ne pas exporter" not in quiz_titles
    assert DataRequest.objects.filter(requester=exported_user).exists()


def test_me_export_zip_returns_archive_with_json_members(exported_auth_client):
    response = exported_auth_client.get("/api/accounts/me/export/?format=zip")
    assert response.status_code == 200, response.content
    assert response["Content-Type"].startswith("application/zip")
    assert "attachment" in response["Content-Disposition"]

    archive = zipfile.ZipFile(io.BytesIO(response.content))
    names = set(archive.namelist())
    assert "account.json" in names
    assert "quizzes.json" in names
    assert "questions.json" in names
    assert "audit_logs.json" in names


def test_teacher_endpoints_require_staff(auth_client):
    assert auth_client.get("/api/accounts/teacher/students/").status_code == 403
    assert auth_client.get("/api/accounts/me/suggestions/").status_code == 200


def test_staff_can_view_students_with_lacunes(staff_client, learner):
    response = staff_client.get("/api/accounts/teacher/students/")
    assert response.status_code == 200, response.data
    assert response.data["count"] == 1
    student = response.data["students"][0]
    assert student["email"] == learner.email
    assert student["mistakes_count"] == 4
    assert student["weak_quizzes"][0]["score"] == 4


def test_staff_can_create_teacher_suggestion(staff_client, learner):
    response = staff_client.post(
        f"/api/accounts/teacher/students/{learner.id}/suggestions/",
        {
            "title": "Réviser les notions clés",
            "message": "Revoir les articles 1 à 4 avant le prochain quiz.",
        },
        format="json",
    )
    assert response.status_code == 201, response.data
    assert TeacherSuggestion.objects.filter(recipient=learner).count() == 1


def test_student_can_read_received_suggestions(staff_user, learner):
    TeacherSuggestion.objects.create(
        author=staff_user,
        recipient=learner,
        title="Travail ciblé",
        message="Concentre-toi sur les questions les plus faibles.",
    )
    token = Token.objects.create(user=learner)
    learner_client = APIClient()
    learner_client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    response = learner_client.get("/api/accounts/me/suggestions/")
    assert response.status_code == 200, response.data
    assert response.data[0]["title"] == "Travail ciblé"
