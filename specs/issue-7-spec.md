# Issue #7 Specification: Zero-Config Project Structure

**Issue URL**: https://github.com/quanap5/claude-code-kit/issues/7
**Title**: Zero-Config Project Structure
**Status**: OPEN
**Created**: 2026-01-07

---

## 1. Requirements Analysis

### 1.1 User Story

**As a** software developer
**I want** a zero-config command to generate complete feature folder structures
**So that** I can quickly scaffold new features with boilerplate components, tests, types, and documentation following my team's conventions without manual setup

### 1.2 Acceptance Criteria

- [ ] Command generates complete folder structure for a feature
- [ ] Includes boilerplate React components (TypeScript functional components)
- [ ] Includes corresponding test files
- [ ] Includes type definitions
- [ ] Includes basic documentation (README or comments)
- [ ] Follows existing project conventions and patterns
- [ ] Zero configuration required - works out of the box
- [ ] Analyzes existing codebase to infer conventions
- [ ] Customizable through optional parameters

### 1.3 Functional Requirements

**FR-1**: Feature Structure Generation
- Generate complete folder structure for a named feature
- Create all necessary boilerplate files
- Follow existing project patterns (detected from codebase analysis)
- Support nested feature organization

**FR-2**: Component Generation
- Create TypeScript functional components with React hooks
- Define clear props interfaces
- Apply styling (Tailwind CSS based on existing patterns)
- Include JSDoc comments for props
- Export components properly (named + default exports)

**FR-3**: Test File Generation
- Create test files alongside components
- Use existing testing library (React Testing Library detected)
- Include basic test cases (render, props, interactions)
- Follow existing test patterns

**FR-4**: Type Definition Files
- Create TypeScript types/interfaces
- Define component props types
- Include utility types as needed
- Follow existing type organization patterns

**FR-5**: Documentation Generation
- Create feature-level README files
- Document component usage
- Include code examples
- Document props and API

**FR-6**: Convention Detection
- Analyze existing codebase structure
- Detect folder organization patterns
- Identify naming conventions
- Detect styling approach (CSS, Tailwind, CSS-in-JS)
- Detect testing patterns
- Infer TypeScript configuration

**FR-7**: Customization Options
- Allow feature name specification
- Support optional subfolder/module organization
- Allow template override
- Support different component types (container, presentational, hook)

### 1.4 Non-Functional Requirements

**NFR-1: Performance**
- Structure generation should complete in < 10 seconds
- Codebase analysis should be efficient (use caching)
- Support for large codebases (100+ components)

**NFR-2: Quality**
- Generated code must be syntactically correct
- Generated code must pass linting (if project has linters)
- Generated tests must be executable
- Follow TypeScript best practices

**NFR-3: Maintainability**
- Command should be easy to extend with new templates
- Convention detection should be modular
- Support multiple project types (React, Next.js, etc.)

**NFR-4: Usability**
- Clear error messages when conventions can't be detected
- Helpful guidance on usage
- Show preview of files to be created
- Confirm before creating files

---

## 2. Technical Specification

### 2.1 Files to Create/Modify

**Primary Files**:
- `.claude/commands/scaffold.md` - Main command definition
- `.claude/agents/scaffold-generator.md` - Agent for structure generation
- `.claude/templates/` - Template directory (optional)

**Template Structure** (optional, if explicit templates are needed):
```
.claude/templates/
├── feature/
│   ├── component.tsx.template
│   ├── test.test.tsx.template
│   ├── types.ts.template
│   ├── index.ts.template
│   └── README.md.template
```

### 2.2 Command Structure

**Command**: `/scaffold <feature-name> [options]`

**Options**:
- `--type <component|hook|page>` - Type of feature to scaffold
- `--path <relative-path>` - Custom path for the feature
- `--no-tests` - Skip test file generation
- `--no-docs` - Skip documentation generation

**Example Usage**:
```bash
/scaffold UserProfile
/scaffold AuthForm --type component
/scaffold useAuth --type hook
/scaffold Dashboard --path src/pages
```

### 2.3 Generated Folder Structure

