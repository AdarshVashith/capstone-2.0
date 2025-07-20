import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Demo Firebase configuration for development
const firebaseConfig = {
  apiKey: "AIzaSyDemo-Kitchen-Recipe-Finder-Key-123456789",
  authDomain: "kitchen-recipe-finder-demo.firebaseapp.com",
  projectId: "kitchen-recipe-finder-demo",
  storageBucket: "kitchen-recipe-finder-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:demo123456789abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// For demo purposes, we'll use Firebase emulators in development
if (window.location.hostname === 'localhost') {
  try {
    // Connect to auth emulator
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    // Connect to firestore emulator
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    // Emulators already connected or not available
    console.log('Firebase emulators not available, using demo mode');
  }
}

export default app;