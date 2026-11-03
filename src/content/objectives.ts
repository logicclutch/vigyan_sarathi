import type { Objective } from './types'
import { withOverride } from './overrides'

/** The organisation's ten key objectives (प्रमुख उद्देश्य), supplied verbatim in Hindi. Icons are interface choices. */
const objectivesDefaults: Objective[] = [
  { n: 1, title: { hi: 'विद्यार्थियों में वैज्ञानिक दृष्टिकोण विकसित करना।', en: 'To develop scientific temper among students.' }, icon: 'atom', review: false },
  { n: 2, title: { hi: 'विज्ञान के प्रति जिज्ञासा एवं रुचि उत्पन्न करना।', en: 'To spark curiosity and interest in science.' }, icon: 'sparkles', review: false },
  { n: 3, title: { hi: 'प्रयोगात्मक एवं गतिविधि आधारित विज्ञान शिक्षा को बढ़ावा देना।', en: 'To promote experimental and activity-based science education.' }, icon: 'flask', review: false },
  { n: 4, title: { hi: 'विज्ञान को दैनिक जीवन से जोड़ना।', en: 'To connect science with daily life.' }, icon: 'lightbulb', review: false },
  { n: 5, title: { hi: 'वैज्ञानिक मिथकों एवं भ्रांतियों के प्रति जागरूकता पैदा करना।', en: 'To create awareness about scientific myths and misconceptions.' }, icon: 'scale', review: false },
  { n: 6, title: { hi: 'विद्यार्थियों को वैज्ञानिकों एवं विज्ञान की उपलब्धियों से परिचित कराना।', en: 'To introduce students to scientists and the achievements of science.' }, icon: 'star', review: false },
  { n: 7, title: { hi: 'विज्ञान एवं पर्यावरण के प्रति जिम्मेदार नागरिकता विकसित करना।', en: 'To develop responsible citizenship towards science and the environment.' }, icon: 'leaf', review: false },
  { n: 8, title: { hi: 'ग्रामीण एवं वंचित क्षेत्रों के विद्यार्थियों तक विज्ञान की पहुँच बढ़ाना।', en: 'To extend the reach of science to students in rural and underserved areas.' }, icon: 'users', review: false },
  { n: 9, title: { hi: 'शिक्षकों को नवाचारी विज्ञान शिक्षण के लिए प्रेरित करना।', en: 'To inspire teachers towards innovative science teaching.' }, icon: 'graduationCap', review: false },
  { n: 10, title: { hi: 'विद्यार्थियों में अनुसंधान एवं नवाचार की भावना विकसित करना।', en: 'To foster a spirit of research and innovation among students.' }, icon: 'rocket', review: false },
]
export { objectivesDefaults }
export const objectives: Objective[] = withOverride('objectives', objectivesDefaults)
