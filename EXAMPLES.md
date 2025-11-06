# 📚 Clara CLI Examples

Practical examples of what you can do with Clara CLI! 🌸

---

## 🗂️ File Operations

### Finding Files

```bash
# Find all JavaScript files
clara "find all javascript files"

# Find files modified today
clara "show me files modified today"

# Find large files
clara "find files larger than 100MB"

# Find files by extension
clara "list all .json files"
```

### File Management

```bash
# Create a directory structure
clara "create a directory structure for a React app"

# Copy files
clara "copy all images from src to dist"

# Rename files
clara "rename all .txt files to .md"

# Count files
clara "how many Python files are in this project"
```

### File Content

```bash
# Search in files
clara "find TODO comments in all files"

# Count lines
clara "count lines of code in src directory"

# Find and replace
clara "replace oldtext with newtext in all markdown files"

# Show file contents
clara "show me the package.json file"
```

---

## 🔧 Git Operations

### Repository Info

```bash
# Check status
clara "what's the status of my git repo"

# Show branches
clara "list all git branches"

# View history
clara "show me the last 10 commits"

# Check uncommitted changes
clara "show me what files have changed"
```

### Branch Management

```bash
# Create branch
clara "create a new branch called feature-auth"

# Switch branch
clara "switch to main branch"

# Delete branch
clara "delete the old-feature branch"

# Merge branch
clara "merge develop into current branch"
```

### Commits

```bash
# Show last commit
clara "show me the last commit details"

# Undo last commit
clara "undo the last commit but keep my changes"

# Commit history for file
clara "show commit history for README.md"

# See who changed what
clara "show who last modified this file"
```

---

## 🖥️ System Operations

### Process Management

```bash
# Find process by port
clara "what process is using port 3000"

# Kill process
clara "kill the process using port 8080"

# List running processes
clara "show all node processes"

# Check resource usage
clara "show memory usage"
```

### Disk & Storage

```bash
# Check disk space
clara "how much disk space is available"

# Show directory size
clara "what's the size of node_modules"

# Find large directories
clara "show me the largest directories"

# Clean up
clara "find and list temporary files"
```

### Network

```bash
# Check IP address
clara "what's my IP address"

# Test connection
clara "ping google.com 5 times"

# Show network connections
clara "show active network connections"

# Check if port is open
clara "check if port 80 is open"
```

---

## 📦 Package Management

### NPM

```bash
# Install dependencies
clara "install npm dependencies"

# Update packages
clara "update all npm packages"

# Find outdated packages
clara "show outdated npm packages"

# Clean install
clara "clean install npm packages"
```

### Python

```bash
# Create virtual environment
clara "create a python virtual environment"

# Install requirements
clara "install python requirements from requirements.txt"

# List installed packages
clara "show installed pip packages"

# Freeze dependencies
clara "create requirements.txt from installed packages"
```

---

## 🛠️ Development Tasks

### Project Setup

```bash
# Initialize git
clara "initialize a new git repository"

# Create .gitignore
clara "create a gitignore for python project"

# Setup Node project
clara "initialize a new npm project"

# Create README
clara "create a basic README file"
```

### Building & Testing

```bash
# Run tests
clara "run npm tests"

# Build project
clara "build the project for production"

# Lint code
clara "run eslint on all files"

# Format code
clara "format all code with prettier"
```

### Docker

```bash
# List containers
clara "show all running docker containers"

# Build image
clara "build a docker image from Dockerfile"

# Stop container
clara "stop the docker container named myapp"

# Clean up
clara "remove unused docker images"
```

---

## 📊 Data Operations

### Text Processing

```bash
# Count words
clara "count words in README.md"

# Sort file contents
clara "sort lines in data.txt alphabetically"

# Remove duplicates
clara "remove duplicate lines from file.txt"

# Extract data
clara "extract all email addresses from contacts.txt"
```

### JSON Operations

```bash
# Pretty print JSON
clara "format package.json nicely"

# Extract field
clara "get the version field from package.json"

# Validate JSON
clara "check if config.json is valid"
```

### CSV Operations

```bash
# Show first rows
clara "show first 10 rows of data.csv"

# Count rows
clara "count rows in data.csv"

# Extract column
clara "extract the name column from users.csv"
```

---

## 🔒 Security & Permissions

### File Permissions

```bash
# Check permissions
clara "show permissions for all files in current directory"

# Change permissions
clara "make script.sh executable"

# Find world-writable files
clara "find files that everyone can write to"
```

### SSH & Keys

```bash
# Generate SSH key
clara "generate a new SSH key"

# Copy SSH key
clara "copy my SSH public key to clipboard"

# Check SSH agent
clara "show loaded SSH keys"
```

---

## 🌐 Web & API

### Downloads

```bash
# Download file
clara "download file from https://example.com/file.zip"

# Check if URL is reachable
clara "check if website example.com is up"
```

### API Testing

```bash
# Make GET request
clara "make a GET request to https://api.example.com/users"

# Check HTTP status
clara "check HTTP status of https://example.com"
```

---

## 💡 Advanced Examples

### Backup Operations

```bash
# Backup directory
clara "create a zip backup of the src directory"

# Backup with timestamp
clara "backup config files with today's date in filename"

# Backup database
clara "backup mysql database to file"
```

### Batch Operations

```bash
# Batch rename
clara "add .backup extension to all config files"

# Batch convert
clara "convert all .png images to .jpg"

# Batch process
clara "resize all images in photos directory"
```

### System Maintenance

```bash
# Clean cache
clara "clear npm cache"

# Update system (be careful!)
clara "check for system updates"

# Check logs
clara "show last 50 lines of system log"
```

---

## 🎯 Pro Tips

### 1. Be Specific
❌ "find files"
✅ "find all Python files modified in the last 24 hours"

### 2. Mention Context
❌ "delete old files"
✅ "list temporary files older than 30 days in /tmp"

### 3. Safety First
Clara will warn you about destructive operations, but you can be extra safe:
✅ "show me which files would be deleted"
✅ "list backup files before deleting"

### 4. Use Natural Language
You don't need to know command syntax:
✅ "show me disk usage"
✅ "what's taking up space"
✅ "how much storage is left"

All work the same way!

### 5. Combine Operations
✅ "find all test files and count their lines of code"
✅ "search for TODO comments and save results to todo.txt"

---

## 🔍 Command Categories by Danger Level

### ✅ Safe (Read-only)
- `find`, `ls`, `cat`, `grep`
- `git status`, `git log`, `git diff`
- `df`, `du`, `ps`, `top`
- Most viewing/listing operations

### ⚠️ Moderate (Write operations)
- Creating files/directories
- Installing packages
- Copying files
- Git commits

### 🚨 Destructive (Requires confirmation)
- Deleting files (`rm`)
- System modifications (`chmod`, `chown`)
- Force operations (`git reset --hard`)
- Commands with `sudo`

Clara will always warn you and ask for confirmation before running destructive commands!

---

## 💬 Need More Examples?

Ask Clara! Try:
```bash
clara "show me examples of git commands"
clara "how do I work with docker"
clara "help me with file management"
```

---

Made with 🌸 by Clara
