import { reactRouter } from "@react-router/dev/vite"
import { flatRoutes } from "@react-router/dev-routes"
import { defineConfig } from "vite"
import mdx from "@mdx-js/rollup"
import remarkGfm from "remark-gfm"
import rehypePrism from "@mapbox/rehype-prism"

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
      providerImportSource: "@mdx-js/react",
    }),
    reactRouter({
      ssr: true,
      routes: async (defineRoutes) => {
        return flatRoutes(defineRoutes, {
          appDirectory: "app",
        })
      },
      prerender: true,
      buildDirectory: "build",
      assetsBuildDirectory: "assets",
    }),
  ],
  // Base path for GitHub Pages - update with your repo name
  // Use "/" for custom domain
  base: process.env.GITHUB_PAGES
    ? `/${process.env.GITHUB_PAGES}/`
    : "/",
  resolve: {
    alias: {
      "@": "./src",
    },
  },
})
