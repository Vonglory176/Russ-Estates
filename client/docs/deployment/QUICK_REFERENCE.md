# Quick Reference Card

## 🚀 Daily Commands

### Development Workflow
```bash
# Start new feature
git checkout main && git pull
git checkout -b feature/your-feature
# Make changes, then:
git push origin feature/your-feature

# Deploy to production
git checkout main
git merge feature/your-feature
git push origin main
```

### Data Transfers
```bash
# Push local changes to staging
npm run transfer:to-staging

# Pull staging data to local
npm run transfer:from-staging

# Deploy content to production
npm run transfer:to-production

# Backup production data
npm run transfer:from-production
```

## 🌍 Environment URLs

| Environment | Strapi URL | Vercel Environment |
|-------------|------------|-------------------|
| **Local** | `http://localhost:1337` | N/A |
| **Staging** | `https://your-project-staging.strapi.cloud` | Preview |
| **Production** | `https://your-project-production.strapi.cloud` | Production |

## 📋 Branch Strategy

| Branch | Purpose | Environment |
|--------|---------|-------------|
| `main` | Live website | Production |
| `develop` | Integration testing | Staging |
| `feature/*` | Feature development | Staging |

## 🛡️ Safety Checklist

Before pushing to production:
- [ ] Tested in staging
- [ ] Content team approved changes
- [ ] Backup production data
- [ ] All features working correctly

## 🚨 Common Issues

**Wrong environment showing?**
- Check Vercel environment variables
- Verify branch name (main = production)

**Transfer failed?**
- Check transfer tokens
- Verify Strapi Cloud URLs

**Content not updating?**
- Check you're editing the right Strapi instance
- Verify transfer completed successfully 