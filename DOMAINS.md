# Domain Configuration Examples

This guide provides examples for configuring your CV with custom domains on Hostinger VPS with Traefik.

## Quick Setup

### Single Domain

```bash
# Set this as HOSTINGER_TRAEFIK_LABELS secret in GitHub
export HOSTINGER_TRAEFIK_LABELS='traefik.enable=true,traefik.http.routers.cv.rule=Host(`cv.yourdomain.com`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt'
```

### Multiple Domains

```bash
export HOSTINGER_TRAEFIK_LABELS='traefik.enable=true,traefik.http.routers.cv.rule=Host(`cv.yourdomain.com`,`yourdomain.com`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt'
```

### With WWW Redirect

```bash
export HOSTINGER_TRAEFIK_LABELS='traefik.enable=true,traefik.http.routers.cv.rule=Host(`cv.yourdomain.com`,`www.yourdomain.com`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt,traefik.http.middlewares.redirect-www.redirectregex.regex=^https?://(www\.)?(.+),traefik.http.middlewares.redirect-www.redirectregex.replacement=https://$$2,traefik.http.routers.cv.middlewares=redirect-www@docker'
```

---

## Complete Traefik Examples

### 1. Basic HTTPS with Let's Encrypt

```yaml
# docker run command
--label "traefik.enable=true" \
--label "traefik.http.routers.cv.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv.entrypoints=https" \
--label "traefik.http.routers.cv.tls=true" \
--label "traefik.http.routers.cv.tls.certresolver=letsencrypt"
```

### 2. Multiple Entry Points (HTTP + HTTPS)

```yaml
--label "traefik.enable=true" \
--label "traefik.http.routers.cv-http.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv-http.entrypoints=web" \
--label "traefik.http.routers.cv-http.middlewares=redirect-to-https@docker" \
--label "traefik.http.routers.cv-https.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv-https.entrypoints=https" \
--label "traefik.http.routers.cv-https.tls=true" \
--label "traefik.http.routers.cv-https.tls.certresolver=letsencrypt" \
--label "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"
```

### 3. With Basic Authentication

First, create an auth file on your VPS:

```bash
# On your VPS
htpasswd -c /path/to/authfile username
```

Then use in Traefik labels:

```yaml
--label "traefik.enable=true" \
--label "traefik.http.routers.cv.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv.entrypoints=https" \
--label "traefik.http.routers.cv.tls=true" \
--label "traefik.http.routers.cv.middlewares=auth@docker" \
--label "traefik.http.middlewares.auth.basicauth.usersfile=/path/to/authfile"
```

### 4. With Rate Limiting

```yaml
--label "traefik.enable=true" \
--label "traefik.http.routers.cv.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv.entrypoints=https" \
--label "traefik.http.routers.cv.tls=true" \
--label "traefik.http.routers.cv.middlewares=rate-limit@docker" \
--label "traefik.http.middlewares.rate-limit.ratelimit.average=100" \
--label "traefik.http.middlewares.rate-limit.ratelimit.burst=50"
```

### 5. With Custom Headers (CSP, Security)

```yaml
--label "traefik.enable=true" \
--label "traefik.http.routers.cv.rule=Host(\`cv.yourdomain.com\`)" \
--label "traefik.http.routers.cv.entrypoints=https" \
--label "traefik.http.routers.cv.tls=true" \
--label "traefik.http.routers.cv.middlewares=security-headers@docker" \
--label "traefik.http.middlewares.security-headers.headers.customrequestheaders.X-Robots-Tag=v\"noindex, nofollow\"" \
--label "traefik.http.middlewares.security-headers.headers.contentsecuritypolicy=default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'" \
--label "traefik.http.middlewares.security-headers.headers.xframeoptions=DENY" \
--label "traefik.http.middlewares.security-headers.headers.xxssprotection=1; mode=block" \
--label "traefik.http.middlewares.security-headers.headers.xcontenttypeoptions=nosniff"
```

---

## GitHub Actions Secrets Configuration

### For cv.yourdomain.com

| Secret | Value |
|--------|-------|
| `HOSTINGER_TRAEFIK_LABELS` | `traefik.enable=true,traefik.http.routers.cv.rule=Host(\`cv.yourdomain.com\`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt` |

### For yourdomain.com with WWW redirect

| Secret | Value |
|--------|-------|
| `HOSTINGER_TRAEFIK_LABELS` | `traefik.enable=true,traefik.http.routers.cv.rule=Host(\`yourdomain.com\`,\`www.yourdomain.com\`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt,traefik.http.middlewares.redirect-www.redirectregex.regex=^https?://(www\.)?(.+),traefik.http.middlewares.redirect-www.redirectregex.replacement=https://$$2,traefik.http.routers.cv.middlewares=redirect-www@docker` |

### For yourdomain.com with alias

| Secret | Value |
|--------|-------|
| `HOSTINGER_TRAEFIK_LABELS` | `traefik.enable=true,traefik.http.routers.cv.rule=Host(\`yourdomain.com\`,\`cv.yourdomain.com\`,\`dominikbalint.com\`),traefik.http.routers.cv.entrypoints=https,traefik.http.routers.cv.tls=true,traefik.http.routers.cv.tls.certresolver=letsencrypt` |

