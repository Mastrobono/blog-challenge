# Lite-Tech Challenge - Frontend

A modern, performant blog platform built with Next.js, featuring a component library designed with Atomic Design principles and fully documented in Storybook.

## 📚 Storybook & Component Library

This project includes a comprehensive **Storybook** setup with all components documented and ready for development. All components follow **Atomic Design** principles, making them:

- **Customizable**: Each component accepts props for easy customization
- **Scalable**: Built to be reused across the application
- **Well-documented**: Complete Storybook stories for all components
- **Type-safe**: Full TypeScript support with proper interfaces

### Component Architecture (Atomic Design)

The component structure follows Atomic Design principles:

| **Level** | **Directory** | **Examples** | **Purpose** |
| --- | --- | --- | --- |
| **Atoms** | `components/ui/` | `Button`, `Input`, `Badge`, `Avatar`, `Chip` | Basic building blocks, reusable UI elements |
| **Molecules** | `components/ui/` | `Card`, `ActionButton`, `Logo` | Simple combinations of atoms |
| **Organisms** | `components/layout/`, `components/features/` | `Navbar`, `Footer`, `Modal` | Complex UI components combining molecules |
| **Features** | `components/features/` | `Hero`, `RelatedPosts`, `FilteredPosts`, `GridCard` | Complete feature implementations assembled from organisms |

### Running Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006` where you can:
- Browse all components
- Test different variants and props
- View component documentation
- Develop components in isolation

### Available Stories

All components have corresponding Storybook stories:
- **UI Components**: Button, Input, Badge, Avatar, Chip, Card, ActionButton, Logo, etc.
- **Layout Components**: Navbar, Footer, Container
- **Feature Components**: Hero, Modal, RelatedPosts, FilteredPosts, GridCard, MostViewedPosts
- **Special Components**: LoaderScreen, LoaderBar, TextType

---

## 🏗️ Frontend Architectural Documentation

This document outlines the planned architecture for the frontend application, detailing the technology choices, rendering strategies, component organization, and critical trade-offs.

### 1. Technology Stack & Overview

| **Component** | **Technology** | **Version** | **Role** |
| --- | --- | --- | --- |
| **Framework** | **Next.js** (App Router) | 16.x | Server-centric rendering, routing, and **View Transitions** for seamless navigation. |
| **Styling** | **Tailwind CSS** | 4.x | Utility-first styling with custom tokens and layer-based architecture. |
| **Complex Animation** | **GSAP** (GreenSock) | 3.x | High-performance, complex UI/UX animations (e.g., Hero sections). |
| **Smooth Scrolling** | **Lenis** | 1.x | Implementation of native-feeling smooth scrolling for enhanced page fluidity. |
| **Language** | **TypeScript** | 5.x | Enforces type safety across components and interfaces. |
| **Client Data** | **@tanstack/react-query** | v5 | Client-side data fetching, caching, and **mutation management**. |

### 2. Data Flow & Rendering Strategy (Hybrid Model)

We employ a hybrid model to ensure **speed** for static content and **consistency** for user-mutable data.

### A. Rendering Strategies

| **Content Type** | **Technique** | **Rationale & Timing** |
| --- | --- | --- |
| **Stale Content (Home/Main Post)** | **ISR (Incremental Static Regeneration)** | Uses Server Components with `revalidate: 3600` (1 hour). This is budget-conscious and appropriate for general blog content. |
| **Mutable Content (Related Posts)** | **CSR + SWR** (`react-query`) | Forced **Client Component** usage to manage mutations and cache consistency. |

### B. API Consumption

| **Service** | **Endpoint Example** | **Consumption Method** | **Responsibility** |
| --- | --- | --- | --- |
| **External API** | `/api/posts` | Server Component `fetch()` (ISR) | Read-Only (Initial data population). |
| **Internal (NestJS) API** | `/api/posts/related` | Client Component `useQuery`/`useMutation` | Read/Write (User-generated posts, ensures consistency). |

### 3. Component Organization & Naming

Component organization follows standard best practices, separating reusable UI elements from section-specific logic.

