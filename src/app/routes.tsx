import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const VisionMission = lazy(() => import('@/pages/VisionMission'))
const Objectives = lazy(() => import('@/pages/Objectives'))
const ScientificTemper = lazy(() => import('@/pages/ScientificTemper'))
const Activities = lazy(() => import('@/pages/Activities'))
const ActivityDetail = lazy(() => import('@/pages/ActivityDetail'))
const Students = lazy(() => import('@/pages/Students'))
const StudentsFacts = lazy(() => import('@/pages/students/Facts'))
const StudentsExperiments = lazy(() => import('@/pages/students/Experiments'))
const StudentsQuiz = lazy(() => import('@/pages/students/Quiz'))
const StudentsProjects = lazy(() => import('@/pages/students/Projects'))
const StudentsModels = lazy(() => import('@/pages/students/Models'))
const StudentsScientists = lazy(() => import('@/pages/students/Scientists'))
const StudentsQuestions = lazy(() => import('@/pages/students/Questions'))
const StudentsNews = lazy(() => import('@/pages/students/News'))
const StudentsCareers = lazy(() => import('@/pages/students/Careers'))
const StudentsMyths = lazy(() => import('@/pages/students/Myths'))
const Teachers = lazy(() => import('@/pages/Teachers'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const AdminApp = lazy(() => import('@/admin/AdminApp'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminApp />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vision-mission" element={<VisionMission />} />
        <Route path="objectives" element={<Objectives />} />
        <Route path="scientific-temper" element={<ScientificTemper />} />
        <Route path="activities" element={<Activities />} />
        <Route path="activities/:slug" element={<ActivityDetail />} />
        <Route path="students" element={<Students />} />
        <Route path="students/facts" element={<StudentsFacts />} />
        <Route path="students/experiments" element={<StudentsExperiments />} />
        <Route path="students/quiz" element={<StudentsQuiz />} />
        <Route path="students/projects" element={<StudentsProjects />} />
        <Route path="students/models" element={<StudentsModels />} />
        <Route path="students/scientists" element={<StudentsScientists />} />
        <Route path="students/questions" element={<StudentsQuestions />} />
        <Route path="students/news" element={<StudentsNews />} />
        <Route path="students/careers" element={<StudentsCareers />} />
        <Route path="students/myths" element={<StudentsMyths />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
