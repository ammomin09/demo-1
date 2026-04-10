# Deployment Guide

## Deployment Options

This application can be deployed to various platforms. Here are the most common options:

---

## Option 1: Heroku (Easiest for Beginners)

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed
- Git installed

### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create Heroku App**
```bash
heroku create your-app-name
```

3. **Add MongoDB Atlas**
```bash
# Create free MongoDB database at https://www.mongodb.com/cloud/atlas
# Copy connection string and set environment variable:
heroku config:set MONGODB_URI="your-mongodb-connection-string"
```

4. **Create Procfile**
```
web: npm run serve
```

5. **Update package.json scripts**
```json
{
  "scripts": {
    "serve": "node server/server.js",
    "build": "vite build",
    "postbuild": "echo 'Build complete'"
  }
}
```

6. **Deploy**
```bash
git push heroku main
```

7. **View Live App**
```bash
heroku open
```

---

## Option 2: Vercel + Render

### Frontend on Vercel

1. **Push code to GitHub**
```bash
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

2. **Import on Vercel**
- Go to https://vercel.com
- Click "New Project"
- Import from GitHub
- Set environment variables
- Deploy

### Backend on Render

1. **Push to GitHub** (same repo)

2. **Deploy on Render**
- Go to https://render.com
- Create new Web Service
- Connect to GitHub
- Build command: `npm install`
- Start command: `npm run serve`
- Add environment variables
- Deploy

3. **Update Frontend API URL**
```javascript
// Update in src/utils/api.js
const API_URL = process.env.VITE_API_URL || 'https://your-backend.render.com/api'
```

---

## Option 3: DigitalOcean (Full Control)

### Prerequisites
- DigitalOcean account
- SSH access to server
- Domain name (optional)

### Steps

1. **Create Droplet**
- Choose Ubuntu 22.04
- 1GB RAM minimum
- 25GB SSD

2. **SSH into Server**
```bash
ssh root@your_server_ip
```

3. **Install Dependencies**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb
sudo apt-get install -y nginx
sudo apt-get install -y git
```

4. **Clone Repository**
```bash
cd /var
sudo mkdir www
cd www
sudo git clone https://github.com/username/repo.git app
sudo chown -R $USER:$USER app
cd app
npm install
```

5. **Build Frontend**
```bash
npm run build
```

6. **Configure Nginx** (as reverse proxy)
```nginx
# /etc/nginx/sites-available/default

server {
    listen 80;
    server_name your-domain.com;

    # Frontend static files
    location / {
        root /var/www/app/dist;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Enable Nginx**
```bash
sudo systemctl restart nginx
```

8. **Install PM2** (process manager)
```bash
sudo npm install -g pm2
pm2 start server/server.js --name "app"
pm2 startup
pm2 save
```

9. **Setup SSL** (Let's Encrypt)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Option 4: AWS (EC2 + RDS)

### Prerequisites
- AWS account
- AWS CLI configured

### Steps

1. **Launch EC2 Instance**
- Ubuntu 22.04 AMI
- t2.micro (free tier)
- Security group: Allow 80, 443, 22

2. **Connect & Setup**
```bash
ssh -i key.pem ubuntu@ec2-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

# Install npm packages
cd app
npm install && npm run build
```

3. **Create RDS Database**
- Engine: MongoDB (via Atlas preferred)
- Get connection string
- Set in environment variables

4. **Deploy & Monitor**
- Use PM2 or systemd
- Configure CloudFront CDN
- Setup CloudWatch monitoring

---

## Option 5: Docker + Any Cloud

### Create Dockerfile

```dockerfile
# Frontend build
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Backend runtime
FROM node:18-alpine
WORKDIR /app
COPY server ./server
COPY package.json .
RUN npm install --production
COPY --from=frontend-builder /app/dist ./public