| **Directory** | **Component Name(s)** | **Rationale (Role in Features)** |
| --- | --- | --- |
| `components/layout/` | `Navbar.tsx`, `Footer.tsx` | Shared page framework elements only. |
| `components/ui/` | `Button.tsx`, `Input.tsx`, `LoaderBar.tsx`, `Avatar.tsx`, `Chip.tsx`, `Badge.tsx` | **Atomic UI:** Reusable, stateless tokens-only elements. |
| `components/features/` | **`NewPostModal.tsx`** | **CRITICAL:** Manages the multi-state creation workflow, form logic, and mutation. |
|  | **`PostFilter.tsx`** | Manages filter state and renders `Chip` components. |
|  | **`CTA.tsx`** | Composed element (Text + Button). |
|  | **`Card.tsx`** | Composed, stateless data entity (Title, Badge, Button, Image). |
|  | **`RichText.tsx`** | Applies specialized global typography to the main article markdown content. |
|  | **`RelatedPosts.tsx`** | The complete list component tied to the user-generated data. |
|  | **`MostViewedList.tsx`** | Composed list component (4 cards) with two styling variants (Black/White). |
|  | **`SocialAside.tsx`** | The fixed social media sidebar specific to the post view. |

### 4. Performance & UX Trade-offs

| **ID** | **Trade-off Description** | **Rationale and Impact on Metrics** |
| --- | --- | --- |
| **T1** | **SplashScreen/LoaderScreen (Easter Egg)** | **Rationale:** Intentional 2-second client-side trivia screen (Lottie, filters) for a *'Wow'* factor (**a surprise** 🤫). 
 **Impact:** The **TTI** (Time to Interactive) and main layout mounting will be **artificially delayed** by 2 seconds. FCP remains fast (as the simple background paints immediately), but we accept a lower TTI score for brand experience. |
| **T2** | **CSR vs. ISR Consistency** | **Rationale:** The decision to use **Optimistic UI** for post creation necessitates that the `Related Posts` section be a Client Component using `react-query`. This ensures **persistence** after a hard refresh (F5), **avoiding the conflict** where the ISR cache serves "stale" data, reversing the optimistic update. 
 **Impact:** We accept the penalty of **hydration** (skeleton/shimmer flash) to achieve critical data consistency. |
| **T3** | **Accessibility vs. Design Fidelity** | The `Black` and `Outline Green` Button variants were designed without a distinct keyboard `focus` state. |

# 🚧 Provisional Style Documentation

This document serves as a reference for all design tokens and component usage extracted from the Figma files. It is an **Architectural Blueprint** guiding the initial implementation of Tailwind CSS classes.

---

### 1. Status and Goals

> STATUS: Tokens Extracted, Component Blueprints Ready, and Required Assets Uploaded.
OBJECTIVE: To begin development with defined classes, avoiding magic numbers and inconsistent styles.
NOTE ON FIDELITY: The values used (colors, spacing, typography) are derived directly from the Figma assets. We understand that "pixel-perfect" implementation requires iteration and slight adjustments during the development. These tokens will be reviewed and adjusted, if necessary, to achieve 100% fidelity upon final review.
> 

### 2. Implementation Roadmap TODOs (Remaining Style Mapping)

- **TODO: Markdown/Rich Text Styles:** Map all base HTML elements within the main article content (`h1`, `h2`, `p`, `img`, `blockquote`, etc.) for the Post Detail view.
- **TODO: Most Viewed Posts:** Map the structural grid and token variants for the **Black Variant** (Home) and the **White Variant** (Post Detail Sidebar) list items.
- **TODO: Page Containers:** Map the general container, grid, and padding styles for the main page wrappers (`Home` and `Post Detail`).

---

## 2. Token Source of Truth

### 1. Colors

| **Design Token** | **Semantic Name** | **Value (HSL / HEX)** | **Usage Principal** |
| --- | --- | --- | --- |
| Green (Primary) | `primary-lime` | `hsl(70, 68%, 95%)` | Modal BG, Button Default BG, Chip Active BG |
| Black | `neutral-black` | `#000000` | Text, Borders, Button Hover BG |
| Gray Light | `neutral-gray-light` | `hsl(0, 0%, 55%)` | Input Placeholder, Disabled Text/Border |
| Headline Color | `brand-indigo` | `hsl(273, 72%, 21%)` | Modal Headline, Button Active BG, Written Input Text |
| Dark Gray | `neutral-dark-gray` | `hsl(0, 0%, 35%)` | Card Time Text, Subheadline Text, Author Name Text |
| White | `neutral-white` | `#FFFFFF` | Input Default BG, Button Text (Black Variant) |
| Failure Status | `status-fail` | `hsl(0, 100%, 91%)` | Loader Fail Color, Input Error BG/Border |
| Focus Shadow | `shadow-focus` | `hsl(275, 47%, 90%)` | Input Active Shadow Blur |
| Disabled BG | `neutral-lightest` | `hsl(0, 0%, 96%)` | Input Disabled BG |
| Footer/CTA BG | `bg-lavender` | `hsl(259, 53%, 97%)` | Footer/CTA Background |

