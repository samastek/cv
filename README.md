# CV - Personal Resume Website

This is my personal CV website built with modern web technologies. It showcases my professional experience, education, skills, and projects in a clean, interactive format that works great both on screen and in print.

## About This Project

I created this website because I wanted something more dynamic than a traditional PDF resume. It's multilingual (supporting Arabic, German, and English), responsive across all devices, and optimized for both digital viewing and printing. The design focuses on readability and professionalism while still feeling modern and interactive.

## Features

- **Multilingual Support**: Switch between Arabic, German, and English with proper RTL support for Arabic
- **Print Optimization**: Looks great when printed or saved as PDF
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Dark/Light Mode**: Adapts to your system preferences
- **Interactive Elements**: Hover effects, smooth animations, and a command menu for quick navigation
- **Professional Styling**: Clean typography and subtle animations that enhance rather than distract

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Internationalization**: next-intl for multilingual support
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React for consistent iconography
- **Animation**: CSS transitions and transforms
- **Deployment**: Optimized for Vercel

## Getting Started

If you want to run this locally or use it as a template:

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Customization

The main content is in `src/data/resume-data.tsx` - this is where you'll want to update:
- Personal information and contact details
- Work experience and education
- Skills and technologies
- Projects and achievements

For translations, check the files in `src/messages/` (ar.ts, de.ts, en.ts).

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── contexts/           # React contexts (language switching)
├── data/               # Resume data and content
├── images/             # Static images and logos
├── lib/                # Utility functions and internationalization
└── messages/           # Translation files
```

## Performance

This site is built with performance in mind:
- Static generation for fast loading
- Optimized images with Next.js Image component
- Minimal JavaScript bundle
- CSS-only animations where possible
- Web Vitals optimization

## Accessibility

The site follows accessibility best practices:
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Printing

The CV is specially optimized for printing. Just press Ctrl+P (or Cmd+P on Mac) and it will automatically format everything nicely for paper, including:
- Optimized layout for A4 paper
- Proper page breaks
- Print-specific styling
- Removal of interactive elements

## License

This project is open source and available under the MIT License. Feel free to use it as inspiration or a starting point for your own CV website.

## Contact

If you have questions about the code or want to connect professionally, you can reach me through the contact information on the website itself.
