# Project Instructions for Claude

## Project Overview

**Project Name**: Spotlight
**Type**: Personal Portfolio Website
**Current Framework**: Next.js 15 (App Router)
**Target Framework**: React Router v7 (planned migration)
**Build Tool**: Next.js (current) → Vite (planned)
**Deployment**: GitHub Pages (planned)

---

## Tech Stack

### Current (Next.js)
```json
{
  "next": "^15.5.10",
  "react": "^19.2.4",
  "@tailwindcss/postcss": "^4.1.15",
  "@mdx-js/loader": "^3.1.0",
  "next-themes": "^0.4.6"
}
```

### Planned (React Router v7)
```json
{
  "react-router": "latest",
  "vite": "latest",
  "@react-router/dev-routes": "latest",
  "react-router-theme": "latest"
}
```

---

## Directory Structure

### Current (Next.js App Router)
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── providers.tsx        # Theme + context providers
│   ├── about/              # About page
│   ├── articles/            # Blog articles (MDX)
│   │   ├── page.tsx        # Articles index
│   │   └── [slug]/        # Dynamic article routes
│   ├── projects/            # Projects page
│   ├── speaking/            # Speaking page
│   ├── thank-you/          # Newsletter confirmation
│   ├── uses/               # Tech stack page
│   ├── feed.xml/           # RSS feed route handler
│   └── mdx-components.tsx # MDX component config
├── components/             # React components
│   ├── Layout.tsx
│   ├── Header.tsx          # Complex scroll animations
│   ├── Footer.tsx
│   ├── ArticleLayout.tsx    # Blog post layout
│   ├── SimpleLayout.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Prose.tsx
│   └── Section.tsx
├── lib/                   # Utilities
│   ├── articles.ts         # Article loading with fast-glob
│   └── formatDate.ts      # Date formatting
├── images/                # Static assets
│   ├── photos/
│   └── logos/
└── styles/                # Global styles
```

### Planned (React Router v7)
```
app/
├── root.tsx               # Root layout (from src/app/layout.tsx)
├── routes/
│   ├── _index.tsx          # Home (from src/app/page.tsx)
│   ├── about.tsx           # About
│   ├── articles._index.tsx  # Articles index
│   ├── articles.$slug.tsx   # Dynamic article (/articles/:slug)
│   ├── projects.tsx         # Projects
│   ├── speaking.tsx         # Speaking
│   ├── thank-you.tsx        # Thank you
│   ├── uses.tsx            # Uses
│   └── feed[.xml].tsx     # RSS feed resource route
├── lib/                   # Utilities (from src/lib/)
└── components/             # Components (from src/components/)
```

---

## Key Components

### Client Components ('use client')
- `src/app/providers.tsx` - Theme provider, pathname tracking
- `src/components/Header.tsx` - Scroll animations, theme toggle, navigation
- `src/components/ArticleLayout.tsx` - Back button navigation

### Server Components
- All other components are server components by default

### Special Components
- `Header` - Complex scroll-based animations with avatar scaling
- `ArticleLayout` - Wraps MDX content with navigation
- `Prose` - Tailwind Typography wrapper

---

## Data Loading Patterns

### Article Loading
```typescript
// src/lib/articles.ts
import glob from 'fast-glob'

export async function getAllArticles() {
  const articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })
  // Returns sorted articles by date
}
```

### RSS Feed
```typescript
// src/app/feed.xml/route.ts
// Uses require.context() for Webpack - needs migration
// Uses cheerio to parse HTML
// Uses feed package for RSS 2.0 generation
```

---

## Routing

### Current Routes
| Route | File |
|--------|-------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/articles` | `src/app/articles/page.tsx` |
| `/articles/[slug]` | `src/app/articles/[slug]/page.mdx` |
| `/projects` | `src/app/projects/page.tsx` |
| `/speaking` | `src/app/speaking/page.tsx` |
| `/uses` | `src/app/uses/page.tsx` |
| `/thank-you` | `src/app/thank-you/page.tsx` |
| `/feed.xml` | `src/app/feed.xml/route.ts` |

### Dynamic Routes
- Articles use folder-based dynamic routing: `src/app/articles/[slug]/page.mdx`

---

## Styling

### Tailwind CSS v4 Configuration
- PostCSS plugin: `@tailwindcss/postcss`
- Typography: `@tailwindcss/typography`
- Dark mode: Class-based via `next-themes` → will use `react-router-theme`

### Design System
- Primary accent: Teal (`text-teal-500`, `dark:text-teal-400`)
- Backgrounds: White/Zinc with dark mode variants
- Rounded corners, backdrop blur effects
- Fixed header with scroll animations

---

## Features

### Implemented
- Dark/light mode toggle with system preference detection
- Responsive mobile navigation (Headless UI Popover)
- Animated avatar on homepage scroll
- Article list with date sorting
- RSS feed generation
- MDX support with syntax highlighting
- Newsletter form submission