Based on detected conventions, the command generates:

**For React Component Feature**:
```
src/components/UserProfile/
├── UserProfile.tsx          # Main component
├── UserProfile.test.tsx     # Test file
├── UserProfile.types.ts     # Type definitions
├── index.ts                 # Barrel export
├── README.md                # Documentation
└── styles.module.css        # Styles (if CSS modules detected)
```

**For Custom Hook Feature**:
```
src/hooks/useAuth/
├── useAuth.ts              # Hook implementation
├── useAuth.test.ts         # Hook tests
├── useAuth.types.ts        # Type definitions
├── index.ts                # Export
└── README.md               # Documentation
```

### 2.4 Convention Detection Algorithm

**Detection Process**:
1. **Analyze existing structure**
   - Scan `src/components/`, `src/hooks/`, `src/pages/`
   - Identify folder organization patterns
   - Detect file naming conventions

2. **Detect styling approach**
   - Check for Tailwind config
   - Look for CSS modules (`.module.css`)
   - Check for styled-components or emotion

3. **Detect testing setup**
   - Look for jest.config or vitest.config
   - Check testing library imports
   - Identify test file patterns (`.test.tsx`, `.spec.tsx`)

4. **Detect TypeScript configuration**
   - Read `tsconfig.json`
   - Detect path aliases
   - Identify import patterns

5. **Build convention profile**
   - Store detected conventions
   - Use for template generation
   - Cache for reuse

### 2.5 Data Structures

**Convention Profile**:
```typescript
interface ProjectConventions {
  folderStructure: {
    componentsPath: string;      // e.g., "src/components"
    hooksPath: string;            // e.g., "src/hooks"
    pagesPath: string;            // e.g., "src/pages"
    indexBarrelExports: boolean;  // Uses index.ts for exports
  };

  naming: {
    componentCase: 'PascalCase' | 'camelCase';
    fileCase: 'PascalCase' | 'kebab-case' | 'camelCase';
    testSuffix: '.test' | '.spec';
    styleExtension: '.css' | '.module.css' | '.scss' | '.tsx';
  };

  styling: {
    approach: 'tailwind' | 'css-modules' | 'styled-components' | 'emotion' | 'plain-css';
    hasStyleFiles: boolean;
  };

  testing: {
    framework: 'jest' | 'vitest';
    library: '@testing-library/react' | 'enzyme';
    setupFile: string | null;
  };

  typescript: {
    strict: boolean;
    pathAliases: Record<string, string>;
    separateTypeFiles: boolean;  // Uses .types.ts files
  };

  documentation: {
    hasReadmes: boolean;
    usesJSDoc: boolean;
  };
}
```

**Template Variables**:
```typescript
interface TemplateContext {
  featureName: string;           // e.g., "UserProfile"
  featureNameLower: string;      // e.g., "userProfile"
  featureNameKebab: string;      // e.g., "user-profile"
  componentPath: string;         // Full path to component
  hasStyles: boolean;
  hasDocs: boolean;
  hasTests: boolean;
  conventions: ProjectConventions;
}
```

### 2.6 External Dependencies

**None** - Uses only Claude Code built-in tools:
- `Read` - Read existing files for pattern analysis
- `Glob` - Find files matching patterns
- `Grep` - Search for specific patterns
- `Write` - Create new files
- `Bash` - Optional for running linters/formatters

### 2.7 API Contracts

**Agent Invocation**:
```typescript
// Via Task tool
{
  subagent_type: "scaffold-generator",
  prompt: "Generate feature structure for UserProfile component",
  context: {
    featureName: "UserProfile",
    type: "component",
    path: "src/components",
    includeTests: true,
    includeDocs: true
  }
}
```

**Agent Response**:
```typescript
{
  success: boolean;
  filesCreated: string[];
  warnings: string[];
  nextSteps: string[];
}
```

---

## 3. Implementation Plan

### 3.1 Task Breakdown

**Task 1: Create Convention Detection Module** (Complexity: 4/5)
- Implement codebase analysis logic
- Detect folder structure patterns
- Identify naming conventions
- Detect styling and testing setups
- Build and cache convention profile
- **Risk**: High - Complex pattern recognition across diverse codebases
- **Dependencies**: None
- **Estimated Lines**: 200-300