### 2. Typography

| **Usage** | **Size (px)** | **Weight** | **Tailwind Key** |
| --- | --- | --- | --- |
| Related Header | 35px | 700 (Bold) | `text-h-related` |
| Modal Headline | 35px | 500 (Medium) | `text-h-modal` |
| CTA/Hero Text | 27px | 600 (SemiBold) | `text-xl-semibold` |
| CTA Text | 27px | 400 (Regular) | **`text-xl-regular`** |
| Card Title | 18px | 700 (Bold) | `text-lg-bold` |
| Input/Button Text | 18px | 500 (Medium) | `text-lg-medium` |
| Modal Subheadline/Author Name | 18px | 400 (Regular) | `text-b-modal` |
| Input Placeholder | 16px | 500 (Medium) | `text-base-placeholder` |
| Footer/Time Text | 14px | 400 (Regular) | `text-sm-regular` |
| Card Badge | 14px | 600 (SemiBold) | `text-sm-semibold` |
| Label/Help Text | 12px | 500 (Medium) | `text-xs-label`  |

## 3. Component Usage Mappings

### 1. Button Component Usage (`Button.tsx`)

| **State/Variant** | **Background Token** | **Text Color Token** | **Border/Shadow** | **Sizing/Padding** |
| --- | --- | --- | --- | --- |
| **Base Styles (All)** | - | - | `border-2` | `w-[112px] h-14`, `py-2`, `text-lg-medium` |
| **Primary (Default)** | `bg-primary-lime` | `text-brand-indigo` | `shadow-hard-black` | - |
| **Primary (Hover)** | `bg-neutral-black` | `text-neutral-white` | `shadow-hard-black` | - |
| **Focus (All Variants)** | *Special Logic* | - | Uses `border-2 border-neutral-black` override for visual feedback. | - |
| **Secondary (Default)** | `bg-transparent` | `text-neutral-white` | `border-2 border-primary-lime` | - |
| **Black (Default/H/F/A)** | `bg-neutral-black` | `text-neutral-white` | `shadow-hard-black` | - |
| **Disabled (All)** | `opacity-50` | `text-neutral-gray-light` | No Shadow | - |

### 2. Input Text Field Usage (`Input.tsx`)

| **State** | **Border Style** | **Background Color** | **Text/Placeholder Color** | **Shadow / Label** |
| --- | --- | --- | --- | --- |
| **Default (Neutral)** | `border-t-2 border-neutral-black` | `bg-neutral-white` | `text-neutral-gray-light` (Placeholder) | No Shadow |
| **Active (Focused)** | `border-t-2 border-neutral-black` | `bg-neutral-white` | `text-brand-indigo` (Written Text) | `shadow-focus-blur` on container, Label is visible. |
| **Error** | `border-t-2 border-status-fail` | `bg-neutral-white` | `text-brand-indigo` | Help text uses `bg-status-fail`. |
| **Disabled** | `border-2 border-neutral-gray-light` | `bg-neutral-lightest` | `text-neutral-gray-light` | - |

### 3. Chip Component Usage (`Chip.tsx`)

| **State/Variant** | **Background Token** | **Text Color Token** | **Border/Radius** | **Sizing** |
| --- | --- | --- | --- | --- |
| **Base Styles** | - | - | `rounded-[56px]`, `8px` Gap | `h-[46px]` |
| **Active (Selected)** | `bg-primary-lime` | `text-neutral-black` | No Border | Includes 'X' Icon |
| **Default (Unselected)** | `bg-transparent` | `text-neutral-gray-light` | `border border-neutral-gray-light` | No Icon |

### 4. Modal Component Usage (`Modal.tsx`)

