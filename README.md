# Heyi.Blog - Cyberpunk Personal Dashboard

A cyberpunk-styled personal blog and dashboard built with Next.js, featuring real-time Airtable integration for task management.

## Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Font**: Inter + JetBrains Mono
- **Data Source**: Airtable API
- **Deployment**: Vercel-ready

## Project Structure

```
heyione-blog/
├── src/
│   ├── app/                    # Next.js App Router Pages
│   │   ├── article/page.tsx    # Article list page
│   │   ├── fitness/page.tsx    # Fitness tracking page
│   │   ├── goals/page.tsx      # Goals dashboard page
│   │   ├── study/page.tsx      # Study path page
│   │   ├── globals.css         # Global styles (Cyberpunk theme)
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   │
│   ├── components/             # React Components
│   │   ├── CyberpunkLayout.tsx # Main layout with header/footer
│   │   ├── ClientCursor.tsx    # Custom cursor effect
│   │   └── TaskCard.tsx        # Task card component
│   │
│   └── lib/
│       └── airtable.ts         # Airtable API integration
│
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
├── next.config.ts
└── tsconfig.json
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with stats, articles grid, and about section |
| `/article` | Article list with categories and tags |
| `/study` | Study tasks from Airtable (Category: 学习) |
| `/fitness` | Fitness tasks from Airtable (Category: 健身) |
| `/goals` | All goals/tasks combined view |

## Design System

### Colors (Cyberpunk Theme)

```css
--bg-primary: #0a0a0f;      /* Deep dark background */
--bg-secondary: #12121a;    /* Secondary background */
--neon-cyan: #00ffff;       /* Primary accent */
--neon-blue: #0080ff;       /* Secondary accent */
--neon-purple: #bf00ff;     /* Tertiary accent */
--neon-pink: #ff0080;       /* Highlight */
--neon-green: #00ff80;      /* Success/positive */
--neon-yellow: #ffcc00;     /* Warning */
--neon-red: #ff3366;        /* Error/negative */
```

### Effects

- **Glassmorphism**: `backdrop-filter: blur(20px)` with transparent backgrounds
- **Neon Glow**: `box-shadow: 0 0 20px rgba(color, 0.3)`
- **Animated Background**: Floating orbs + perspective grid
- **Scanline Overlay**: Retro CRT effect
- **Button Hover**: Gradient slide-in animation

## Environment Variables

Create `.env.local` file:

```env
AIRTABLE_PAT=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_airtable_base_id
```

## Airtable Schema

Table: `DailyTasks`

| Field | Type | Description |
|-------|------|-------------|
| Date | Date | Task date |
| Category | Single Select | "学习" or "健身" |
| Task | Text | Task description |
| Status | Checkbox | Completion status |
| Media | Attachment | Images/photos |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ISR (Incremental Static Regeneration)

- Goals page: Revalidates every 300 seconds (5 minutes)
- Study/Fitness pages: Dynamic rendering

## License

MIT