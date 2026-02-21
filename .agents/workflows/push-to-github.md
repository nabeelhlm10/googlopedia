---
description: Steps to initialize a Git repository and push the Googlopedia project to GitHub.
---

1. **Initialize Git**
   Open your PowerShell or Command Prompt in the project root:
   ```powershell
   git init
   ```

2. **Add Files**
   Stage all files for the first commit:
   ```powershell
   git add .
   ```

3. **Commit**
   ```powershell
   git commit -m "Initialize Googlopedia with validations and cleanup"
   ```

4. **Connect to GitHub**
   *Create a new repository on GitHub first (do not initialize with README).*
   Copy the URL of your new repository and run:
   ```powershell
   git remote add origin https://github.com/YOUR_USER_NAME/YOUR_REPO_NAME.git
   ```

5. **Rename Branch**
   ```powershell
   git branch -M main
   ```

6. **Push**
   ```powershell
   git push -u origin main
   ```
