import type { StudentSection, StudentSectionKey } from '../types'

export const studentSections: StudentSection[] = [
  {
    key: 'facts',
    title: { hi: 'रोचक विज्ञान तथ्य', en: 'Interesting Science Facts' },
    short: { hi: 'तथ्य', en: 'Facts' },
    description: { hi: 'छोटे-छोटे तथ्य, जो दुनिया को देखने का नज़रिया बदल दें।', en: 'Small facts that change how you see the world.' },
    icon: 'sparkles',
    tint: 'amber',
  },
  {
    key: 'experiments',
    title: { hi: 'सरल विज्ञान प्रयोग', en: 'Simple Science Experiments' },
    short: { hi: 'प्रयोग', en: 'Experiments' },
    description: { hi: 'घर की चीज़ों से किए जा सकने वाले सुरक्षित प्रयोग।', en: 'Safe experiments you can do with things found at home.' },
    icon: 'flask',
    tint: 'cyan',
  },
  {
    key: 'quiz',
    title: { hi: 'विज्ञान क्विज़', en: 'Science Quiz' },
    short: { hi: 'क्विज़', en: 'Quiz' },
    description: { hi: 'खेल-खेल में अपनी वैज्ञानिक समझ परखें।', en: 'Test your scientific understanding, playfully.' },
    icon: 'brain',
    tint: 'electric',
  },
  {
    key: 'projects',
    title: { hi: 'विज्ञान प्रोजेक्ट', en: 'Science Projects' },
    short: { hi: 'प्रोजेक्ट', en: 'Projects' },
    description: { hi: 'प्रदर्शनी और कक्षा के लिए प्रोजेक्ट विचार।', en: 'Project ideas for exhibitions and classrooms.' },
    icon: 'clipboard',
    tint: 'mint',
  },
  {
    key: 'models',
    title: { hi: 'विज्ञान मॉडल के विचार', en: 'Science Model Ideas' },
    short: { hi: 'मॉडल', en: 'Models' },
    description: { hi: 'अवधारणाओं को हाथ से बनाकर समझें।', en: 'Build concepts with your own hands.' },
    icon: 'shapes',
    tint: 'violet',
  },
  {
    key: 'scientists',
    title: { hi: 'वैज्ञानिकों की प्रेरक कहानियाँ', en: 'Inspirational Stories of Scientists' },
    short: { hi: 'वैज्ञानिक', en: 'Scientists' },
    description: { hi: 'जिज्ञासा से इतिहास रचने वालों की कहानियाँ।', en: 'Stories of people whose curiosity made history.' },
    icon: 'star',
    tint: 'orange',
  },
  {
    key: 'questions',
    title: { hi: 'विज्ञान के महत्वपूर्ण प्रश्न', en: 'Important Science Questions' },
    short: { hi: 'प्रश्न', en: 'Questions' },
    description: { hi: 'वे "क्यों" और "कैसे", जो हर जिज्ञासु मन पूछता है।', en: 'The whys and hows every curious mind asks.' },
    icon: 'question',
    tint: 'teal',
  },
  {
    key: 'news',
    title: { hi: 'विज्ञान समाचार', en: 'Science News' },
    short: { hi: 'समाचार', en: 'News' },
    description: { hi: 'विज्ञान की ताज़ा खबरें कहाँ और कैसे पढ़ें।', en: 'Where and how to follow the latest science.' },
    icon: 'newspaper',
    tint: 'navy',
  },
  {
    key: 'careers',
    title: { hi: 'विज्ञान में करियर', en: 'Career in Science' },
    short: { hi: 'करियर', en: 'Careers' },
    description: { hi: 'विज्ञान से जुड़े रास्ते और उन तक पहुँचने के कदम।', en: 'Paths in science and the steps that lead there.' },
    icon: 'rocket',
    tint: 'rose',
  },
  {
    key: 'myths',
    title: { hi: 'विज्ञान से जुड़े मिथक और तथ्य', en: 'Science Myths and Facts' },
    short: { hi: 'मिथक और तथ्य', en: 'Myths & Facts' },
    description: { hi: 'सुनी-सुनाई बातों को प्रमाण की कसौटी पर परखें।', en: 'Put hearsay to the test of evidence.' },
    icon: 'scale',
    tint: 'amber',
  },
]

/** Official intro and motto for the Students Corner (हमारी सोच). */
export const studentsIntro = {
  heading: { hi: 'विद्यार्थियों के लिए विज्ञान की दुनिया', en: 'A world of science for students' },
  find: { hi: 'यहाँ विद्यार्थी पाएँगे—', en: 'Here students will find—' },
  thinkingLabel: { hi: 'हमारी सोच', en: 'Our thinking' },
  motto: { hi: 'पढ़ो कम नहीं—समझो अधिक, पूछो अधिक और प्रयोग करो।', en: 'Not less reading: understand more, ask more and experiment.' },
}

export const studentSectionMap = Object.fromEntries(studentSections.map((section) => [section.key, section])) as Record<
  StudentSectionKey,
  StudentSection
>
