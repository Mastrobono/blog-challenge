import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ],
  "viteFinal": async (config) => {
    // Ensure React runs in development mode
    config.mode = "development";
    config.define = {
      ...config.define,
      "process.env.NODE_ENV": JSON.stringify("development"),
      "import.meta.env.MODE": JSON.stringify("development"),
      "import.meta.env.DEV": true,
      "import.meta.env.PROD": false,
    };
    
    // Ensure React is optimized for development
    if (config.optimizeDeps) {
      config.optimizeDeps.include = [
        ...(config.optimizeDeps.include || []),
        "react",
        "react-dom",
      ];
    }
    
    return config;
  },
};
export default config;