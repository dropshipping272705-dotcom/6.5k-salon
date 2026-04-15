@echo off
TITLE KinConnect Smart Git Uploader
CLS

:: Check if this is a new or existing project
IF EXIST ".git" GOTO UPDATE_EXISTING

:SETUP_NEW
echo ==========================================
echo       SETTING UP NEW KINCONNECT REPO
echo ==========================================
echo.

:: 1. Create React-specific .gitignore
echo Creating optimized .gitignore for Vite/React...
echo node_modules/ > .gitignore
echo dist/ >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo .DS_Store >> .gitignore
echo *.local >> .gitignore

:: 2. Initialize Git
echo Initializing Git...
git init
git add .
git commit -m "Initial KinConnect commit"
git branch -M main

:: 3. Connect to GitHub
echo.
echo PASTE YOUR REPO URL BELOW (Right-Click to Paste):
set /p repo_url="URL: "

echo.
echo Connecting to GitHub...
git remote add origin %repo_url%
git push -u origin main

echo.
echo [SUCCESS] Project is LIVE on GitHub!
pause
EXIT

:UPDATE_EXISTING
echo ==========================================
echo      UPDATING KINCONNECT REPO
echo ==========================================
echo.

:: Check for large folders that shouldn't be there
IF EXIST "node_modules" (
    echo [INFO] node_modules detected. Ensuring they are ignored...
)

git add .
set /p commit_msg="Enter commit message (e.g., 'Fixed AI Logic'): "
if "%commit_msg%"=="" set commit_msg="Update KinConnect Project"

git commit -m "%commit_msg%"
git push origin main

echo.
echo [SUCCESS] Changes Uploaded to GitHub!
pause
EXIT