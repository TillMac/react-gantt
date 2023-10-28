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
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = getAuth(app);

export { auth };
