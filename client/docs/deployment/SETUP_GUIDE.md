# Simple Setup Guide: Strapi + Next.js with Staging & Production

This guide will help you set up a safe environment where your team can edit content without affecting your live website.

## 🎯 What You'll Have When Done

- **Local Development**: You work on code locally
- **Staging Environment**: Your team edits content safely
- **Production Environment**: Your live website
- **Safe Workflow**: Changes go through staging before going live

## 📋 Step-by-Step Setup

### Step 1: Create Your Strapi Cloud Instances

1. **Go to Strapi Cloud** and create two instances:

   **Production Instance:**
   - Name: `your-project-production`
   - URL: `https://your-project-production.strapi.cloud`

   **Staging Instance:**
   - Name: `your-project-staging` 
   - URL: `https://your-project-staging.strapi.cloud`

### Step 2: Set Up Transfer Tokens

**In Production Strapi Cloud:**
1. Go to Settings → Global Settings → Transfer Tokens
2. Create token named `production-push` (Write permissions)
3. Create token named `production-pull` (Read permissions)
4. Copy and save both tokens

**In Staging Strapi Cloud:**
1. Go to Settings → Global Settings → Transfer Tokens
2. Create token named `staging-push` (Write permissions)
3. Create token named `staging-pull` (Read permissions)
4. Copy and save both tokens

### Step 3: Configure Your Local Development

**Create `.env.local` in your `client` folder:**
```env
STRAPI_API_URL=http://localhost:1337
HUBSPOT_API_KEY=your_api_key_here
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_FORM_ID=your_form_id_here
NODE_ENV=development
```

**Add these scripts to your `server/package.json`:**
```json
{
  "scripts": {
    "transfer:to-staging": "strapi transfer --to https://your-project-staging.strapi.cloud --token YOUR_STAGING_PUSH_TOKEN",
    "transfer:from-staging": "strapi transfer --from https://your-project-staging.strapi.cloud --token YOUR_STAGING_PULL_TOKEN",
    "transfer:to-production": "strapi transfer --to https://your-project-production.strapi.cloud --token YOUR_PRODUCTION_PUSH_TOKEN",
    "transfer:from-production": "strapi transfer --from https://your-project-production.strapi.cloud --token YOUR_PRODUCTION_PULL_TOKEN"
  }
}
```

*Replace the placeholder URLs and tokens with your actual values.*

### Step 4: Configure Vercel Environments

**Go to Vercel Dashboard → Your Project → Settings → Environment Variables**

**Production Environment:**
- Environment: Production
- Branch: `main`
- Variables:
  ```
  STRAPI_API_URL=https://your-project-production.strapi.cloud
  HUBSPOT_API_KEY=your_api_key_here
  HUBSPOT_PORTAL_ID=your_portal_id_here
  HUBSPOT_FORM_ID=your_form_id_here
  NODE_ENV=production
  ```

**Preview Environment:**
- Environment: Preview
- Branch: `staging`
- Variables:
  ```
  STRAPI_API_URL=https://your-project-staging.strapi.cloud
  HUBSPOT_API_KEY=your_api_key_here
  HUBSPOT_PORTAL_ID=your_portal_id_here
  HUBSPOT_FORM_ID=your_form_id_here
  NODE_ENV=staging
  ```

### Step 5: Set Up Your Git Branches

**Create a develop branch:**
```bash
git checkout main
git checkout -b develop
git push origin develop
```

## 🔄 How to Use It

### For Development (You)

1. **Start a new feature:**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature
   # Make your changes
   git push origin feature/new-feature
   ```

2. **Test your changes:**
   - Vercel creates a preview deployment
   - It uses staging Strapi data
   - Share the preview URL with your team

3. **Deploy to production:**
   ```bash
   git checkout main
   git merge feature/new-feature
   git push origin main
   ```

### For Content Editing (Your Team)

1. **Edit content in staging:**
   - Go to your staging Strapi Cloud
   - Make changes to content
   - Preview changes using any feature branch deployment

2. **Deploy content to production:**
   ```bash
   npm run transfer:to-production
   ```

### For Data Synchronization

**Push local changes to staging:**
```bash
npm run transfer:to-staging
```

**Pull staging data to local:**
```bash
npm run transfer:from-staging
```

**Backup production data:**
```bash
npm run transfer:from-production
```

## 🌍 Environment Summary

| Environment | Strapi Instance | Vercel Environment | Purpose |
|-------------|-----------------|-------------------|---------|
| **Local** | `localhost:1337` | N/A | Development |
| **Staging** | Staging Cloud | Preview | Team editing & testing |
| **Production** | Production Cloud | Production | Live website |

## 🛡️ Safety Rules

1. **Never edit production directly** - Always go through staging
2. **Test everything in staging** before going to production
3. **Backup production** before making changes
4. **Use feature branches** for development
5. **Only merge to main** when ready for production

## 🚨 Troubleshooting

**Transfer fails?**
- Check your tokens are correct
- Make sure Strapi Cloud instances are running
- Verify URLs are correct

**Wrong environment?**
- Check Vercel environment variables
- Verify branch names (main = production, others = staging)
- Redeploy after changing environment variables

**Content not updating?**
- Make sure you're editing the right Strapi instance
- Check that transfers completed successfully
- Verify environment variables are correct

## ✅ You're Done!

Now you have:
- ✅ Safe content editing for your team
- ✅ Controlled deployments to production
- ✅ Easy rollbacks if something goes wrong
- ✅ Parallel development without conflicts

Your team can edit content in staging without affecting your live website, and you control when changes go to production! 