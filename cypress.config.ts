import { defineConfig } from "cypress";
import dotenv from "dotenv";
import { encode } from "next-auth/jwt";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        async encodeJwt(token) {
          const encToken = await encode({
            token,
            secret: process.env.NEXTAUTH_SECRET,
          });
          return encToken;
        },
      });
    },
  },
});
