/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_APP_BASE_PATH || "",
    plugins: [react(), tailwindcss()],
  });
};
