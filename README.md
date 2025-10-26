# Melissa's Musings — Static Firebase Blog

A lightweight static version of Melissa's Musings that runs entirely in the browser. The site is built with plain HTML, CSS, and vanilla JavaScript and connects directly to Firebase for data storage, authentication, and media.

You can host the finished site anywhere that serves static files (GitHub Pages, Netlify, Firebase Hosting, S3, etc.). No Node.js runtime or build step is required—just upload the files.

## Features
- **Firebase-backed content**: Posts and videos are stored in Firestore. The public site reads them client-side.
- **Admin authoring**: Email/password login (via Firebase Authentication) unlocks forms to create posts and videos.
- **Markdown support**: Post content is stored as Markdown and rendered with [marked](https://marked.js.org/).
- **Responsive layout**: Clean, modern styling with a single `styles.css` file (no Tailwind or PostCSS).
- **Pure static assets**: All pages are plain `.html` files with `type="module"` scripts—perfect for GitHub Pages.

## Project structure
```
.
├── admin.html            # Admin dashboard (requires Firebase auth)
├── category.html         # Category listing (?slug=faith, life, reflection, books, random)
├── index.html            # Homepage with hero, featured posts, recent posts, video highlights
├── post.html             # Individual post view (?id=POST_ID)
├── posts.html            # All posts with search + category filter
├── videos.html           # Video library
├── styles.css            # Global styles
├── firebase-config.js    # Firebase settings (update with your project details)
└── js/
    ├── admin.js          # Auth + content creation logic
    ├── app.js            # Homepage content loaders
    ├── category.js       # Category view logic
    ├── firebase.js       # Firebase app bootstrap
    ├── helpers.js        # Shared helpers/constants
    ├── post.js           # Single post view
    ├── posts.js          # Posts list with filters
    └── videos.js         # Video library loader
```

## 1. Configure Firebase
The project expects a `firebase-config.js` file at the repo root. A template is already present:

```js
// firebase-config.js
export const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}
```

Update each value with the exact configuration from **Firebase Console → Project settings → General**. Firebase API keys are safe to keep in client-side code—they only authorize requests to the resources you allow under your security rules.

If you plan to use Firebase Authentication for the admin area:
1. Enable the **Email/Password** sign-in provider.
2. Create an admin user under **Authentication → Users**.

### Firestore structure
The scripts expect two collections:

- `posts`
  ```json
  {
    "title": "String",
    "excerpt": "String",
    "content": "Markdown string",
    "category": "faith|life|reflection|books|random",
    "tags": ["array", "of", "strings"],
    "featured": true,
    "imageUrl": "https…",
    "videoUrl": "https://youtube.com/watch?v=…",
    "videoTitle": "String",
    "videoDescription": "String",
    "readTime": 4,
    "author": "Melissa",
    "publishedAt": Timestamp,
    "createdAt": Timestamp,
    "updatedAt": Timestamp
  }
  ```

- `videos`
  ```json
  {
    "title": "String",
    "description": "String",
    "youtubeUrl": "https://youtube.com/watch?v=…",
    "youtubeId": "11-character ID",
    "thumbnailUrl": "https://img.youtube.com…",
    "category": "faith|life|reflection|books|random",
    "tags": ["array", "of", "strings"],
    "publishedAt": Timestamp,
    "createdAt": Timestamp
  }
  ```

The admin panel will generate these documents for you, including read time calculation and timestamps.

### Recommended Firestore rules
For a read-only public site with authenticated admin writes, a simple starting point is:
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
Adjust the rules to match your security requirements before launching.

## 2. Test locally (optional but recommended)
No tooling is required—you can open the HTML files directly in a browser. For local Firebase access, load the files via a local web server to avoid CORS restrictions:

```bash
npx serve .
# or python -m http.server 3000
```

Then visit `http://localhost:3000/index.html` (or the port printed by your server).

## 3. Deploy to GitHub Pages
1. Commit the project to GitHub.
2. In **Settings → Pages**, choose the branch (`main`, for example) and the `/ (root)` directory.
3. Click save—GitHub will publish `index.html` automatically.

No build step is necessary; every file is ready-to-serve.

## 4. Admin workflow
1. Navigate to `/admin.html`.
2. Sign in with an email/password account that exists in your Firebase project.
3. Use the post or video form to add content (forms validate basic fields and display inline success badges).
4. New content appears immediately because the frontend reads straight from Firestore.

## 5. Customisation
- **Styling**: Tweak `styles.css`. It contains all layout and component styles.
- **Categories**: Update the category list in `js/helpers.js` if you want different taxonomy.
- **Copy**: Hero text, about section, and footer copy live in the relevant HTML files.
- **Markdown**: The [marked](https://marked.js.org/) CDN script renders post content. Replace or extend it if you need custom markdown behaviour.

## 6. Troubleshooting
- **Blank sections**: Check the browser console for Firebase errors—missing configuration values or Firestore permission issues are the most common causes.
- **Authentication failures**: Ensure Email/Password provider is enabled and the user exists. Error messages from Firebase are surfaced in the admin UI.
- **CORS or blocked requests**: Serve the files via HTTPS (GitHub Pages does this automatically). When testing locally, use a simple dev server rather than `file://` URLs.

## License
This project remains available under the [MIT License](LICENSE).
