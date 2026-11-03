import type { L } from './types'
import type { IconName } from '@/lib/icons'
import { withOverride } from './overrides'

export interface AboutSection {
  id: string
  eyebrow: L
  title: L
  paragraphs: L[]
  pullQuote?: L
  review: boolean
}

export interface Audience {
  title: L
  body: L
  icon: IconName
}

/**
 * Official text supplied by Vigyan Sarathi (Hindi). English is a faithful translation.
 * Section headings are phrases drawn from the same text.
 */
const aboutSectionsDefaults: AboutSection[] = [
  {
    id: 'what',
    eyebrow: { hi: 'परिचय', en: 'Introduction' },
    title: {
      hi: 'विज्ञान को पाठ्यपुस्तकों से निकालकर दैनिक जीवन, समाज और प्रकृति से जोड़ना',
      en: 'Taking science beyond textbooks into daily life, society and nature',
    },
    paragraphs: [
      {
        hi: 'विज्ञान सारथी विद्यार्थियों में वैज्ञानिक दृष्टिकोण, जिज्ञासा, तार्किक चिंतन और वैज्ञानिक चेतना के संवर्धन के लिए समर्पित एक सामाजिक एवं शैक्षिक पहल है।',
        en: 'Vigyan Sarathi is a social and educational initiative dedicated to nurturing scientific temper, curiosity, logical thinking and scientific awareness among students.',
      },
      {
        hi: 'संस्था का मूल उद्देश्य विज्ञान को केवल पाठ्यपुस्तकों तक सीमित न रखकर उसे विद्यार्थियों के दैनिक जीवन, समाज और प्रकृति से जोड़ना है।',
        en: 'The organisation’s core purpose is to take science beyond textbooks and connect it with students’ daily lives, society and nature.',
      },
    ],
    review: false,
  },
  {
    id: 'activities',
    eyebrow: { hi: 'हम क्या करते हैं', en: 'What we do' },
    title: {
      hi: 'विज्ञान का प्रचार-प्रसार, विज्ञान संचार और वैज्ञानिक सोच का विकास',
      en: 'Spreading science, communicating science, building scientific thinking',
    },
    paragraphs: [
      {
        hi: 'विज्ञान सारथी निरंतर विज्ञान के प्रचार-प्रसार, विज्ञान संचार और वैज्ञानिक सोच के विकास के लिए विभिन्न गतिविधियों, कार्यशालाओं, विज्ञान प्रदर्शनियों, व्याख्यानों, प्रयोगात्मक गतिविधियों, क्विज, विज्ञान मॉडल एवं प्रोजेक्ट, जागरूकता कार्यक्रमों तथा संवादात्मक कार्यक्रमों का आयोजन करता है।',
        en: 'To spread and communicate science and to build scientific thinking, Vigyan Sarathi continually organises activities, workshops, science exhibitions, lectures, hands-on experiments, quizzes, science models and projects, awareness programmes and interactive sessions.',
      },
    ],
    review: false,
  },
  {
    id: 'belief',
    eyebrow: { hi: 'हमारा विश्वास', en: 'Our belief' },
    title: { hi: 'हर प्रश्न वैज्ञानिक सोच की शुरुआत है', en: 'Every question is the beginning of scientific thinking' },
    paragraphs: [
      {
        hi: 'हमारा विश्वास है कि हर प्रश्न वैज्ञानिक सोच की शुरुआत है और हर जिज्ञासु मन भविष्य का वैज्ञानिक बना सकता है। इसलिए हम विद्यार्थियों को केवल उत्तर देने के बजाय प्रश्न पूछने, तर्क करने, प्रमाण खोजने और स्वयं प्रयोग करके सीखने के लिए प्रेरित करते हैं।',
        en: 'We believe every question is the beginning of scientific thinking, and every curious mind can become a scientist of the future. So instead of simply handing students answers, we encourage them to ask questions, reason, seek evidence and learn by experimenting themselves.',
      },
    ],
    review: false,
  },
  {
    id: 'effort',
    eyebrow: { hi: 'हमारा प्रयास', en: 'Our effort' },
    title: { hi: 'विज्ञान डर नहीं, जिज्ञासा, खोज और आनंद का विषय बने', en: 'Science as curiosity, discovery and joy, never fear' },
    paragraphs: [
      {
        hi: 'विज्ञान सारथी का प्रयास है कि विज्ञान डर या कठिन विषय नहीं, बल्कि जिज्ञासा, खोज और आनंद का विषय बने।',
        en: 'Vigyan Sarathi strives to make science a subject of curiosity, discovery and joy, not of fear or difficulty.',
      },
    ],
    review: false,
  },
  {
    id: 'goal',
    eyebrow: { hi: 'हमारा लक्ष्य', en: 'Our goal' },
    title: { hi: 'तर्कसंगत सोच रखने वाले विद्यार्थी और नागरिक', en: 'Students and citizens who think rationally' },
    paragraphs: [
      {
        hi: 'हमारा लक्ष्य ऐसे विद्यार्थियों और नागरिकों का निर्माण करना है जो तर्कसंगत सोच रखें, प्रमाणों का सम्मान करें, अंधविश्वास और भ्रांतियों को प्रश्नों की कसौटी पर परखें तथा विज्ञान को समाज और राष्ट्र के विकास का माध्यम बनाएं।',
        en: 'Our goal is to nurture students and citizens who think rationally, respect evidence, test superstition and misconceptions on the touchstone of questions, and make science a means of progress for society and the nation.',
      },
    ],
    review: false,
  },
]
export { aboutSectionsDefaults }
export const aboutSections: AboutSection[] = withOverride('about.sections', aboutSectionsDefaults)

