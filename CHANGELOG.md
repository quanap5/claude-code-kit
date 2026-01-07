# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.2] - 2026-01-05

### ✨ Features
- feat: add explain command and Card component (d5a6127)
  - `/explain` slash command for junior-developer-friendly code explanations
  - Reusable Card component with TypeScript, Tailwind CSS, and tests

### 🐛 Bug Fixes
- fix(hooks): allow release workflow pushes (44f6a10)

### 🔧 Chore
- chore(release): merge v1.0.1 back into develop (d0f5a78)

---
=======
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
