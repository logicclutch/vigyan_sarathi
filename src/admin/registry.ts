import { aboutSectionsDefaults, audiencesDefaults, learningCultureDefaults } from '@/content/about'
import { activitiesDefaults } from '@/content/activities'
import { contactFaqsDefaults, joinWaysDefaults } from '@/content/contact'
import { galleryCategoriesDefaults, galleryItemsDefaults } from '@/content/gallery'
import { homeDefaults } from '@/content/home'
import { objectivesDefaults } from '@/content/objectives'
import { pageMetaDefaults } from '@/content/pages'
import {
  claimsDefaults,
  exampleQuestionDefaults,
  temperDefinitionDefaults,
  temperHeadingDefaults,
  temperIntroDefaults,
  temperQuoteDefaults,
  temperStepsDefaults,
  temperTeachingsDefaults,
  temperTeachingsLabelDefaults,
} from '@/content/scientificTemper'
import { siteDefaults } from '@/content/site'
import { careersDefaults } from '@/content/students/careers'
import { experimentsDefaults } from '@/content/students/experiments'
import { factsDefaults } from '@/content/students/facts'
import { studentSectionsDefaults, studentsIntroDefaults } from '@/content/students/index'
import { modelIdeasDefaults } from '@/content/students/models'
import { mythsDefaults } from '@/content/students/myths'
import { newsSourcesDefaults, newsTipsDefaults } from '@/content/students/news'
import { projectsDefaults } from '@/content/students/projects'
import { questionsDefaults } from '@/content/students/questions'
import { quizSetsDefaults } from '@/content/students/quiz'
import { scientistsDefaults } from '@/content/students/scientists'
import { teacherCategoriesDefaults, teachersIntroDefaults } from '@/content/teachers/index'
import { resourcesDefaults } from '@/content/teachers/resources'
import { uiDefaults } from '@/content/ui'
import { missionDefaults, visionDefaults } from '@/content/visionMission'

export interface AdminModule {
  key: string
  group: string
  defaults: unknown
  /** Item templates for arrays that are empty in the defaults, keyed by field path (e.g. "events"). */
  itemTemplates?: Record<string, unknown>
}

const EMPTY_L = { hi: '', en: '' }

export const GROUP_ORDER = ['site', 'pages', 'home', 'about', 'visionMission', 'objectives', 'scientificTemper', 'activities', 'contact', 'students', 'teachers', 'gallery', 'ui']

export const modules: AdminModule[] = [
  {
    key: 'site',
    group: 'site',
    defaults: siteDefaults,
    itemTemplates: {
      stats: { value: 0, suffix: '', label: EMPTY_L },
      events: { id: 'event-1', date: '2026-01-01', title: EMPTY_L, location: EMPTY_L, href: '' },
      newsItems: { id: 'news-1', date: '2026-01-01', title: EMPTY_L, summary: EMPTY_L, url: '', source: '' },
    },
  },
  { key: 'pages', group: 'pages', defaults: pageMetaDefaults },
  { key: 'home', group: 'home', defaults: homeDefaults },
  { key: 'about.sections', group: 'about', defaults: aboutSectionsDefaults },
  { key: 'about.learningCulture', group: 'about', defaults: learningCultureDefaults },
  { key: 'about.audiences', group: 'about', defaults: audiencesDefaults },
  { key: 'visionMission.vision', group: 'visionMission', defaults: visionDefaults },
  { key: 'visionMission.mission', group: 'visionMission', defaults: missionDefaults },
  { key: 'objectives', group: 'objectives', defaults: objectivesDefaults },
  { key: 'scientificTemper.heading', group: 'scientificTemper', defaults: temperHeadingDefaults },
  { key: 'scientificTemper.definition', group: 'scientificTemper', defaults: temperDefinitionDefaults },
  { key: 'scientificTemper.quote', group: 'scientificTemper', defaults: temperQuoteDefaults },
  { key: 'scientificTemper.teachingsLabel', group: 'scientificTemper', defaults: temperTeachingsLabelDefaults },
  { key: 'scientificTemper.teachings', group: 'scientificTemper', defaults: temperTeachingsDefaults },
  { key: 'scientificTemper.intro', group: 'scientificTemper', defaults: temperIntroDefaults },
  { key: 'scientificTemper.exampleQuestion', group: 'scientificTemper', defaults: exampleQuestionDefaults },
  { key: 'scientificTemper.steps', group: 'scientificTemper', defaults: temperStepsDefaults },
  { key: 'scientificTemper.claims', group: 'scientificTemper', defaults: claimsDefaults },
  { key: 'activities', group: 'activities', defaults: activitiesDefaults },
  { key: 'contact.joinWays', group: 'contact', defaults: joinWaysDefaults },
  { key: 'contact.faqs', group: 'contact', defaults: contactFaqsDefaults },
  { key: 'students.intro', group: 'students', defaults: studentsIntroDefaults },
  { key: 'students.sections', group: 'students', defaults: studentSectionsDefaults },
  { key: 'students.facts', group: 'students', defaults: factsDefaults },
  { key: 'students.experiments', group: 'students', defaults: experimentsDefaults },
  { key: 'students.quiz', group: 'students', defaults: quizSetsDefaults },
  { key: 'students.projects', group: 'students', defaults: projectsDefaults },
  { key: 'students.models', group: 'students', defaults: modelIdeasDefaults },
  { key: 'students.scientists', group: 'students', defaults: scientistsDefaults },
  { key: 'students.questions', group: 'students', defaults: questionsDefaults },
  { key: 'students.newsSources', group: 'students', defaults: newsSourcesDefaults },
  { key: 'students.newsTips', group: 'students', defaults: newsTipsDefaults },
  { key: 'students.careers', group: 'students', defaults: careersDefaults },
  { key: 'students.myths', group: 'students', defaults: mythsDefaults },
  { key: 'teachers.intro', group: 'teachers', defaults: teachersIntroDefaults },
  { key: 'teachers.categories', group: 'teachers', defaults: teacherCategoriesDefaults },
  { key: 'teachers.resources', group: 'teachers', defaults: resourcesDefaults },
  { key: 'gallery.categories', group: 'gallery', defaults: galleryCategoriesDefaults },
  { key: 'gallery.items', group: 'gallery', defaults: galleryItemsDefaults },
  { key: 'ui', group: 'ui', defaults: uiDefaults },
]

export const moduleMap = Object.fromEntries(modules.map((m) => [m.key, m])) as Record<string, AdminModule>
