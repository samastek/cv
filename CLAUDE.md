# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual personal CV/resume website built with Next.js 15, React 19, and TypeScript. It supports English, German, and Arabic with full RTL support, optimized for both web viewing and printing/PDF generation.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Internationalization System

The project uses a custom client-side i18n implementation (not next-intl despite package.json):

- **LanguageContext** ([src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx)): Client-side context provider that manages locale state, loads translations, and persists preferences to localStorage
- **Translation files**: [src/messages/](src/messages/) contains en.ts, de.ts, ar.ts with typed message objects
- **i18n config**: [src/lib/i18n.ts](src/lib/i18n.ts) defines locales and locale name translations
- **RTL support**: Arabic locale automatically sets `dir="rtl"` on document root and applies special styling

### Data Architecture

- **Single source of truth**: [src/data/resume-data.tsx](src/data/resume-data.tsx) contains all resume content (work history, education, skills, projects, personal info)
- **Translation mapping**: Page component ([src/app/page.tsx](src/app/page.tsx)) maps translated strings from message files to resume data objects by matching patterns (e.g., 'siemens' key matches company name containing 'siemens')
- **Type safety**: Resume data is typed with `as const` to ensure consistency

### Component Structure

- **UI components**: [src/components/ui/](src/components/ui/) contains Radix UI-based components (avatar, badge, button, card, command, dialog, section)
- **Feature components**: [src/components/](src/components/) contains project-card, skill-tag, command-menu, and PDF generation components
- **Icons**: Custom SVG icon components in [src/components/icons/](src/components/icons/)

### PDF Generation

- Uses @react-pdf/renderer for server-side PDF generation
- API route: [src/app/api/generate-pdf/route.ts](src/app/api/generate-pdf/route.ts) accepts `?locale=en|de|ar` query parameter
- PDF components: [src/components/pdf/](src/components/pdf/) contains CVDocument.tsx and createCVDocument.tsx
- Factory pattern: `createCVDocument(locale)` returns locale-specific PDF document

### Styling System

- **Tailwind CSS**: Utility-first styling with custom configuration in [tailwind.config.js](tailwind.config.js)
- **Design tokens**: HSL-based color system defined with CSS variables
- **Print optimization**: Extensive print-specific CSS classes and media queries
- **Responsive**: Mobile-first with custom breakpoints (xs: 475px, mobile-lg: 425px)
- **Arabic typography**: Special font handling via `font-arabic` class for RTL text

## Important Implementation Notes

### Adding/Modifying Content

1. **Update resume data**: Edit [src/data/resume-data.tsx](src/data/resume-data.tsx) for any factual changes (dates, companies, skills, etc.)
2. **Update translations**: Modify all three translation files ([src/messages/en.ts](src/messages/en.ts), [src/messages/de.ts](src/messages/de.ts), [src/messages/ar.ts](src/messages/ar.ts)) to maintain consistency
3. **Update mapping logic**: If adding new data types, update the mapping logic in [src/app/page.tsx](src/app/page.tsx) that connects translated strings to resume data

### Translation Key Matching

The page component uses pattern matching to connect translations to data:
```typescript
// Example: Work experience mapping
const resumeWork = RESUME_DATA.work.find(w =>
  w.company.toLowerCase().includes(key === 'siemens' ? 'siemens' : 'adorsys')
);
```

When adding new entries, ensure the matching logic is updated accordingly.

### RTL (Arabic) Support

- Use `isArabic` boolean derived from `locale === 'ar'`
- Apply conditional classes: `cn(baseClasses, isArabic && rtlClasses)`
- Common patterns:
  - Text alignment: `isArabic ? "text-right" : "text-left"`
  - Flex direction: `isArabic && "flex-row-reverse"`
  - Spacing: `isArabic ? "md:ml-6" : "md:mr-6"`

### Print Styles

- Use `print:` prefix for print-specific Tailwind classes
- Common patterns:
  - Hide interactive elements: `print:hidden`
  - Force page breaks: `print-force-new-page` (custom class)
  - Adjust sizing: `print:text-[10px]`, `print:space-y-4`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Radix UI primitives
- **Styling**: Tailwind CSS with tailwindcss-animate
- **PDF**: @react-pdf/renderer
- **Icons**: Lucide React
- **Command Palette**: cmdk
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Deployment

Optimized for Vercel deployment with:
- Asset prefix support via `NEXT_PUBLIC_BASE_PATH` environment variable
- Unoptimized images (images.unoptimized: true)
- Server-side rendering enabled for API routes (no static export)
- Trailing slashes enabled for URL consistency
