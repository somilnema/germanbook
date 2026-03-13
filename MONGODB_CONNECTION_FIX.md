# MongoDB Connection Error Fix (Local Development)

## Error
```
querySrv ECONNREFUSED _mongodb._tcp.cluster0.gjn5j3r.mongodb.net
```

## What This Means
Your local machine cannot connect to MongoDB Atlas because your IP address is not whitelisted.

## Quick Fix (Recommended for Development)

### Option 1: Whitelist All IPs (Development Only)

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Select your project/cluster
3. Click **"Network Access"** in the left sidebar
4. Click **"Add IP Address"**
5. Click **"Allow Access From Anywhere"**
   - Or enter: `0.0.0.0/0`
6. Click **"Confirm"**
7. Wait 1-2 minutes for changes to propagate
8. Restart your dev server

⚠️ **Security Note:** For production, whitelist only specific IPs.

### Option 2: Whitelist Your Current IP

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Click **"Add Current IP Address"**
5. Click **"Confirm"**
6. Restart your dev server

**Note:** Your IP may change if you're on a dynamic network.

### Option 3: Use Local MongoDB (Advanced)

If you don't want to use MongoDB Atlas for development:

1. Install MongoDB locally
2. Update `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/applysolo
   ```
3. Start local MongoDB: `mongod`
4. Restart dev server

## Verify Connection

After whitelisting, test the connection:

```bash
npm run dev
```

Try submitting a form. You should see in the console:
```
✅ MongoDB connected successfully
```

## Common Issues

### Still Getting Error After Whitelisting?

1. **Wait a few minutes** - Changes take time to propagate
2. **Check cluster status** - Ensure cluster isn't paused
3. **Verify credentials** - Check MONGODB_URI in `.env`
4. **Clear cache** - Restart your terminal and dev server

### VPN/Proxy Issues

If you're using a VPN or proxy:
- Your actual IP might be different
- Try disabling VPN temporarily
- Or whitelist the VPN's IP range

## Production Deployment

For Vercel/production deployment:
- The error won't occur (Vercel IPs work with Atlas)
- Just ensure `MONGODB_URI` is set in Vercel environment variables

## Quick Commands

```bash
# Stop all Node processes
Stop-Process -Name node -Force

# Start dev server
cd "C:\Users\ASUS\Downloads\apply-solo\apply-solo"
npm run dev
```
