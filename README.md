# Employee Skill Base

Employee Skill Base is a web application designed to manage and track the skills of employees within an organisation. It leverages Supabase for backend services and Next.js for the frontend.

## Features

- Add, edit, and delete employee profiles
- Track employee skills and proficiency levels
- Search and filter employees by skills
- Visualise data with various charts (pie charts and bar charts)
- Responsive design

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/employee-skill-base.git
cd employee-skill-base
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Next, set up the environment variables by copying `.env.sample` to `.env` and filling in the required values:

```bash
cp .env.sample .env
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Variables

The following environment variables need to be set in your `.env` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
SUPABASE_JWT_SECRET=<your_supabase_jwt_secret>
```
