import { useEffect } from "react"
import { absoluteUrl } from "../data/site"

type PageMeta = {
  title: string
  description: string
  path: string
  noindex?: boolean
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute("content", content)
}

export function usePageMeta({ title, description, path, noindex = false }: PageMeta) {
  useEffect(() => {
    document.title = title
    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", absoluteUrl(path))
    upsertMeta("property", "og:type", "website")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow")

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute("href", absoluteUrl(path))
  }, [title, description, path, noindex])
}
