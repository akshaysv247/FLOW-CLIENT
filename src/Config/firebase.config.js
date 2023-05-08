import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA3cGjRI6PXmNZyp5W7YkmzniFIiXqOzZQ',
  authDomain: 'flow-music-mern-stack.firebaseapp.com',
  projectId: 'flow-music-mern-stack',
  storageBucket: 'flow-music-mern-stack.appspot.com',
  messagingSenderId: '1073915524020',
  appId: '1:1073915524020:web:d9a56ae5a6ac8ee857f8e1',
  // apiKey: {import.meta.env.VITE_FIREBASE_API_KEY}
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export const Auth = getAuth(app);

export { app, storage };
