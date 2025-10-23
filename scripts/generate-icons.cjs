const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const svg2img = require('svg2img');
const { promisify } = require('util');

const svg2imgAsync = promisify(svg2img);

// Ensure icons directory exists
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Icon size
const SIZE = 64;
const COLOR = '#64748b'; // slate-500

/**
 * Converts SVG to PNG using svg2img
 */
async function svgToPng(svgContent, filename) {
  try {
    const buffer = await svg2imgAsync(svgContent, { width: SIZE, height: SIZE });
    fs.writeFileSync(path.join(iconsDir, filename), buffer);
    console.log(`Generated ${filename}`);
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

/**
 * Draws a stroked icon (for Lucide icons which use stroke)
 */
function createStrokedIcon(drawFn, filename) {
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');

  // Scale from 24x24 to SIZE
  const scale = SIZE / 24;

  // Clear canvas
  ctx.clearRect(0, 0, SIZE, SIZE);

  // Set up transformation and drawing properties
  ctx.save();
  ctx.scale(scale, scale);
  ctx.strokeStyle = COLOR;
  ctx.fillStyle = 'none';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Draw the icon
  drawFn(ctx);

  ctx.restore();

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, filename), buffer);
  console.log(`Generated ${filename}`);
}

// Lucide Mail icon (using stroke)
createStrokedIcon((ctx) => {
  // Rectangle
  ctx.strokeRect(2, 4, 20, 16);
  // Envelope flap
  ctx.beginPath();
  ctx.moveTo(2, 4);
  ctx.lineTo(12, 13);
  ctx.lineTo(22, 4);
  ctx.stroke();
}, 'email.png');

// Lucide Phone icon (simplified)
createStrokedIcon((ctx) => {
  // Draw a simple phone shape
  ctx.beginPath();
  // Phone body - rounded rectangle
  ctx.moveTo(8, 2);
  ctx.lineTo(16, 2);
  ctx.arc(16, 4, 2, -Math.PI/2, 0);
  ctx.lineTo(18, 20);
  ctx.arc(16, 20, 2, 0, Math.PI/2);
  ctx.lineTo(8, 22);
  ctx.arc(8, 20, 2, Math.PI/2, Math.PI);
  ctx.lineTo(6, 4);
  ctx.arc(8, 4, 2, Math.PI, -Math.PI/2);
  ctx.closePath();
  ctx.stroke();

  // Speaker line at top
  ctx.beginPath();
  ctx.moveTo(10, 5);
  ctx.lineTo(14, 5);
  ctx.stroke();

  // Home button at bottom
  ctx.beginPath();
  ctx.arc(12, 19, 1, 0, Math.PI * 2);
  ctx.stroke();
}, 'phone.png');

// Lucide Calendar icon
createStrokedIcon((ctx) => {
  // Rectangle
  ctx.strokeRect(3, 4, 18, 18);
  // Top line
  ctx.beginPath();
  ctx.moveTo(3, 10);
  ctx.lineTo(21, 10);
  ctx.stroke();
  // Left date marker
  ctx.beginPath();
  ctx.moveTo(8, 2);
  ctx.lineTo(8, 6);
  ctx.stroke();
  // Right date marker
  ctx.beginPath();
  ctx.moveTo(16, 2);
  ctx.lineTo(16, 6);
  ctx.stroke();
}, 'calendar.png');

// Lucide Home icon
createStrokedIcon((ctx) => {
  // Roof
  ctx.beginPath();
  ctx.moveTo(3, 12);
  ctx.lineTo(12, 3);
  ctx.lineTo(21, 12);
  ctx.stroke();
  // House body
  ctx.strokeRect(5, 12, 14, 9);
  // Door
  ctx.strokeRect(9, 16, 6, 5);
}, 'home.png');

// Lucide Flag icon
createStrokedIcon((ctx) => {
  // Pole
  ctx.beginPath();
  ctx.moveTo(4, 22);
  ctx.lineTo(4, 2);
  ctx.stroke();
  // Flag
  ctx.beginPath();
  ctx.moveTo(4, 3);
  ctx.lineTo(4, 15);
  ctx.lineTo(20, 9);
  ctx.closePath();
  ctx.stroke();
}, 'flag.png');

// Lucide Heart icon
createStrokedIcon((ctx) => {
  // Heart shape
  ctx.beginPath();
  ctx.moveTo(12, 21);
  ctx.bezierCurveTo(5, 14, 2, 10, 2, 7);
  ctx.bezierCurveTo(2, 4, 4, 2, 7, 2);
  ctx.bezierCurveTo(9, 2, 11, 3, 12, 5);
  ctx.bezierCurveTo(13, 3, 15, 2, 17, 2);
  ctx.bezierCurveTo(20, 2, 22, 4, 22, 7);
  ctx.bezierCurveTo(22, 10, 19, 14, 12, 21);
  ctx.closePath();
  ctx.stroke();
}, 'heart.png');

// Main async function to generate all icons
async function generateAllIcons() {
  // GitHub icon (from your custom GitHubIcon component)
  const githubSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
      <path
        fill="${COLOR}"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  `;
  await svgToPng(githubSvg, 'github.png');

  // LinkedIn icon (from your custom LinkedInIcon component)
  const linkedinSvg = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
      <path
        fill="${COLOR}"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  `;
  await svgToPng(linkedinSvg, 'linkedin.png');

  console.log('\nAll icons generated successfully!');
}

// Run the async function
generateAllIcons().catch(console.error);
