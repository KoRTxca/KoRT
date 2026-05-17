# KoRT Env Loader
param(
    [string]$Command,
    [string]$Args
)

$EnvFile = "D:\KoRT_Command_Center\Mission_Control\.env"
if (Test-Path $EnvFile) {
    Get-Content $EnvFile | Where-Object { $_ -match '=' -and $_ -notmatch '^#' } | ForEach-Object {
        $name, $value = $_.Split('=', 2)
        [Environment]::SetEnvironmentVariable($name.Trim(), $value.Trim(), "Process")
    }
}

Invoke-Expression "$Command $Args"
