@echo off

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--skip-torch-cuda-test --lowvram --no-half --precision full --opt-split-attention --autolaunch

call webui.bat
