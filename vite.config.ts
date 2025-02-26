import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxFactory: "h",
    jsxInject: `import { h } from './lib/jsx/jsx-runtime'`,
    jsxFragment: "Fragment",
  },
});
