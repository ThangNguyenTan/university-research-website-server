declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      AUTH_USERNAME: string;
      AUTH_PASSWORD: string;
      JWT_SECRET: string;
      FIREBASE_ACCOUNT_TYPE: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_PRIVATE_KEY_ID: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_CLIENT_ID: string;
      FIREBASE_AUTH_URI: string;
      FIREBASE_TOKEN_URI: string;
      FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
      FIREBASE_CLIENT_X509_CERT_URL: string;
      FIREBASE_BASE64_FILE: string;
    }
  }
}

export {};
