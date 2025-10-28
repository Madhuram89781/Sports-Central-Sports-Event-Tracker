# Sports Central - Real-time Sports Event Tracker

A modern, real-time sports event tracking application with Firebase authentication and role-based access control. Built with React, Vite, TailwindCSS, and Firebase.

## 🌟 Features

### Authentication & Authorization
- 🔐 Google Sign-In integration
- 📧 Email/Password authentication
- 👥 Role-based access control (Admin/User)
- 🔒 Secure Firebase authentication

### For All Users
- 📅 View all sports events in real-time
- 🏆 Live score updates with Firestore real-time sync
- 🎯 Support for multiple sports (Football, Basketball, Tennis, Cricket, Baseball, Volleyball)
- 🏏 Special cricket scoring with wickets and overs
- 📊 Filter events by status (Upcoming, Live, Completed, All)
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design

### For Admin Users
- ➕ Create new sports events
- ✏️ Update scores and event details
- 🎮 Start and manage live events
- 🗑️ Delete events
- 📊 Full CRUD operations on all events

## Performance Optimizations

This application is built with efficiency in mind:

1. **React.memo**: Components are memoized to prevent unnecessary re-renders
2. **useMemo**: Expensive computations (like filtering events) are cached
3. **useCallback**: Event handlers are memoized to maintain referential equality
4. **Code Splitting**: Vendor and icon libraries are split into separate chunks
5. **localStorage Hook**: Custom hook for efficient data persistence
6. **Component Modularity**: Split into smaller, focused components for better tree-shaking

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Firebase** - Authentication and Firestore database
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google account for Firebase
- Firebase project (see setup guide below)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd sports-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication (Google & Email/Password)
- Set up Firestore database
- Configure security rules
- Get your Firebase configuration

### 4. Configure Firebase in your app

Edit `src/config/firebase.js` and replace the placeholder values with your Firebase configuration:

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

### 5. Start the development server

```bash
npm run dev
```

### 6. Create your first admin user

1. Sign up for an account in the application
2. Go to Firebase Console → Firestore Database
3. Find your user in the `users` collection
4. Change the `role` field from `"user"` to `"admin"`
5. Log out and log back in

## 📖 Usage Guide

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions on how to use the application.

### Quick Start

#### As a User
1. Sign in with Google or Email
2. Browse events using the tabs (Upcoming, Live, Completed, All)
3. View real-time score updates
4. See winners and match details

#### As an Admin
1. Sign in with an admin account
2. Click "New Event" to create events
3. Click "Start Live" to begin tracking
4. Update scores in real-time
5. Click "Complete" when the event finishes

## 📁 Project Structure

```
sports-central/
├── src/
│   ├── components/
│   │   ├── AddEventModal.jsx         # Event creation modal
│   │   ├── EventCard.jsx             # Event card for admins
│   │   ├── EventCardReadOnly.jsx     # Event card for users
│   │   ├── ScoreCard.jsx             # Score display component
│   │   ├── EmptyState.jsx            # Empty state placeholder
│   │   ├── Login.jsx                 # Login/Signup page
│   │   ├── AdminDashboard.jsx        # Admin interface
│   │   └── UserDashboard.jsx         # User interface
│   ├── context/
│   │   └── AuthContext.jsx           # Authentication context
│   ├── config/
│   │   └── firebase.js               # Firebase configuration
│   ├── hooks/
│   │   └── useLocalStorage.js        # Custom localStorage hook
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # Application entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
├── FIREBASE_SETUP.md                 # Firebase setup guide
├── USER_GUIDE.md                     # User documentation
├── index.html                        # HTML template
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
└── package.json                     # Project dependencies
```

## 🔒 Security

- Firebase Authentication for secure user management
- Firestore security rules to protect data
- Role-based access control
- Admin privileges required for write operations
- Encrypted password storage

## 🎯 User Roles

### User (Default)
- ✅ View all events
- ✅ See live scores
- ✅ Filter events
- ❌ Cannot create/edit/delete events

### Admin
- ✅ All user capabilities
- ✅ Create events
- ✅ Update scores
- ✅ Edit events
- ✅ Delete events
- ✅ Manage live events

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 👀 Preview Production Build

```bash
npm run preview
```

## 🐛 Troubleshooting

### Authentication Issues
- Verify Firebase configuration is correct
- Check that authentication methods are enabled in Firebase Console
- Ensure your domain is authorized in Firebase settings

### Firestore Permission Errors
- Verify security rules are set up correctly
- Check that user has the correct role in Firestore
- Ensure user is authenticated

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

## 📚 Documentation

- [Firebase Setup Guide](./FIREBASE_SETUP.md) - Complete Firebase configuration
- [User Guide](./USER_GUIDE.md) - How to use the application
- [Optimizations](./OPTIMIZATIONS.md) - Performance improvements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Authentication by [Firebase](https://firebase.google.com/)
- UI framework by [TailwindCSS](https://tailwindcss.com/)
- Built with ❤️ using React and Firebase

## 📞 Support

For issues and questions:
- Check the [User Guide](./USER_GUIDE.md)
- Review [Firebase Setup Guide](./FIREBASE_SETUP.md)
- Open an issue on GitHub

---

**Happy tracking! 🏆⚽🏀🎾🏏**

