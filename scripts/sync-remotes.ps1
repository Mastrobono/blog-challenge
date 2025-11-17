# PowerShell script to push to GitLab and GitHub simultaneously
# Usage: .\scripts\sync-remotes.ps1 [branch-name]
# If no branch is specified, uses the current branch

param(
    [string]$Branch = ""
)

if ([string]::IsNullOrEmpty($Branch)) {
    $Branch = git branch --show-current
}

Write-Host "🔄 Syncing branch: $Branch" -ForegroundColor Cyan
Write-Host ""

# Push to GitLab (origin)
Write-Host "📤 Pushing to GitLab (origin)..." -ForegroundColor Yellow
git push origin $Branch 2>&1 | Out-Host
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ GitLab sync successful" -ForegroundColor Green
} else {
    Write-Host "❌ GitLab sync failed" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push github $Branch 2>&1 | Out-Host
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ GitHub sync successful" -ForegroundColor Green
} else {
    Write-Host "❌ GitHub sync failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Both remotes synced successfully!" -ForegroundColor Green

