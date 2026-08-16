@echo off
REM Abre la web en una pestana de Chrome, arrancando antes lo que haga falta.
REM Doble clic sobre este fichero es todo lo que hay que hacer.
REM
REM Opciones, si se llama desde una consola:
REM   abrir_web.bat -Datos        vuelve a descargar la cartografia de IDEIB
REM   abrir_web.bat -Puerto 5180  usa otro puerto

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0abrir_web.ps1" %*

if errorlevel 1 (
  echo.
  echo   Algo ha fallado. Revisa el mensaje de arriba.
  pause
)
