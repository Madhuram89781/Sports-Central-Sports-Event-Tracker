# Setup Checklist - Sports Central with Firebase

Use this checklist to ensure your Sports Central app is properly configured.

## ✅ Pre-Setup Checklist

- [ ] Node.js (v16+) installed
- [ ] npm or yarn installed
- [ ] Google account created
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command prompt access

## ✅ Firebase Project Setup

- [ ] Logged into Firebase Console (https://console.firebase.google.com/)
- [ ] Created new Firebase project
- [ ] Project name chosen (e.g., "sports-central")
- [ ] Google Analytics configured (optional)
- [ ] Project created successfully

## ✅ Firebase Authentication Setup

- [ ] Opened Authentication section
- [ ] Clicked "Get started"
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Selected support email for Google auth
- [ ] Both methods showing as "Enabled"

## ✅ Firestore Database Setup

- [ ] Opened Firestore Database section
- [ ] Clicked "Create database"
- [ ] Selected "Production mode"
- [ ] Chose database location
- [ ] Database created successfully
- [ ] Security rules configured (see below)

### Security Rules Checklist
- [ ] Opened "Rules" tab in Firestore
- [ ] Copied security rules from FIREBASE_SETUP.md
- [ ] Pasted rules into editor
- [ ] Clicked "Publish"
- [ ] Rules published successfully (no errors)

## ✅ Firebase Web App Registration

- [ ] Clicked Project Settings (gear icon)
- [ ] Scrolled to "Your apps" section
- [ ] Clicked Web icon (`</>`)
- [ ] Entered app nickname: "Sports Central Web"
- [ ] Registered app
- [ ] Copied firebaseConfig object

## ✅ Local Project Setup

- [ ] Cloned/downloaded project code
- [ ] Opened project in code editor
- [ ] Ran `npm install` successfully
- [ ] All dependencies installed (no errors)

## ✅ Firebase Configuration

- [ ] Opened `src/config/firebase.js`
- [ ] Replaced `YOUR_API_KEY` with actual apiKey
- [ ] Replaced `YOUR_AUTH_DOMAIN` with actual authDomain
- [ ] Replaced `YOUR_PROJECT_ID` with actual projectId
- [ ] Replaced `YOUR_STORAGE_BUCKET` with actual storageBucket
- [ ] Replaced `YOUR_MESSAGING_SENDER_ID` with actual messagingSenderId
- [ ] Replaced `YOUR_APP_ID` with actual appId
- [ ] Saved file

## ✅ First Run

- [ ] Ran `npm run dev` in terminal
- [ ] Development server started (no errors)
- [ ] Browser opened automatically (or manually opened localhost:5173)
- [ ] Login page displayed correctly
- [ ] No console errors in browser

## ✅ First User Creation

- [ ] Clicked "Sign in with Google" OR filled email/password form
- [ ] Successfully signed up/signed in
- [ ] Redirected to dashboard
- [ ] User dashboard displayed (not admin yet)

## ✅ Admin User Setup

- [ ] Opened Firebase Console
- [ ] Navigated to Firestore Database
- [ ] Found "users" collection
- [ ] Located your user document (by email)
- [ ] Clicked on user document
- [ ] Found "role" field (currently shows "user")
- [ ] Clicked edit icon on "role" field
- [ ] Changed value from "user" to "admin"
- [ ] Clicked "Update"
- [ ] Logged out of app
- [ ] Logged back in
- [ ] Admin dashboard now displayed
- [ ] "ADMIN" badge visible
- [ ] "New Event" button visible

## ✅ Testing Admin Features

- [ ] Clicked "New Event" button
- [ ] Modal opened successfully
- [ ] Filled in event details:
  - [ ] Event name
  - [ ] Sport type
  - [ ] Date
  - [ ] Time
  - [ ] Venue
  - [ ] Team 1 name
  - [ ] Team 2 name
- [ ] Clicked "Create Event"
- [ ] Event appeared in dashboard
- [ ] Event card displayed correctly

## ✅ Testing Live Event Features

- [ ] Found scheduled event
- [ ] Clicked "Start Live" button
- [ ] Event status changed to "LIVE"
- [ ] Live badge pulsing/animated
- [ ] Clicked "Update Score"
- [ ] Score inputs appeared
- [ ] Updated scores
- [ ] Clicked "Update" button
- [ ] Scores saved successfully
- [ ] Clicked "Complete" button
- [ ] Event marked as completed
- [ ] Winner displayed (if applicable)

## ✅ Testing User View

- [ ] Logged out of admin account
- [ ] Created new user account (different email)
- [ ] Logged in as new user
- [ ] User dashboard displayed
- [ ] "USER" badge visible
- [ ] No "New Event" button
- [ ] Can see all events
- [ ] Cannot edit or delete events
- [ ] Scores visible and updating

## ✅ Testing Real-time Sync

- [ ] Opened app in two browser windows
- [ ] Logged in as admin in window 1
- [ ] Logged in as user in window 2
- [ ] Created event in admin window
- [ ] Event appeared in user window (without refresh)
- [ ] Updated score in admin window
- [ ] Score updated in user window (without refresh)

## ✅ Testing Filters

- [ ] Clicked "Upcoming" tab
- [ ] Only scheduled events shown
- [ ] Clicked "Live" tab
- [ ] Only live events shown
- [ ] Clicked "Completed" tab
- [ ] Only completed events shown
- [ ] Clicked "All" tab
- [ ] All events shown

## ✅ Testing Authentication

- [ ] Logged out successfully
- [ ] Redirected to login page
- [ ] Tried accessing app without login (should show login page)
- [ ] Logged in with Google (if enabled)
- [ ] Logged in with Email/Password
- [ ] Both methods working

## ✅ Production Readiness

- [ ] All features tested and working
- [ ] No console errors
- [ ] Firebase quota checked (within limits)
- [ ] Authorized domains configured (if deploying)
- [ ] Environment variables set up (if needed)
- [ ] Build tested: `npm run build`
- [ ] Build completed successfully
- [ ] Preview tested: `npm run preview`

## ✅ Documentation Review

- [ ] Read README.md
- [ ] Read FIREBASE_SETUP.md
- [ ] Read USER_GUIDE.md
- [ ] Read QUICK_START_FIREBASE.md
- [ ] Understand user roles
- [ ] Know how to add more admins

## 🎯 Common Issues Checklist

If something isn't working, check:

### Authentication Issues
- [ ] Firebase config values are correct (no placeholders)
- [ ] Authentication methods enabled in Firebase Console
- [ ] Domain authorized in Firebase settings
- [ ] No typos in email/password

### Permission Issues
- [ ] Firestore security rules published
- [ ] User role set correctly in Firestore
- [ ] User is authenticated (logged in)
- [ ] No pending rule changes

### Display Issues
- [ ] Browser cache cleared
- [ ] Page refreshed
- [ ] Console checked for errors
- [ ] Network tab checked for failed requests

### Data Issues
- [ ] Firestore database created
- [ ] Collections exist (users, events)
- [ ] Internet connection stable
- [ ] Firebase project not paused/disabled

## 📞 Getting Help

If you're stuck:

1. Check console for error messages
2. Review Firebase Console for issues
3. Verify all checklist items above
4. Check documentation files
5. Review Firebase documentation
6. Check browser network tab

## 🎉 Success Criteria

Your setup is complete when:

✅ You can sign in with Google or Email  
✅ Admin users see admin dashboard with "New Event" button  
✅ Regular users see user dashboard (read-only)  
✅ Events can be created, updated, and deleted by admins  
✅ Scores update in real-time across all users  
✅ Role-based access is enforced  
✅ No console errors  
✅ All features working as expected  

---

**Congratulations! Your Sports Central app is ready to use! 🏆**

For ongoing use:
- Admins: Create and manage events
- Users: View and track events
- Everyone: Enjoy real-time sports tracking!

