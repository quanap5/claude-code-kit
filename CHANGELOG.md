# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.0.1] - 2025-12-29

### ✨ Features
- feat: hook prevent-direct-push (6377565)
- feat: add slash/command to create feature/branch (77c1007)

### 📝 Documentation
- docs: update README with Quick start and Sample sections (a328a2e)

### ♻️ Refactoring
- refactor: structure of project (2f1bbc7)

### 🔧 Chore
- chore: update file read.md (092cf0a)
- chore: update README.md (5a88c76)

---

## [v1.0.0] - 2025-12-29

### Features
- Add slash commands for Git Flow workflow (feature, release, hotfix, finish, flow-status)

### Chore
- Update README.md with project documentation
- Update file read.md
- Initial project structure setup

### Refactoring
- Restructure project directory layout

### Added
- `.claude/commands/feature.md` - Create feature branches
- `.claude/commands/release.md` - Create release branches
- `.claude/commands/hotfix.md` - Create hotfix branches
- `.claude/commands/finish.md` - Complete Git Flow branches
- `.claude/commands/flow-status.md` - Display Git Flow status
- `.claude/agents/git-flow-manager.md` - Git Flow workflow manager agent
