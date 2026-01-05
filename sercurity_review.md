## Security Review: PR for `prevent-direct-push.py`

### Critical Issue: **Bypass via Commit Message Manipulation**

**Severity: HIGH**

The new logic at lines 36-44 introduces a significant security bypass:

```python
is_release_workflow = "release" in last_commit_msg or "hotfix" in last_commit_msg
```

**Problem:** Any developer can bypass the protected branch restriction by simply including the word "release" or "hotfix" anywhere in their commit message.

**Example exploit:**
```bash
git commit -m "fix: updated config - not a release but bypasses check"
git push origin main  # Hook allows this!
```

Even an innocuous message like "fixed release notes typo" would bypass the protection.

### Additional Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| **Tag-based bypass** | Medium | Line 33: `--tags` in command allows any push. An attacker could run `git push --tags origin main` to push to main. |
| **Substring matching** | Medium | Using `in` for string matching is fragile. `"release"` matches "prereleased", "unreleased", etc. |
| **Silent failure** | Low | Lines 43-44: If `git log` fails, `is_release_workflow = False` is a safe default, but the bare `except:` hides errors. |

### Recommendations

1. **Use a more specific commit message pattern** - Check for conventional commit format or require a specific prefix:
   ```python
   import re
   is_release_workflow = bool(re.match(r'^Merge (release|hotfix)/', last_commit_msg))
   ```

2. **Check branch origin, not just commit message** - Verify that the push is coming from an actual release/hotfix branch being merged:
   ```python
   # Check if current branch is main/develop AND we're merging from release/hotfix
   merge_source = subprocess.check_output(["git", "log", "-1", "--pretty=%P"]).strip()
   # Verify the merge parent came from a release/* or hotfix/* branch
   ```

3. **Don't allow `--tags` as a blanket bypass** - Be more specific:
   ```python
   # Only allow pure tag pushes, not combined with branch pushes
   is_only_tags = push_cmd.strip() == "git push --tags" or push_cmd.strip() == "git push origin --tags"
   ```

4. **Use specific exception handling**:
   ```python
   except subprocess.CalledProcessError:
       is_release_workflow = False
   ```

### Verdict

**This PR weakens the security of the protected branch hook.** The intent (allowing release workflow pushes) is valid, but the implementation creates an easily exploitable bypass. I recommend revising the detection logic before merging.
