// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import { crx } from "file:///home/project/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Email Reply Assistant",
  version: "1.0",
  description: "AI-powered email reply suggestions using Gemini",
  permissions: [
    "activeTab",
    "storage"
  ],
  host_permissions: [
    "https://gmail.com/*",
    "https://mail.google.com/*"
  ],
  action: {
    default_popup: "index.html",
    default_icon: {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: [
        "https://mail.google.com/*",
        "https://gmail.com/*"
      ],
      js: ["src/content.ts"]
    }
  ],
  icons: {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [crx({ manifest: manifest_default })],
  build: {
    rollupOptions: {
      input: {
        popup: "index.html",
        background: "src/background.ts",
        content: "src/content.ts"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIHBvcHVwOiAnaW5kZXguaHRtbCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICdzcmMvYmFja2dyb3VuZC50cycsXG4gICAgICAgIGNvbnRlbnQ6ICdzcmMvY29udGVudC50cydcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pOyIsICJ7XG4gIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICBcIm5hbWVcIjogXCJFbWFpbCBSZXBseSBBc3Npc3RhbnRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBSS1wb3dlcmVkIGVtYWlsIHJlcGx5IHN1Z2dlc3Rpb25zIHVzaW5nIEdlbWluaVwiLFxuICBcInBlcm1pc3Npb25zXCI6IFtcbiAgICBcImFjdGl2ZVRhYlwiLFxuICAgIFwic3RvcmFnZVwiXG4gIF0sXG4gIFwiaG9zdF9wZXJtaXNzaW9uc1wiOiBbXG4gICAgXCJodHRwczovL2dtYWlsLmNvbS8qXCIsXG4gICAgXCJodHRwczovL21haWwuZ29vZ2xlLmNvbS8qXCJcbiAgXSxcbiAgXCJhY3Rpb25cIjoge1xuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcImluZGV4Lmh0bWxcIixcbiAgICBcImRlZmF1bHRfaWNvblwiOiB7XG4gICAgICBcIjE2XCI6IFwiaWNvbnMvaWNvbjE2LnBuZ1wiLFxuICAgICAgXCI0OFwiOiBcImljb25zL2ljb240OC5wbmdcIixcbiAgICAgIFwiMTI4XCI6IFwiaWNvbnMvaWNvbjEyOC5wbmdcIlxuICAgIH1cbiAgfSxcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL2JhY2tncm91bmQudHNcIixcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxuICB9LFxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAge1xuICAgICAgXCJtYXRjaGVzXCI6IFtcbiAgICAgICAgXCJodHRwczovL21haWwuZ29vZ2xlLmNvbS8qXCIsXG4gICAgICAgIFwiaHR0cHM6Ly9nbWFpbC5jb20vKlwiXG4gICAgICBdLFxuICAgICAgXCJqc1wiOiBbXCJzcmMvY29udGVudC50c1wiXVxuICAgIH1cbiAgXSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxNlwiOiBcImljb25zL2ljb24xNi5wbmdcIixcbiAgICBcIjQ4XCI6IFwiaWNvbnMvaWNvbjQ4LnBuZ1wiLFxuICAgIFwiMTI4XCI6IFwiaWNvbnMvaWNvbjEyOC5wbmdcIlxuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxTQUFTLFdBQVc7OztBQ0RwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0JBQW9CO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixjQUFnQjtBQUFBLE1BQ2QsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLFNBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLElBQU0sQ0FBQyxnQkFBZ0I7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQ0Y7OztBRG5DQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxFQUFFLDJCQUFTLENBQUMsQ0FBQztBQUFBLEVBQzNCLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLFlBQVk7QUFBQSxRQUNaLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
