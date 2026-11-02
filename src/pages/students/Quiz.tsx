import { ui } from '@/content/ui'
import { QuizEngine } from '@/features/quiz/QuizEngine'
import { StudentSectionLayout } from '@/features/students/StudentSectionLayout'
import { useLanguage } from '@/i18n/useLanguage'

export default function StudentsQuiz() {
  const { t } = useLanguage()
  return (
    <StudentSectionLayout sectionKey="quiz" intro={<p className="mt-8 max-w-xl text-white/70">{t(ui.students.quizIntro)}</p>}>
      <div className="mx-auto max-w-4xl">
        <QuizEngine />
      </div>
    </StudentSectionLayout>
  )
}
