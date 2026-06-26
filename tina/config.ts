import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Site settings",
        path: "content",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "hero_headline", label: "Hero headline" },
          {
            type: "string",
            name: "hero_subtext",
            label: "Hero subtext",
            ui: { component: "textarea" },
          },
          {
            type: "boolean",
            name: "promo_banner_active",
            label: "Show promo banner",
          },
          { type: "string", name: "promo_banner_text", label: "Banner copy" },
          {
            type: "string",
            name: "promo_banner_cta",
            label: "Banner button label",
          },
          {
            type: "string",
            name: "promo_banner_url",
            label: "Banner button link",
          },
        ],
      },
    ],
  },
});