EXPOSE 5000
CMD ["node", "server/server.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: ${MONGODB_URI}
      NODE_ENV: production
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Deploy
```bash
docker-compose up
```

---

## Production Checklist

### Code
- [ ] Remove console.log statements
- [ ] Set NODE_ENV=production
- [ ] Update API URLs for production
- [ ] Review error messages
- [ ] Test all features

### Security
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS headers
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Implement authentication
- [ ] Use environment variables for secrets
- [ ] Update MongoDB connection string
- [ ] Enable database backups

### Performance
- [ ] Build and bundle frontend
- [ ] Minify CSS/JavaScript
- [ ] Set up CDN for static files
- [ ] Configure caching headers
- [ ] Enable gzip compression
- [ ] Optimize database queries

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (Winston, Morgan)
- [ ] Set up uptime monitoring
- [ ] Configure alerts
- [ ] Track application metrics

### Backup & Recovery
- [ ] Daily database backups
- [ ] Test restore procedures
- [ ] Document disaster recovery
- [ ] Version control everything

---

## Environment Variables for Production

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/production

# URLs
API_URL=https://api.yourdomain.com
CLIENT_URL=https://yourdomain.com

# Security
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret
```

---

## Performance Optimization

### Frontend
```javascript
// Enable code splitting
import { lazy, Suspense } from 'react'

const UserForm = lazy(() => import('./components/UserForm'))
const UserList = lazy(() => import('./components/UserList'))

// Use in component
<Suspense fallback={<div>Loading...</div>}>
  <UserForm />
</Suspense>
```

### Backend
```javascript
// Enable gzip compression
import compression from 'compression'
app.use(compression())

// Enable caching
app.set('view cache', true)

// Database indexes
// In models/User.js
userSchema.index({ email: 1 })
userSchema.index({ createdAt: -1 })
```

---

## Monitoring & Logging

### Use Winston for Logging
```bash
npm install winston
```

```javascript
// server/config/logger.js
import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### Server Monitoring
- Use PM2 Plus for monitoring
- Set up UptimeRobot for uptime monitoring
- Use DataDog or New Relic for APM

---

## Scaling Strategy

### Phase 1 (Initial Launch)
- Single server (t2.micro or similar)
- Single MongoDB instance
- CDN for static files

### Phase 2 (Growing Traffic)
- Load balancer (nginx or AWS ELB)
- Multiple application servers
- Database replication
- Redis caching

### Phase 3 (Enterprise)
- Kubernetes orchestration
- Distributed database
- Microservices architecture
- Global CDN

---

## Troubleshooting Deployment

### Application Won't Start
1. Check environment variables
2. Check MongoDB connection
3. Check port availability
4. Check log files

### High Memory Usage
1. Enable compression middleware
2. Implement caching
3. Paginate large datasets
4. Use connection pooling

### Slow Response Times
1. Check database queries
2. Enable caching
3. Use CDN
4. Optimize images
5. Check network latency

### Database Issues
1. Check connection string
2. Verify credentials
3. Check whitelist/firewall
4. Monitor disk space
5. Review slow queries

---

## Cost Optimization

### Free Options
- Vercel (frontend)
- Render (backend)
- MongoDB Atlas free tier
- Let's Encrypt (SSL)

### Paid Options (Budget)
- DigitalOcean: ~$5/month
- Heroku: ~$50+/month
- AWS Free tier then pay as you go

### Tips to Reduce Costs
- Use free tiers
- Optimize database queries
- Use serverless where possible
- Implement caching
- Clean up old data

---

## Domain & SSL

### Custom Domain
1. Register domain (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to your hosting
3. Configure in host provider

### SSL Certificate
1. Use Let's Encrypt (free)
2. Auto-renew with certbot
3. HTTPS is now required

---

## Post-Deployment

1. Test all features in production
2. Monitor error logs
3. Check performance metrics
4. Gather user feedback
5. Plan for scaling
6. Security audit
7. Backup verification
8. Monitoring setup

---

## Support

For deployment issues:
- Check hosting provider documentation
- Review application logs
- Check database logs
- Use monitoring tools
- Ask in community forums

---

Good luck with your deployment! 🚀