| **Element** | **Property** | **Token / Utility Class** | **Notes** |
| --- | --- | --- | --- |
| **Container Base** | Frame Style | `bg-primary-lime`, `shadow-hard-black` | Encapsulated in `.modal-container-base` custom class. |
| **Headline** | Text Color | `text-brand-indigo` | `text-h-modal` |

### 5. Loader Bar Component Usage (`LoaderBar.tsx`)

| **Element / State** | **Property** | **Token / Utility Class** | **Notes** |
| --- | --- | --- | --- |
| **Track (Unloaded Part)** | Background | `bg-neutral-gray-light` | The base color of the bar (Gray Light). |
| **Progress (Loaded Part)** | Background | `bg-neutral-black` | The moving part showing progress. |
| **Bar Height** | Height | `h-[10px]` | Fixed height from design. |
| **Status Text (e.g., "Loading 50%")** | Typography | `text-base-placeholder` (16px, 500) | Assumed to use the standard 16px placeholder font. |
| **Status Text (e.g., "Loading 50%")** | Text Color | `text-neutral-black` | Assumed standard black text. |
| **Auxiliary Text (Cancel, Retry)** | Typography | `text-base-placeholder` | Should use the same 16px font size. |
| **Failure Status** | Track Color | `bg-status-fail` | Entire bar track changes to the fail color (`hsl(0, 100%, 91%)`). |
| **Success Status** | Icon | `checkmark.svg` | Replaces the percentage text/bar entirely upon completion. |

---

## 4. Modal Component Design Decisions (`Modal.tsx`)

The Modal component implements a multi-state workflow for post creation with comprehensive error handling and user feedback. Below are the key design decisions made during implementation:


### 4.2 Error Handling Strategy

**Decision:** Implemented a two-tier error handling approach:
- **Client-side image upload errors:** Handled with retry/cancel functionality via `LoaderBar` component
- **Server-side API submission errors:** Handled with an `errorMessage` state for displaying server failures

**Implementation Details:**
- When a file upload fails locally (e.g., invalid file type, network interruption during upload), the `LoaderBar` displays a "Retry" button that resets the upload state and returns to the file selection interface
- If the form submission to the API fails, an `errorMessage` prop/state can be used to display server-side errors in the UI (currently prepared but not fully implemented as per requirements that assume submission always succeeds)

**Rationale:** This separation allows for different recovery strategies: local upload errors can be retried immediately, while server errors require different handling and user communication.

### 4.3 LoaderBar Enhancement: "Change" Button

**Decision:** Added a "Change" button to the `LoaderBar` component that appears when an image has been successfully uploaded.

**Implementation:** Extended `LoaderBar` with an `onChange` prop that triggers when the user wants to replace an already-uploaded file. This button resets the upload state and returns to the file selection interface, allowing users to select a different file or re-select the same file.

**Rationale:** Provides users with flexibility to change their file selection after successful upload without requiring them to cancel the entire form submission process.

### 4.4 Confirm Button State Management

**Decision:** The Confirm button is disabled when the `LoaderBar` is in "failure" (retry) state.

**Implementation:** Added `localUploadStatus === "failure"` to the button's disabled condition, preventing form submission while the user is in a retry state.

**Rationale:** Ensures users resolve image upload issues before proceeding with form submission, maintaining data integrity and preventing partial submissions.

### 4.5 Input File Help Text Consistency

**Decision:** Added help text support to `InputFile` component to maintain consistency with `InputText` component's error communication pattern.

**Implementation:** Wrapped `InputFile` and its error message in a flex container with consistent spacing (`mt-1`), matching the `InputText` component's help text positioning and styling.

**Rationale:** Consistent error messaging patterns improve usability by providing predictable feedback locations and maintaining visual harmony across form elements.

### 4.6 Most Viewed Posts Mocking Strategy

**Decision:** Since the API doesn't provide view counts or popularity metrics, we're using the 4 oldest posts (sorted by `publishedAt:asc`) as a mock for "most viewed" posts.

**Implementation:** The `getMostViewedPosts()` function in `lib/posts.ts` fetches posts sorted by `publishedAt:asc` (oldest first) and limits results to 4 posts. This is used in Server Components and passed as props to the `MostViewedPosts` component.

**Rationale:** This provides a consistent way to display "most viewed" content while the API doesn't support view tracking. When view counts become available in the API, this can be easily updated to use the actual view count field for sorting.

### 4.7 Static Site Generation (SSG) Strategy

