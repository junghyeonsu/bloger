declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      TISTORY_APP_ID: string;
      TISTORY_SECRET_KEY: string;
      TISTORY_ACCESS_TOKEN: string;
    }
  }
}

export {};
