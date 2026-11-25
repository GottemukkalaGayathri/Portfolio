# Gayathri Gottemukkala — Portfolio

A responsive React portfolio and a separate Express API for the contact form. The site uses a restrained dark and olive visual system, reduced-motion support, semantic sections, and configurable LinkedIn and resume URLs.

## Architecture

```text
gayathriportfolio/
├── frontend/                         # React, Vite, Tailwind, Framer Motion
│   ├── public/                       # Static assets, project screenshots, resume.pdf
│   └── src/
│       ├── components/               # Navbar, section heading, contact form
│       ├── data/portfolio.js         # Profile, experience, skills, projects
│       ├── App.jsx                   # Page composition and project cards
│       └── styles.css                # Responsive design system and layout
└── backend/                          # Express REST API
    └── src/
        ├── config/database.js        # Optional MongoDB connection
        ├── controllers/              # Contact validation and persistence
        ├── middleware/               # Reserved for shared middleware
        ├── models/ContactMessage.js  # Contact document schema
        ├── routes/                   # REST endpoint routing and throttling
        ├── utils/email.js            # Optional SMTP notifications
        ├── app.js                    # Security, CORS, routes, errors
        └── server.js                 # Environment loading and startup
```

## Page and component breakdown

- `Navbar`: sticky navigation with a mobile menu and a configurable LinkedIn link.
- Hero: introduction, project/contact calls to action, and a custom code editor illustration.
- About: professional summary, career overview, education, and experience facts.
- Experience: chronological developer-role timeline with supplied responsibilities.
- Projects: four supplied projects with contribution summaries, technologies, and verified provided live URLs. No GitHub project links are shown because none were supplied.
- Projects archive: a separate `/projects` page includes the featured work and supplied personal project links.
- Skills and certifications: categorized skill cards and the supplied learning credentials.
- Certificates archive: a separate `/certificates` page lists all supplied credential titles. Original certificate images can be added under `frontend/public/certificates/` using the paths in `frontend/src/data/portfolio.js`.
- `ContactForm`: accessible form with client/server validation, loading state, and success/error feedback.
- Footer: GitHub, email, existing portfolio, and LinkedIn when configured.

## MongoDB schema

`ContactMessage` stores `name` (trimmed, 2–80 chars), `email` (trimmed and lowercase, up to 254 chars), `subject` (3–120 chars), `message` (10–5000 chars), and Mongoose `createdAt`/`updatedAt` timestamps. Messages are saved in MongoDB before the API responds. Optional SMTP notifications are sent after persistence; a notification failure is logged and does not discard a saved contact message.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Service and database readiness |
| `POST` | `/api/contact` | Validate and store a contact message; optionally send an email notification |

Contact submissions are limited to 5 requests per IP per 15 minutes. The API uses Helmet, configured CORS, JSON-size limits, input validation, and consistent JSON errors. The contact endpoint returns `503` when MongoDB is unavailable.

## UI design plan

- Editorial charcoal hero with warm paper surfaces, olive accents, restrained motion, and Manrope/DM Sans typography.
- Wide desktop layouts collapse to single-column content on mobile, with accessible navigation and clearly visible keyboard focus.
- Framer Motion reveals content once as it enters view, while `MotionConfig` and CSS honor reduced-motion preferences.
- Project and certificate images are loaded only from local files under `frontend/public/`. Missing images use local placeholder cards; live websites open only when a visitor clicks a project link.

## Run locally

Requirements: Node.js 20+ and npm 10+.

```bash
npm install
```

Configure values directly in `frontend/.env` and `backend/.env`. The site can render without MongoDB, but contact submissions need `MONGODB_URI`. Leave SMTP values blank to disable email notifications. The supplied resume PDF is previewed on the page and downloadable at `/resume.pdf`. To replace it, add a PDF at `frontend/public/resume.pdf` and set `VITE_RESUME_URL` in `frontend/.env` if needed. Set `VITE_LINKEDIN_URL` there when available.

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and API at `http://localhost:5000`.

## Deploy

### Vercel frontend

Import the repository, set the project root to `frontend`, and add:

- `VITE_API_URL`: deployed Render API URL plus `/api` (for example, `https://portfolio-backend-unj2.onrender.com/api`; this is also the frontend fallback)
- `VITE_LINKEDIN_URL`: optional LinkedIn profile URL
- `VITE_RESUME_URL`: optional override for the bundled resume at `/resume.pdf`

Vite builds with `npm run build` and outputs `frontend/dist`.

### Render backend

Create a Node web service with root directory `backend`, build command `npm install`, and start command `npm start`. Configure `MONGODB_URI`, `CLIENT_ORIGIN` (additional deployed Vercel origin or comma-separated origins), and `PORT` if the service requires it. `https://portfoliogaye.vercel.app` and local development are allowed by default. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `NOTIFICATION_EMAIL` only when email alerts are configured.

## Deployment configuration

LinkedIn remains configurable through `VITE_LINKEDIN_URL`. The resume is bundled at `/resume.pdf` and can be replaced or overridden with `VITE_RESUME_URL`. No project GitHub URLs or employment outcomes have been fabricated.

## Updating project images and adding your own resume

- Project preview images are stored in `frontend/public/projects/`. Replace a PNG with a new screenshot using the same filename to keep the current project mapping, or update that project's `image` value in `frontend/src/data/portfolio.js`.
- Use `/projects` for the full project archive and `/certificates` for the full certificate list. Vercel rewrites these paths to the React app.
- The supplied personal projects are listed in `personalProjects` in `frontend/src/data/portfolio.js`. Upload any project screenshot to `frontend/public/projects/`, then set that item's `image` field to a local path such as `/projects/my-screenshot.png`. Leave it blank to keep the branded fallback tile.
- Certificate images are not present in the workspace yet; add them to `frontend/public/certificates/` with the filenames referenced in `frontend/src/data/portfolio.js`.
- The Portfolio version tab displays `frontend/public/resume-preview.png` and downloads `frontend/public/resume.pdf`.
- Put your own PDF at `frontend/public/my-resume.pdf`, then set `VITE_CUSTOM_RESUME_URL=/my-resume.pdf` in `frontend/.env`. The Resume section will show tabs for the portfolio-built resume and your own PDF, each with its own preview and download link. Restart the Vite dev server after changing environment variables.
- For Vercel, add `VITE_CUSTOM_RESUME_URL=/my-resume.pdf` to the frontend project's environment variables and redeploy. Keep `VITE_RESUME_URL=/resume.pdf` for the portfolio-built version.