**Task 2: Create Template Engine** (Complexity: 3/5)
- Build template variable substitution system
- Create default templates for components, hooks, pages
- Support conditional template sections
- Handle different styling approaches
- **Risk**: Medium - Must handle various template combinations
- **Dependencies**: Task 1
- **Estimated Lines**: 150-200

**Task 3: Implement Component Generator** (Complexity: 3/5)
- Generate TypeScript component files
- Create props interfaces
- Add styling boilerplate (based on conventions)
- Include JSDoc comments
- Create barrel exports (index.ts)
- **Risk**: Medium - Must generate syntactically correct TypeScript
- **Dependencies**: Tasks 1, 2
- **Estimated Lines**: 100-150

**Task 4: Implement Test Generator** (Complexity: 3/5)
- Generate test files matching detected framework
- Create basic test cases (render, props, interactions)
- Follow existing test patterns
- Include proper imports and setup
- **Risk**: Medium - Test syntax varies by framework
- **Dependencies**: Tasks 1, 2
- **Estimated Lines**: 100-150

**Task 5: Implement Documentation Generator** (Complexity: 2/5)
- Generate feature README files
- Document component props and usage
- Include code examples
- Add installation/setup instructions
- **Risk**: Low - Standard markdown generation
- **Dependencies**: Tasks 1, 2
- **Estimated Lines**: 50-100

**Task 6: Create Scaffold Agent Definition** (Complexity: 2/5)
- Define agent in `.claude/agents/scaffold-generator.md`
- Specify tools and model
- Write agent instructions and workflow
- Include error handling guidelines
- **Risk**: Low - Standard agent setup
- **Dependencies**: Tasks 1-5
- **Estimated Lines**: 150-200 (markdown)

**Task 7: Create Scaffold Command** (Complexity: 2/5)
- Create `.claude/commands/scaffold.md`
- Define command parameters and options
- Add usage examples and help text
- Integrate with scaffold agent
- **Risk**: Low - Standard command definition
- **Dependencies**: Task 6
- **Estimated Lines**: 50-100 (markdown)

### 3.2 Implementation Order

```
Task 1 (Convention Detection)
    ↓
Task 2 (Template Engine)
    ↓
Task 3 (Component Gen) ──┐
Task 4 (Test Gen) ────────┼──→ Task 6 (Agent Definition)
Task 5 (Docs Gen) ────────┘          ↓
                                Task 7 (Command)
```

**Recommended Order**: 1 → 2 → 3 → 4 → 5 → 6 → 7

### 3.3 Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Convention detection fails on unique codebases | High | Medium | Provide fallback defaults, allow manual override |
| Generated code has syntax errors | High | Low | Validate with TypeScript parser, include linting |
| Performance issues on large codebases | Medium | Low | Cache detection results, limit analysis scope |
| Template doesn't match all project types | Medium | Medium | Support multiple template sets, allow customization |
| Conflicts with existing files | Medium | High | Check for existing files first, prompt for confirmation |
| Integration with different React patterns | Medium | Medium | Support multiple component patterns (class, functional, hooks) |

### 3.4 Implementation Phases

**Phase 1: Core Functionality** (Tasks 1-3)
- Convention detection working for React projects
- Basic component generation
- Support for common patterns (Tailwind + TypeScript + React Testing Library)

**Phase 2: Extended Features** (Tasks 4-5)
- Test generation
- Documentation generation
- Support for hooks and pages

**Phase 3: Integration & Polish** (Tasks 6-7)
- Agent and command definitions
- Error handling and validation
- User experience improvements

---

## 4. Test Strategy

### 4.1 Unit Tests (Manual Validation)

**Test Case 1: Convention Detection - Standard React Project**
- **Given**: Standard React + TypeScript project with Tailwind
- **When**: Convention detection runs
- **Then**: Correctly identifies:
  - `componentsPath`: `src/components`
  - `styling.approach`: `tailwind`
  - `naming.componentCase`: `PascalCase`
  - `testing.library`: `@testing-library/react`

