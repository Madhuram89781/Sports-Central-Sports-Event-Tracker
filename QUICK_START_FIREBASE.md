# Quick Start Guide - Firebase Integration

Get your Sports Central app running with Firebase in 10 minutes!

## ⚡ Quick Setup Steps

### 1. Install Dependencies ✅
Already done! Firebase and react-router-dom are installed.

### 2. Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "sports-central" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 3. Enable Authentication (2 minutes)

1. In Firebase Console, click **Authentication** → **Get started**
2. Click **Sign-in method** tab
3. Enable **Email/Password** → Toggle ON → Save
4. Enable **Google** → Toggle ON → Select support email → Save

### 4. Create Firestore Database (2 minutes)

1. Click **Firestore Database** → **Create database**
2. Choose **Production mode**
3. Select your location
4. Click **Enable**

### 5. Set Security Rules (1 minute)

In Firestore → **Rules** tab, paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

Click **Publish**.

### 6. Get Firebase Config (1 minute)

1. Click **Project Settings** (gear icon)
2. Scroll to "Your apps" → Click Web icon `</>`
3. Register app with nickname "Sports Central Web"
4. Copy the `firebaseConfig` object

### 7. Update Your App (1 minute)

Open `src/config/firebase.js` and replace:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // ← Paste your values here
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 8. Run the App

```bash
npm run dev
```

### 9. Create Admin User

1. Open http://localhost:5173
2. Sign up with Google or Email
3. Go to Firebase Console → **Firestore Database**
4. Click **users** collection → Your user document
5. Edit `role` field: change `"user"` to `"admin"`
6. Log out and log back in

### 10. Start Using! 🎉

You now have:
- ✅ Google Sign-In
- ✅ Email/Password authentication
- ✅ Admin dashboard (create/edit/delete events)
- ✅ User dashboard (view-only)
- ✅ Real-time score updates
- ✅ Secure role-based access

## 🎯 What You Can Do Now

### As Admin:
1. Click "New Event" to create a sports event
2. Fill in details (name, sport, teams, date, venue)
3. Click "Start Live" to begin tracking
4. Update scores in real-time
5. Click "Complete" when finished

### As User:
1. View all events
2. See live score updates automatically
3. Filter by Upcoming/Live/Completed
4. See winners and match details

## 🔧 Troubleshooting

**Can't sign in?**
- Check Firebase config is correct in `src/config/firebase.js`
- Verify authentication methods are enabled

**Permission denied?**
- Check Firestore security rules are published
- Verify user role is set correctly

**Domain not authorized?**
- Firebase Console → Authentication → Settings → Authorized domains
- Add `localhost`

## 📚 Next Steps

- Read [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup
- Check [USER_GUIDE.md](./USER_GUIDE.md) for usage instructions
- Review [README.md](./README.md) for full documentation

## 🚀 Deploy to Production

When ready to deploy:

1. Add your production domain to Firebase authorized domains
2. Update Firestore security rules if needed
3. Build: `npm run build`
4. Deploy to Firebase Hosting, Vercel, or Netlify

---

**You're all set! Happy tracking! 🏆**

