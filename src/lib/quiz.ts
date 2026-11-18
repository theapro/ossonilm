import { hiragana, type KanaCard } from "../data/hiragana"
import { katakana } from "../data/katakana"
import { n5Kanji, type N5Kanji } from "../data/n5Kanji"

export type QuizKind = "meaning" | "glyph" | "reading"

export type QuizQuestion = {
  kanji: string
  kind: QuizKind
  /** What the learner is asked to identify. */
  prompt: string
  ask: string
  choices: string[]
  answer: string
  reveal: string
}

const CHOICE_COUNT = 4

function shuffle<T>(list: T[]): T[] {
  const next = [...list]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = next[i]
    next[i] = next[j]
    next[j] = swap
  }
  return next
}

function openReading(value: string) {
  return value.trim().replace(/\(([^)]+)\)/g, "$1")
}

export function gloss(value: string) {
  const text = value.trim()
  if (!text || text !== text.toUpperCase()) return text
  const lower = text.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

function listed(values: string[]) {
  return values.map(openReading).filter(Boolean).join(" · ")
}

function reveal(card: N5Kanji) {
  const kun = listed(card.kun)
  const on = listed(card.on)
  const parts = [kun && `Kun ${kun}`, on && `On ${on}`, gloss(card.meaning)].filter(Boolean)
  return parts.join("  ·  ")
}

function distractors(deck: N5Kanji[], card: N5Kanji, label: (item: N5Kanji) => string, banned: Set<string>) {
  const seen = new Set(banned)
  const picked: string[] = []
  for (const item of shuffle(deck)) {
    if (item.kanji === card.kanji) continue
    const text = label(item)
    if (!text || seen.has(text)) continue
    seen.add(text)
    picked.push(text)
    if (picked.length === CHOICE_COUNT - 1) break
  }
  return picked
}

function withChoices(answer: string, rest: string[]): string[] | null {
  if (rest.length < CHOICE_COUNT - 1) return null
  return shuffle([answer, ...rest.slice(0, CHOICE_COUNT - 1)])
}

function meaningQuestion(card: N5Kanji, deck: N5Kanji[]): QuizQuestion | null {
  const answer = gloss(card.meaning)
  const choices = withChoices(answer, distractors(deck, card, (item) => gloss(item.meaning), new Set([answer])))
  if (!choices) return null
  return {
    kanji: card.kanji,
    kind: "meaning",
    prompt: card.kanji,
    ask: "Ma’nosini tanlang",
    choices,
    answer,
    reveal: reveal(card),
  }
}

function glyphQuestion(card: N5Kanji, deck: N5Kanji[]): QuizQuestion | null {
  const answer = card.kanji
  const choices = withChoices(answer, distractors(deck, card, (item) => item.kanji, new Set([answer])))
  if (!choices) return null
  return {
    kanji: card.kanji,
    kind: "glyph",
    prompt: gloss(card.meaning),
    ask: "Qaysi kanji?",
    choices,
    answer,
    reveal: reveal(card),
  }
}

function readingQuestion(card: N5Kanji, deck: N5Kanji[]): QuizQuestion | null {
  const kun = listed(card.kun)
  const on = listed(card.on)
  const side = kun ? "kun" : on ? "on" : null
  if (!side) return null
  const answer = side === "kun" ? kun : on
  const own = new Set([kun, on].filter(Boolean))
  const choices = withChoices(
    answer,
    distractors(deck, card, (item) => listed(side === "kun" ? item.kun : item.on), own),
  )
  if (!choices) return null
  return {
    kanji: card.kanji,
    kind: "reading",
    prompt: card.kanji,
    ask: side === "kun" ? "Kun’yomi qaysi?" : "On’yomi qaysi?",
    choices,
    answer,
    reveal: reveal(card),
  }
}

const makers = {
  meaning: meaningQuestion,
  glyph: glyphQuestion,
  reading: readingQuestion,
} as const

export type DeckId = "hiragana" | "katakana" | "n5"

export function isDeck(value: string): value is DeckId {
  return value === "hiragana" || value === "katakana" || value === "n5"
}

export const deckInfo: Record<
  DeckId,
  { eyebrow: string; title: string; text: string; path: string; sample: string }
> = {
  hiragana: {
    eyebrow: "Hiragana · 46 ta belgi",
    title: "Hiragana testi",
    text: "Har davrada 10 ta savol. O‘qilish, belgi yoki misol so‘zning ma’nosi so‘raladi.",
    path: "/tests/hiragana",
    sample: "あ",
  },
  katakana: {
    eyebrow: "Katakana · 46 ta belgi",
    title: "Katakana testi",
    text: "Har davrada 10 ta savol. O‘qilish, belgi yoki misol so‘zning ma’nosi so‘raladi.",
    path: "/tests/katakana",
    sample: "ア",
  },
  n5: {
    eyebrow: "N5 kanji · 100 ta belgi",
    title: "N5 kanji testi",
    text: "Har davrada 10 ta savol. Ma’no, belgi yoki o‘qilish so‘raladi. Javobni tanlagach to‘g‘ri variant ochiladi.",
    path: "/tests/n5",
    sample: "日",
  },
}

const kanaDecks: Record<"hiragana" | "katakana", KanaCard[]> = { hiragana, katakana }

function kanaDistractors(deck: KanaCard[], card: KanaCard, label: (item: KanaCard) => string, banned: Set<string>) {
  const seen = new Set(banned)
  const picked: string[] = []
  for (const item of shuffle(deck)) {
    if (item.kana === card.kana) continue
    const text = label(item)
    if (!text || seen.has(text)) continue
    seen.add(text)
    picked.push(text)
    if (picked.length === CHOICE_COUNT - 1) break
  }
  return picked
}

function kanaReveal(card: KanaCard) {
  return [card.kana, card.romaji, card.meaning].filter(Boolean).join("  ·  ")
}

function kanaQuestion(card: KanaCard, deck: KanaCard[], kind: QuizKind): QuizQuestion | null {
  if (kind === "reading") {
    const choices = withChoices(card.romaji, kanaDistractors(deck, card, (item) => item.romaji, new Set([card.romaji])))
    if (!choices) return null
    return {
      kanji: card.kana,
      kind,
      prompt: card.kana,
      ask: "Qanday o‘qiladi?",
      choices,
      answer: card.romaji,
      reveal: kanaReveal(card),
    }
  }
  if (kind === "glyph") {
    const choices = withChoices(card.kana, kanaDistractors(deck, card, (item) => item.kana, new Set([card.kana])))
    if (!choices) return null
    return {
      kanji: card.kana,
      kind,
      prompt: card.romaji,
      ask: "Qaysi belgi?",
      choices,
      answer: card.kana,
      reveal: kanaReveal(card),
    }
  }
  const choices = withChoices(card.meaning, kanaDistractors(deck, card, (item) => item.meaning, new Set([card.meaning])))
  if (!choices) return null
  return {
    kanji: card.kana,
    kind: "meaning",
    prompt: card.kana,
    ask: "Misol so‘zning ma’nosi?",
    choices,
    answer: card.meaning,
    reveal: kanaReveal(card),
  }
}

function buildKanaQuiz(deck: KanaCard[], count: number): QuizQuestion[] {
  const order = shuffle(deck)
  const plan: QuizKind[] = []
  const kinds: QuizKind[] = ["reading", "glyph", "meaning"]
  for (let i = 0; i < count; i += 1) plan.push(kinds[i % kinds.length])
  const used = new Set<string>()
  const questions: QuizQuestion[] = []
  const take = (kind: QuizKind) => {
    for (const card of order) {
      if (used.has(card.kana)) continue
      const question = kanaQuestion(card, deck, kind)
      if (!question) continue
      used.add(card.kana)
      questions.push(question)
      return true
    }
    return false
  }
  for (const kind of plan) {
    if (!take(kind)) take("reading")
  }
  return questions.slice(0, count)
}

/** Ten mixed questions from one deck, without repeating a character. */
export function buildQuiz(deck: DeckId, count = 10): QuizQuestion[] {
  if (deck !== "n5") return buildKanaQuiz(kanaDecks[deck], count)
  return buildN5Quiz(count)
}

/** Ten mixed questions drawn from the N5 deck, without repeating a kanji. */
function buildN5Quiz(count = 10): QuizQuestion[] {
  const deck = shuffle(n5Kanji)
  const plan: QuizKind[] = []
  const kinds: QuizKind[] = ["meaning", "glyph", "reading"]
  for (let i = 0; i < count; i += 1) plan.push(kinds[i % kinds.length])

  const used = new Set<string>()
  const questions: QuizQuestion[] = []

  const take = (kind: QuizKind) => {
    for (const card of deck) {
      if (used.has(card.kanji)) continue
      const question = makers[kind](card, n5Kanji)
      if (!question) continue
      used.add(card.kanji)
      questions.push(question)
      return true
    }
    return false
  }

  for (const kind of plan) {
    if (!take(kind)) take("meaning")
  }

  return questions.slice(0, count)
}
