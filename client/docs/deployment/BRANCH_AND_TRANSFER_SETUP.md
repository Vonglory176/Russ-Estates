# Branch Setup and Transfer Control

## Branch Setup
**Yes, you need 3 branches:**
- `develop` - for integration testing
- `staging` - for your team's content editing
- `main` - for production

## Environment Assignment
- `staging` branch → Staging Strapi Cloud (your team edits here)
- `main` branch → Production Strapi Cloud (live website)

## Transfer Control
**You control ALL transfers.** Your team cannot push from staging to production on their own. Here's why:

1. **Strapi Cloud doesn't have built-in transfer between instances**
2. **Transfer tokens are command-line only** (you run them)
3. **This is intentional** - you want control over what goes live

## Your Team's Workflow
1. They edit content in staging Strapi Cloud
2. They preview changes using any feature branch deployment
3. They tell you when content is ready
4. **You run the transfer command** to push to production

## Your Workflow
```bash
# When team says content is ready:
npm run transfer:to-production

# When you want to sync staging with latest production:
npm run transfer:from-production
npm run transfer:to-staging
```

## Why This Works
- **Team gets safe editing** in staging
- **You maintain control** over production
- **No accidental live changes**
- **Easy rollbacks** if needed

**Bottom line:** Your team edits in staging, you control when it goes live. This is the safest approach for a real estate website where content accuracy matters. 