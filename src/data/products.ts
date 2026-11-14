import type { CardFace, Product, ProductSpec } from "../types/product"

type ProductDraft = Omit<Product, "specs" | "images"> & {
  extraSpecs?: ProductSpec[]
}

function faceAlt(face: CardFace) {
  if (face.alt) return face.alt
  if (face.layout === "kana") {
    return `Hiragana ${face.glyph}, katakana ${face.pairGlyph ?? ""}, o’qilishi ${face.meaning}`
  }
  if (face.layout === "back") {
    return `Kartaning orqa tomoni: ${face.meaning}. Kanji ${face.glyph}, o’qilishi ${face.reading ?? ""}`
  }
  if (face.layout === "word") {
    return `${face.glyph}, o’qilishi ${face.reading ?? ""}, ma’nosi ${face.meaning}`
  }
  return `Kanji ${face.glyph}, o’qilishi ${face.reading ?? ""}, ma’nosi ${face.meaning}`
}

function createProduct(input: ProductDraft): Product {
  const { extraSpecs = [], ...product } = input
  const specs: ProductSpec[] = [
    { label: "Kartalar", value: product.cardCount },
    ...(product.paper ? [{ label: "Qog’oz", value: product.paper }] : []),
    { label: "O’lcham", value: product.size },
    ...extraSpecs,
    ...product.accessories.map((value) => ({ label: "Aksessuar", value })),
  ]

  return {
    ...product,
    specs,
    images: product.faces.map(faceAlt),
  }
}

type KanaMark = { n: string; glyph: string; reading: string }

function kanaFaces(script: "hiragana" | "katakana", label: string, marks: KanaMark[]): CardFace[] {
  const study = marks.flatMap((mark) => [
    {
      id: `${script}-${mark.n}-front`,
      layout: "kana" as const,
      glyph: mark.glyph,
      meaning: mark.reading,
      image: `/cards/${script}/${mark.n}-front.png`,
      alt: `${label} ${mark.glyph}, o’qilishi ${mark.reading}. Old tomon: yozish tartibi va misol so’zlar.`,
    },
    {
      id: `${script}-${mark.n}-back`,
      layout: "back" as const,
      glyph: mark.glyph,
      meaning: mark.reading,
      image: `/cards/${script}/${mark.n}-back.png`,
      alt: `${label} ${mark.glyph}, o’qilishi ${mark.reading}. Orqa tomon: o’qilish, o’zbekcha tarjima va gap.`,
    },
  ])

  const extras: CardFace[] = [
    {
      id: `${script}-047-front`,
      layout: "kana",
      glyph: label,
      meaning: "Qanday o’rganamiz",
      image: `/cards/${script}/047-front.png`,
      alt: `${label}: qanday o’rganish tartibi.`,
    },
    {
      id: `${script}-047-back`,
      layout: "back",
      glyph: label,
      meaning: "Takrorlash rejasi",
      image: `/cards/${script}/047-back.png`,
      alt: `${label}: takrorlash rejasi — 1, 2, 4, 7 va 14-kun.`,
    },
    {
      id: `${script}-048-front`,
      layout: "kana",
      glyph: label,
      meaning: "Adashtirmang",
      image: `/cards/${script}/048-front.png`,
      alt: `${label}: o’xshash belgilarni solishtirish.`,
    },
    {
      id: `${script}-048-back`,
      layout: "back",
      glyph: label,
      meaning: "Farqlash",
      image: `/cards/${script}/048-back.png`,
      alt: `${label}: o’xshash belgilarni qanday farqlash mumkin.`,
    },
  ]

  return [...study, ...extras]
}

function kanaProduct(input: {
  id: string
  slug: string
  name: string
  script: "hiragana" | "katakana"
  label: string
  description: string
  details: string
  marks: KanaMark[]
}): Product {
  return createProduct({
    id: input.id,
    slug: input.slug,
    name: input.name,
    description: input.description,
    details: input.details,
    price: "Tez orada",
    priceNote: "Hozircha narx e’lon qilinmagan.",
    cardCount: "50 ta karta",
    size: "88 × 58 mm",
    features: [
      "46 ta asosiy belgi",
      "Yozish tartibi va 6 ta misol so’z",
      "Orqa tomonda o’qilish, tarjima va gap",
      "O’rganish tartibi va o’xshash belgilar kartasi",
    ],
    accessories: [],
    orientation: "landscape",
    extraSpecs: [{ label: "Chop", value: "Ikki tomonlama chop" }],
    faces: kanaFaces(input.script, input.label, input.marks),
  })
}

export const products: Product[] = [
  kanaProduct({
    id: "hiragana",
    slug: "japanese-hiragana",
    name: "Japanese Hiragana Flashcards",
    script: "hiragana",
    label: "Hiragana",
    description:
      "Hiragana yozuvini yodlash, yozish tartibini ko’rish va so’zlar bilan mustahkamlash uchun 50 ta karta.",
    details:
      "46 ta asosiy belgi: old tomonda katta yozuv, yozish tartibi va 6 ta misol so’z, orqa tomonda o’qilish, o’zbekcha tarjima va qisqa gap. To’plamda o’rganish tartibi, takrorlash rejasi va o’xshash belgilarni solishtirish kartalari ham bor.",
    marks: [
      { n: "001", glyph: "あ", reading: "a" },
      { n: "006", glyph: "か", reading: "ka" },
      { n: "016", glyph: "た", reading: "ta" },
      { n: "026", glyph: "は", reading: "ha" },
      { n: "036", glyph: "や", reading: "ya" },
      { n: "046", glyph: "ん", reading: "n" },
    ],
  }),
  kanaProduct({
    id: "katakana",
    slug: "japanese-katakana",
    name: "Japanese Katakana Flashcards",
    script: "katakana",
    label: "Katakana",
    description:
      "Katakanani yodlash va chet so’zlardagi yozuvini o’rganish uchun 50 ta karta.",
    details:
      "46 ta asosiy belgi: old tomonda katta yozuv, yozish tartibi va 6 ta misol so’z, orqa tomonda o’qilish, o’zbekcha tarjima va qisqa gap. To’plamda o’rganish tartibi, takrorlash rejasi va o’xshash belgilarni solishtirish kartalari ham bor.",
    marks: [
      { n: "001", glyph: "ア", reading: "a" },
      { n: "006", glyph: "カ", reading: "ka" },
      { n: "016", glyph: "タ", reading: "ta" },
      { n: "026", glyph: "ハ", reading: "ha" },
      { n: "036", glyph: "ヤ", reading: "ya" },
      { n: "046", glyph: "ン", reading: "n" },
    ],
  }),
]

function faceById(id: string): CardFace {
  for (const product of products) {
    const face = product.faces.find((item) => item.id === id)
    if (face) return face
  }
  throw new Error(`Karta topilmadi: ${id}`)
}

export const heroCards: { face: CardFace; orientation: Product["orientation"] }[] = [
  { face: faceById("hiragana-001-back"), orientation: "landscape" },
  { face: faceById("katakana-001-front"), orientation: "landscape" },
  { face: faceById("hiragana-001-front"), orientation: "landscape" },
]

export function getProduct(slug: string | undefined) {
  if (!slug) return undefined
  return products.find((item) => item.slug === slug)
}

export function getOtherProducts(slug: string) {
  return products.filter((item) => item.slug !== slug)
}
