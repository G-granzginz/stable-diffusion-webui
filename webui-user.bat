@echo off
if exist "%~dp0..\clean_stuck_process.py" (
    call python "%~dp0..\clean_stuck_process.py" 2>nul
)

set PYTHON=
set GIT=
set VENV_DIR=
set CUDA_MODULE_LOADING=LAZY
set PYTORCH_CUDA_ALLOC_CONF=garbage_collection_threshold:0.8,max_split_size_mb:128
set COMMANDLINE_ARGS=--listen --port 7851 --api --cors-allow-origins=* --skip-torch-cuda-test --medvram --opt-sdp-no-mem-attention --opt-channelslast --disable-nan-check --no-half-vae --no-gradio-queue --autolaunch

cd /d "%~dp0"
call webui.bat %*
