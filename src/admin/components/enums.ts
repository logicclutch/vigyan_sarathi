import { ICONS } from '@/lib/icons'

const ICON_NAMES = Object.keys(ICONS)
const TINTS = ['electric', 'cyan', 'amber', 'orange', 'mint', 'rose', 'violet', 'navy', 'teal']
const TOPICS = ['physics', 'chemistry', 'biology', 'space', 'earth', 'body', 'everyday', 'math', 'technology', 'environment']
const DIFFICULTY = ['easy', 'medium', 'hard']
const GRADES = ['6-8', '9-10', '11-12', 'all']
const RESOURCE_CATEGORIES = ['teaching', 'activity', 'experiment', 'project', 'demo', 'quiz', 'ppt', 'training', 'innovative']
const RESOURCE_TYPES = ['guide', 'activity', 'demo', 'quiz', 'slides', 'training', 'link']
const GALLERY_CATEGORIES = ['workshops', 'exhibitions', 'students', 'experiments', 'events', 'awareness']
const SECTION_KEYS = ['facts', 'experiments', 'quiz', 'projects', 'models', 'scientists', 'questions', 'news', 'careers', 'myths']

/** Fixed-choice fields, resolved by field name and module. */
export function enumOptions(moduleKey: string, field: string): string[] | null {
  if (field === 'icon') return ICON_NAMES
  if (field === 'tint') return TINTS
  if (field === 'topic') return TOPICS
  if (field === 'difficulty') return DIFFICULTY
  if (field === 'grade') return GRADES
  if (moduleKey.startsWith('teachers')) {
    if (field === 'category') return RESOURCE_CATEGORIES
    if (field === 'type') return RESOURCE_TYPES
    if (field === 'status') return ['available', 'coming-soon']
    if (field === 'kind') return ['written', 'link']
  }
  if (moduleKey.startsWith('gallery') && field === 'category') return GALLERY_CATEGORIES
  if (moduleKey === 'students.newsSources' && field === 'kind') return ['india', 'global']
  if (moduleKey === 'students.sections' && field === 'key') return SECTION_KEYS
  if (moduleKey === 'contact.joinWays' && field === 'subject') return ['general', 'join', 'school', 'teacher', 'student', 'partnership', 'media']
  if (moduleKey === 'scientificTemper.claims' && field === 'kind') return ['evidence', 'claim']
  return null
}

export const isUploadField = (moduleKey: string, field: string) => moduleKey === 'gallery.items' && field === 'src'
