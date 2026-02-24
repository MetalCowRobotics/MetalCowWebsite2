# MetalCow Robotics Website

The official website for MetalCow Robotics (FRC Team 3940). Includes the main team website and a scouting application for FRC competitions.

## Tech Stack

- **Main Website**: Static HTML, CSS, JavaScript, PHP
- **Scouting App**: Next.js 16, React 19, Tailwind CSS 4, Supabase
- **Server**: Node.js proxy server (routes requests between static site and Next.js app)
- **Email**: PHP with SendGrid

## Prerequisites

- Node.js 18+
- npm
- PHP 7.4+ (for local email processing)
- Composer (for PHP dependencies)

## Getting Started

### 1. Install Dependencies

```bash
# Install Node.js dependencies for main project
npm install

# Install Node.js dependencies for scouting app
cd www/scout && npm install && cd ../..

# Install PHP dependencies
composer install
```

### 2. Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For the scouting app, also create `.env.local` in `www/scout/`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server

Start both the Next.js scouting app and the proxy server:

```bash
# Terminal 1: Start the scouting app on port 3001
cd www/scout && npm run dev

# Terminal 2: Start the proxy server on port 3000
node proxy.js
```

- Main website: http://localhost:3000
- Scouting app: http://localhost:3000/scout/

### 4. Build for Production

```bash
# Build the scouting app
cd www/scout && npm run build

# Start production server
node proxy.js
```

## Project Structure

```
.
├── proxy.js                 # Node.js proxy server
├── package.json             # Root package.json (not used directly)
├── composer.json            # PHP dependencies
├── www/                     # Main website files
│   ├── index.html          # Home page
│   ├── apply.html          # Application page
│   ├── join.html           # Join team page
│   ├── mentor.html         # Mentor page
│   ├── sponsor.html        # Sponsorship page
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   ├── fonts/              # Font files
│   ├── images/             # Image assets
│   ├── less/               # Less CSS files
│   ├── mailProcessor-*.php # Email processors
│   └── scout/              # Next.js scouting app
│       ├── app/            # App router pages
│       ├── components/    # React components
│       ├── public/        # Static assets
│       └── package.json   # Scouting app dependencies
├── components.json         # shadcn/ui config
├── next.config.ts          # Next.js config
└── tsconfig.json           # TypeScript config
```

## Scouting App Routes

The scouting app is mounted at `/scout/` and includes:

- `/scout/` - Home
- `/scout/match` - Match scouting
- `/scout/pit` - Pit scouting
- `/scout/teams` - Team list
- `/scout/analytics` - Data analytics
- `/scout/admin` - Admin panel
- `/scout/login` - User login

## Linting

```bash
# Lint main project
npm run lint

# Lint scouting app
cd www/scout && npm run lint
```

## Deployment

### Static Files (Main Website)

Upload the contents of `www/` to your web server (Apache/Nginx):

- Ensure PHP is configured
- Set up SendGrid API key for email forms

### Scouting App

Build the Next.js app and serve via the proxy:

```bash
cd www/scout && npm run build
```

The built output is in `www/scout/out/` (static export).

## Contributing

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Test locally
4. Push and create a pull request

**Important**: Do not push directly to `main` branch. Only Code Leads can push to main.
