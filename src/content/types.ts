import type { Localized } from '@/i18n/types'
import type { IconName } from '@/lib/icons'

/** Bilingual string */
export type L = Localized<string>

export type Tint = 'electric' | 'cyan' | 'amber' | 'orange' | 'mint' | 'rose' | 'violet' | 'navy' | 'teal'

export interface NavItem {
  label: L
  to: string
  children?: NavItem[]
}

export interface PageMeta {
  title: L
  description: L
  eyebrow: L
  lead: L
}

/* ---------- Organisation (all optional facts are configurable, never invented) ---------- */

export type SocialKey = 'facebook' | 'instagram' | 'youtube' | 'x' | 'whatsapp'

export interface Stat {
  value: number
  suffix?: string
  label: L
}

export interface SiteEvent {
  id: string
  /** ISO date, e.g. 2026-12-05 */
  date: string
  title: L
  location?: L
  href?: string
}

export interface NewsItem {
  id: string
  date: string
  title: L
  summary: L
  url?: string
  source?: string
}

/* ---------- Activities & objectives ---------- */

export interface Activity {
  slug: string
  title: L
  /** Official one-line description */
  short: L
  /** Optional official slogan */
  motto?: L
  intro: L
  icon: IconName
  tint: Tint
  whatHappens: L[]
  forWhom: L
  outcomes: L[]
  review: boolean
}

export interface Objective {
  n: number
  /** The objective as a full statement */
  title: L
  body?: L
  icon: IconName
  review: boolean
}

export interface Pillar {
  title: L
  body: L
  icon: IconName
}

/* ---------- Scientific temper ---------- */

export interface TemperStep {
  key: string
  label: L
  english: string
  icon: IconName
  tint: Tint
  summary: L
  detail: L
  example: L
  prompt: L
}

export interface Habit {
  title: L
  body: L
  icon: IconName
}

export interface Claim {
  statement: L
  kind: 'evidence' | 'claim'
  why: L
}

/* ---------- Students corner ---------- */

export type Topic =
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'space'
  | 'earth'
  | 'body'
  | 'everyday'
  | 'math'
  | 'technology'
  | 'environment'

export type Difficulty = 'easy' | 'medium' | 'hard'
export type GradeBand = '6-8' | '9-10' | '11-12' | 'all'

export type StudentSectionKey =
  | 'facts'
  | 'experiments'
  | 'quiz'
  | 'projects'
  | 'models'
  | 'scientists'
  | 'questions'
  | 'news'
  | 'careers'
  | 'myths'

export interface StudentSection {
  key: StudentSectionKey
  title: L
  short: L
  description: L
  icon: IconName
  tint: Tint
}

export interface Fact {
  id: string
  title: L
  body: L
  topic: Topic
  tags: string[]
}

export interface Experiment {
  id: string
  title: L
  summary: L
  topic: Topic
  difficulty: Difficulty
  minutes: number
  materials: L[]
  steps: L[]
  predict: L
  science: L
  safety?: L
  tags: string[]
}

export interface QuizQuestion {
  id: string
  q: L
  options: L[]
  answer: number
  explanation: L
}

export interface QuizSet {
  id: string
  title: L
  description: L
  icon: IconName
  tint: Tint
  questions: QuizQuestion[]
}

export interface Project {
  id: string
  title: L
  summary: L
  topic: Topic
  difficulty: Difficulty
  grade: GradeBand
  materials: L[]
  steps: L[]
  extend: L
  tags: string[]
  featured?: boolean
}

export interface ModelIdea {
  id: string
  title: L
  summary: L
  topic: Topic
  grade: GradeBand
  howTo: L[]
  concept: L
  tags: string[]
}

export interface Scientist {
  id: string
  name: L
  years: string
  field: L
  known: L
  story: L
  lesson: L
  url?: string
  tags: string[]
}

export interface QA {
  id: string
  question: L
  answer: L
  topic: Topic
  tags: string[]
}

export interface NewsSource {
  id: string
  name: L
  description: L
  url: string
  kind: 'india' | 'global'
}

export interface Career {
  id: string
  title: L
  summary: L
  path: L
  subjects: L
  icon: IconName
  tags: string[]
}

export interface Myth {
  id: string
  myth: L
  fact: L
  explanation: L
  topic: Topic
  tags: string[]
}

/* ---------- Teachers corner ---------- */

export type ResourceCategory =
  | 'teaching'
  | 'activity'
  | 'experiment'
  | 'project'
  | 'demo'
  | 'quiz'
  | 'ppt'
  | 'training'
  | 'innovative'

export type ResourceType = 'guide' | 'activity' | 'demo' | 'quiz' | 'slides' | 'training' | 'link'
export type ResourceStatus = 'available' | 'coming-soon'

export interface ResourceSection {
  heading: L
  text?: L
  items?: L[]
}

export interface Resource {
  id: string
  title: L
  summary: L
  category: ResourceCategory
  type: ResourceType
  grade: GradeBand
  status: ResourceStatus
  kind: 'written' | 'link'
  sections?: ResourceSection[]
  url?: string
  source?: string
  minutes?: number
  tags: string[]
}

/* ---------- Gallery ---------- */

export type GalleryCategory = 'workshops' | 'exhibitions' | 'students' | 'experiments' | 'events' | 'awareness'

export interface GalleryItem {
  id: string
  category: GalleryCategory
  src: string
  alt: L
  caption: L
  w: number
  h: number
  placeholder: boolean
}
