# Firebase Setup Guide for Sports Central

This guide will help you set up Firebase Authentication and Firestore for the Sports Central application.

## Prerequisites

- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "sports-central")
4. Follow the setup wizard (you can disable Google Analytics if you don't need it)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Enter an app nickname (e.g., "Sports Central Web")
3. Check "Also set up Firebase Hosting" if you want to deploy later (optional)
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need this in Step 5

## Step 3: Enable Authentication

1. In the Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Go to the **Sign-in method** tab
4. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"
5. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Select a support email
   - Click "Save"

## Step 4: Set Up Firestore Database

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode** (we'll set up rules next)
4. Select a Cloud Firestore location (choose one closest to your users)
5. Click "Enable"

### Set Up Firestore Security Rules

1. Go to the **Rules** tab in Firestore
2. Replace the default rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read their own data, only they can write
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Events collection
    match /events/{eventId} {
      // Anyone authenticated can read events
      allow read: if request.auth != null;
      
      // Only admins can create, update, or delete events
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

3. Click "Publish"

## Step 5: Configure Your Application

1. Open `src/config/firebase.js` in your project
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

You can find these values in:
- Firebase Console → Project Settings (gear icon) → General → Your apps → SDK setup and configuration

## Step 6: Create Your First Admin User

Since the first user will be created with the "user" role by default, you need to manually promote them to admin:

1. Sign up for an account in your application
2. Go to Firebase Console → **Build** → **Firestore Database**
3. Find the `users` collection
4. Click on your user document (identified by your user ID)
5. Click "Edit field" on the `role` field
6. Change the value from `"user"` to `"admin"`
7. Click "Update"
8. Log out and log back in to see the admin dashboard

## Step 7: Run Your Application

```bash
npm run dev
```

Your application should now be running with Firebase authentication and Firestore!

## User Roles

### Admin
- Can create, edit, and delete events
- Can update scores and event status
- Full CRUD access to all events

### User (Default)
- Can view all events
- Can see live scores and updates
- Read-only access

## Troubleshooting

### "Firebase: Error (auth/unauthorized-domain)"
1. Go to Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your localhost domain (e.g., `localhost`) and your production domain

### "Missing or insufficient permissions"
1. Check that your Firestore security rules are set up correctly
2. Make sure the user has the correct role in the `users` collection
3. Verify that the user is authenticated

### Google Sign-In not working
1. Make sure Google sign-in is enabled in Firebase Console
2. Check that you've selected a support email
3. Verify your domain is authorized

## Additional Features

### Adding More Admins
1. Have the user sign up normally
2. Go to Firestore Database → `users` collection
3. Find their user document
4. Change their `role` field from `"user"` to `"admin"`

### Backup Your Data
Regularly export your Firestore data:
1. Go to Firebase Console → **Firestore Database**
2. Click the three dots menu → **Export data**

## Security Best Practices

1. **Never commit your Firebase config with real credentials to public repositories**
2. Use environment variables for sensitive data in production
3. Regularly review your Firestore security rules
4. Monitor authentication activity in the Firebase Console
5. Enable App Check for additional security (optional but recommended)

## Next Steps

- Set up Firebase Hosting for deployment
- Add email verification for new users
- Implement password reset functionality
- Add more granular permissions
- Set up Firebase Analytics to track usage

## Support

For more information, visit:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)

