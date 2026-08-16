<#
    abrir_web — arranca el proyecto y lo abre en una pestaña de Chrome.

    Se encarga de todo lo que hace falta antes de ver la web:
      1. instala dependencias si es la primera vez;
      2. descarga la cartografía oficial de IDEIB si aún no está;
      3. reutiliza el servidor si ya está en marcha, o levanta uno nuevo;
      4. abre Chrome en la URL que el servidor haya elegido de verdad.

    Sobre el punto 3: no se comprueba si el puerto está ocupado, sino si
    responde *nuestra* web. Comprobar el puerto es poco fiable —en Windows un
    proceso puede escuchar solo en ::1 y una prueba por IPv4 lo da por libre— y
    además no distingue nuestro servidor del de otro proyecto. Vite elige el
    primer puerto libre a partir del preferido, así que la URL buena se lee de
    su propia salida en vez de darla por supuesta.

    No se lanza con doble clic: para eso está abrir_web.bat, que llama a este
    fichero saltándose la política de ejecución de PowerShell.

    Parámetros:
      -Puerto <n>   Puerto preferido (por defecto 5173). Si está ocupado, Vite
                    usa el siguiente libre y el script lo detecta.
      -Datos        Fuerza volver a descargar la cartografía antes de abrir.
#>

[CmdletBinding()]
param(
    [int]$Puerto = 5173,
    [switch]$Datos
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$log = Join-Path $PSScriptRoot '.dev-server.log'

function Escribe($texto, $color = 'Gray') {
    Write-Host "  $texto" -ForegroundColor $color
}

# Responde la web de este proyecto, y no otra cosa cualquiera en el mismo puerto.
function Test-NuestraWeb([string]$url) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        return ($r.StatusCode -eq 200 -and $r.Content -match 'src/main\.js')
    } catch {
        return $false
    }
}

# Vite anuncia el puerto que ha acabado usando; es la única fuente fiable.
#
# Se toma la ÚLTIMA coincidencia, no la primera: si un arranque anterior dejó
# contenido en el fichero, la primera URL sería la suya y abriríamos el servidor
# equivocado. Es justo lo que pasó al probar esto.
function Get-UrlDelLog {
    if (-not (Test-Path $log)) { return $null }
    $texto = Get-Content $log -Raw -ErrorAction SilentlyContinue
    if (-not $texto) { return $null }
    # Vite pinta el puerto en negrita, asi que en el fichero queda
    # 'http://localhost:<ESC>[1m5173<ESC>[22m/' y el numero no va pegado a los
    # dos puntos. Sin quitar antes los codigos de color no casa ninguna URL y
    # el script se queda esperando un servidor que ya esta listo.
    $texto = $texto -replace "$([char]27)\[[0-9;]*m", ''
    $coincidencias = [regex]::Matches($texto, 'http://localhost:(\d+)')
    if ($coincidencias.Count -eq 0) { return $null }
    $ultima = $coincidencias[$coincidencias.Count - 1]
    return "http://localhost:$($ultima.Groups[1].Value)/"
}

