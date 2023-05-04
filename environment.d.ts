declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      AUTH_USERNAME: string;
      AUTH_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
}

export {};
