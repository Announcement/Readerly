@echo off
setlocal
FOR /F "tokens=* USEBACKQ" %%F IN (`npm bin`) DO (
  SET bin=%%F
)

SET "entry=main.js"
SET "outfile=bundle.js"

ECHO browserify %entry% --outfile %outfile%

cmd /c %bin%\browserify %entry% --outfile %outfile%
endlocal
