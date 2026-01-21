# Claude Code Kit

> A comprehensive collection of custom commands, agents, and workflows for Claude Code - supercharge your development experience with Git Flow automation, code analysis, and intelligent scaffolding.

[![Version](https://img.shields.io/badge/version-1.3.0-blue.svg)](https://github.com/quanap5/claude-code-kit/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Ready-purple.svg)](https://docs.anthropic.com/claude-code)

---

## Table of Contents

- [What is Claude Code Kit?](#what-is-claude-code-kit)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Features](#features)
  - [Commands](#commands)
  - [Agents](#agents)
  - [Components](#components)
- [Usage](#usage)
  - [Common Workflows](#common-workflows)
  - [Examples](#examples)
- [Project Structure](#project-structure)
- [Development](#development)
- [Resources](#resources)
- [License](#license)

---

## What is Claude Code Kit?

**Claude Code Kit** is a curated collection of productivity-enhancing customizations for [Claude Code](https://docs.anthropic.com/claude-code), Anthropic's AI-powered coding assistant. It provides:

### Key Features

- **Git Flow Automation**: Complete Git Flow workflow with feature, release, and hotfix branch management
- **Code Analysis Tools**: Performance optimization, code explanation, and issue analysis
- **Smart Scaffolding**: Auto-generate features, components, and tests following your project conventions
- **Specialized Agents**: Custom agents for Git Flow management and code review
- **Reusable Components**: Production-ready React components (Card, TabTable)

### Who Should Use This?

- **Developers** using Claude Code who want pre-built workflows for common tasks
- **Teams** adopting Git Flow branching strategy
- **Projects** that need consistent code scaffolding and structure
- **Anyone** looking to customize Claude Code with proven patterns

### Core Concepts

Claude Code Kit leverages three main Claude Code features:

1. **Commands** - Slash commands (e.g., `/feature`, `/optimize`) that expand into detailed prompts
2. **Agents** - Specialized AI agents with specific tools and behaviors
3. **Components** - Reusable UI components with TypeScript and tests

---

## Quick Start

### Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/claude-code) installed
- Git repository with `main` and `develop` branches (for Git Flow features)
- Node.js and npm (for component development)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/quanap5/claude-code-kit.git
cd claude-code-kit
```

2. Copy the `.claude` directory to your project:
```bash
cp -r .claude /path/to/your/project/
```

3. (Optional) Copy components to your project:
```bash
cp -r src/components /path/to/your/project/src/
```

### First Steps

Try these commands in Claude Code:

```bash
# Check Git Flow status
/gitflow-status

# Create a new feature branch
/feature user-authentication

# Analyze code for optimization opportunities
/optimize

# Get a code explanation
/explain
```

### Quick Example

Create a feature branch, make changes, and finish:

```bash
# Start new feature
/feature payment-integration

# ... make your changes ...

# Complete and merge feature
/finish
```

---

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Claude Code Kit                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Commands   │  │    Agents    │  │  Components  │ │
│  │  (11 total)  │  │  (1 custom)  │  │  (2 ready)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                   ┌────────▼────────┐                   │
│                   │  Claude Code    │                   │
│                   │    Runtime      │                   │
│                   └─────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
claude-code-kit/
├── .claude/                    # Claude Code customizations
│   ├── commands/              # Slash commands (11 files)
│   │   ├── feature.md         # Create feature branches
│   │   ├── release.md         # Create release branches
│   │   ├── hotfix.md          # Create hotfix branches
│   │   ├── finish.md          # Complete Git Flow branches
│   │   ├── gitflow-status.md  # View Git Flow status
│   │   ├── optimize.md        # Code optimization analysis
│   │   ├── explain.md         # Code explanation
│   │   ├── analyze-issue.md   # GitHub issue analysis
│   │   ├── feature-scaffold.md # Feature scaffolding
│   │   └── component.md       # React component creation
│   ├── agents/                # Custom agents
│   │   └── git-flow-manager.md # Git Flow automation
│   ├── hooks/                 # Event-driven automation
│   └── settings.json          # Claude Code configuration
├── src/                       # Source components
│   ├── components/            # Reusable UI components
│   │   └── Card/             # Card component
│   └── features/             # Feature modules
│       └── tabtable/         # TabTable component
├── specs/                     # Issue specifications
│   ├── issue-6-spec.md
│   ├── issue-7-spec.md
│   └── issue-13-spec.md
├── CLAUDE.md                  # Technical roadmap (for Claude)
├── CHANGELOG.md               # Version history
└── README.md                  # This file
```

### Claude Code Feature Integration

This project demonstrates how to extend Claude Code using:

| Feature | Purpose | Location |
|---------|---------|----------|
| **Commands** | Slash commands for common tasks | `.claude/commands/*.md` |
| **Agents** | Specialized AI assistants | `.claude/agents/*.md` |
| **Hooks** | Automation triggers | `.claude/hooks/` (planned) |
| **Settings** | Configuration | `.claude/settings.json` |

---

## Features

### Commands

Claude Code Kit includes 11 powerful slash commands:

#### Git Flow Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/feature <name>` | Create a new feature branch from develop | `/feature user-profile` |
| `/release <version>` | Create a release branch with version bumping | `/release v1.4.0` |
| `/hotfix <name>` | Create an emergency hotfix from main | `/hotfix security-patch` |
| `/finish` | Complete and merge current branch | `/finish` |
| `/gitflow-status` | Display comprehensive Git Flow status | `/gitflow-status` |

**Git Flow Workflow:**
```
develop ──┬─→ feature/xxx ──→ merge back to develop
          │
          ├─→ release/vX.Y.Z ──→ merge to main + develop, create tag
          │
main ─────┴─→ hotfix/xxx ──→ merge to main + develop, create tag
```

#### Code Quality Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/optimize` | Analyze code for performance improvements | `/optimize` |
| `/explain` | Explain code in junior-developer-friendly terms | `/explain` |
| `/analyze-issue <number>` | Generate implementation spec from GitHub issue | `/analyze-issue 13` |

#### Scaffolding Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/feature-scaffold <name>` | Generate complete feature structure with tests | `/feature-scaffold dashboard` |
| `/component <name>` | Create React TypeScript component | `/component Button` |

### Agents

#### Git Flow Manager

**Purpose**: Automates Git Flow operations proactively

**Capabilities:**
- Branch creation and validation
- Merge conflict detection
- Release management
- Pull request generation
- Branch cleanup

**Tools**: Read, Bash, Grep, Glob, Edit, Write

**Usage**: The agent is invoked automatically when using Git Flow commands

```bash
# The git-flow-manager agent handles these operations:
/feature my-feature    # Validates, creates branch, sets up tracking
/finish                # Merges, tags (if needed), deletes branch
```

### Components

#### Card Component

A versatile React card component with TypeScript support.

**Features:**
- Multiple variants (default, outlined, elevated)
- Optional title and subtitle
- Click handlers
- Accessibility support (ARIA, keyboard navigation)
- Fully tested

**Usage:**
```tsx
import { Card } from './components/Card';

<Card
  title="Welcome"
  subtitle="Get started with Claude Code Kit"
  variant="elevated"
  onClick={() => console.log('Clicked')}
>
  <p>Card content here</p>
</Card>
```

#### TabTable Component

A compound component combining tabbed navigation with data tables.

**Features:**
- Multiple tabs with individual tables
- Sortable columns
- Row click handlers
- Loading and empty states
- Error boundaries
- Full accessibility (ARIA)
- Styled-components theming

**Usage:**
```tsx
import { TabTable } from './features/tabtable';

<TabTable
  tabs={[
    { id: 'users', label: 'Users' },
    { id: 'products', label: 'Products' }
  ]}
  tablesData={[
    {
      tabId: 'users',
      columns: [
        { id: 'name', header: 'Name', accessor: 'name' },
        { id: 'email', header: 'Email', accessor: 'email' }
      ],
      data: users
    }
  ]}
  sortable
/>
```

---

## Usage

### Common Workflows

#### 1. Starting a New Feature

```bash
# 1. Create feature branch
/feature user-notifications

# Output:
# ✓ Created branch: feature/user-notifications
# ✓ Set up remote tracking
# ✓ Pushed to origin

# 2. Make your changes
# ... develop feature ...

# 3. Complete feature
/finish

# Output:
# ✓ Merged to develop
# ✓ Deleted feature branch
# 🎉 Feature complete!
```

#### 2. Creating a Release

```bash
# 1. Create release branch
/release v1.4.0

# Output:
# ✓ Created release/v1.4.0
# ✓ Updated version in package.json
# ✓ Updated CHANGELOG.md

# 2. Test and finalize

# 3. Complete release
/finish

# Output:
# ✓ Merged to main
# ✓ Merged to develop
# ✓ Created tag v1.4.0
# 🚀 Release v1.4.0 is live!
```

#### 3. Emergency Hotfix

```bash
# 1. Create hotfix from main
/hotfix critical-bug

# 2. Fix the issue

# 3. Complete hotfix
/finish

# Output:
# ✓ Merged to main
# ✓ Merged to develop
# ✓ Created tag v1.3.1
# 🔥 Hotfix deployed!
```

#### 4. Optimizing Code

```bash
/optimize

# Claude will:
# 1. Analyze codebase for bottlenecks
# 2. Identify optimization opportunities
# 3. Categorize by impact (high/medium/low)
# 4. Provide implementation recommendations
# 5. Generate optimization report
```

#### 5. Analyzing GitHub Issues

```bash
/analyze-issue 13

# Claude will:
# 1. Fetch issue from GitHub
# 2. Extract requirements
# 3. Create technical specification
# 4. Break into implementation tasks
# 5. Define test strategy
# 6. Generate specs/issue-13-spec.md
```

### Examples

#### Example 1: Check Git Flow Status

```bash
/gitflow-status
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌿 GIT FLOW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CURRENT BRANCH
   🔀 develop
   Type: Integration
   Status: ✓ Clean

📊 REPOSITORY INFO
   Latest tag: v1.3.0
   Active features: 0
   Active releases: 0

🔄 SYNC STATUS
   ✓ In sync with remote
   ✓ No uncommitted changes
```

#### Example 2: Create Feature with Scaffold

```bash
# Create feature branch
/feature dashboard-redesign

# Generate feature scaffold
/feature-scaffold dashboard

# Creates:
# src/features/dashboard/
# ├── index.ts
# ├── Dashboard.tsx
# ├── Dashboard.test.tsx
# ├── Dashboard.types.ts
# ├── Dashboard.styles.ts
# └── README.md
```

#### Example 3: Code Explanation

```bash
# Select complex code and run:
/explain

# Output: Junior-developer-friendly explanation
# - What the code does
# - Why it's structured this way
# - How each part works
# - Common gotchas and tips
```

---

## Project Structure

### Mapping to Claude Code Features

| Directory | Claude Code Feature | Purpose |
|-----------|-------------------|---------|
| `.claude/commands/` | **Commands** | Slash commands that expand into prompts |
| `.claude/agents/` | **Agents** | Custom AI agents with specific tools/roles |
| `.claude/hooks/` | **Hooks** | Event-driven automation (planned) |
| `.claude/settings.json` | **Settings** | MCP servers, hooks config |
| `src/components/` | Source | Reusable UI components |
| `src/features/` | Source | Feature modules |
| `specs/` | Documentation | Issue specifications |
| `CLAUDE.md` | Documentation | Technical roadmap for Claude |

### Naming Conventions

**Commands**: `kebab-case.md`
- Example: `feature-scaffold.md`, `analyze-issue.md`

**Agents**: `kebab-case.md`
- Example: `git-flow-manager.md`

**Components**: `PascalCase/`
- Example: `Card/`, `TabTable/`

**Branches**:
- Features: `feature/descriptive-name`
- Releases: `release/vX.Y.Z`
- Hotfixes: `hotfix/descriptive-name`

---

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/quanap5/claude-code-kit.git
cd claude-code-kit
```

2. Install dependencies (for components):
```bash
npm install
# or
yarn install
```

3. Run tests:
```bash
npm test
```

### Project Structure for Development

```
Development workflow:
1. Create feature branch: /feature <name>
2. Make changes in .claude/ or src/
3. Test commands in Claude Code
4. Run component tests: npm test
5. Complete feature: /finish
```

### Adding New Commands

1. Create markdown file in `.claude/commands/`:
```markdown
---
description: Brief command description
argument-hint: <arg-name>
---

# Command Title

Command implementation details...
```

2. Test the command:
```bash
/your-new-command
```

### Adding New Agents

1. Create markdown file in `.claude/agents/`:
```markdown
---
name: agent-name
description: What this agent does
tools: Read, Bash, Grep
---

Agent instructions and behavior...
```

### Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `/feature your-feature`
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Testing

```bash
# Run component tests
npm test

# Run with coverage
npm test -- --coverage

# Test specific component
npm test Card
```

---

## Resources

### Documentation

- [Claude Code Documentation](https://docs.anthropic.com/claude-code) - Official Claude Code docs
- [CLAUDE.md](./CLAUDE.md) - Technical implementation roadmap
- [Specifications](./specs/) - Detailed issue specifications

### Links

- [GitHub Repository](https://github.com/quanap5/claude-code-kit)
- [Issue Tracker](https://github.com/quanap5/claude-code-kit/issues)
- [Changelog](./CHANGELOG.md)

### Related Projects

- [Claude API](https://docs.anthropic.com/) - Anthropic Claude API
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) - Git branching model

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Acknowledgments

Built with [Claude Code](https://docs.anthropic.com/claude-code) by Anthropic.

---

**Version**: 1.3.0
**Last Updated**: 2026-01-21
**Maintained by**: [@quanap5](https://github.com/quanap5)

---

## Quick Reference

### Most Used Commands

```bash
/feature <name>        # Start new feature
/finish                # Complete current branch
/gitflow-status        # Check repository status
/optimize              # Analyze code performance
/analyze-issue <num>   # Analyze GitHub issue
```

### Project Health

- 📁 11 Commands
- 🤖 1 Custom Agent
- 🧩 2 Components (Card, TabTable)
- 📋 3 Issue Specifications
- ✅ Test Coverage: Components tested

---

> Made with ❤️ using Claude Code
