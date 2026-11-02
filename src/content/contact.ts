import type { L } from './types'
import type { IconName } from '@/lib/icons'

export interface JoinWay {
  id: string
  title: L
  body: L
  icon: IconName
  subject: 'join' | 'school' | 'teacher' | 'student' | 'partnership'
}

export interface ContactFaq {
  id: string
  q: L
  a: L
  review: boolean
}

export const joinWays: JoinWay[] = [
  {
    id: 'volunteer',
    title: { hi: 'स्वयंसेवक बनें', en: 'Volunteer' },
    body: { hi: 'कार्यशालाओं, प्रदर्शनियों और आकाश-दर्शन सत्रों में हाथ बँटाएँ।', en: 'Lend a hand at workshops, exhibitions and sky-watching sessions.' },
    icon: 'handshake',
    subject: 'join',
  },
  {
    id: 'school',
    title: { hi: 'विद्यालय में आमंत्रित करें', en: 'Invite us to your school' },
    body: { hi: 'अपने विद्यालय में कार्यशाला, क्विज़ या व्याख्यान आयोजित करने के लिए लिखें।', en: 'Write to host a workshop, quiz or lecture at your school.' },
    icon: 'school',
    subject: 'school',
  },
  {
    id: 'teacher',
    title: { hi: 'शिक्षक के रूप में जुड़ें', en: 'Join as a teacher' },
    body: { hi: 'संसाधन साझा करें, सत्र संचालित करें या प्रशिक्षण में भाग लें।', en: 'Share resources, facilitate sessions or take part in training.' },
    icon: 'graduationCap',
    subject: 'teacher',
  },
  {
    id: 'student',
    title: { hi: 'प्रश्न भेजें', en: 'Send a question' },
    body: { hi: 'विद्यार्थी हैं? अपना विज्ञान प्रश्न या प्रोजेक्ट विचार हमें भेजें।', en: 'A student? Send us your science question or project idea.' },
    icon: 'question',
    subject: 'student',
  },
]

/** DRAFT (review): general guidance about how to reach us; contains no facts about fees, dates or locations. */
export const contactFaqs: ContactFaq[] = [
  {
    id: 'how-to-invite',
    q: { hi: 'अपने विद्यालय में कार्यक्रम कैसे आयोजित करवाएँ?', en: 'How can we host a programme at our school?' },
    a: {
      hi: 'संपर्क फ़ॉर्म में "विद्यालय में कार्यक्रम" विषय चुनें और विद्यालय का नाम, कक्षाएँ और पसंदीदा गतिविधि लिखें। हम आपके साथ स्वरूप और समय तय करेंगे।',
      en: 'Choose “Programme at our school” in the form and tell us the school name, the classes and the activity you have in mind. We will work out the format and timing with you.',
    },
    review: true,
  },
  {
    id: 'who-can-volunteer',
    q: { hi: 'स्वयंसेवक कौन बन सकता है?', en: 'Who can volunteer?' },
    a: {
      hi: 'कोई भी, जिसे विज्ञान और बच्चों के साथ काम करना पसंद हो: विद्यार्थी, शिक्षक, पेशेवर या सेवानिवृत्त व्यक्ति। विशेषज्ञ होना ज़रूरी नहीं, जिज्ञासु होना ज़रूरी है।',
      en: 'Anyone who enjoys science and working with young people: students, teachers, professionals or retirees. You need not be an expert, only curious.',
    },
    review: true,
  },
  {
    id: 'teacher-resources',
    q: { hi: 'क्या शिक्षकों के लिए सामग्री उपलब्ध है?', en: 'Is there material for teachers?' },
    a: {
      hi: 'हाँ। शिक्षक कॉर्नर में गतिविधि-आधारित पाठ, कक्षा-प्रदर्शन और प्रश्नोत्तरी सामग्री उपलब्ध है, और कुछ संसाधन शीघ्र जोड़े जा रहे हैं। किसी विशेष संसाधन के लिए फ़ॉर्म से अनुरोध करें।',
      en: 'Yes. The Teachers Corner has activity-based lessons, classroom demonstrations and quiz material, with more being added. Use the form to request a specific resource.',
    },
    review: true,
  },
  {
    id: 'student-questions',
    q: { hi: 'क्या विद्यार्थी सीधे प्रश्न भेज सकते हैं?', en: 'Can students send questions directly?' },
    a: {
      hi: 'बिल्कुल। "विद्यार्थी प्रश्न" विषय चुनकर अपना प्रश्न भेजें। अच्छे प्रश्न हमारे सत्रों और विद्यार्थी कॉर्नर में भी जगह पा सकते हैं।',
      en: 'Absolutely. Choose “Student question” and send it in. Good questions may find their way into our sessions and the Students Corner.',
    },
    review: true,
  },
]
