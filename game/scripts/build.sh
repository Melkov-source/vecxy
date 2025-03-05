#!/bin/bash

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENGINE_DIR="$SCRIPT_DIR/../../engine"
GAME_DIR="$SCRIPT_DIR/.."

build_engine() {
    echo "Building Engine..."
    pushd "$ENGINE_DIR" > /dev/null
    npm run build
    popd > /dev/null
    echo "Engine built successfully."
}

build_game() {
    echo "Building Game..."
    pushd "$GAME_DIR" > /dev/null
    npm run build
    popd > /dev/null
    echo "Game built successfully."
}

# Run build steps
build_engine
build_game

echo "Build process completed."