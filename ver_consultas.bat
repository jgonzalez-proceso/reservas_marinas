@echo off
REM Abre en Chrome el panel de consultas del contador anonimo.
REM Doble clic sobre este fichero. Necesita el .env con CF_ACCOUNT_ID y CF_API_TOKEN.
REM
REM Desde una consola se puede pasar el numero de dias:  ver_consultas.bat 7

cd /d "%~dp0"
if "%~1"=="" (call npm run panel) else (call npm run panel -- %1)

if errorlevel 1 (
  echo.
  echo   Algo ha fallado. Revisa el mensaje de arriba.
  pause
)
