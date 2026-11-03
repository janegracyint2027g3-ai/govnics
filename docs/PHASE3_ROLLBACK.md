# GOVENICS Phase 3: Rollback Procedures & Contingency Plan

## 1. Quick Reversion (Zero Data Loss)

If any critical issue arises in production following Phase 3 deployment, follow these staged rollback procedures.

### Fast Rollback via Vercel Dashboard (Instant)
1. Go to **Vercel Dashboard** -> Project `govnics` -> **Deployments**.
2. Locate the previous stable Phase 2 deployment.
3. Click the three dots (`...`) -> **Promote to Production** (or **Rollback**).
4. The site will immediately revert traffic to the Phase 2 build within seconds.

---

## 2. Source Code Rollback Steps

A timestamped snapshot of Phase 2 was preserved before Phase 3 modifications at:
`_phase2_backup_20261103_143034/`

To revert the codebase manually:

### Step 1: Revert Client-Facing Routes
To hide the AI Knowledge Hub tab while keeping all underlying code intact:
Edit `src/pages/SgrceLibraryPage.tsx` and toggle off the `"ai-knowledge-hub"` tab entry or default to `"browse"`.

### Step 2: Full Git Rollback
```bash
# View recent commits
git log --oneline -n 5

# Revert Phase 3 merge or commit
git revert HEAD --no-edit

# Push reverted state
git push origin main
```

---

## 3. Redis Data Namespace Cleanup (If Required)

Phase 3 is completely isolated inside dedicated Redis key namespaces (`govenics:kn:*`). Phase 2 statutory data (`govenics:krm:*`, `govenics:statutory:*`) remains untouched.

If you ever need to purge Phase 3 Redis keys without affecting Phase 1 or Phase 2 data:

```bash
# Redis CLI / Upstash Console Data Browser:
# Delete only keys matching the Phase 3 pattern:
KEYS govenics:kn:*

# Example keys to clear if needed:
DEL govenics:kn:index
DEL govenics:kn:chunks
DEL govenics:kn:stats
DEL govenics:kn:audit
```

---

## 4. Verification After Rollback
1. Access `https://govenics.com/sgrc/e-library`.
2. Confirm the 3 domain tabs (Labour & Employment, Environmental & EHS, Financial & Corporate) render correctly.
3. Confirm Phase 2 KRM Document Management and statutory table function normally.