---

## Traefik Configuration File

Create `/path/to/traefik.yml` on your VPS:

```yaml
# traefik.yml
api:
  insecure: false  # Enable only if you need the dashboard
  dashboard: true

log:
  level: INFO

accessLog:
  filePath: /var/log/traefik/access.log

entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  websecure:
    address: ":443"

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: traefik_network
    watch: true

certificatesResolvers:
  letsencrypt:
    acme:
      email: your@email.com
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web
      # Or use DNS challenge for wildcard certificates
      # dnsChallenge:
      #   provider: cloudflare
      #   delayBeforeCheck: 0
```

---

## DNS Configuration

### Cloudflare

1. Create A record:
   - Type: A
   - Name: cv (or @ for root domain)
   - Content: Your VPS IP
   - TTL: Auto

2. For HTTPS to work, ensure:
   - DNS is properly propagated
   - Port 80 and 443 are open on your VPS

### Namecheap / GoDaddy / Others

Similar to Cloudflare - create A records pointing to your VPS IP.

---

## Testing Configuration

### Check Traefik Dashboard

If you enabled the dashboard, access it at:
```
http://your-vps-ip:8080
```

### Check Container Logs

```bash
# On your VPS
docker logs curriculum-vitae
```

### Test Health Check

```bash
# From anywhere
curl https://cv.yourdomain.com/health
# Should return: healthy
```

---

## Common Issues

### 1. SSL Certificate Not Issuing

**Problem:** Traefik can't get SSL certificate

**Solutions:**
- Check DNS propagation with `dig cv.yourdomain.com`
- Ensure port 80 is open and reachable
- Check Traefik logs: `docker logs traefik`
- Verify email in Let's Encrypt config is valid

### 2. Container Not Starting

**Problem:** Container exits immediately

**Solutions:**
- Check logs: `docker logs curriculum-vitae`
- Test locally first with `docker-compose up`
- Verify Nginx config: `nginx -t`

### 3. 502 Bad Gateway

**Problem:** Traefik returns 502

**Solutions:**
- Check container is running: `docker ps`
- Verify container is on the correct network: `docker inspect curriculum-vitae | grep Network`
- Check Traefik can reach your container: `docker exec traefik curl http://curriculum-vitae:80`

### 4. Mixed Content Warnings

**Problem:** HTTPS works but browser shows warnings

**Solutions:**
- Ensure your app uses relative URLs (//) or protocol-relative
- All external resources (fonts, images) must be HTTPS
- In your CV, ensure no hardcoded `http://` URLs

---

## Advanced Configuration

### Path-Based Routing

If you want to serve CV at `/cv` path:

```yaml
--label "traefik.http.routers.cv.rule=Host(\`yourdomain.com\`) && PathPrefix(\`/cv\`)" \
--label "traefik.http.routers.cv.middlewares=strip-cv-prefix@docker" \
--label "traefik.http.middlewares.strip-cv-prefix.stripprefix.prefixes=/cv"
```

Then update your Vite config base:
```json
// vite.config.ts
base: '/cv/'
```

### Multiple Applications on Same Domain

```yaml
# For CV
--label "traefik.http.routers.cv.rule=Host(\`yourdomain.com\`) && PathPrefix(\`/cv\`)" \
--label "traefik.http.routers.cv.middlewares=strip-cv-prefix@docker" \
--label "traefik.http.middlewares.strip-cv-prefix.stripprefix.prefixes=/cv"

# For Blog (example)
--label "traefik.http.routers.blog.rule=Host(\`yourdomain.com\`) && PathPrefix(\`/blog\`)" \
--label "traefik.http.routers.blog.middlewares=strip-blog-prefix@docker" \
--label "traefik.http.middlewares.strip-blog-prefix.stripprefix.prefixes=/blog"
```

---

## Let's Encrypt Rate Limits

Be aware of Let's Encrypt rate limits:
- **50 certificates per domain per week**
- **5 certificates per domain per hour**
- **300 certificates per account per week**

If you hit these limits:
- Use DNS challenge instead of HTTP challenge
- Or wait for the limit to reset

---

## Wildcard Certificates

For `*.yourdomain.com`:

1. Use DNS challenge in Traefik:

```yaml
certificatesResolvers:
  letsencrypt:
    acme:
      email: your@email.com
      storage: /letsencrypt/acme.json
      dnsChallenge:
        provider: cloudflare
        delayBeforeCheck: 0
```

2. Set environment variable for Cloudflare API:
```bash
CF_API_EMAIL=your@email.com
CF_API_KEY=your-cloudflare-api-key
```

3. Update labels:
```yaml
--label "traefik.http.routers.cv.tls.certresolver=letsencrypt" \
--label "traefik.http.routers.cv.tls.domains[0].main=yourdomain.com" \
--label "traefik.http.routers.cv.tls.domains[0].sans=*.yourdomain.com"
```

---

## Questions?

If you encounter any issues with domain configuration:
1. Check Traefik logs: `docker logs traefik`
2. Verify DNS records are correct
3. Ensure your VPS firewall allows traffic on ports 80 and 443
4. Test with curl: `curl -v https://yourdomain.com`
