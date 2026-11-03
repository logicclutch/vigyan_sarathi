import type { QuizSet } from '../types'
import { withOverride } from '../overrides'

/** Three topic quizzes for classes 6–10. `answer` is the index of the correct option. */
const quizSetsDefaults: QuizSet[] = [
  {
    id: 'everyday',
    title: { hi: 'रोज़मर्रा का विज्ञान', en: 'Everyday Science' },
    description: {
      hi: 'रसोई, बारिश और बल्ब: हर रोज़ दिखने वाली चीज़ों के पीछे का विज्ञान।',
      en: 'The science behind everyday things: kitchens, rain, light bulbs and more.',
    },
    icon: 'lightbulb',
    tint: 'amber',
    questions: [
      {
        id: 'ev-ice-floats',
        q: { hi: 'बर्फ़ पानी पर क्यों तैरती है?', en: 'Why does ice float on water?' },
        options: [
          { hi: 'क्योंकि बर्फ़ ठंडी होती है', en: 'Because ice is cold' },
          { hi: 'क्योंकि पानी बर्फ़ को ऊपर धकेलता है', en: 'Because water pushes ice up' },
          { hi: 'क्योंकि बर्फ़ पानी से कम घनी होती है', en: 'Because ice is less dense than water' },
          { hi: 'क्योंकि बर्फ़ में हवा भरी होती है', en: 'Because ice is full of air' },
        ],
        answer: 2,
        explanation: {
          hi: 'जमते समय पानी फैलता है, इसलिए उतने ही द्रव्यमान की बर्फ़ ज़्यादा जगह घेरती है और हल्की होकर तैरती है।',
          en: 'Water expands as it freezes, so the same mass of ice takes up more space, making it less dense and buoyant.',
        },
      },
      {
        id: 'ev-rainbow',
        q: { hi: 'प्राथमिक इंद्रधनुष में सबसे बाहरी (ऊपरी) रंग कौन-सा होता है?', en: 'Which colour is on the outer (top) edge of a primary rainbow?' },
        options: [
          { hi: 'लाल', en: 'Red' },
          { hi: 'बैंगनी', en: 'Violet' },
          { hi: 'हरा', en: 'Green' },
          { hi: 'पीला', en: 'Yellow' },
        ],
        answer: 0,
        explanation: {
          hi: 'पानी की बूँदों में लाल रोशनी सबसे कम मुड़ती है, इसलिए वह सबसे बाहर दिखाई देती है और बैंगनी सबसे अंदर।',
          en: 'Red light bends the least inside raindrops, so it appears on the outside of the arc and violet on the inside.',
        },
      },
      {
        id: 'ev-boiling-point',
        q: { hi: 'समुद्र तल पर शुद्ध पानी किस तापमान पर उबलता है?', en: 'At what temperature does pure water boil at sea level?' },
        options: [
          { hi: '50 °C', en: '50 °C' },
          { hi: '100 °C', en: '100 °C' },
          { hi: '150 °C', en: '150 °C' },
          { hi: '212 °C', en: '212 °C' },
        ],
        answer: 1,
        explanation: {
          hi: 'समुद्र तल के वायुदाब पर पानी 100 डिग्री सेल्सियस पर उबलता है; ऊँचे पहाड़ों पर दाब कम होने से यह कम तापमान पर ही उबल जाता है।',
          en: 'At sea-level air pressure water boils at 100 degrees Celsius; high in the mountains, where pressure is lower, it boils at a lower temperature.',
        },
      },
      {
        id: 'ev-bulb-heat',
        q: { hi: 'पुराना तापदीप्त बल्ब जलते समय इतना गर्म क्यों हो जाता है?', en: 'Why does an old-style incandescent bulb get so hot?' },
        options: [
          { hi: 'काँच रोशनी को सोख लेता है', en: 'The glass absorbs the light' },
          { hi: 'बल्ब के अंदर हवा जलती है', en: 'Air burns inside the bulb' },
          { hi: 'बिजली बल्ब के अंदर पानी गर्म करती है', en: 'Electricity heats water inside the bulb' },
          { hi: 'विद्युत धारा पतले तार (फ़िलामेंट) को चमकने तक गर्म करती है', en: 'Current heats the thin filament until it glows' },
        ],
        answer: 3,
        explanation: {
          hi: 'टंगस्टन का फ़िलामेंट धारा के प्रतिरोध से लगभग 2,500 डिग्री सेल्सियस तक गर्म होकर चमकता है; ज़्यादातर ऊर्जा रोशनी नहीं, गर्मी बन जाती है।',
          en: 'Resistance heats the tungsten filament to roughly 2,500 degrees Celsius so that it glows; most of the energy becomes heat rather than light.',
        },
      },
      {
        id: 'ev-exhale-gas',
        q: {
          hi: 'साँस छोड़ते समय हम कौन-सी गैस साँस लेने की तुलना में कहीं अधिक मात्रा में बाहर निकालते हैं?',
          en: 'Which gas do we breathe out in a much larger amount than we breathe in?',
        },
        options: [
          { hi: 'नाइट्रोजन', en: 'Nitrogen' },
          { hi: 'ऑक्सीजन', en: 'Oxygen' },
          { hi: 'कार्बन डाइऑक्साइड', en: 'Carbon dioxide' },
          { hi: 'हीलियम', en: 'Helium' },
        ],
        answer: 2,
        explanation: {
          hi: 'कोशिकाएँ भोजन से ऊर्जा निकालते समय कार्बन डाइऑक्साइड बनाती हैं, जिसे फेफड़े बाहर निकालते हैं; छोड़ी गई साँस में यह गैस ली गई साँस से लगभग सौ गुना अधिक होती है।',
          en: 'Cells make carbon dioxide while releasing energy from food, and the lungs expel it; exhaled air holds roughly a hundred times more of it than inhaled air.',
        },
      },
      {
        id: 'ev-shadow-noon',
        q: { hi: 'दोपहर के आसपास हमारी छाया सबसे छोटी क्यों होती है?', en: 'Why is our shadow shortest around midday?' },
        options: [
          { hi: 'दोपहर में रोशनी कमज़ोर होती है', en: 'Light is weaker at midday' },
          { hi: 'सूर्य आसमान में सबसे ऊँचा, लगभग सिर के ऊपर होता है', en: 'The Sun is highest in the sky, almost overhead' },
          { hi: 'गर्म ज़मीन छाया सोख लेती है', en: 'The warm ground absorbs the shadow' },
          { hi: 'हमारी आँखें दोपहर में छाया कम देख पाती हैं', en: 'Our eyes see shadows less well at noon' },
        ],
        answer: 1,
        explanation: {
          hi: 'छाया की लंबाई रोशनी के कोण पर निर्भर करती है; सूर्य जितना ऊपर, किरणें उतनी सीधी और छाया उतनी छोटी।',
          en: 'The length of a shadow depends on the angle of the light; the higher the Sun, the steeper the rays and the shorter the shadow.',
        },
      },
      {
        id: 'ev-sound-medium',
        q: { hi: 'इनमें से किसमें आवाज़ सबसे तेज़ चलती है?', en: 'In which of these does sound travel fastest?' },
        options: [
          { hi: 'इस्पात (ठोस)', en: 'Steel (a solid)' },
          { hi: 'पानी', en: 'Water' },
          { hi: 'हवा', en: 'Air' },
          { hi: 'निर्वात (वैक्यूम)', en: 'A vacuum' },
        ],
        answer: 0,
        explanation: {
          hi: 'ठोस में कण सबसे पास-पास होते हैं, इसलिए कंपन सबसे तेज़ी से आगे बढ़ता है; निर्वात में कण ही नहीं होते, इसलिए वहाँ आवाज़ चल ही नहीं सकती।',
          en: 'Particles in a solid are packed closest together, so vibrations pass on fastest; a vacuum has no particles at all, so sound cannot travel there.',
        },
      },
      {
        id: 'ev-magnet',
        q: { hi: 'एक साधारण चुंबक इनमें से किसे खींचेगा?', en: 'Which of these will an ordinary magnet attract?' },
        options: [
          { hi: 'ताँबे का तार', en: 'A copper wire' },
          { hi: 'एल्युमिनियम की पन्नी', en: 'Aluminium foil' },
          { hi: 'प्लास्टिक का स्केल', en: 'A plastic ruler' },
          { hi: 'लोहे की कील', en: 'An iron nail' },
        ],
        answer: 3,
        explanation: {
          hi: 'साधारण चुंबक लोहा, निकल और कोबाल्ट जैसी "लौहचुंबकीय" धातुओं को ही खींचता है; ताँबा और एल्युमिनियम धातु होकर भी इस सूची में नहीं हैं।',
          en: 'Ordinary magnets attract only ferromagnetic metals such as iron, nickel and cobalt; copper and aluminium are metals but not on that list.',
        },
      },
    ],
  },
  {
    id: 'space',
    title: { hi: 'अंतरिक्ष और पृथ्वी', en: 'Space & Earth' },
    description: {
      hi: 'ग्रह, चंद्रमा, सूर्य और हमारी अपनी पृथ्वी के बारे में आप कितना जानते हैं?',
      en: 'How much do you know about planets, the Moon, the Sun and our own Earth?',
    },
    icon: 'telescope',
    tint: 'electric',
    questions: [
      {
        id: 'sp-largest-planet',
        q: { hi: 'हमारे सौरमंडल का सबसे बड़ा ग्रह कौन-सा है?', en: 'Which is the largest planet in our solar system?' },
        options: [
          { hi: 'शनि', en: 'Saturn' },
          { hi: 'बृहस्पति', en: 'Jupiter' },
          { hi: 'पृथ्वी', en: 'Earth' },
          { hi: 'नेपच्यून', en: 'Neptune' },
        ],
        answer: 1,
        explanation: {
          hi: 'बृहस्पति इतना बड़ा है कि उसके भीतर 1,300 से अधिक पृथ्वियाँ समा सकती हैं।',
          en: 'Jupiter is so large that more than 1,300 Earths could fit inside it.',
        },
      },
      {
        id: 'sp-earth-year',
        q: { hi: 'पृथ्वी को सूर्य का एक पूरा चक्कर लगाने में कितना समय लगता है?', en: 'How long does Earth take to complete one orbit around the Sun?' },
        options: [
          { hi: '24 घंटे', en: '24 hours' },
          { hi: '30 दिन', en: '30 days' },
          { hi: 'लगभग 365 दिन', en: 'About 365 days' },
          { hi: '12 साल', en: '12 years' },
        ],
        answer: 2,
        explanation: {
          hi: 'एक परिक्रमा में लगभग 365 दिन 6 घंटे लगते हैं; इसी अतिरिक्त चौथाई दिन की भरपाई के लिए हर चौथे साल फ़रवरी में एक दिन जोड़ा जाता है।',
          en: 'One orbit takes about 365 days and 6 hours; those extra quarter days are why February gains a day every fourth year.',
        },
      },
      {
        id: 'sp-moon-sound',
        q: {
          hi: 'चंद्रमा पर अंतरिक्ष यात्री एक-दूसरे को सीधे आवाज़ देकर क्यों नहीं सुन सकते?',
          en: "Why can't astronauts on the Moon simply shout to each other?",
        },
        options: [
          { hi: 'वहाँ हवा (वायुमंडल) नहीं है, जिसमें आवाज़ चल सके', en: 'There is no air for sound to travel through' },
          { hi: 'वहाँ बहुत ठंड है', en: 'It is too cold there' },
          { hi: 'गुरुत्वाकर्षण आवाज़ को नीचे खींच लेता है', en: 'Gravity pulls the sound down' },
          { hi: 'उनके हेलमेट बहुत मोटे हैं', en: 'Their helmets are too thick' },
        ],
        answer: 0,
        explanation: {
          hi: 'आवाज़ को चलने के लिए माध्यम चाहिए; चंद्रमा पर वायुमंडल लगभग नहीं है, इसलिए यात्री रेडियो से बात करते हैं।',
          en: 'Sound needs a medium to travel through; the Moon has almost no atmosphere, so astronauts talk by radio.',
        },
      },
      {
        id: 'sp-day-night',
        q: { hi: 'दिन और रात किस कारण होते हैं?', en: 'What causes day and night?' },
        options: [
          { hi: 'सूर्य का पृथ्वी के चारों ओर घूमना', en: 'The Sun circling the Earth' },
          { hi: 'चंद्रमा का सूर्य को ढक लेना', en: 'The Moon covering the Sun' },
          { hi: 'पृथ्वी का सूर्य से पास-दूर होना', en: 'Earth moving nearer to and farther from the Sun' },
          { hi: 'पृथ्वी का अपनी धुरी पर घूमना', en: 'Earth spinning on its axis' },
        ],
        answer: 3,
        explanation: {
          hi: 'पृथ्वी लगभग 24 घंटे में अपनी धुरी पर एक चक्कर लगाती है; जो हिस्सा सूर्य की ओर होता है वहाँ दिन और विपरीत हिस्से में रात होती है।',
          en: 'Earth turns once on its axis roughly every 24 hours; the side facing the Sun has day while the opposite side has night.',
        },
      },
      {
        id: 'sp-sun-made-of',
        q: { hi: 'सूर्य मुख्य रूप से किससे बना है?', en: 'What is the Sun mainly made of?' },
        options: [
          { hi: 'पिघला हुआ लोहा', en: 'Molten iron' },
          { hi: 'हाइड्रोजन और हीलियम गैस', en: 'Hydrogen and helium gas' },
          { hi: 'जलता हुआ कोयला', en: 'Burning coal' },
          { hi: 'गर्म चट्टानें', en: 'Hot rock' },
        ],
        answer: 1,
        explanation: {
          hi: 'सूर्य गैस का विशाल गोला है, जिसके केंद्र में हाइड्रोजन के नाभिक जुड़कर हीलियम बनाते हैं; इसी नाभिकीय संलयन से उसकी ऊर्जा आती है।',
          en: 'The Sun is a giant ball of gas; in its core hydrogen nuclei fuse into helium, and that nuclear fusion is the source of its energy.',
        },
      },
      {
        id: 'sp-red-planet',
        q: { hi: 'किस ग्रह को "लाल ग्रह" कहा जाता है?', en: 'Which planet is known as the "Red Planet"?' },
        options: [
          { hi: 'शुक्र', en: 'Venus' },
          { hi: 'बुध', en: 'Mercury' },
          { hi: 'मंगल', en: 'Mars' },
          { hi: 'बृहस्पति', en: 'Jupiter' },
        ],
        answer: 2,
        explanation: {
          hi: 'मंगल की मिट्टी में लोहे के ऑक्साइड, यानी जंग, की अधिकता है, जिससे वह लाल-नारंगी दिखता है।',
          en: 'Martian soil is rich in iron oxide, essentially rust, which gives the planet its reddish-orange colour.',
        },
      },
      {
        id: 'sp-crust',
        q: { hi: 'पृथ्वी की सबसे बाहरी ठोस परत क्या कहलाती है?', en: "What is Earth's outermost solid layer called?" },
        options: [
          { hi: 'भूपर्पटी (क्रस्ट)', en: 'The crust' },
          { hi: 'प्रावार (मैंटल)', en: 'The mantle' },
          { hi: 'बाह्य क्रोड', en: 'The outer core' },
          { hi: 'आंतरिक क्रोड', en: 'The inner core' },
        ],
        answer: 0,
        explanation: {
          hi: 'भूपर्पटी पृथ्वी की सबसे पतली परत है: महाद्वीपों के नीचे लगभग 30–50 किलोमीटर और समुद्रों के नीचे केवल 5–10 किलोमीटर मोटी।',
          en: 'The crust is the thinnest layer, about 30–50 kilometres thick under continents and only 5–10 kilometres under the oceans.',
        },
      },
      {
        id: 'sp-tides',
        q: { hi: 'समुद्र में ज्वार-भाटा मुख्य रूप से किसके गुरुत्वाकर्षण के कारण आता है?', en: 'Ocean tides are caused mainly by the gravity of which body?' },
        options: [
          { hi: 'सूर्य', en: 'The Sun' },
          { hi: 'मंगल', en: 'Mars' },
          { hi: 'बृहस्पति', en: 'Jupiter' },
          { hi: 'चंद्रमा', en: 'The Moon' },
        ],
        answer: 3,
        explanation: {
          hi: 'पास होने के कारण चंद्रमा पृथ्वी के पानी को सबसे अधिक खींचता है; सूर्य का असर भी है, पर लगभग आधा।',
          en: "Being so close, the Moon pulls hardest on Earth's water; the Sun also contributes, but only about half as much.",
        },
      },
    ],
  },
  {
    id: 'life',
    title: { hi: 'शरीर और जीवन', en: 'Body & Life' },
    description: {
      hi: 'हड्डियों से लेकर पौधों तक, जीवन के विज्ञान पर आठ प्रश्न।',
      en: 'Eight questions on the science of life, from bones to plants.',
    },
    icon: 'heartPulse',
    tint: 'mint',
    questions: [
      {
        id: 'lf-largest-organ',
        q: { hi: 'मानव शरीर का सबसे बड़ा अंग कौन-सा है?', en: 'What is the largest organ of the human body?' },
        options: [
          { hi: 'यकृत (लिवर)', en: 'The liver' },
          { hi: 'मस्तिष्क', en: 'The brain' },
          { hi: 'त्वचा', en: 'The skin' },
          { hi: 'फेफड़े', en: 'The lungs' },
        ],
        answer: 2,
        explanation: {
          hi: 'एक वयस्क की त्वचा लगभग 2 वर्ग मीटर क्षेत्र ढकती है और शरीर को संक्रमण, चोट और पानी की कमी से बचाती है।',
          en: "An adult's skin covers about 2 square metres and protects the body from infection, injury and water loss.",
        },
      },
      {
        id: 'lf-oxygen-carrier',
        q: { hi: 'रक्त में ऑक्सीजन को कौन ले जाता है?', en: 'What carries oxygen in the blood?' },
        options: [
          { hi: 'श्वेत रक्त कोशिकाएँ', en: 'White blood cells' },
          { hi: 'लाल रक्त कोशिकाएँ (हीमोग्लोबिन)', en: 'Red blood cells (haemoglobin)' },
          { hi: 'प्लेटलेट्स', en: 'Platelets' },
          { hi: 'प्लाज़्मा का पानी', en: 'The water in plasma' },
        ],
        answer: 1,
        explanation: {
          hi: 'लाल रक्त कोशिकाओं में मौजूद लौहयुक्त प्रोटीन हीमोग्लोबिन फेफड़ों में ऑक्सीजन बाँधकर पूरे शरीर तक पहुँचाता है।',
          en: 'Haemoglobin, an iron-rich protein in red blood cells, binds oxygen in the lungs and delivers it throughout the body.',
        },
      },
      {
        id: 'lf-photosynthesis',
        q: { hi: 'हरे पौधे अपना भोजन किस प्रक्रिया से बनाते हैं?', en: 'By what process do green plants make their food?' },
        options: [
          { hi: 'प्रकाश संश्लेषण', en: 'Photosynthesis' },
          { hi: 'श्वसन', en: 'Respiration' },
          { hi: 'पाचन', en: 'Digestion' },
          { hi: 'वाष्पोत्सर्जन', en: 'Transpiration' },
        ],
        answer: 0,
        explanation: {
          hi: 'पत्तियों का क्लोरोफ़िल सूर्य की रोशनी से ऊर्जा लेकर पानी और कार्बन डाइऑक्साइड से ग्लूकोज़ बनाता है और ऑक्सीजन छोड़ता है।',
          en: 'Chlorophyll in the leaves uses sunlight to turn water and carbon dioxide into glucose, releasing oxygen.',
        },
      },
      {
        id: 'lf-adult-bones',
        q: { hi: 'एक वयस्क मानव के शरीर में कितनी हड्डियाँ होती हैं?', en: 'How many bones does an adult human have?' },
        options: [
          { hi: '106', en: '106' },
          { hi: '150', en: '150' },
          { hi: '300', en: '300' },
          { hi: '206', en: '206' },
        ],
        answer: 3,
        explanation: {
          hi: 'वयस्क में 206 हड्डियाँ होती हैं; जन्म के समय लगभग 300 होती हैं, जिनमें से कई बढ़ते हुए आपस में जुड़ जाती हैं।',
          en: 'Adults have 206 bones; babies are born with about 300, many of which fuse as they grow.',
        },
      },
      {
        id: 'lf-heart-job',
        q: { hi: 'हृदय का मुख्य काम क्या है?', en: 'What is the main job of the heart?' },
        options: [
          { hi: 'भोजन पचाना', en: 'To digest food' },
          { hi: 'पूरे शरीर में रक्त पंप करना', en: 'To pump blood around the body' },
          { hi: 'विचार बनाना', en: 'To create thoughts' },
          { hi: 'हवा को छानना', en: 'To filter the air' },
        ],
        answer: 1,
        explanation: {
          hi: 'हृदय एक मांसपेशीय पंप है जो दिन में लगभग एक लाख बार धड़ककर रक्त को फेफड़ों और शरीर के हर हिस्से तक भेजता है।',
          en: 'The heart is a muscular pump that beats about 100,000 times a day, sending blood to the lungs and to every part of the body.',
        },
      },
      {
        id: 'lf-vitamin-d',
        q: { hi: 'धूप में रहने पर हमारी त्वचा कौन-सा विटामिन बनाती है?', en: 'Which vitamin does our skin make in sunlight?' },
        options: [
          { hi: 'विटामिन A', en: 'Vitamin A' },
          { hi: 'विटामिन C', en: 'Vitamin C' },
          { hi: 'विटामिन D', en: 'Vitamin D' },
          { hi: 'विटामिन K', en: 'Vitamin K' },
        ],
        answer: 2,
        explanation: {
          hi: 'सूर्य की पराबैंगनी किरणें त्वचा में विटामिन D बनाती हैं, जो हड्डियों के लिए कैल्शियम सोखने में मदद करता है।',
          en: 'Ultraviolet light from the Sun lets the skin make vitamin D, which helps the body absorb calcium for strong bones.',
        },
      },
      {
        id: 'lf-mosquito-disease',
        q: { hi: 'इनमें से कौन-सा रोग मच्छर के काटने से फैलता है?', en: 'Which of these diseases is spread by mosquito bites?' },
        options: [
          { hi: 'मलेरिया', en: 'Malaria' },
          { hi: 'स्कर्वी', en: 'Scurvy' },
          { hi: 'मधुमेह', en: 'Diabetes' },
          { hi: 'दमा', en: 'Asthma' },
        ],
        answer: 0,
        explanation: {
          hi: 'मलेरिया का परजीवी मादा एनोफ़िलीज़ मच्छर के काटने से फैलता है; बाकी तीन रोग संक्रामक नहीं हैं।',
          en: 'The malaria parasite is passed on by the bite of the female Anopheles mosquito; the other three conditions are not infectious.',
        },
      },
      {
        id: 'lf-lungs',
        q: { hi: 'साँस की ऑक्सीजन शरीर के किस अंग में रक्त में मिलती है?', en: 'In which organ does oxygen from the air pass into the blood?' },
        options: [
          { hi: 'पेट', en: 'The stomach' },
          { hi: 'गुर्दे (किडनी)', en: 'The kidneys' },
          { hi: 'हृदय', en: 'The heart' },
          { hi: 'फेफड़े', en: 'The lungs' },
        ],
        answer: 3,
        explanation: {
          hi: 'फेफड़ों की लाखों नन्ही थैलियों (एल्वियोलाई) की पतली दीवारों से ऑक्सीजन रक्त में जाती है और कार्बन डाइऑक्साइड बाहर आती है।',
          en: 'Across the thin walls of millions of tiny air sacs (alveoli) in the lungs, oxygen enters the blood and carbon dioxide leaves it.',
        },
      },
    ],
  },
]
export { quizSetsDefaults }
export const quizSets: QuizSet[] = withOverride('students.quiz', quizSetsDefaults)
