# Melissa's Musings

A modern, feature-rich blogging platform built with Next.js, TypeScript, Tailwind CSS, and Firebase. It is perfect for sharing thoughtful posts, video reflections, and curated resources about faith, life, and everything in between.

## Features
- Responsive layout with polished typography and reusable Tailwind components
- Admin dashboard with post composer (markdown preview), video manager, and analytics placeholders
- Firebase authentication, Firestore collections for posts and videos, and optional storage integration
- Category pages, recent and featured post highlights, and dynamic post detail routes
- Ready-to-customize marketing pages (home, about, contact) and category navigation

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or your preferred Node package manager
- A Firebase project with Authentication and Firestore enabled

### Installation
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd melissas-musings
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Copy the sample environment file and update it with your Firebase project details
   ```bash
   cp env.example .env.local
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000` in your browser

## Environment Variables

The Firebase client SDK is configured via the following `NEXT_PUBLIC_` variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

All values must be present locally and in your hosting platform (for example, Vercel) or the app will refuse to initialize Firebase.

## Firebase Setup Checklist
1. Enable Email/Password authentication in Firebase Authentication.
2. Create a Firestore database (production mode recommended).
3. Optional: enable Cloud Storage if you plan to support media uploads.
4. Apply security rules similar to the policies in `firestore.rules`.

## Project Structure

```
app/
  about/              - About page
  admin/              - Admin dashboard and login
  category/[slug]/    - Category listing page
  contact/            - Contact form
  posts/              - Posts index and detail routes
  videos/             - Video library
  globals.css         - Tailwind layers and global styles
  layout.tsx          - Root layout
  page.tsx            - Homepage
components/           - Reusable UI components
hooks/                - Custom React hooks (auth)
lib/                  - Firebase initialization and data helpers
public/               - Static assets (add as needed)
```

## Customization Notes
- Update site branding in `components/Header.tsx`, `components/Footer.tsx`, and the hero component.
- Tailwind colors and typography live in `tailwind.config.js` and `app/globals.css`.
- Categories can be adjusted in `components/Categories.tsx`, `components/PostEditor.tsx`, and `app/posts/page.tsx`.
- Replace placeholder copy on the About and Contact pages with your own story and details.

## Deployment
1. Commit your changes and push to GitHub.
2. Deploy on Vercel (recommended) or any platform that supports Next.js 13+.
3. Add the same environment variables from `.env.local` to your hosting provider.
4. Configure Firebase authentication domains to include your production URL.

## Usage Tips
- Admin login is available at `/admin/login`; create admin users directly in Firebase Authentication.
- The post editor supports markdown content and estimates reading time automatically.
- Video manager accepts full YouTube URLs and derives thumbnail previews.
- Category pages and the post detail route fetch live content from Firestore.

## Roadmap Ideas
- Image upload support (Firebase Storage or UploadThing)
- Comment system or guestbook
- Newsletter signup integration
- Dark mode toggle
- Analytics integrations (Plausible, Google Analytics, etc.)

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request describing your updates.

## License

This project is available under the [MIT License](LICENSE).

## Acknowledgments
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Lucide Icons](https://lucide.dev/)