**Test Case 2: Template Variable Substitution**
- **Given**: Template with `{{featureName}}`, `{{featureNameKebab}}`
- **When**: Feature name is "UserProfile"
- **Then**: Variables replaced with "UserProfile" and "user-profile"

**Test Case 3: Component Generation - Functional Component**
- **Given**: Feature name "Button" with detected conventions
- **When**: Component generator runs
- **Then**: Creates valid TypeScript functional component
- **Then**: Includes props interface
- **Then**: Has proper exports

**Test Case 4: Test File Generation**
- **Given**: Component "Button" generated
- **When**: Test generator runs
- **Then**: Creates test file with proper imports
- **Then**: Includes basic render test
- **Then**: Uses detected testing library

### 4.2 Integration Tests

**Test Case 5: End-to-End Scaffold - Component**
- **Given**: Command `/scaffold UserProfile` executed
- **When**: All generators run
- **Then**: Creates folder `src/components/UserProfile/`
- **Then**: Creates `UserProfile.tsx` (valid TypeScript)
- **Then**: Creates `UserProfile.test.tsx` (executable tests)
- **Then**: Creates `UserProfile.types.ts` (valid types)
- **Then**: Creates `index.ts` (proper exports)
- **Then**: Creates `README.md` (documentation)
- **Then**: All files follow project conventions

**Test Case 6: End-to-End Scaffold - Hook**
- **Given**: Command `/scaffold useAuth --type hook` executed
- **When**: Hook generator runs
- **Then**: Creates folder `src/hooks/useAuth/`
- **Then**: Creates `useAuth.ts` (valid custom hook)
- **Then**: Creates `useAuth.test.ts` (hook tests)
- **Then**: Creates proper exports and types

**Test Case 7: Custom Path Option**
- **Given**: Command `/scaffold Dashboard --path src/pages`
- **When**: Scaffold runs
- **Then**: Creates structure in `src/pages/Dashboard/`
- **Then**: Adjusts component type for page (if different patterns detected)

**Test Case 8: Convention Detection Cache**
- **Given**: Scaffold run twice in same session
- **When**: Second scaffold command executes
- **Then**: Uses cached convention profile
- **Then**: Completes faster than first run
- **Then**: Generates consistent structure

### 4.3 Edge Cases

**Edge Case 1: No Existing Components**
- **Scenario**: Brand new project with no components yet
- **Expected**: Uses sensible defaults (src/components/, PascalCase, etc.)
- **Validation**: Creates valid structure, warns about using defaults

**Edge Case 2: Mixed Naming Conventions**
- **Scenario**: Project has inconsistent naming (some PascalCase, some kebab-case)
- **Expected**: Detects majority pattern or uses most recent convention
- **Validation**: Picks one consistent approach, logs decision

**Edge Case 3: File Already Exists**
- **Scenario**: Feature name conflicts with existing component
- **Expected**: Detects conflict, prompts user for action (abort, rename, merge)
- **Validation**: Does not overwrite without confirmation

**Edge Case 4: Non-Standard Project Structure**
- **Scenario**: Components in `app/` instead of `src/`, custom organization
- **Expected**: Detects actual structure, adapts accordingly
- **Validation**: Scaffold works in detected location

**Edge Case 5: Large Codebase (500+ files)**
- **Scenario**: Enterprise-scale codebase
- **Expected**: Efficient analysis using sampling or targeted search
- **Validation**: Completes in reasonable time (< 30 seconds)

**Edge Case 6: No Testing Setup**
- **Scenario**: Project has no test files
- **Expected**: Skips test generation or creates basic setup
- **Validation**: Warns user, suggests installing testing libraries

### 4.4 Acceptance Testing

**Acceptance Test 1: React Component Scaffold**
- **Scenario**: Generate complete component in standard React project
- **Success Criteria**:
  - All files created in correct location
  - Component renders without errors
  - Tests pass when run
  - TypeScript compiles without errors
  - Linter passes (if configured)
  - Documentation is clear and accurate

