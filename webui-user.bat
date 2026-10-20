@echo off
if exist "%~dp0..\clean_stuck_process.py" (
    call python "%~dp0..\clean_stuck_process.py" 2>nul
)

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--api --cors-allow-origins=* --skip-torch-cuda-test --medvram --opt-sdp-no-mem-attention --no-half-vae --autolaunch

call webui.bat
