
Write-Host "=== Deploying Property & Receipt Manager codebase ===" -ForegroundColor Cyan
git checkout main
git pull origin main
git merge feature/regional-payments
git add template.html
$COMMIT_MSG="feat: merge latest regional payments template to main"
git commit -m $COMMIT_MSG
git push origin main
Write-Host "? Deploy complete! Changes are pushed directly to main!" -ForegroundColor Green

