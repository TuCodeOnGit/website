import { PassThrough } from "node:stream"
import type { EntryContext } from "react-router"
import { renderToString } from "react-router/dom/server"

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext
) {
  return new Promise((resolve) => {
    let didError = false
    let statusCode = responseStatusCode
    let headers = responseHeaders

    // If a load throws or rejects, we let the error bubble up
    entryContext.reactRouterServerManifest = {
      // This needs to match the build directory and assetsBuildDirectory from vite.config.ts
      // with a leading slash and no trailing slash
      url: (assets: string) => `/assets/${assets}`,
    }

    let shellHtml = renderToString(
      entryContext.route.module.default,
      entryContext
    )

    let html = `<!DOCTYPE html>${shellHtml}`

    // Log for debugging
    // console.log("Response:", { statusCode, headers })

    responseHeaders.set("Content-Type", "text/html")

    resolve(
      new Response(html, {
        status: statusCode,
        headers: responseHeaders,
      })
    )
  })
}
