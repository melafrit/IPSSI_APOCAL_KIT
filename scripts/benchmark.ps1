$models = @("llama3.1:8b", "llama3.2:3b", "phi3:mini")

$text = @"
Voici un cours d'algorithmie. Un algorithme est une suite d'instructions permettant de résoudre un problème. 
La complexité mesure le temps ou la mémoire nécessaire à son exécution. 
Les structures de données comme les tableaux, listes, piles et files permettent d'organiser les informations.
Génère un quiz de 10 QCM à partir de ce cours.
"@

$results = @()

foreach ($model in $models) {
    Write-Host "Test du modèle : $model"

    docker exec apocalipssi-2026-ollama ollama pull $model

    for ($i = 1; $i -le 5; $i++) {
        Write-Host "Run $i / 5"

        $start = Get-Date

        curl.exe -s -X POST http://localhost:8000/api/llm/generate-quiz/ `
            -H "Content-Type: application/json" `
            -d "{`"text`":`"$text`",`"model`":`"$model`"}" | Out-Null

        $end = Get-Date
        $duration = ($end - $start).TotalSeconds

        $results += [PSCustomObject]@{
            Model = $model
            Run = $i
            Seconds = [math]::Round($duration, 2)
        }
    }
}

$results | Export-Csv -Path "benchmark-results.csv" -NoTypeInformation -Encoding UTF8

$summary = $results | Group-Object Model | ForEach-Object {
    $times = $_.Group.Seconds | Sort-Object
    $p50 = $times[[math]::Floor($times.Count * 0.5)]
    $p95 = $times[[math]::Ceiling($times.Count * 0.95) - 1]

    [PSCustomObject]@{
        Model = $_.Name
        P50_Seconds = $p50
        P95_Seconds = $p95
        Runs = ($times -join ", ")
    }
}

$summary | Export-Csv -Path "benchmark-summary.csv" -NoTypeInformation -Encoding UTF8
$summary | Format-Table