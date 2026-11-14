export type CardLayout = "kanji" | "word" | "kana" | "back"

export type CardFace = {
  id: string
  layout: CardLayout
  glyph: string
  reading?: string
  pairGlyph?: string
  meaning: string
  series?: string
  image?: string
  alt?: string
}

export type ProductSpec = {
  label: string
  value: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  details: string
  price: string
  priceNote: string
  images: string[]
  cardCount: string
  size: string
  paper?: string
  features: string[]
  accessories: string[]
  orientation: "portrait" | "landscape"
  faces: CardFace[]
  specs: ProductSpec[]
}
