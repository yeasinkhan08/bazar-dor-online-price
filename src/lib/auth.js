import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing. Add it to your .env file.");
}

// Keep one MongoDB connection, even when the dev server reloads files
const client = (globalThis.bazardorMongo ??= new MongoClient(
  process.env.MONGODB_URI,
));

// "bazardor" is the database name; MongoDB creates it automatically
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    // After sign up, do NOT log the user in: send them to the sign in page
    autoSignIn: false,
  },

  // Google and GitHub login
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  // If the same email already has an account, attach Google/GitHub to it
  // instead of failing with "account_not_linked"
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  // nextCookies must be the LAST plugin in this list
  plugins: [nextCookies()],
});
