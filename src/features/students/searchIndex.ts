import { careers } from '@/content/students/careers'
import { experiments } from '@/content/students/experiments'
import { facts } from '@/content/students/facts'
import { modelIdeas } from '@/content/students/models'
import { myths } from '@/content/students/myths'
import { newsSources } from '@/content/students/news'
import { projects } from '@/content/students/projects'
import { questions } from '@/content/students/questions'
import { quizSets } from '@/content/students/quiz'
import { scientists } from '@/content/students/scientists'
import type { L, StudentSectionKey } from '@/content/types'

export interface SearchItem {
  id: string
  section: StudentSectionKey
  title: L
  summary: L
  tags: string[]
  href: string
}

export const searchIndex: SearchItem[] = [
  ...facts.map((f) => ({ id: f.id, section: 'facts' as const, title: f.title, summary: f.body, tags: f.tags, href: `/students/facts#${f.id}` })),
  ...experiments.map((e) => ({ id: e.id, section: 'experiments' as const, title: e.title, summary: e.summary, tags: e.tags, href: `/students/experiments#${e.id}` })),
  ...quizSets.map((s) => ({ id: s.id, section: 'quiz' as const, title: s.title, summary: s.description, tags: ['quiz'], href: `/students/quiz#${s.id}` })),
  ...projects.map((p) => ({ id: p.id, section: 'projects' as const, title: p.title, summary: p.summary, tags: p.tags, href: `/students/projects#${p.id}` })),
  ...modelIdeas.map((m) => ({ id: m.id, section: 'models' as const, title: m.title, summary: m.summary, tags: m.tags, href: `/students/models#${m.id}` })),
  ...scientists.map((s) => ({ id: s.id, section: 'scientists' as const, title: s.name, summary: s.known, tags: s.tags, href: `/students/scientists#${s.id}` })),
  ...questions.map((q) => ({ id: q.id, section: 'questions' as const, title: q.question, summary: q.answer, tags: q.tags, href: `/students/questions#${q.id}` })),
  ...newsSources.map((n) => ({ id: n.id, section: 'news' as const, title: n.name, summary: n.description, tags: ['news', n.kind], href: '/students/news' })),
  ...careers.map((c) => ({ id: c.id, section: 'careers' as const, title: c.title, summary: c.summary, tags: c.tags, href: `/students/careers#${c.id}` })),
  ...myths.map((m) => ({ id: m.id, section: 'myths' as const, title: m.myth, summary: m.fact, tags: m.tags, href: `/students/myths#${m.id}` })),
]

export const sectionCounts: Record<StudentSectionKey, number> = {
  facts: facts.length,
  experiments: experiments.length,
  quiz: quizSets.reduce((sum, set) => sum + set.questions.length, 0),
  projects: projects.length,
  models: modelIdeas.length,
  scientists: scientists.length,
  questions: questions.length,
  news: newsSources.length,
  careers: careers.length,
  myths: myths.length,
}
