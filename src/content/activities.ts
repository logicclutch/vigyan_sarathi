import type { Activity } from './types'

/**
 * The nine activity formats. `short` (and `motto`) are the organisation's own words; the longer
 * intro / what happens / outcomes sections are drafted elaborations flagged for review.
 */
export const activities: Activity[] = [
  {
    slug: 'science-workshops',
    title: { hi: 'विज्ञान कार्यशालाएँ', en: 'Science Workshops' },
    short: {
      hi: 'विद्यार्थियों के लिए सरल एवं रोचक प्रयोगात्मक कार्यशालाएँ।',
      en: 'Simple and engaging hands-on workshops for students.',
    },
    intro: {
      hi: 'हमारी कार्यशालाएँ व्याख्यान नहीं, प्रयोगशालाएँ हैं। छोटे समूहों में विद्यार्थी प्रश्न उठाते हैं, सामग्री से खेलते हैं, अनुमान लगाते हैं और अपने निष्कर्षों तक पहुँचते हैं। उद्देश्य उत्तर रटाना नहीं, बल्कि प्रश्न पूछने का साहस और परखने की आदत विकसित करना है।',
      en: 'Our workshops are laboratories, not lectures. In small groups, students raise questions, play with materials, make predictions and reach their own conclusions. The aim is not to memorise answers but to build the courage to ask and the habit of testing.',
    },
    icon: 'flask',
    tint: 'electric',
    whatHappens: [
      { hi: 'एक रोचक प्रश्न या घटना से शुरुआत, जो जिज्ञासा जगाए।', en: 'We begin with an intriguing question or phenomenon that sparks curiosity.' },
      { hi: 'सरल, सुलभ सामग्री से समूह में प्रयोग और अवलोकन।', en: 'Groups experiment and observe with simple, easily available materials.' },
      { hi: 'परिणामों पर खुली चर्चा: क्या दिखा, क्यों दिखा और आगे क्या पूछा जा सकता है।', en: 'An open discussion of results: what we saw, why, and what to ask next.' },
    ],
    forWhom: {
      hi: 'कक्षा 6 से 12 के विद्यार्थी; विद्यालयों और सामुदायिक स्थानों पर आयोजित।',
      en: 'Students of classes 6 to 12, held in schools and community spaces.',
    },
    outcomes: [
      { hi: 'प्रयोग की योजना बनाना और उसे सावधानी से करना', en: 'Planning an experiment and carrying it out carefully' },
      { hi: 'अवलोकन को प्रमाण की तरह देखना और दर्ज करना', en: 'Treating and recording observations as evidence' },
      { hi: 'विज्ञान को खेल और खोज की तरह अनुभव करना', en: 'Experiencing science as play and discovery' },
    ],
    review: true,
  },
  {
    slug: 'hands-on-experiments',
    title: { hi: 'प्रयोगात्मक गतिविधियाँ', en: 'Hands-on Experiments' },
    short: {
      hi: 'दैनिक जीवन से जुड़े छोटे-छोटे प्रयोगों के माध्यम से विज्ञान को समझाना।',
      en: 'Explaining science through small experiments drawn from daily life.',
    },
    motto: { hi: 'देखो नहीं, करके सीखो।', en: 'Don’t just watch, learn by doing.' },
    intro: {
      hi: 'एक गिलास पानी, एक गुब्बारा, एक मोमबत्ती, विज्ञान की सबसे गहरी बातें अक्सर सबसे सरल चीज़ों में छिपी होती हैं। प्रयोगात्मक गतिविधियों में विद्यार्थी पहले अनुमान लगाते हैं, फिर करते हैं और अंत में अपने अनुमान से परिणाम की तुलना करते हैं। यही तुलना वैज्ञानिक सोच की नींव है।',
      en: 'A glass of water, a balloon, a candle: the deepest ideas in science often hide in the simplest things. In these sessions students predict first, then do, and finally compare the result with their prediction. That comparison is the foundation of scientific thinking.',
    },
    icon: 'beaker',
    tint: 'cyan',
    whatHappens: [
      { hi: '"पहले अनुमान, फिर प्रयोग" की पद्धति से हर गतिविधि।', en: 'Every activity follows a predict-then-test routine.' },
      { hi: 'घर में उपलब्ध सामग्री, ताकि प्रयोग घर पर भी दोहराया जा सके।', en: 'Household materials, so the experiment can be repeated at home.' },
      { hi: 'अवलोकन पत्रक में परिणाम दर्ज करना और साझा करना।', en: 'Recording results on observation sheets and sharing them.' },
    ],
    forWhom: {
      hi: 'सभी आयु के विद्यार्थी; परिवारों और समुदायों के लिए भी खुले सत्र।',
      en: 'Students of all ages, with open sessions for families and communities.',
    },
    outcomes: [
      { hi: 'कारण और प्रभाव को प्रयोग से जोड़कर देखना', en: 'Linking cause and effect through experiment' },
      { hi: 'अनुमान गलत निकलने को सीखने का अवसर मानना', en: 'Seeing a wrong prediction as a chance to learn' },
      { hi: 'घर पर स्वयं प्रयोग करने का आत्मविश्वास', en: 'Confidence to experiment independently at home' },
    ],
    review: true,
  },
  {
    slug: 'science-exhibitions',
    title: { hi: 'विज्ञान प्रदर्शनियाँ', en: 'Science Exhibitions' },
    short: {
      hi: 'विद्यार्थियों द्वारा तैयार किए गए विज्ञान मॉडल एवं नवाचारी परियोजनाओं का प्रदर्शन।',
      en: 'A showcase of science models and innovative projects created by students.',
    },
    intro: {
      hi: 'प्रदर्शनी केवल मॉडल दिखाने का अवसर नहीं है; यह अपने विचार को समझाने, प्रश्नों का सामना करने और दूसरों की खोज से सीखने का अनुभव है। हम विद्यार्थियों को प्रोजेक्ट चुनने से लेकर प्रस्तुति तक मार्गदर्शन देते हैं और अभिभावकों व समुदाय को इस यात्रा में शामिल करते हैं।',
      en: 'An exhibition is not just a place to display models; it is an experience of explaining your idea, facing questions and learning from the discoveries of others. We guide students from choosing a project to presenting it, and bring parents and the community into the journey.',
    },
    icon: 'presentation',
    tint: 'amber',
    whatHappens: [
      { hi: 'प्रोजेक्ट चयन और योजना में मार्गदर्शन।', en: 'Guidance in choosing and planning a project.' },
      { hi: 'मॉडल, पोस्टर और प्रदर्शन तैयार करने में सहयोग।', en: 'Support in building models, posters and demonstrations.' },
      { hi: 'दर्शकों और समीक्षकों के साथ संवाद का अभ्यास।', en: 'Practice in conversing with visitors and reviewers.' },
    ],
    forWhom: {
      hi: 'विद्यालय, विद्यार्थी समूह और समुदाय; कक्षा 6 से 12 पर विशेष ध्यान।',
      en: 'Schools, student groups and communities, with a focus on classes 6 to 12.',
    },
    outcomes: [
      { hi: 'अपने विचार को स्पष्ट और तार्किक ढंग से प्रस्तुत करना', en: 'Presenting an idea clearly and logically' },
      { hi: 'आलोचना और प्रश्नों को सकारात्मक रूप से लेना', en: 'Welcoming questions and critique' },
      { hi: 'टीम में काम करने और समय-प्रबंधन का अनुभव', en: 'Experience of teamwork and managing time' },
    ],
    review: true,
  },
  {
    slug: 'science-quiz',
    title: { hi: 'विज्ञान क्विज़', en: 'Science Quiz' },
    short: {
      hi: 'ज्ञान के साथ-साथ सोचने और समस्या समाधान की क्षमता विकसित करने वाली विज्ञान प्रश्नोत्तरी।',
      en: 'Science quizzes that build thinking and problem-solving ability alongside knowledge.',
    },
    intro: {
      hi: 'हमारी क्विज़ याददाश्त की नहीं, समझ की परीक्षा है। प्रश्न इस तरह बनाए जाते हैं कि उत्तर तक पहुँचने के लिए तर्क लगाना पड़े, और हर उत्तर के बाद "क्यों" पर चर्चा हो। जीतना अच्छा है, पर नया प्रश्न लेकर लौटना उससे भी बेहतर।',
      en: 'Our quizzes test understanding, not memory. Questions are designed so that reasoning is needed to reach the answer, and every answer is followed by a discussion of why. Winning is good; going home with a new question is even better.',
    },
    icon: 'brain',
    tint: 'violet',
    whatHappens: [
      { hi: 'टीम आधारित राउंड: अवलोकन, तर्क, प्रयोग-आधारित प्रश्न।', en: 'Team rounds built on observation, reasoning and experiment-based questions.' },
      { hi: 'हर उत्तर के बाद संक्षिप्त व्याख्या।', en: 'A short explanation after every answer.' },
      { hi: 'ऑनलाइन अभ्यास के लिए विद्यार्थी कॉर्नर की क्विज़।', en: 'Online practice through the Students Corner quiz.' },
    ],
    forWhom: {
      hi: 'कक्षा 6 से 12 के विद्यार्थी; अंतर-विद्यालयी आयोजन भी।',
      en: 'Students of classes 6 to 12, including inter-school events.',
    },
    outcomes: [
      { hi: 'दबाव में तार्किक ढंग से सोचना', en: 'Reasoning calmly under pressure' },
      { hi: 'गलत उत्तर से बिना झिझक सीखना', en: 'Learning from wrong answers without hesitation' },
      { hi: 'विज्ञान के प्रति उत्साह और सहभागिता', en: 'Enthusiasm and participation in science' },
    ],
    review: true,
  },
  {
    slug: 'scientific-lectures',
    title: { hi: 'वैज्ञानिक व्याख्यान', en: 'Scientific Lectures' },
    short: {
      hi: 'वैज्ञानिकों, शिक्षकों एवं विशेषज्ञों द्वारा विज्ञान के विभिन्न विषयों पर संवाद एवं व्याख्यान।',
      en: 'Conversations and lectures on diverse science topics by scientists, teachers and experts.',
    },
    intro: {
      hi: 'एक अच्छा व्याख्यान एक नई खिड़की खोलता है। हम ऐसे वक्ताओं को आमंत्रित करते हैं जो अपने क्षेत्र की कहानी सरल भाषा में सुना सकें: वे कैसे सोचते हैं, कहाँ अटकते हैं और प्रमाण उन्हें कैसे आगे ले जाता है। हर सत्र में प्रश्नोत्तर को उतना ही समय मिलता है जितना व्याख्यान को।',
      en: 'A good lecture opens a new window. We invite speakers who can tell the story of their field in simple language: how they think, where they get stuck and how evidence moves them forward. Every session gives as much time to questions as to the talk itself.',
    },
    icon: 'mic',
    tint: 'navy',
    whatHappens: [
      { hi: 'सरल भाषा में किसी एक विषय की गहरी यात्रा।', en: 'A deep journey into one topic in simple language.' },
      { hi: 'वक्ता के कार्य-जीवन और सोचने के तरीके पर खुली बातचीत।', en: 'An open conversation about the speaker’s work and way of thinking.' },
      { hi: 'विद्यार्थियों के प्रश्नों के लिए पर्याप्त समय।', en: 'Ample time for students’ questions.' },
    ],
    forWhom: {
      hi: 'विद्यार्थी, शिक्षक, अभिभावक और जिज्ञासु नागरिक।',
      en: 'Students, teachers, parents and curious citizens.',
    },
    outcomes: [
      { hi: 'विज्ञान को करियर और जीवन-दृष्टि के रूप में देखना', en: 'Seeing science as a career and a worldview' },
      { hi: 'विशेषज्ञों से प्रश्न पूछने का आत्मविश्वास', en: 'Confidence to question experts' },
      { hi: 'वर्तमान वैज्ञानिक विषयों की समझ', en: 'Understanding of current scientific topics' },
    ],
    review: true,
  },
  {
    slug: 'environment-awareness',
    title: { hi: 'पर्यावरण जागरूकता', en: 'Environment Awareness' },
    short: {
      hi: 'पर्यावरण, प्रदूषण, जलवायु परिवर्तन, जल संरक्षण और जैव विविधता के प्रति जागरूकता।',
      en: 'Awareness of the environment, pollution, climate change, water conservation and biodiversity.',
    },
    intro: {
      hi: 'पर्यावरण की बातें नारे बनकर रह जाती हैं, जब तक उन्हें मापा और समझा न जाए। हमारे सत्रों में विद्यार्थी अपने आसपास की हवा, पानी, मिट्टी और जैव-विविधता का अवलोकन करते हैं, सरल माप लेते हैं और स्थानीय समस्याओं के लिए प्रमाण-आधारित समाधान सोचते हैं।',
      en: 'Environmental messages stay slogans until they are measured and understood. In our sessions students observe the air, water, soil and biodiversity around them, take simple measurements and think of evidence-based solutions for local problems.',
    },
    icon: 'leaf',
    tint: 'mint',
    whatHappens: [
      { hi: 'प्रकृति-भ्रमण और स्थानीय पर्यावरण का अवलोकन।', en: 'Nature walks and observation of the local environment.' },
      { hi: 'पानी, मिट्टी और कचरे पर सरल प्रयोग और माप।', en: 'Simple experiments and measurements on water, soil and waste.' },
      { hi: 'विद्यालय या मोहल्ले के लिए छोटी, व्यावहारिक कार्ययोजनाएँ।', en: 'Small, practical action plans for the school or neighbourhood.' },
    ],
    forWhom: {
      hi: 'विद्यार्थी, पर्यावरण क्लब, शिक्षक और समुदाय समूह।',
      en: 'Students, eco-clubs, teachers and community groups.',
    },
    outcomes: [
      { hi: 'पर्यावरण को भावना के साथ-साथ आँकड़ों से समझना', en: 'Understanding the environment with data as well as feeling' },
      { hi: 'स्थानीय समस्या पर वैज्ञानिक ढंग से काम करना', en: 'Working scientifically on a local problem' },
      { hi: 'ज़िम्मेदार और सूचित नागरिकता', en: 'Responsible, informed citizenship' },
    ],
    review: true,
  },
  {
    slug: 'space-astronomy',
    title: { hi: 'अंतरिक्ष एवं खगोल विज्ञान', en: 'Space & Astronomy' },
    short: {
      hi: 'अंतरिक्ष, ग्रहों, तारों, ब्रह्मांड एवं भारतीय अंतरिक्ष अनुसंधान के प्रति विद्यार्थियों की रुचि विकसित करना।',
      en: 'Developing students’ interest in space, planets, stars, the universe and Indian space research.',
    },
    intro: {
      hi: 'रात का आकाश सबसे पुरानी प्रयोगशाला है। आकाश-दर्शन सत्रों में विद्यार्थी नक्षत्र पहचानना, चंद्रमा की कलाओं का कारण समझना और ग्रहों को खोजना सीखते हैं। साथ ही भारत के अंतरिक्ष कार्यक्रम और ब्रह्मांड की विशालता पर चर्चा उन्हें बड़ा सोचने के लिए प्रेरित करती है।',
      en: 'The night sky is the oldest laboratory. In sky-watching sessions students learn to recognise constellations, understand why the Moon changes shape and find planets. Conversations about India’s space programme and the scale of the universe inspire them to think big.',
    },
    icon: 'telescope',
    tint: 'teal',
    whatHappens: [
      { hi: 'रात्रि आकाश-दर्शन और नक्षत्र पहचान।', en: 'Night-sky observation and constellation spotting.' },
      { hi: 'चंद्र-कलाओं, ग्रहण और ऋतुओं के मॉडल।', en: 'Models of lunar phases, eclipses and seasons.' },
      { hi: 'अंतरिक्ष अभियानों और ब्रह्मांड की विशालता पर संवाद।', en: 'Conversations on space missions and the scale of the cosmos.' },
    ],
    forWhom: {
      hi: 'सभी आयु के जिज्ञासु; परिवारों के साथ खुले सत्र।',
      en: 'Curious minds of all ages, with open sessions for families.',
    },
    outcomes: [
      { hi: 'आकाश में दिशा, समय और गति को पढ़ना', en: 'Reading direction, time and motion in the sky' },
      { hi: 'पैमाने और दूरी की वैज्ञानिक समझ', en: 'A scientific sense of scale and distance' },
      { hi: 'ब्रह्मांड के प्रति विस्मय और प्रश्न', en: 'Wonder and questions about the universe' },
    ],
    review: true,
  },
  {
    slug: 'innovation-creativity',
    title: { hi: 'नवाचार एवं सृजनात्मकता', en: 'Innovation & Creativity' },
    short: {
      hi: 'विद्यार्थियों को समस्याओं की पहचान कर उनके वैज्ञानिक एवं रचनात्मक समाधान खोजने के लिए प्रेरित करना।',
      en: 'Inspiring students to identify problems and find scientific and creative solutions to them.',
    },
    intro: {
      hi: 'नवाचार कोई जादू नहीं, एक प्रक्रिया है: समस्या को ठीक से समझना, कई समाधान सोचना, सबसे आशाजनक को बनाना, परखना और सुधारना। इन सत्रों में विद्यार्थी अपने आसपास की वास्तविक समस्याओं पर काम करते हैं और असफलता को डिज़ाइन का हिस्सा मानना सीखते हैं।',
      en: 'Innovation is not magic; it is a process: understand the problem well, imagine many solutions, build the most promising one, test it and improve. In these sessions students work on real problems around them and learn to treat failure as part of design.',
    },
    icon: 'lightbulb',
    tint: 'orange',
    whatHappens: [
      { hi: 'डिज़ाइन-सोच के चरण: समझो, सोचो, बनाओ, परखो।', en: 'Design-thinking steps: understand, ideate, build, test.' },
      { hi: 'कम लागत की सामग्री से प्रोटोटाइप बनाना।', en: 'Prototyping with low-cost materials.' },
      { hi: 'टीम में प्रस्तुति और एक-दूसरे से प्रतिक्रिया।', en: 'Team presentations and peer feedback.' },
    ],
    forWhom: {
      hi: 'कक्षा 8 से 12 के विद्यार्थी और युवा नवप्रवर्तक।',
      en: 'Students of classes 8 to 12 and young innovators.',
    },
    outcomes: [
      { hi: 'समस्या को परिभाषित करने की क्षमता', en: 'The ability to define a problem' },
      { hi: 'बनाने और सुधारने का चक्र अपनाना', en: 'Adopting the build-and-improve cycle' },
      { hi: 'रचनात्मक आत्मविश्वास', en: 'Creative confidence' },
    ],
    review: true,
  },
  {
    slug: 'teacher-development',
    title: { hi: 'शिक्षक विकास', en: 'Teacher Development' },
    short: {
      hi: 'शिक्षकों के लिए विज्ञान शिक्षण की नवीन एवं गतिविधि-आधारित विधियों पर प्रशिक्षण।',
      en: 'Training for teachers in new, activity-based methods of science teaching.',
    },
    intro: {
      hi: 'वैज्ञानिक दृष्टिकोण कक्षा में तभी पहुँचता है जब शिक्षक उसे जीते हैं। शिक्षक विकास सत्रों में हम गतिविधि-आधारित शिक्षण, कम लागत के प्रयोग, प्रश्न पूछने की कला और मूल्यांकन के नए तरीके साझा करते हैं, ताकि हर विज्ञान पाठ खोज का अनुभव बन सके।',
      en: 'Scientific temper reaches the classroom only when teachers live it. In teacher development sessions we share activity-based teaching, low-cost experiments, the art of questioning and new ways of assessment, so that every science lesson becomes an experience of discovery.',
    },
    icon: 'graduationCap',
    tint: 'rose',
    whatHappens: [
      { hi: 'गतिविधि-आधारित पाठ योजना पर कार्यशालाएँ।', en: 'Workshops on activity-based lesson planning.' },
      { hi: 'कम लागत की प्रयोग सामग्री और कक्षा-प्रदर्शन।', en: 'Low-cost experiment kits and classroom demonstrations.' },
      { hi: 'शिक्षक कॉर्नर के संसाधन और सहकर्मी-समूह।', en: 'Teachers Corner resources and peer groups.' },
    ],
    forWhom: {
      hi: 'विज्ञान शिक्षक, शिक्षक-प्रशिक्षु और विद्यालय नेतृत्व।',
      en: 'Science teachers, trainee teachers and school leaders.',
    },
    outcomes: [
      { hi: 'कक्षा में प्रयोग और प्रश्न की संस्कृति', en: 'A classroom culture of experiment and questioning' },
      { hi: 'तैयार, परखे हुए शिक्षण संसाधन', en: 'Ready, tested teaching resources' },
      { hi: 'शिक्षकों का सहयोगी समुदाय', en: 'A supportive community of teachers' },
    ],
    review: true,
  },
]

export const activityMap = Object.fromEntries(activities.map((activity) => [activity.slug, activity])) as Record<string, Activity>