**Decision:** All post detail pages (`/post/[postId]`) are generated at build time using Next.js App Router's `generateStaticParams` function.

**Implementation:** 
- The `generateStaticParams` function in `app/post/[postId]/page.tsx` fetches all posts (up to 1000) during build time
- Each post ID is converted to a static route parameter
- All post pages are pre-rendered as static HTML during the build process
- This ensures fast page loads and better SEO

**Code Location:** `app/post/[postId]/page.tsx`

```typescript
export async function generateStaticParams() {
  const allPosts = await getAllPosts(1000);
  return allPosts.map((post) => ({
    postId: post.id.toString(),
  }));
}
```

**Benefits:**
- **Performance:** Static pages load instantly without server-side rendering
- **SEO:** Search engines can crawl all post pages immediately
- **Cost:** Reduces server load by serving pre-rendered HTML
- **Scalability:** Can handle high traffic without additional server resources

**Trade-offs:**
- Build time increases with the number of posts
- New posts require a rebuild to be accessible (unless using ISR with `revalidate`)
- If you have thousands of posts, consider limiting the initial generation and using ISR for the rest

**Future Considerations:**
- If posts are added frequently, consider implementing ISR with `revalidate` to regenerate pages periodically
- For very large datasets, consider generating only the most popular posts statically and using SSR for the rest

---

## 🔧 Backend API Integration

### Backend Overview

The frontend integrates with a **NestJS** backend API that handles post creation and related posts management.

#### Backend Tech Stack

| **Component** | **Technology** | **Purpose** |
| --- | --- | --- |
| **Framework** | NestJS (Node.js with TypeScript) | REST API server |
| **Database** | PostgreSQL with Prisma ORM | Data persistence |
| **Image Storage** | Cloudinary | Automatic WebP optimization |
| **Validation** | class-validator & class-transformer | Input validation |
| **Deployment** | Render | Production hosting |

#### Backend Architecture

- **Modular REST API** with module-based architecture (Posts, Prisma)
- **DTOs** for input validation
- **Services** for business logic
- **Controllers** for HTTP endpoints
- **CORS enabled** for frontend integration
- **Automatic image optimization** (WebP conversion)
- **Error handling** with timeouts
- **Type-safe** with TypeScript and Prisma

#### Available Endpoints

| **Method** | **Endpoint** | **Description** | **Request Format** |
| --- | --- | --- | --- |
| `POST` | `/api/posts/related` | Create post with image | `multipart/form-data` |
| `GET` | `/api/posts/related` | Get the 3 most recent posts | - |

**POST Request Format:**
- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `title` (required, max 100 chars)
  - `topic` (optional, max 50 chars)
  - `image` (required, jpg/jpeg/png, max 5MB)

**Response Format:**
- **POST**: `{ message: string, post: Post }`
- **GET**: `Post[]` (array of posts, max 3 items)

**Data Model (Post):**
```typescript
{
  id: number;
  title: string;
  imageUrl: string;
  topic?: string;
  createdAt: Date;
  readTime?: number;
}
```

#### Backend URLs

- **Development**: `http://localhost:3001/api`
- **Production**: `https://litebox-challenge-webservice.onrender.com/api`

### Frontend API Configuration

#### Environment Variables

**Vercel Environment Variables:**
- `NEXT_PUBLIC_API_URL`: Backend API URL (must include `/api` suffix)
  - Production: `https://litebox-challenge-webservice.onrender.com/api`

#### CORS Configuration

The backend must be configured to allow requests from your Vercel deployment domain.

**Backend Configuration (NestJS `src/main.ts`):**
```typescript
const allowedOrigins = [
  process.env.FRONTEND_URL, // Set in Render environment variables
].filter(Boolean);

app.enableCors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

**Render Environment Variable:**
- `FRONTEND_URL`: Your Vercel deployment URL (e.g., `https://lite-tech-challenge-kappa.vercel.app`)

---

## 🔄 GitHub & GitLab Sync

This repository is synced to both GitLab (private) and GitHub (public) for deployment purposes.

**Remotes:**
- `origin`: GitLab (private repository)
- `github`: GitHub (public repository for Vercel deployment)

**Sync Scripts:**
- Windows: `.\scripts\sync-remotes.ps1`
- Linux/Mac: `./scripts/sync-remotes.sh`

See `.gitconfig-sync.md` for detailed synchronization instructions.