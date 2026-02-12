import * as cheerio from "cheerio"
import { Feed } from "feed"
import { getAllArticles } from "../lib/articles"

export async function loader({ request }: { request: Request }) {
  const siteUrl = process.env.SITE_URL || "http://localhost:3000"

  const author = {
    name: "Spencer Sharp",
    email: "spencer@planetaria.tech",
  }

  const feed = new Feed({
    title: author.name,
    description: "Your blog description",
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  const articles = await getAllArticles()

  for (const article of articles) {
    const publicUrl = `${siteUrl}/articles/${article.slug}`

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      description: article.description,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "content-type": "application/xml",
      "cache-control": "s-maxage=31556952",
    },
  })
}
