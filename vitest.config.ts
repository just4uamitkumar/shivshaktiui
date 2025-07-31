import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
    //  coverage: {
    //   // provider: "istanbul",
    //   reporter: ["text", "json", "html"],
    //   include: ["src/components/**/*.{ts,tsx}"],
    //   // exclude: ["src/components/pages/Jyotirling/__test__/**/*"],
    // },
  },
});
