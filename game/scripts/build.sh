#!/bin/bash

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENGINE_DIR="$SCRIPT_DIR/../../engine"
GAME_DIR="$SCRIPT_DIR/.."

# Function to build the engine
build_engine() {
    echo "Building Engine..."
    pushd "$ENGINE_DIR" > /dev/null
    # npm install
    npm run build
    popd > /dev/null
    echo "Engine built successfully."
}

# Function to build the game
build_game() {
    echo "Building Game..."
    pushd "$GAME_DIR" > /dev/null
    # npm install
    npm run build
    popd > /dev/null
    echo "Game built successfully."
}

run_game() {
    echo "Running Game..."
    pushd "$GAME_DIR" > /dev/null
    npm run start
    popd > /dev/null
    echo "Game runned successfully."
}

# Run build steps
build_engine
build_game
run_game

echo "Build process completed."

# Wait for user input before closing
read -r -p "Press Enter to exit..."