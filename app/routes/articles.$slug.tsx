import { json, type LoaderFunctionArgs } from "react-router"
import { useLoaderData } from "react-router"

import { ArticleLayout } from "@/components/ArticleLayout"
import { type ArticleWithSlug, getAllArticles } from "../lib/articles"
import { Article as ArticleComponent } from "./articles"

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { slug } = params
  const articles = await getAllArticles()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    throw new Response("Not Found", { status: 404 })
  }

  // Dynamically import the MDX file based on slug
  let articleModule: any
  try {
    articleModule = await import(`../routes/articles/${slug}/*.mdx`)
  } catch {
    throw new Response("Not Found", { status: 404 })
  }

  return json({ article, articleModule })
}

export default function Article() {
  const { article, articleModule } = useLoaderData<typeof loader>()
  const { default: ArticleContent } = articleModule

  return (
    <ArticleLayout article={article}>
      <ArticleContent />
    </ArticleLayout>
  )
}
