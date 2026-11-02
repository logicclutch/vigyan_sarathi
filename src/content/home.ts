import type { L } from './types'

export const home = {
  hero: {
    kicker: { hi: 'सामाजिक एवं शैक्षिक पहल', en: 'A social and educational initiative' } satisfies L,
    intro: {
      hi: 'विज्ञान सारथी विद्यार्थियों में वैज्ञानिक दृष्टिकोण, जिज्ञासा, तार्किक चिंतन और वैज्ञानिक चेतना के संवर्धन के लिए समर्पित एक सामाजिक एवं शैक्षिक पहल है।',
      en: 'Vigyan Sarathi is a social and educational initiative dedicated to nurturing scientific temper, curiosity, logical thinking and scientific awareness among students.',
    } satisfies L,
    orbitLabels: { hi: ['प्रश्न', 'प्रयोग', 'प्रमाण'], en: ['Question', 'Experiment', 'Evidence'] } as { hi: readonly [string, string, string]; en: readonly [string, string, string] },
    scrollHint: { hi: 'नीचे खोजें', en: 'Scroll to explore' } satisfies L,
    chips: [
      { hi: 'कार्यशालाएँ', en: 'Workshops' },
      { hi: 'प्रयोग', en: 'Experiments' },
      { hi: 'क्विज़', en: 'Quizzes' },
      { hi: 'खगोल-दर्शन', en: 'Stargazing' },
    ] satisfies L[],
  },
  journey: {
    eyebrow: { hi: 'हमारा सूत्र', en: 'Our guiding line' } satisfies L,
    nodes: [
      { label: { hi: 'जिज्ञासा', en: 'Curiosity' }, hint: { hi: 'हर खोज की शुरुआत', en: 'Where every discovery begins' } },
      { label: { hi: 'प्रश्न', en: 'Question' }, hint: { hi: 'जिज्ञासा को शब्द देना', en: 'Giving curiosity words' } },
      { label: { hi: 'प्रयोग', en: 'Experiment' }, hint: { hi: 'प्रश्न को परखना', en: 'Putting the question to the test' } },
      { label: { hi: 'वैज्ञानिक दृष्टिकोण', en: 'Scientific outlook' }, hint: { hi: 'सोचने का स्थायी तरीका', en: 'A lasting way of thinking' } },
    ] satisfies { label: L; hint: L }[],
  },
  intro: {
    eyebrow: { hi: 'परिचय', en: 'Introduction' } satisfies L,
    title: {
      hi: 'विज्ञान को पाठ्यपुस्तकों से निकालकर दैनिक जीवन, समाज और प्रकृति से जोड़ना',
      en: 'Taking science beyond textbooks into daily life, society and nature',
    } satisfies L,
    paragraphs: [
      {
        hi: 'विज्ञान सारथी विद्यार्थियों में वैज्ञानिक दृष्टिकोण, जिज्ञासा, तार्किक चिंतन और वैज्ञानिक चेतना के संवर्धन के लिए समर्पित एक सामाजिक एवं शैक्षिक पहल है। संस्था का मूल उद्देश्य विज्ञान को केवल पाठ्यपुस्तकों तक सीमित न रखकर उसे विद्यार्थियों के दैनिक जीवन, समाज और प्रकृति से जोड़ना है।',
        en: 'Vigyan Sarathi is a social and educational initiative dedicated to nurturing scientific temper, curiosity, logical thinking and scientific awareness among students. Its core purpose is to take science beyond textbooks and connect it with students’ daily lives, society and nature.',
      },
      {
        hi: 'विज्ञान सारथी निरंतर विज्ञान के प्रचार-प्रसार, विज्ञान संचार और वैज्ञानिक सोच के विकास के लिए विभिन्न गतिविधियों, कार्यशालाओं, विज्ञान प्रदर्शनियों, व्याख्यानों, प्रयोगात्मक गतिविधियों, क्विज, विज्ञान मॉडल एवं प्रोजेक्ट, जागरूकता कार्यक्रमों तथा संवादात्मक कार्यक्रमों का आयोजन करता है।',
        en: 'To spread and communicate science and build scientific thinking, Vigyan Sarathi continually organises activities, workshops, science exhibitions, lectures, hands-on experiments, quizzes, science models and projects, awareness programmes and interactive sessions.',
      },
    ] satisfies L[],
    principles: [
      {
        title: { hi: 'हमारा विश्वास', en: 'Our belief' },
        body: {
          hi: 'हर प्रश्न वैज्ञानिक सोच की शुरुआत है और हर जिज्ञासु मन भविष्य का वैज्ञानिक बना सकता है। इसलिए हम विद्यार्थियों को केवल उत्तर देने के बजाय प्रश्न पूछने, तर्क करने, प्रमाण खोजने और स्वयं प्रयोग करके सीखने के लिए प्रेरित करते हैं।',
          en: 'Every question is the beginning of scientific thinking, and every curious mind can become a scientist of the future. So instead of simply handing students answers, we encourage them to ask, reason, seek evidence and learn by experimenting themselves.',
        },
      },
      {
        title: { hi: 'हमारा प्रयास', en: 'Our effort' },
        body: {
          hi: 'विज्ञान डर या कठिन विषय नहीं, बल्कि जिज्ञासा, खोज और आनंद का विषय बने।',
          en: 'Science should be a subject of curiosity, discovery and joy, not of fear or difficulty.',
        },
      },
      {
        title: { hi: 'हमारा लक्ष्य', en: 'Our goal' },
        body: {
          hi: 'ऐसे विद्यार्थियों और नागरिकों का निर्माण, जो तर्कसंगत सोच रखें, प्रमाणों का सम्मान करें, अंधविश्वास और भ्रांतियों को प्रश्नों की कसौटी पर परखें तथा विज्ञान को समाज और राष्ट्र के विकास का माध्यम बनाएं।',
          en: 'Students and citizens who think rationally, respect evidence, test superstition and misconceptions on the touchstone of questions, and make science a means of progress for society and the nation.',
        },
      },
    ] satisfies { title: L; body: L }[],
  },
  visionMission: {
    eyebrow: { hi: 'दिशा', en: 'Direction' } satisfies L,
    title: { hi: 'हम किस समाज की ओर चल रहे हैं', en: 'The society we are walking towards' } satisfies L,
  },
  activities: {
    eyebrow: { hi: 'हम क्या करते हैं', en: 'What we do' } satisfies L,
    title: { hi: 'विज्ञान सारथी की प्रमुख गतिविधियाँ', en: 'Key activities of Vigyan Sarathi' } satisfies L,
    lead: {
      hi: 'कार्यशालाओं से खगोल-दर्शन तक, हर गतिविधि जिज्ञासा को प्रश्न, प्रयोग और प्रमाण की ओर ले जाती है।',
      en: 'From workshops to stargazing, every activity leads curiosity towards questions, experiments and evidence.',
    } satisfies L,
  },
  temper: {
    eyebrow: { hi: 'वैज्ञानिक दृष्टिकोण — हमारी प्राथमिकता', en: 'Scientific temper: our priority' } satisfies L,
    title: { hi: 'प्रश्न से निष्कर्ष तक की छह कड़ियाँ', en: 'Six links from question to conclusion' } satisfies L,
    lead: {
      hi: 'वैज्ञानिक दृष्टिकोण का अर्थ केवल विज्ञान की जानकारी होना नहीं है। यह एक ऐसी मानसिकता है जिसमें व्यक्ति “मैंने सुना है” से आगे बढ़कर पूछता है— “क्या यह सत्य है?” और फिर पूछता है— “इसका प्रमाण क्या है?”',
      en: 'Scientific temper does not simply mean knowing science. It is a mindset in which a person moves beyond “I have heard that…” to ask “Is it true?” and then “What is the evidence?”',
    } satisfies L,
  },
  students: {
    eyebrow: { hi: 'विद्यार्थी कॉर्नर', en: 'Students Corner' } satisfies L,
    title: { hi: 'विद्यार्थियों के लिए विज्ञान की दुनिया', en: 'A world of science for students' } satisfies L,
    lead: {
      hi: 'यहाँ विद्यार्थी पाएँगे— रोचक विज्ञान तथ्य, सरल विज्ञान प्रयोग, विज्ञान क्विज़, प्रोजेक्ट, मॉडल के विचार, वैज्ञानिकों की प्रेरक कहानियाँ, महत्वपूर्ण प्रश्न, विज्ञान समाचार, विज्ञान में करियर तथा विज्ञान से जुड़े मिथक और तथ्य।',
      en: 'Here students will find science facts, simple experiments, quizzes, projects, model ideas, inspiring stories of scientists, important questions, science news, careers in science, and science myths and facts.',
    } satisfies L,
    tiles: {
      fact: { hi: 'आज का तथ्य', en: 'Fact of the moment' },
      experiment: { hi: 'घर पर प्रयोग', en: 'Try at home' },
      quiz: { hi: 'क्विज़ खेलें', en: 'Play the quiz' },
      myth: { hi: 'मिथक या तथ्य?', en: 'Myth or fact?' },
    } satisfies Record<'fact' | 'experiment' | 'quiz' | 'myth', L>,
    quizBlurb: { hi: 'तीन क्विज़ सेट, तुरंत व्याख्या के साथ।', en: 'Three quiz sets with instant explanations.' } satisfies L,
    mythPrompt: { hi: 'क्या यह बात सच है? पहले सोचें, फिर उत्तर देखें।', en: 'Is this true? Think first, then reveal the answer.' } satisfies L,
  },
  teachers: {
    eyebrow: { hi: 'शिक्षक कॉर्नर', en: 'Teachers Corner' } satisfies L,
    title: { hi: 'एक अच्छा विज्ञान शिक्षक केवल उत्तर नहीं देता', en: 'A good science teacher does not only give answers' } satisfies L,
    lead: {
      hi: 'वह विद्यार्थियों के मन में सही प्रश्न पैदा करता है। विज्ञान सारथी शिक्षकों के लिए उपलब्ध कराएगा— शिक्षण संसाधन, गतिविधि-आधारित विचार, प्रयोग आधारित सामग्री, प्रोजेक्ट विचार, कक्षा प्रदर्शन, प्रश्नोत्तरी सामग्री, PPT संसाधन, प्रशिक्षण सामग्री और नवाचारी शिक्षण पद्धतियाँ।',
      en: 'They plant the right questions in students’ minds. Vigyan Sarathi will make available for teachers: teaching resources, activity-based ideas, experiment-based material, project ideas, classroom demonstrations, quiz material, PPT resources, training material and innovative teaching practices.',
    } satisfies L,
  },
  projects: {
    eyebrow: { hi: 'चुनिंदा प्रोजेक्ट', en: 'Featured projects' } satisfies L,
    title: { hi: 'बनाइए, मापिए, समझाइए', en: 'Build it, measure it, explain it' } satisfies L,
    lead: {
      hi: 'प्रदर्शनी और कक्षा के लिए ऐसे प्रोजेक्ट, जिनमें मॉडल के साथ एक प्रश्न और एक माप भी हो।',
      en: 'Projects for exhibitions and classrooms that pair a model with a question and a measurement.',
    } satisfies L,
  },
  programs: {
    eyebrow: { hi: 'गतिविधियाँ एवं कार्यक्रम', en: 'Activities and programmes' } satisfies L,
    title: { hi: 'हमारे कार्यक्रमों के स्वरूप', en: 'The shapes our programmes take' } satisfies L,
    lead: {
      hi: 'विद्यालयों और समुदायों में हम इन स्वरूपों में काम करते हैं। आगामी तिथियाँ संपर्क माध्यमों पर घोषित की जाती हैं।',
      en: 'These are the formats we work in with schools and communities. Upcoming dates are announced through our contact channels.',
    } satisfies L,
    upcoming: { hi: 'आगामी कार्यक्रम', en: 'Upcoming programmes' } satisfies L,
    invite: { hi: 'अपने विद्यालय में आमंत्रित करें', en: 'Invite us to your school' } satisfies L,
  },
  gallery: {
    eyebrow: { hi: 'गैलरी', en: 'Gallery' } satisfies L,
    title: { hi: 'खोज की झलकियाँ', en: 'Glimpses of discovery' } satisfies L,
    lead: {
      hi: 'कार्यशालाओं, प्रदर्शनियों, प्रयोगों और जागरूकता कार्यक्रमों के क्षण।',
      en: 'Moments from workshops, exhibitions, experiments and awareness programmes.',
    } satisfies L,
  },
  cta: {
    eyebrow: { hi: 'साथ चलें', en: 'Walk with us' } satisfies L,
    title: { hi: 'जिज्ञासा को रास्ता दीजिए।', en: 'Give curiosity a road.' } satisfies L,
    body: {
      hi: 'विद्यार्थी, शिक्षक, अभिभावक या विज्ञान-प्रेमी, विज्ञान सारथी के मिशन से जुड़िए और वैज्ञानिक दृष्टिकोण को जीवन की संस्कृति बनाने में साथ दीजिए।',
      en: 'Student, teacher, parent or science lover: join the Vigyan Sarathi mission and help make scientific temper part of everyday culture.',
    } satisfies L,
  },
  marquee: {
    hi: ['जिज्ञासा', 'प्रश्न', 'अवलोकन', 'परिकल्पना', 'प्रयोग', 'प्रमाण', 'तर्क', 'निष्कर्ष', 'खोज', 'नवाचार'],
    en: ['Curiosity', 'Question', 'Observation', 'Hypothesis', 'Experiment', 'Evidence', 'Reason', 'Conclusion', 'Discovery', 'Innovation'],
  } as { hi: string[]; en: string[] },
}
