import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";
// The app's design tokens + Tailwind utilities. Importing the same stylesheet the
// app uses makes Storybook the design-system source of truth: every story renders
// against the real tokens, and the light/dark blocks below drive the theme switch.
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // Toolbar theme switch flips `data-theme` on <html>; the token
    // `:root[data-theme="…"]` blocks in globals.css do the rest.
    withThemeByDataAttribute({
      attributeName: "data-theme",
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
