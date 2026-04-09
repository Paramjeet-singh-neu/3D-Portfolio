#!/usr/bin/env python3
import subprocess
import os

os.chdir("/vercel/share/v0-project")

try:
    # Fetch the latest changes
    print("[v0] Fetching latest changes from remote...")
    result = subprocess.run(["git", "fetch", "origin"], capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    
    # Pull the latest changes
    print("[v0] Pulling latest changes...")
    result = subprocess.run(["git", "pull", "origin", "main"], capture_output=True, text=True)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    
    print("[v0] Successfully pulled latest changes!")
except Exception as e:
    print(f"[v0] Error: {e}")
