$source = "d:\KoRT_Command_Center\Mission_Control"
$targetBase = "d:\KoRT_Command_Center\Mission_Control\shared-assets"

function Sanitize-Name($name) {
    # Remove dots from the name except for the extension later
    $s = $name.ToLower().Replace(" ", "_").Replace("-", "_").Replace("(", "").Replace(")", "").Replace("&", "and").Replace("@", "_at_")
    # Replace multiple underscores with one
    $s = $s -replace '_+', '_'
    return $s
}

# 1. Move Images & Videos
$mediaExts = @(".png", ".jpg", ".jpeg", ".gif", ".mp4", ".mov", ".svg", ".webp")
Get-ChildItem -Path $source -Recurse -File | Where-Object { $mediaExts -contains $_.Extension -and $_.FullName -notlike "*shared-assets*" -and $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.git*" } | ForEach-Object {
    $cleanBase = Sanitize-Name $_.BaseName
    $newName = "$cleanBase$($_.Extension.ToLower())"
    $destDir = Join-Path $targetBase "media"
    $dest = Join-Path $destDir $newName
    Write-Host "Moving media: $($_.Name) -> $newName"
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $_.FullName $dest -Force
}

# 2. Move Skills
Get-ChildItem -Path "$source\skills" -Filter "*.md" -File | ForEach-Object {
    $cleanBase = Sanitize-Name $_.BaseName
    $newName = "$cleanBase.md"
    $destDir = Join-Path $targetBase "skills"
    $dest = Join-Path $destDir $newName
    Write-Host "Moving skill: $($_.Name) -> $newName"
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $_.FullName $dest -Force
}

# 3. Move Business Docs
$docKeywords = @("pitch", "deck", "investor", "business", "plan", "schematic", "infographic", "chart", "roadmap")
Get-ChildItem -Path $source -Recurse -File -Filter "*.md" | Where-Object { 
    $name = $_.Name.ToLower()
    $matches = $false
    foreach ($k in $docKeywords) { if ($name -like "*$k*") { $matches = $true; break } }
    $matches -and $_.FullName -notlike "*shared-assets*"
} | ForEach-Object {
    $cleanBase = Sanitize-Name $_.BaseName
    $newName = "$cleanBase.md"
    $destDir = Join-Path $targetBase "docs"
    $dest = Join-Path $destDir $newName
    Write-Host "Moving doc: $($_.Name) -> $newName"
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    Copy-Item $_.FullName $dest -Force
}

Write-Host "Asset consolidation and sanitization complete."