**Acceptance Test 2: Custom Hook Scaffold**
- **Scenario**: Generate custom hook with tests
- **Success Criteria**:
  - Hook file has proper structure
  - Hook tests use @testing-library/react-hooks or equivalent
  - TypeScript types are correct
  - Hook is usable in components

**Acceptance Test 3: Multi-Component Feature**
- **Scenario**: Generate feature with multiple related components
- **Success Criteria**:
  - All components organized properly
  - Shared types in common file
  - Index exports all components
  - Tests cover all components

**Acceptance Test 4: Different Project Type (Next.js)**
- **Scenario**: Scaffold page component in Next.js app
- **Success Criteria**:
  - Detects Next.js specific patterns (app/ or pages/ directory)
  - Generates Next.js compatible component
  - Includes Next.js specific imports (next/link, next/image)
  - Follows Next.js conventions

---

## 5. Definition of Done

### 5.1 Functionality Checklist

Core Features:
- [ ] Convention detection analyzes existing codebase
- [ ] Detects folder structure, naming, styling, testing patterns
- [ ] Template engine substitutes variables correctly
- [ ] Component generator creates valid TypeScript components
- [ ] Test generator creates executable test files
- [ ] Documentation generator creates README files
- [ ] Barrel exports (index.ts) generated properly
- [ ] Type definition files created

Command & Agent:
- [ ] `/scaffold` command defined and working
- [ ] Scaffold agent definition created
- [ ] Command accepts feature name and options
- [ ] Agent invocable via Task tool
- [ ] Error handling for invalid inputs
- [ ] Confirmation prompt before creating files

File Generation:
- [ ] Creates components following detected conventions
- [ ] Creates test files with proper framework setup
- [ ] Creates type definition files
- [ ] Creates index.ts barrel exports
- [ ] Creates README.md documentation
- [ ] Creates style files (if applicable)

### 5.2 Quality Checklist

Code Quality:
- [ ] Generated TypeScript code is syntactically valid
- [ ] Generated code passes TypeScript compiler
- [ ] Generated tests are executable
- [ ] Generated code follows ESLint rules (if configured)
- [ ] No unused imports or variables
- [ ] Proper typing (no `any` types unless necessary)

Convention Adherence:
- [ ] Follows detected folder structure
- [ ] Uses detected naming conventions
- [ ] Matches existing styling approach
- [ ] Follows existing test patterns
- [ ] Consistent with codebase style

Documentation:
- [ ] Agent definition is clear and comprehensive
- [ ] Command usage is documented
- [ ] Template variables documented
- [ ] Error messages are helpful
- [ ] Examples included in command help

### 5.3 Test Coverage Requirements

Manual Testing:
- [ ] Tested on standard React + TypeScript project
- [ ] Tested with Tailwind CSS project
- [ ] Tested with CSS Modules project
- [ ] Tested with Jest setup
- [ ] Tested with Vitest setup
- [ ] Tested with existing components (convention detection)
- [ ] Tested on empty project (defaults)
- [ ] Tested custom path option
- [ ] Tested different feature types (component, hook, page)

Validation:
- [ ] At least 5 different project structures tested
- [ ] Generated files manually reviewed for quality
- [ ] Generated tests executed and verified passing
- [ ] TypeScript compilation verified
- [ ] Real-world usage tested (dogfooding)

### 5.4 Documentation Updates

Required Documentation:
- [ ] `.claude/commands/scaffold.md` created with usage examples
- [ ] `.claude/agents/scaffold-generator.md` created with instructions
- [ ] Command parameters documented
- [ ] Convention detection algorithm documented
- [ ] Template variables documented
- [ ] Examples for common use cases

Optional Documentation:
- [ ] Update project README with scaffold command
- [ ] Create scaffold usage guide
- [ ] Document customization options
- [ ] Add troubleshooting section

### 5.5 Performance Benchmarks

Expected Performance:
- **Convention Detection (first run)**: < 15 seconds (for 100-file codebase)
- **Convention Detection (cached)**: < 1 second
- **Component Generation**: < 5 seconds
- **Full Scaffold (component + tests + docs)**: < 10 seconds
- **Large Codebase (1000+ files)**: < 30 seconds for detection

