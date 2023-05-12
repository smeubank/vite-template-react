import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      // https://vitejs.dev/config/
      react(),
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        org: "steven-eubank",
        project: "admin-react-vite",

        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and need `project:releases` and `org:read` scopes
        authToken: env.SENTRY_AUTH_TOKEN,

        sourcemaps: {
          // Specify the directory containing build artifacts
          assets: "./dist/**",
        },

        // Use the following option if you're on an SDK version lower than 7.47.0:
        // include: "./dist",

        // Optionally uncomment the line below to override automatic release name detection
        // release: env.RELEASE,
      }),
    ],
  };
});