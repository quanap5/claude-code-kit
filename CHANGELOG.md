# Changelog

All notable changes to this project will be documented in this file.

## [v1.4.0] - 2026-01-21

### ✨ Features
- feat: add comprehensive optimize slash command (e71b192)
  - `/optimize` command for code performance analysis
  - Identifies bottlenecks, optimization opportunities, and improvement strategies
  - Provides structured optimization reports with before/after metrics
  - Covers algorithm efficiency, code quality, and build optimizations

### 📝 Documentation
- docs: create comprehensive README.md documentation (707cfff)
  - Complete project overview with badges and key features
  - Quick start guide with installation and first steps
  - Architecture documentation with ASCII diagrams
  - Complete feature documentation (11 commands, 1 agent, 2 components)
  - 5 common workflows and 3 detailed usage examples
  - Project structure mapping to Claude Code features
  - Development guide and contributing guidelines
  - Transformed from 6 lines to 660 lines (110x increase)
- docs: add comprehensive specification for issue #13 (5ae66d9)
  - Detailed implementation specification for README improvements
  - 7-task implementation plan with complexity estimates
  - Comprehensive test strategy and definition of done

### 🔧 Chore
- Merge feature/feature-optimize into develop (72c4beb)
- Merge feature/feature-docs into develop (fbbcaa0)
- Merge release/v1.3.0 back into develop (755b774)

---

## [v1.3.0] - 2026-01-08

### ✨ Features
- feat: zero-configure slash command (fef0efa)
  - `/feature-scaffold` command for generating feature scaffolds with tests, types, and docs
  - `/gitflow-status` command for comprehensive Git Flow status display
  - New tabtable feature component with TypeScript, styles, and comprehensive tests
  - Enhanced analyze-issue command functionality
- feat: add analyze issue 7 (e961c6b)
  - Improved issue analysis capabilities

### 🔧 Chore
- Merge feature/zero-config into develop (b6bcf58)
- Merge feature/analyze-issue into develop (a27ad8d)
- Merge release/v1.1.0 back into develop (6707eda)

---

## [v1.1.0] - 2026-01-07

### ✨ Features
- feat: add analyze-issue command and document writer agent spec (192f595)
  - `/analyze-issue` slash command to generate implementation specs from GitHub issues
  - Document writer agent spec for structured documentation generation
- feat: add explain command and Card component (d5a6127)
  - `/explain` slash command for junior-developer-friendly code explanations
  - Reusable Card component with TypeScript, Tailwind CSS, and tests

### 🐛 Bug Fixes
- fix(hooks): allow release workflow pushes (44f6a10)

### 🔧 Chore
- chore(release): prepare v1.0.2 release (b6787f9)
- chore(release): merge v1.0.1 back into develop (d0f5a78)

---

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