Quality Benchmarks:
- **Generated Code Validity**: 100% (must compile)
- **Test Executability**: 100% (must be runnable)
- **Convention Accuracy**: 90%+ (matches project patterns)
- **User Satisfaction**: Reduces scaffolding time by 80%+

---

## 6. Success Metrics

### 6.1 Quantitative Metrics

- **Scaffolding Success Rate**: > 95% (generates valid, compilable code)
- **Time Saved**: > 80% reduction in manual scaffolding time
- **Convention Detection Accuracy**: > 90%
- **Generated Code Quality Score**: > 4/5 (linter compliance)
- **User Adoption**: Used in > 50% of new features

### 6.2 Qualitative Metrics

- Generated code is indistinguishable from hand-written code
- Developers trust the scaffolded output
- Reduces cognitive overhead when starting new features
- Enforces consistency across team members
- Positive feedback from code reviews

---

## 7. Future Enhancements

### 7.1 Phase 2 Features (Post-MVP)

**Advanced Templates**:
- Support for multiple template sets (mobile, desktop, etc.)
- User-defined custom templates
- Template marketplace or sharing

**AI-Enhanced Generation**:
- Generate actual component logic based on description
- Smart prop inference from usage context
- Generate comprehensive tests based on component logic

**Integration Features**:
- Git commit after scaffold (with conventional commit message)
- Automatically add to storybook
- Generate E2E tests for pages
- Auto-update route definitions (for Next.js/React Router)

**Multi-Framework Support**:
- Vue.js components
- Svelte components
- Angular components
- React Native components

**Advanced Convention Detection**:
- Detect state management patterns (Redux, Zustand, etc.)
- Detect API integration patterns
- Learn from team's coding style over time

### 7.2 Integration Opportunities

**IDE Integration**:
- VS Code extension for scaffold command
- Right-click context menu in file explorer
- Quick scaffold snippets

**CI/CD Integration**:
- Validate scaffold output in PR checks
- Auto-scaffold on branch creation
- Template compliance checks

**Team Collaboration**:
- Share convention profiles across team
- Team-wide template libraries
- Scaffold analytics (what gets generated most)

**MCP Server**:
- Dedicated scaffolding MCP server
- Web-based scaffold previews
- Cross-project template sharing

---

## 8. Appendix

### 8.1 Example Generated Files

**Component Example** (`src/components/UserProfile/UserProfile.tsx`):
```typescript
import React from 'react';
import { UserProfileProps } from './UserProfile.types';

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  avatar,
  className = '',
}) => {
  return (
    <div className={`user-profile ${className}`}>
      {avatar && (
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
      )}
      <div className="user-info">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
```

**Test Example** (`src/components/UserProfile/UserProfile.test.tsx`):
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('renders user name and email', () => {
    render(
      <UserProfile
        name="John Doe"
        email="john@example.com"
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(
      <UserProfile
        name="Jane Doe"
        email="jane@example.com"
        avatar="/avatar.jpg"
      />
    );

    const avatar = screen.getByAltText("Jane Doe's avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/avatar.jpg');
  });
});
```

### 8.2 References

- Existing component pattern: `src/components/Card/Card.tsx`
- Existing test pattern: `src/components/Card/Card.test.tsx`
- Issue #6 specification (doc-writer agent) for pattern reference
- Git Flow manager agent for agent definition patterns

### 8.3 Related Issues

- Issue #7: This specification

### 8.4 Glossary

- **Scaffold**: Generate boilerplate code structure automatically
- **Convention Detection**: Analyzing codebase to infer patterns and standards
- **Barrel Export**: index.ts file that re-exports all modules in a folder
- **Template Engine**: System for generating files from templates with variable substitution
- **Zero-Config**: Works without requiring configuration files

---

**Specification Version**: 1.0
**Last Updated**: 2026-01-07
**Status**: Ready for Implementation
**Complexity**: 4/5 (Medium-High)
**Estimated Implementation Time**: Multi-phase approach recommended