/** Official: “विज्ञान केवल विषय नहीं, सोचने का तरीका है” and the learning culture it describes. */
const learningCultureDefaults = {
  eyebrow: { hi: 'सोचने का तरीका', en: 'A way of thinking' } satisfies L,
  title: { hi: 'विज्ञान केवल विषय नहीं, सोचने का तरीका है', en: 'Science is not just a subject; it is a way of thinking' } satisfies L,
  intro: {
    hi: 'बच्चे स्वभाव से जिज्ञासु होते हैं। वे हर चीज के पीछे छिपे “क्यों?” और “कैसे?” को जानना चाहते हैं। विज्ञान सारथी इसी जिज्ञासा को वैज्ञानिक दृष्टिकोण में बदलने का प्रयास करता है।',
    en: 'Children are curious by nature. They want to know the “why?” and “how?” hidden behind everything. Vigyan Sarathi works to turn this very curiosity into a scientific outlook.',
  } satisfies L,
  lead: {
    hi: 'हमारा उद्देश्य विद्यार्थियों को ऐसी सीखने की संस्कृति से जोड़ना है जहाँ वे—',
    en: 'Our aim is to connect students with a culture of learning in which they—',
  } satisfies L,
  steps: [
    { hi: 'प्रश्न पूछें', en: 'ask questions' },
    { hi: 'सोचें', en: 'think' },
    { hi: 'परिकल्पना बनाएँ', en: 'form hypotheses' },
    { hi: 'प्रयोग करें', en: 'experiment' },
    { hi: 'प्रमाण खोजें', en: 'seek evidence' },
    { hi: 'निष्कर्ष निकालें', en: 'draw conclusions' },
  ] satisfies L[],
  messageLabel: { hi: 'हमारा संदेश', en: 'Our message' } satisfies L,
  message: {
    hi: 'जिस मन में प्रश्न जीवित हैं, उसी मन में विज्ञान जीवित है।',
    en: 'Where questions are alive in a mind, science is alive in that mind too.',
  } satisfies L,
}
export { learningCultureDefaults }
export const learningCulture = withOverride('about.learningCulture', learningCultureDefaults)

/** Interface framing (not organisational text): who the site serves. */
const audiencesDefaults: Audience[] = [
  { title: { hi: 'विद्यार्थी', en: 'Students' }, body: { hi: 'प्रश्न पूछने और प्रयोग करने की जगह।', en: 'A place to ask and to experiment.' }, icon: 'graduationCap' },
  { title: { hi: 'शिक्षक', en: 'Teachers' }, body: { hi: 'संसाधन, प्रशिक्षण और सहयोगी समुदाय।', en: 'Resources, training and a community of peers.' }, icon: 'bookOpen' },
  { title: { hi: 'अभिभावक', en: 'Parents' }, body: { hi: 'घर पर जिज्ञासा को सहारा देने के तरीके।', en: 'Ways to support curiosity at home.' }, icon: 'heart' },
  { title: { hi: 'समाज', en: 'Society' }, body: { hi: 'प्रमाण-आधारित संवाद और वैज्ञानिक जागरूकता।', en: 'Evidence-based conversation and scientific awareness.' }, icon: 'users' },
]
export { audiencesDefaults }
export const audiences: Audience[] = withOverride('about.audiences', audiencesDefaults)
