import { z } from 'zod';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfigSchema = z.object({
  apiKey: z.optional(z.string()),
  authDomain: z.optional(z.string()),
  databaseURL: z.optional(z.string()),
  projectId: z.optional(z.string()),
  storageBucket: z.optional(z.string()),
  messagingSenderId: z.optional(z.string()),
  appId: z.optional(z.string()),
  measurementId: z.optional(z.string()),
});

type IFirebaseConfig = z.infer<typeof firebaseConfigSchema>;

const firebaseConfig: IFirebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(app);

export { auth };
