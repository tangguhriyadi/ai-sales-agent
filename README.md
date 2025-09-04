# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Sales Agent Chat Dashboard** built with Next.js 15, featuring a collapsible sidebar navigation and integrated n8n chat widget. The application uses a custom pastel theme and consists of two main sections: Chat and Documents management with full Supabase backend integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The development server runs on http://localhost:3000

## Architecture

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: TailwindCSS v4 with custom pastel theme using CSS variables
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Backend**: Supabase (PostgreSQL database + Storage)
- **Chat Integration**: n8n chat widget (@n8n/chat)
- **File Processing**: n8n webhook workflows for upload/delete operations
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
- **Import Paths**: Uses `@/*` alias for `./src/*`

### Application Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar integration
│   ├── page.tsx            # Home page (Chat interface)
│   ├── documents/page.tsx  # Documents management page
│   └── globals.css         # Global styles, theme, and n8n chat overrides
├── components/
│   ├── nav.tsx             # Collapsible sidebar navigation
│   ├── chat/
│   │   ├── chat-interface.tsx  # Original chat interface (unused)
│   │   └── chat-n8n.tsx       # n8n chat widget integration
│   ├── documents/
│   │   ├── document-list.tsx     # Document table with CRUD operations
│   │   └── document-uploader.tsx # File upload dialog
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── utils.ts            # Utility functions (cn, clsx, twMerge)
    └── supabase.ts         # Supabase client configuration and types
```

## Key Features

### 1. Collapsible Sidebar Navigation
- Located in `src/components/nav.tsx`
- Toggles between expanded (256px) and collapsed (64px) states
- Keyboard shortcut: `Ctrl+B`
- Responsive: auto-collapses on mobile devices
- Menu items: Chat and Documents with Lucide icons

### 2. n8n Chat Integration
- Uses `@n8n/chat` widget in fullscreen mode
- Configured in `src/components/chat/chat-n8n.tsx`
- Webhook URL: `https://n8n.inventrackbetest.site/webhook/91833f24-c0b7-4ebc-813d-46e90ea4fdfc/chat`
- Indonesian language support with custom i18n configuration
- Initial greeting from "Farah" (Sales Agent from Tangguh Pharmacy)

### 3. Custom Pastel Theme
- Claude-inspired soft color palette
- Comprehensive CSS overrides in `globals.css` for n8n chat styling
- HSL color values with transparency and backdrop blur effects
- Both light and dark mode support

### 4. Document Management
- Full CRUD operations with Supabase backend integration
- File upload through n8n webhook with validation (PDF/XLSX only, 10MB max)
- Document table with view, download, and delete actions
- Confirmation dialogs for destructive operations
- Real-time data fetching and UI updates

## Theme System

The application uses a sophisticated pastel color system:

**Light Mode Colors:**
- Background: Warm cream (hsl(30, 40%, 98%))
- Primary: Coral-orange (hsl(25, 50%, 65%))
- Secondary: Soft sage green (hsl(180, 25%, 90%))
- Muted: Pale blue-gray (hsl(200, 25%, 92%))

**Dark Mode Colors:**
- Background: Deep navy-purple (hsl(240, 15%, 8%))
- Maintains warm cream text with reduced contrast
- Complementary muted tones throughout

## Backend Integration Architecture

### Supabase Integration
- **Database**: PostgreSQL with `media` table for document metadata
- **Client**: Configured in `src/lib/supabase.ts` with TypeScript types
- **Environment**: Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Database Schema** (`media` table):
  ```typescript
  {
    id: number (primary key)
    created_at: string (timestamp)
    file_name: string
    mime_type: string  
    file_type: string (PDF/XLSX)
    file_url: string
    file_size: string
  }
  ```

### n8n Webhook Integration
- **Chat Webhook**: `https://n8n.inventrackbetest.site/webhook/91833f24-c0b7-4ebc-813d-46e90ea4fdfc/chat`
- **Upload Webhook**: `https://n8n.inventrackbetest.site/webhook/upload` (FormData with `data` field)
- **Delete Webhook**: `https://n8n.inventrackbetest.site/webhook/b1142f0c-71eb-4e79-9ee6-f66e0f80e107/delete/:id`

### Data Flow Patterns
- **Upload Flow**: Client validation → n8n webhook → Supabase record creation → UI refresh
- **Delete Flow**: Confirmation dialog → n8n webhook → Supabase record deletion → UI refresh
- **Real-time Updates**: Automatic re-fetching after CRUD operations

## n8n Chat Styling

Extensive CSS overrides ensure the n8n chat matches the pastel theme:
- Message bubbles with rounded corners and soft shadows
- User messages: Right-aligned with primary color styling
- Bot messages: Left-aligned with card background
- Custom input styling and send button with hover effects
- Proper scrollbar styling and animations

## Development Notes

- **File Validation**: Only PDF and XLSX files up to 10MB are accepted
- **Confirmation Dialogs**: All destructive operations require user confirmation
- **Error Handling**: Comprehensive error handling with user feedback via alerts
- **Loading States**: UI shows loading states during async operations
- **Cursor Styling**: All interactive buttons have `cursor-pointer` classes for better UX
- **Responsive Design**: Sidebar auto-collapses on mobile, keyboard shortcuts supported (Ctrl+B)
- **Type Safety**: Full TypeScript integration with Supabase schema types
- **CSS Overrides**: High specificity selectors override n8n default styles

## External Dependencies

Key third-party packages:
- `@n8n/chat`: Chat widget integration
- `@supabase/supabase-js`: Database and backend services
- `@radix-ui/*`: Accessible component primitives  
- `lucide-react`: Icon library
- `class-variance-authority`: Component variant management
- `tailwind-merge`: Tailwind class merging utility

## Environment Variables

Required environment variables (stored in `.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=https://sjnfhytahfjignignquj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```