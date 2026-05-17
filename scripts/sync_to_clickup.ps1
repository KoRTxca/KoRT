# KoRT ClickUp Sync v1.0
# Usage: .\sync_to_clickup.ps1 -Token "YOUR_API_TOKEN" -ListId "YOUR_LIST_ID"

param (
    [Parameter(Mandatory=$true)]
    [string]$Token,
    [Parameter(Mandatory=$true)]
    [string]$ListId
)

$ManifestPath = ".\clickup_sync_manifest.json"
if (-not (Test-Path $ManifestPath)) {
    Write-Error "Sync Manifest not found at $ManifestPath"
    exit
}

$Tasks = Get-Content $ManifestPath | ConvertFrom-Json

Write-Host "⚔️ Initiating KoRT Sovereign Sync to ClickUp..." -ForegroundColor Amber

foreach ($Task in $Tasks) {
    Write-Host "Deploying Task: $($Task.task_name)..." -ForegroundColor Cyan
    
    $Body = @{
        name = $Task.task_name
        description = $Task.description
        status = $Task.status
        tags = $Task.tags
        priority = if ($Task.priority -eq "Critical") { 1 } elseif ($Task.priority -eq "High") { 2 } else { 3 }
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Method Post `
            -Uri "https://api.clickup.com/api/v2/list/$ListId/task" `
            -Headers @{ "Authorization" = $Token; "Content-Type" = "application/json" } `
            -Body $Body
        Write-Host "✅ Success" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Sovereign Sync Complete." -ForegroundColor Gold
