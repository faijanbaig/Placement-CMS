import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import {REACT_APP_BACKEND_URL} from './variable'

export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: REACT_APP_BACKEND_URL,
  //       secure: false,
  //       changeOrigin: true,
  //     },
  //   },
  // },
  plugins: [react()],
});
