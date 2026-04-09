import subprocess
import os

os.chdir('/vercel/share/v0-project')

# Fetch latest changes from remote
print("Fetching latest changes...")
result = subprocess.run(['git', 'fetch', 'origin'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(result.stderr)

# Pull latest changes
print("\nPulling latest changes...")
result = subprocess.run(['git', 'pull', 'origin', 'main'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(result.stderr)

# Show current status
print("\nCurrent git status:")
result = subprocess.run(['git', 'status'], capture_output=True, text=True)
print(result.stdout)
