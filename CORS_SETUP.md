# CORS Configuration for Backend

## Problem

When deploying to Vercel, you're getting CORS errors:
```
Access to fetch at 'https://litebox-challenge-webservice.onrender.com/posts/related' 
from origin 'https://lite-tech-challenge-kappa.vercel.app' 
has been blocked by CORS policy
```

## Solution

You need to configure CORS in your NestJS backend to allow requests from your Vercel domain.

### Update Backend CORS Configuration

In your NestJS backend (`src/main.ts`), update the CORS configuration:

```typescript
app.enableCors({
  origin: [
    'https://lite-tech-challenge-kappa.vercel.app', // Add your Vercel domain
    // Add any other domains you need
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Using Environment Variables (Recommended)

Better approach: Use environment variables:

```typescript
const allowedOrigins = [
  process.env.FRONTEND_URL, // Set this in your Render environment variables
].filter(Boolean);

app.enableCors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Set Environment Variable in Render

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add:
   - Key: `FRONTEND_URL`
   - Value: `https://lite-tech-challenge-kappa.vercel.app`

### Verify API URL Configuration

Make sure your Vercel environment variable is set correctly:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Update:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://litebox-challenge-webservice.onrender.com/api`
   - **Important**: Must include `/api` at the end

### Test CORS

After updating CORS, test with:

```bash
curl -H "Origin: https://lite-tech-challenge-kappa.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://litebox-challenge-webservice.onrender.com/api/posts/related \
     -v
```

You should see `Access-Control-Allow-Origin` header in the response.

## Current Issues

1. **404 Error**: The URL might be missing `/api` - Fixed in code to auto-append `/api`
2. **CORS Error**: Backend needs to allow Vercel domain - Requires backend configuration

