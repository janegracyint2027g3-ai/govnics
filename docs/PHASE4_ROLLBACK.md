# GOVENICS Phase 4: Rollback & Recovery Procedures

## 1. Instant Vercel Reversion

If runtime anomalies are observed in production post-deployment:
1. Open **Vercel Dashboard** -> Project `govnics` -> **Deployments**.
2. Select the last stable Phase 3 deployment.
3. Click **Promote to Production** (or **Instant Rollback**).
4. Edge routing will revert to the Phase 3 build within 5 seconds.

---

## 2. Git Level Reversion

```bash
# View recent commits
git log --oneline -n 5

# Revert Phase 4 commit
git revert HEAD --no-edit

# Deploy reverted state
git push origin main
```

---

## 3. Data Isolation Verification

Phase 4 utilizes additive endpoints and isolated services. The Phase 3 Knowledge Hub (`govenics:kn:*`) and Phase 2 statutory databases (`govenics:krm:*`, `govenics:statutory:*`) remain untouched, ensuring zero data loss upon rollback.

