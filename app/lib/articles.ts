import glob from 'fast-glob'

interface Article {
  title: string
  description: string
  author: string
  date: string
}

export interface ArticleWithSlug extends Article {
  slug: string
}

// This function is used for SSR/build time
// For dynamic imports in the route, we'll use a different approach
export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  let articleFilenames = await glob('*/page.mdx', {
    cwd: './src/app/articles',
  })

  let articles: ArticleWithSlug[] = []

  for (let articleFilename of articleFilenames) {
    let slug = articleFilename.replace(/(\/page)?\.mdx$/, '')

    // Use Vite's dynamic import
    let module: any
    try {
      module = await import(`../../src/app/articles/${articleFilename}`)
    } catch {
      continue
    }

    if (module.article) {
      articles.push({
        slug,
        ...module.article,
      })
    }
  }

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

// For getting a single article (used in routes)
export async function getArticle(slug: string): Promise<ArticleWithSlug | null> {
  const articles = await getAllArticles()
  return articles.find(a => a.slug === slug) || null
}