### Content
- 3 MDX articles in `src/app/articles/`
- Project showcase (5 projects)
- Speaking engagements (5 items)
- Uses/tools recommendations
- Social media links

---

## Scripts

```json
{
  "dev": "next dev",      // Start dev server
  "build": "next build",    // Production build
  "start": "next start",    // Start production server
  "lint": "next lint"       // ESLint
}
```

---

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL  # Base URL for RSS feed generation
```

---

## Known Migration Challenges

When migrating to React Router v7:

1. **`require.context()`** in RSS feed - Webpack specific, needs replacement
2. **`next/image`** - Will need `@unpic/react` or standard `<img>`
3. **`next-themes`** - Will need `react-router-theme` package
4. **`usePathname()`** - Replace with `useLocation()` from react-router-dom
5. **`useRouter()`** - Replace with `useNavigate()` from react-router-dom
6. **Dynamic MDX imports** - May need Vite's `import.meta.glob()`

---

## Deployment

### Current
- Likely Vercel (Next.js optimized)

### Planned
- GitHub Pages with static site generation
- Build output: `build/client/`
- Base path: `/repo-name/`
- Prerender all routes as static HTML

---

## Articles (Current Content)

1. `rewriting-the-cosmos-kernel-in-rust` (2022-07-14)
2. `crafting-a-design-system-for-a-multiplanetary-future` (2022-09-05)
3. `introducing-animaginary` (2022-09-02)

---

## Credits

Template: Tailwind Plus "Spotlight" template
Author: Spencer (software designer, entrepreneur, NYC)
Company: Planetaria (space technology)

---

## React Router v7 Setup (Post-Migration)

### Official CLI (Recommended for Fresh Projects)

```bash
# Interactive project creation
npx create-react-router@latest

# Or with specific template
npx create-react-router@latest --template vite
```

### vite.config.ts Reference Configuration

```typescript
import { reactRouter } from "@react-router/dev/vite"
import { flatRoutes } from "@react-router/dev-routes"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    reactRouter({
      ssr: true,
      routes: async (defineRoutes) => flatRoutes(defineRoutes),
      prerender: true,  // For GitHub Pages
    }),
  ],
  base: "/repo-name/",  // GitHub Pages subdirectory
  resolve: {
    alias: { "@": "./src" },  // Path aliases
  },
})
```

**References**:
- [React Router Templates Repository](https://github.com/remix-run/react-router-templates)
- [React Router Official Documentation](https://reactrouter.com/)
- [React Router v7 Starter Templates](https://tegononal.com/en/article/react-router-7-starter-templates)

---

## Notes for Claude

1. **Before making changes**:
   - Read the relevant files to understand context
   - Check if similar patterns exist that can be reused
   - Consider the migration target (React Router v7)

2. **Component modifications**:
   - Preserve client/server component boundaries
   - Keep dark mode functionality
   - Maintain scroll animations in Header
   - Don't remove features without asking

3. **Testing**:
   - Test both light and dark themes
   - Verify mobile responsive menu works
   - Check scroll animations on homepage
   - Validate RSS feed generation

4. **Code style**:
   - Use existing patterns (Container, Card, etc.)
   - Follow TypeScript strict mode
   - Use clsx for conditional classes
   - Keep component composition consistent

---

## React Router v7 Best Practices (Post-Migration)

### Data Loading
```typescript
// ✅ Correct: Use loaders for server data
export async function loader({ request }: LoaderFunctionArgs) {
  const articles = await getAllArticles()
  return json({ articles })
}

export default function Page() {
  const { articles } = useLoaderData<typeof loader>()
  // ...
}

// ❌ Wrong: Don't fetch data in component
export default function Page() {
  const [articles, setArticles] = useState([]) // Don't do this
}
```

### Error Handling
```typescript
// ✅ Correct: Throw Response with status
export async function loader({ params }: LoaderFunctionArgs) {
  const article = await getArticle(params.slug)
  if (!article) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ article })
}

// ✅ Correct: Export ErrorBoundary for route errors
export function ErrorBoundary() {
  const error = useRouteError()
  return <div>Error: {error.message}</div>
}
```

### Actions (Form Handling)
```typescript
// ✅ Correct: Use action for form submissions
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await subscribeToNewsletter(formData)
  return redirect("/thank-you")
}
```

### File-Based Routing (flatRoutes)
```typescript
// File naming conventions:
routes/_index.tsx           → /
routes/about.tsx            → /about
routes/articles.$slug.tsx    → /articles/:slug
routes/feed[.xml].tsx       → /feed.xml (resource route)
```

**References**:
- [React Router v7 Best Practices](https://mcpmarket.com/tools/skills/react-router-v7-best-practices)
- [Error Boundaries Documentation](https://reactrouter.com/how-to/error-boundary)
- [React Router v7 Crash Course](https://dev.to/pedrotech/react-router-v7-a-crash-course-2m86)
