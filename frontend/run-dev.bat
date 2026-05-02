@echo off
REM Create a simple npm install and dev script
cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
  echo Installing dependencies...
  call node -e "console.log('Need npm')"
) else (
  echo node_modules exists, starting dev server...
  call "c:\Users\hp\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe" node_modules\.bin\next dev
)
