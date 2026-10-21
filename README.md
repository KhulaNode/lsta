# Limpopo Scholar Transport Alliance website

Next.js App Router website for LSTA. The pages, images and news live in the repository, so redeployments are repeatable after they are committed. No database or external CMS is required.

## Current status

The website is built as a launch candidate. The provisional public hostname is `https://lsta.khulanode.com`. Deployment has not been performed from this repository because Dokploy application access and final content approval have not been supplied. These items need client input before public launch:

- Confirm the supplied logo crop and brand colours in the header, footer and favicon.
- Approve all organisation descriptions, membership wording and contact details.
- Replace the three clearly labelled demonstration news articles with approved announcements.
- Supply verified Facebook and TikTok profile URLs if social links are wanted. Unverified links are omitted.
- Configure SMTP delivery after the setup fee is paid. Until SMTP is configured, the form is hidden and the phone, email and WhatsApp links remain available. The API also fails safely if a submission is attempted directly.
- Confirm any safety or regulatory copy against current authoritative sources before publication.

The three photographs in `public/images` were generated for this project on 21 October 2026. They are illustrative scenes, not documentary photos of LSTA vehicles, members or learners. They should be reviewed by the client and replaced with approved photography if authenticity is required.

The client supplied `public/images/Limpopo Scholar Transport Alliance Logo.png`. `public/images/lsta-logo-mark.png` and `src/app/icon.png` are cropped derivatives of its emblem for small display sizes. The bronze colour token was sampled from the supplied artwork.

## Local development

Requires Node.js 22 or newer. Copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, and optionally configure SMTP. Then run:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Validation commands:

```bash
npm run lint
npm run typecheck
npm run build
```

The contact form sends to `CONTACT_TO_EMAIL` through the configured SMTP server. For a local delivery test, point the SMTP settings at a local mail catcher; no SMTP service is bundled.

## News editing

News lives in `src/content/news/*.md`. Copy an existing file, change its filename and `slug` to the same lowercase hyphenated value, then update these frontmatter fields: `title`, `date` (`YYYY-MM-DD`), `category`, `image`, `imageAlt`, `summary`, and `demo`. Write the article below the second `---` line in Markdown. Put its image under `public/images` and use a path such as `/images/my-update.jpg`. Set `demo: false` only for client-approved material. Commit and redeploy. The news list, article routes and sitemap are generated from these files at build time. This is file editing through the repository, not a browser CMS; a visual CMS can be added later around the same article fields.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public origin for canonical URLs, sitemap and Open Graph metadata. Set at build time. |
| `SMTP_HOST` | For contact form | SMTP server hostname. |
| `SMTP_PORT` | For contact form | SMTP port, usually 587 or 465. |
| `SMTP_SECURE` | For contact form | `true` for implicit TLS, commonly port 465; otherwise `false`. |
| `SMTP_USER` | If SMTP needs auth | Username; pair with `SMTP_PASSWORD`. |
| `SMTP_PASSWORD` | If SMTP needs auth | Password or app password. |
| `SMTP_FROM` | For contact form | Sender address permitted by the SMTP server. |
| `CONTACT_TO_EMAIL` | For contact form | Delivery mailbox; intended value is `info@limpoposcholartransportalliance.co.za`. |

The client bundle only receives `NEXT_PUBLIC_SITE_URL`. SMTP settings remain on the server. Runtime changes to `NEXT_PUBLIC_SITE_URL` require a rebuild because Next.js embeds public variables during build.

## Docker

The repository includes two Compose files:

- `docker-compose.yml` runs locally and publishes only `127.0.0.1:3000`.
- `docker-compose.dokploy.yml` joins the existing external `dokploy-network`, exposes port `3000` to Traefik, and publishes no host port.

For a local Compose run:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000 docker compose up -d --build
curl -f http://127.0.0.1:3000/api/health
docker compose down
```

Compose reads a local `.env` file if present. Keep credentials there or in Dokploy's environment settings; `.env` is ignored by Git. The Dockerfile can also be used directly:

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://lsta.khulanode.com -t lsta-website .
docker run --rm -p 3000:3000 --env-file .env.local lsta-website
curl -f http://127.0.0.1:3000/api/health
```

The Dockerfile uses a standalone Next.js build, runs as an unprivileged user, and exposes only port 3000. News files are copied into the runtime image. SMTP environment values are provided at run time. Do not bake secrets into the image.

## Dokploy deployment

1. Create a Compose service in the existing Dokploy project and connect this Git repository and branch. Select `docker-compose.dokploy.yml` as the Compose file.
2. Configure `NEXT_PUBLIC_SITE_URL=https://lsta.khulanode.com` in Dokploy's Compose environment before building. Compose passes it as a Docker build argument and a runtime variable. Add SMTP variables there later; do not commit credentials.
3. In Dokploy, attach the domain to the `website` service on container port `3000`, using its existing Traefik / Let's Encrypt HTTPS settings. The Compose file joins `dokploy-network` and has no published host port or separate reverse proxy.
4. Deploy. Check `/api/health`, the homepage, `/news`, `/sitemap.xml`, and the contact page. Once SMTP is configured, verify one real contact submission. Review Dokploy logs for the generic delivery result; they do not log enquiry details.
5. On every news or image update, commit and redeploy. No writable content volume is needed because content is versioned in Git.

Dokploy's Dockerfile application workflow remains an alternative: use the root `Dockerfile`, pass `NEXT_PUBLIC_SITE_URL` as a build argument, and route the domain to container port `3000`.

If SMTP is not configured, the contact page shows direct contact methods instead of an unusable form; the API also fails safely. Local in-memory rate limiting helps with simple abuse but is per application instance and resets on restart. For larger scale or sustained abuse, add a shared rate limiter at the edge.