function Get-Chrome {
    $candidatas = @(
        (Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'),
        (Join-Path ${env:ProgramFiles(x86)} 'Google\Chrome\Application\chrome.exe'),
        (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
    )
    foreach ($ruta in $candidatas) {
        if ($ruta -and (Test-Path $ruta)) { return $ruta }
    }
    # Último recurso: el registro, por si está instalado en una ruta rara.
    try {
        $clave = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe'
        $desdeRegistro = (Get-ItemProperty -Path $clave -ErrorAction Stop).'(default)'
        if ($desdeRegistro -and (Test-Path $desdeRegistro)) { return $desdeRegistro }
    } catch {}
    return $null
}

Write-Host ''
Write-Host '  Restricciones maritimas - Illes Balears' -ForegroundColor Cyan
Write-Host ''

# -- 1. Dependencias ----------------------------------------------------------
if (-not (Test-Path 'node_modules')) {
    Escribe 'Primera vez: instalando dependencias...' 'Yellow'
    & npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { Escribe 'Fallo al instalar dependencias.' 'Red'; exit 1 }
}

# -- 2. Cartografía -----------------------------------------------------------
# Lo que descarga el navegador son las capas partidas por fuente e isla; el
# fichero combinado solo lo usan los scripts. Se comprueba que haya capas, no un
# nombre concreto: si se mira un fichero que ya no se genera, la cartografia se
# vuelve a descargar entera en cada arranque.
$capas = Get-ChildItem 'src\data\capas\*.geojson' -ErrorAction SilentlyContinue
if ($Datos -or -not $capas) {
    Escribe 'Descargando la cartografia oficial de IDEIB...' 'Yellow'
    & npm run data
    if ($LASTEXITCODE -ne 0) { Escribe 'Fallo al descargar la cartografia.' 'Red'; exit 1 }
}

# -- 3. Servidor --------------------------------------------------------------
$url = $null

# ¿Hay ya un servidor nuestro escuchando cerca del puerto preferido?
foreach ($p in $Puerto..($Puerto + 5)) {
    $candidato = "http://localhost:$p/"
    if (Test-NuestraWeb $candidato) { $url = $candidato; break }
}

if ($url) {
    Escribe "El servidor ya estaba en marcha: $url" 'DarkGray'
} else {
    Escribe 'Arrancando el servidor...'

    # El log tiene que ser nuevo. Si un servidor anterior sigue vivo mantiene el
    # fichero abierto y el borrado no surte efecto, así que en ese caso se usa
    # un nombre propio de esta ejecución.
    Remove-Item $log -ErrorAction SilentlyContinue
    if (Test-Path $log) { $log = Join-Path $PSScriptRoot ".dev-server-$PID.log" }

    # Ventana minimizada y salida al log: si algo falla, queda registrado en vez
    # de desaparecer con la ventana.
    Start-Process -FilePath 'cmd.exe' `
        -ArgumentList '/c', "npm run dev -- --port $Puerto > `"$log`" 2>&1" `
        -WindowStyle Minimized | Out-Null

    $limite = (Get-Date).AddSeconds(90)
    while (-not $url) {
        $candidato = Get-UrlDelLog
        if ($candidato -and (Test-NuestraWeb $candidato)) { $url = $candidato; break }

        # Red de seguridad: si del log no sale ninguna URL —otro formato de
        # salida, un Vite que no la imprima— se prueba igualmente el rango de
        # puertos. Quien decide sigue siendo la respuesta de la web, no el log.
        if (-not $candidato) {
            foreach ($p in $Puerto..($Puerto + 5)) {
                $prueba = "http://localhost:$p/"
                if (Test-NuestraWeb $prueba) { $url = $prueba; break }
            }
            if ($url) { break }
        }

        if ((Get-Date) -gt $limite) {
            Escribe 'El servidor no ha respondido en 90 segundos.' 'Red'
            if (Test-Path $log) {
                Write-Host ''
                Escribe 'Ultimas lineas de .dev-server.log:' 'Red'
                Get-Content $log -Tail 15 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
            }
            exit 1
        }
        Start-Sleep -Milliseconds 400
    }

    if ($url -notmatch ":$Puerto/") {
        Escribe "El puerto $Puerto estaba ocupado; el servidor usa $url" 'Yellow'
    }
    Escribe 'Servidor listo.' 'Green'
}

# -- 4. Chrome ----------------------------------------------------------------
$chrome = Get-Chrome
if ($chrome) {
    Escribe "Abriendo $url en Chrome..." 'Green'
    Start-Process -FilePath $chrome -ArgumentList $url | Out-Null
} else {
    Escribe 'No he encontrado Chrome; abro en el navegador por defecto.' 'Yellow'
    Start-Process $url | Out-Null
}

Write-Host ''
Escribe 'El servidor sigue corriendo en una ventana minimizada.' 'DarkGray'
Escribe 'Cierrala para detenerlo.' 'DarkGray'
Write-Host ''
