import type { Scientist } from '../types'
import { withOverride } from '../overrides'

/** Inspirational stories of real scientists. Facts only; no invented quotes. */
const scientistsDefaults: Scientist[] = [
  {
    id: 'cv-raman',
    name: { hi: 'सी. वी. रमन', en: 'C. V. Raman' },
    years: '1888–1970',
    field: { hi: 'भौतिकी (प्रकाश का प्रकीर्णन)', en: 'Physics (scattering of light)' },
    known: { hi: 'रमन प्रभाव की खोज; भौतिकी का नोबेल पुरस्कार (1930)', en: 'Discovery of the Raman effect; Nobel Prize in Physics (1930)' },
    story: {
      hi: 'तमिलनाडु के तिरुचिरापल्ली में जन्मे चंद्रशेखर वेंकट रमन ने पहले सरकारी वित्त विभाग में नौकरी की, पर शाम को कोलकाता की इंडियन एसोसिएशन फ़ॉर द कल्टिवेशन ऑफ़ साइंस की प्रयोगशाला में शोध करते रहे। 1921 में समुद्री यात्रा के दौरान समुद्र के नीले रंग पर उठे प्रश्न ने उन्हें प्रकाश के प्रकीर्णन के अध्ययन की ओर मोड़ा। 28 फ़रवरी 1928 को उन्होंने दिखाया कि किसी पदार्थ से गुज़रते प्रकाश का एक छोटा हिस्सा अपना रंग (तरंगदैर्घ्य) बदल लेता है; इसे रमन प्रभाव कहा गया और इसी दिन भारत में राष्ट्रीय विज्ञान दिवस मनाया जाता है। 1930 में उन्हें भौतिकी का नोबेल पुरस्कार मिला; विज्ञान में नोबेल पाने वाले वे पहले एशियाई थे। बाद में उन्होंने भारतीय विज्ञान संस्थान का नेतृत्व किया और बेंगलुरु में रमन रिसर्च इंस्टीट्यूट की स्थापना की।',
      en: 'Born in Tiruchirappalli, Tamil Nadu, Chandrasekhara Venkata Raman first worked in the government finance service while doing research in the evenings at the Indian Association for the Cultivation of Science in Kolkata. A question about the blue colour of the sea during a voyage in 1921 turned him towards the study of light scattering. On 28 February 1928 he showed that a small part of the light passing through a substance changes its colour (wavelength); this became known as the Raman effect, and India marks National Science Day on that date. He received the Nobel Prize in Physics in 1930, the first Asian to win a Nobel in a science. He later led the Indian Institute of Science and founded the Raman Research Institute in Bengaluru.',
    },
    lesson: {
      hi: 'रोज़मर्रा की चीज़ों पर उठा एक सच्चा प्रश्न, साधारण उपकरणों और लगन के साथ, दुनिया बदलने वाली खोज बन सकता है।',
      en: 'A genuine question about an everyday thing, pursued with simple instruments and persistence, can become a world-changing discovery.',
    },
    url: 'https://en.wikipedia.org/wiki/C._V._Raman',
    tags: ['physics', 'light', 'nobel'],
  },
  {
    id: 'jc-bose',
    name: { hi: 'जगदीश चंद्र बसु', en: 'Jagadish Chandra Bose' },
    years: '1858–1937',
    field: { hi: 'भौतिकी और पादप विज्ञान', en: 'Physics and plant science' },
    known: { hi: 'रेडियो तरंगों के अग्रणी प्रयोग; पौधों की प्रतिक्रियाएँ नापने वाला क्रेस्कोग्राफ', en: 'Pioneering radio-wave experiments; the crescograph for measuring plant responses' },
    story: {
      hi: 'जगदीश चंद्र बसु का जन्म मैमनसिंह (अब बांग्लादेश) में हुआ और उन्होंने कोलकाता के प्रेसीडेंसी कॉलेज में भौतिकी पढ़ाई। 1895 में उन्होंने कोलकाता में बहुत छोटी तरंगदैर्घ्य की रेडियो तरंगों से दूर रखी घंटी बजाकर और बारूद जलाकर बेतार संकेत का सार्वजनिक प्रदर्शन किया; उन्होंने अपनी खोजों का पेटेंट कराने में रुचि नहीं ली। फिर उनका ध्यान जीवित चीज़ों की ओर गया: उन्होंने क्रेस्कोग्राफ जैसे बेहद संवेदनशील यंत्र बनाकर दिखाया कि पौधे भी चोट, गर्मी और रसायनों पर प्रतिक्रिया देते हैं। 1917 में उन्होंने कोलकाता में बसु विज्ञान मंदिर (बोस इंस्टीट्यूट) की स्थापना की। वे बांग्ला में विज्ञान-कथा लिखने वाले शुरुआती लेखकों में भी थे।',
      en: 'Jagadish Chandra Bose was born in Mymensingh (now in Bangladesh) and taught physics at Presidency College, Kolkata. In 1895 he publicly demonstrated wireless signalling in Kolkata, using very short radio waves to ring a bell and ignite gunpowder at a distance; he showed little interest in patenting his inventions. His attention then turned to living things: with extremely sensitive instruments of his own design, such as the crescograph, he showed that plants also respond to injury, heat and chemicals. In 1917 he founded the Bose Institute in Kolkata. He was also among the earliest writers of science fiction in Bengali.',
    },
    lesson: {
      hi: 'विज्ञान की सीमाएँ खुद बनाइए: भौतिकी और जीव विज्ञान की दीवार तोड़ने के लिए उन्होंने अपने यंत्र खुद बनाए।',
      en: 'Draw your own boundaries in science: to cross the wall between physics and biology, he built his own instruments.',
    },
    url: 'https://en.wikipedia.org/wiki/Jagadish_Chandra_Bose',
    tags: ['physics', 'botany', 'instruments'],
  },
  {
    id: 'homi-bhabha',
    name: { hi: 'होमी जहाँगीर भाभा', en: 'Homi J. Bhabha' },
    years: '1909–1966',
    field: { hi: 'नाभिकीय भौतिकी', en: 'Nuclear physics' },
    known: { hi: 'भारत के परमाणु ऊर्जा कार्यक्रम के शिल्पकार; TIFR और ट्रॉम्बे की स्थापना', en: 'Architect of India’s atomic energy programme; founder of TIFR and the Trombay establishment' },
    story: {
      hi: 'मुंबई में जन्मे होमी भाभा ने कैम्ब्रिज में पढ़ाई की, जहाँ उन्होंने इलेक्ट्रॉन-पॉज़िट्रॉन प्रकीर्णन (जिसे आज भाभा प्रकीर्णन कहा जाता है) और ब्रह्मांडीय किरणों की बौछारों पर महत्वपूर्ण सैद्धांतिक काम किया। 1939 में छुट्टियों में भारत आए तो दूसरे विश्व युद्ध के कारण यहीं रह गए और बेंगलुरु के भारतीय विज्ञान संस्थान में शोध करने लगे। 1945 में उन्होंने टाटा इंस्टीट्यूट ऑफ़ फ़ंडामेंटल रिसर्च की स्थापना की और 1948 में भारत के परमाणु ऊर्जा आयोग के पहले अध्यक्ष बने। 1954 में ट्रॉम्बे में परमाणु ऊर्जा प्रतिष्ठान शुरू हुआ, जिसे उनके निधन के बाद भाभा परमाणु अनुसंधान केंद्र नाम दिया गया। 1966 में एक विमान दुर्घटना में उनका निधन हो गया।',
      en: 'Born in Mumbai, Homi Bhabha studied at Cambridge, where he did important theoretical work on electron–positron scattering (now called Bhabha scattering) and on cosmic-ray showers. Visiting India on holiday in 1939, he stayed on because of the Second World War and began research at the Indian Institute of Science in Bengaluru. In 1945 he founded the Tata Institute of Fundamental Research, and in 1948 he became the first chairman of India’s Atomic Energy Commission. The Atomic Energy Establishment at Trombay began in 1954 and was renamed the Bhabha Atomic Research Centre after his death. He died in an air crash in 1966.',
    },
    lesson: {
      hi: 'अकेले खोज करना ही नहीं, ऐसी संस्थाएँ खड़ी करना भी विज्ञान है जहाँ आने वाली पीढ़ियाँ खोज कर सकें।',
      en: 'Science is not only about discovering alone; it is also about building institutions where future generations can discover.',
    },
    url: 'https://en.wikipedia.org/wiki/Homi_J._Bhabha',
    tags: ['physics', 'nuclear', 'institutions'],
  },
  {
    id: 'vikram-sarabhai',
    name: { hi: 'विक्रम साराभाई', en: 'Vikram Sarabhai' },
    years: '1919–1971',
    field: { hi: 'भौतिकी और अंतरिक्ष विज्ञान', en: 'Physics and space science' },
    known: { hi: 'भारतीय अंतरिक्ष कार्यक्रम के जनक; PRL और ISRO की नींव', en: 'Father of the Indian space programme; founder of PRL and ISRO' },
    story: {
      hi: 'अहमदाबाद में जन्मे विक्रम साराभाई ने कैम्ब्रिज से ब्रह्मांडीय किरणों पर शोध किया और 1947 में अहमदाबाद में फ़िज़िकल रिसर्च लेबोरेटरी की स्थापना की। उनका मानना था कि एक विकासशील देश को भी अंतरिक्ष तकनीक चाहिए, ताकि संचार, मौसम और शिक्षा में आम लोगों तक लाभ पहुँचे। 1962 में उनके नेतृत्व में भारतीय राष्ट्रीय अंतरिक्ष अनुसंधान समिति बनी, जो 1969 में ISRO बनी। 1963 में केरल के थुंबा से भारत का पहला साउंडिंग रॉकेट छोड़ा गया। वे भारतीय प्रबंध संस्थान, अहमदाबाद जैसे कई संस्थानों की स्थापना से भी जुड़े रहे।',
      en: 'Born in Ahmedabad, Vikram Sarabhai researched cosmic rays at Cambridge and founded the Physical Research Laboratory in Ahmedabad in 1947. He believed that a developing country also needed space technology, so that communication, weather forecasting and education could reach ordinary people. In 1962 the Indian National Committee for Space Research was set up under his leadership, becoming ISRO in 1969. India’s first sounding rocket was launched from Thumba in Kerala in 1963. He was also involved in founding several other institutions, including the Indian Institute of Management, Ahmedabad.',
    },
    lesson: {
      hi: 'विज्ञान का मकसद समाज की सेवा है: बड़ी तकनीक का असली माप यह है कि वह कितने लोगों के जीवन तक पहुँचती है।',
      en: 'The purpose of science is to serve society: the true measure of big technology is how many lives it reaches.',
    },
    url: 'https://en.wikipedia.org/wiki/Vikram_Sarabhai',
    tags: ['space', 'isro', 'institutions'],
  },
  {
    id: 'apj-abdul-kalam',
    name: { hi: 'ए. पी. जे. अब्दुल कलाम', en: 'A. P. J. Abdul Kalam' },
    years: '1931–2015',
    field: { hi: 'वैमानिकी एवं अंतरिक्ष अभियांत्रिकी', en: 'Aerospace engineering' },
    known: { hi: 'SLV-3 के परियोजना निदेशक; मिसाइल कार्यक्रम; भारत के 11वें राष्ट्रपति', en: 'Project director of SLV-3; missile programmes; 11th President of India' },
    story: {
      hi: 'तमिलनाडु के रामेश्वरम में एक साधारण परिवार में जन्मे अब्दुल कलाम ने बचपन में अख़बार बाँटकर पढ़ाई का ख़र्च जुटाया और मद्रास इंस्टीट्यूट ऑफ़ टेक्नोलॉजी से वैमानिकी अभियांत्रिकी पढ़ी। ISRO में वे भारत के पहले उपग्रह प्रक्षेपण यान SLV-3 के परियोजना निदेशक थे, जिसने 1980 में रोहिणी उपग्रह को कक्षा में पहुँचाया। बाद में DRDO में उन्होंने अग्नि और पृथ्वी जैसी मिसाइलों के विकास का नेतृत्व किया। 1997 में उन्हें भारत रत्न मिला और 2002 से 2007 तक वे भारत के राष्ट्रपति रहे। जीवन भर वे विद्यार्थियों से मिलते रहे; अपनी आत्मकथा "विंग्स ऑफ़ फ़ायर" में उन्होंने अपनी यात्रा लिखी।',
      en: 'Born into a modest family in Rameswaram, Tamil Nadu, Abdul Kalam distributed newspapers as a boy to support his studies and later studied aeronautical engineering at the Madras Institute of Technology. At ISRO he was project director of SLV-3, India’s first satellite launch vehicle, which placed the Rohini satellite in orbit in 1980. He later led the development of missiles such as Agni and Prithvi at DRDO. He received the Bharat Ratna in 1997 and served as President of India from 2002 to 2007. Throughout his life he kept meeting students, and he told his story in his autobiography, Wings of Fire.',
    },
    lesson: {
      hi: 'शुरुआत कितनी भी साधारण हो, सपना, मेहनत और सीखने की भूख आपको बहुत दूर ले जा सकती है, और जो सीखा, उसे बाँटना न भूलें।',
      en: 'However modest the start, a dream, hard work and a hunger to learn can take you very far, and what you learn is worth sharing.',
    },
    url: 'https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam',
    tags: ['space', 'engineering', 'inspiration'],
  },
  {
    id: 'kalpana-chawla',
    name: { hi: 'कल्पना चावला', en: 'Kalpana Chawla' },
    years: '1962–2003',
    field: { hi: 'वैमानिकी अभियांत्रिकी और अंतरिक्ष उड़ान', en: 'Aerospace engineering and spaceflight' },
    known: { hi: 'अंतरिक्ष में जाने वाली भारतीय मूल की पहली महिला', en: 'First woman of Indian origin in space' },
    story: {
      hi: 'हरियाणा के करनाल में जन्मी कल्पना चावला ने चंडीगढ़ के पंजाब इंजीनियरिंग कॉलेज से वैमानिकी अभियांत्रिकी पढ़ी, फिर अमेरिका जाकर टेक्सास विश्वविद्यालय (आर्लिंग्टन) से स्नातकोत्तर और कोलोराडो विश्वविद्यालय (बोल्डर) से डॉक्टरेट की। उन्होंने NASA के एम्स रिसर्च सेंटर में काम किया और 1994 में अंतरिक्ष यात्री के रूप में चुनी गईं। 1997 में अंतरिक्ष यान कोलंबिया की उड़ान STS-87 में वे अंतरिक्ष में जाने वाली भारतीय मूल की पहली महिला बनीं। 1 फ़रवरी 2003 को अपनी दूसरी उड़ान STS-107 से लौटते समय कोलंबिया के टूट जाने से उनका और छह साथियों का निधन हो गया। उनकी स्मृति में कई पुरस्कार, छात्रवृत्तियाँ और संस्थान नामित हैं।',
      en: 'Born in Karnal, Haryana, Kalpana Chawla studied aeronautical engineering at Punjab Engineering College, Chandigarh, then moved to the United States for a master’s degree at the University of Texas at Arlington and a doctorate at the University of Colorado Boulder. She worked at NASA’s Ames Research Center and was selected as an astronaut in 1994. In 1997, on Space Shuttle Columbia mission STS-87, she became the first woman of Indian origin in space. On 1 February 2003, returning from her second flight, STS-107, Columbia broke apart and she and six crewmates lost their lives. Many awards, scholarships and institutions are named in her memory.',
    },
    lesson: {
      hi: 'एक छोटे शहर की लड़की का सपना भी तारों तक पहुँच सकता है, अगर वह उसे पढ़ाई और तैयारी से लगातार सींचे।',
      en: 'A girl from a small town can reach the stars too, if she keeps feeding her dream with study and preparation.',
    },
    url: 'https://en.wikipedia.org/wiki/Kalpana_Chawla',
    tags: ['space', 'astronaut', 'women in science'],
  },
  {
    id: 'janaki-ammal',
    name: { hi: 'जानकी अम्माल', en: 'Janaki Ammal' },
    years: '1897–1984',
    field: { hi: 'वनस्पति विज्ञान और कोशिका-आनुवंशिकी', en: 'Botany and cytogenetics' },
    known: { hi: 'भारतीय परिस्थितियों के लिए मीठी गन्ना संकर किस्मों पर काम; कल्टीवेटेड प्लांट्स का क्रोमोसोम एटलस', en: 'Work on sweeter sugarcane hybrids for Indian conditions; the Chromosome Atlas of Cultivated Plants' },
    story: {
      hi: 'केरल के तलश्शेरी में जन्मी जानकी अम्माल ने ऐसे समय में विज्ञान चुना जब बहुत कम भारतीय लड़कियाँ कॉलेज जाती थीं। 1931 में उन्होंने अमेरिका के मिशिगन विश्वविद्यालय से वनस्पति विज्ञान में डॉक्टरेट की। कोयंबटूर के गन्ना प्रजनन संस्थान में उन्होंने कोशिका-आनुवंशिकी के ज़रिये ऐसी संकर किस्मों पर काम किया जो भारतीय परिस्थितियों में अधिक मीठी और उपयुक्त हों। इंग्लैंड में जॉन इन्स इंस्टीट्यूशन और रॉयल हॉर्टिकल्चरल सोसाइटी में काम करते हुए उन्होंने सी. डी. डार्लिंग्टन के साथ 1945 में "क्रोमोसोम एटलस ऑफ़ कल्टीवेटेड प्लांट्स" लिखा। 1951 में भारत लौटकर उन्होंने भारतीय वनस्पति सर्वेक्षण के पुनर्गठन का नेतृत्व किया; बाद के वर्षों में वे केरल की साइलेंट वैली के जंगल को बचाने के अभियान से भी जुड़ीं। 1977 में उन्हें पद्म श्री मिला।',
      en: 'Born in Thalassery, Kerala, Janaki Ammal chose science at a time when very few Indian girls went to college. In 1931 she earned a doctorate in botany from the University of Michigan in the United States. At the Sugarcane Breeding Institute in Coimbatore she used cytogenetics to work on hybrid varieties that would be sweeter and better suited to Indian conditions. Working in England at the John Innes Institution and the Royal Horticultural Society, she co-wrote the Chromosome Atlas of Cultivated Plants with C. D. Darlington in 1945. She returned to India in 1951 to lead the reorganisation of the Botanical Survey of India, and in later years supported the campaign to save the Silent Valley forest in Kerala. She received the Padma Shri in 1977.',
    },
    lesson: {
      hi: 'रास्ता बंद दिखे तो भी ज्ञान की लगन दरवाज़े खोलती है; और विज्ञान का उपयोग प्रकृति की रक्षा के लिए भी किया जा सकता है।',
      en: 'Even when the road seems closed, dedication to knowledge opens doors; and science can be used to protect nature too.',
    },
    url: 'https://en.wikipedia.org/wiki/Janaki_Ammal',
    tags: ['botany', 'genetics', 'women in science'],
  },
  {
    id: 'sn-bose',
    name: { hi: 'सत्येंद्र नाथ बोस', en: 'Satyendra Nath Bose' },
    years: '1894–1974',
    field: { hi: 'सैद्धांतिक भौतिकी', en: 'Theoretical physics' },
    known: { hi: 'बोस–आइंस्टाइन सांख्यिकी; "बोसॉन" कणों का नाम उन्हीं पर', en: 'Bose–Einstein statistics; the particles called “bosons” are named after him' },
    story: {
      hi: 'कोलकाता में जन्मे सत्येंद्र नाथ बोस ढाका विश्वविद्यालय में भौतिकी पढ़ाते थे। 1924 में उन्होंने प्रकाश के कणों को गिनने का एक बिल्कुल नया तरीका खोजा, जिससे प्लांक का विकिरण नियम बिना किसी पुराने तर्क के निकल आया। जब पत्रिकाओं ने उनका पर्चा नहीं छापा, तो उन्होंने उसे सीधे अल्बर्ट आइंस्टाइन को भेज दिया; आइंस्टाइन ने उसका जर्मन अनुवाद कर प्रकाशित कराया और इस विचार को आगे बढ़ाया। इसी से बोस–आइंस्टाइन सांख्यिकी बनी, और इस नियम को मानने वाले कणों को पॉल डिरैक ने "बोसॉन" नाम दिया। बाद में वे कलकत्ता विश्वविद्यालय में प्रोफ़ेसर रहे, 1954 में पद्म विभूषण से सम्मानित हुए और बांग्ला में विज्ञान के प्रसार के लिए काम करते रहे।',
      en: 'Born in Kolkata, Satyendra Nath Bose taught physics at the University of Dhaka. In 1924 he found a completely new way of counting light quanta from which Planck’s radiation law emerged without any of the old assumptions. When journals declined his paper, he sent it directly to Albert Einstein, who translated it into German, had it published and extended the idea. This became Bose–Einstein statistics, and Paul Dirac named the particles that obey it “bosons”. He later became a professor at the University of Calcutta, received the Padma Vibhushan in 1954 and worked to popularise science in Bengali.',
    },
    lesson: {
      hi: 'अगर आपका विचार सही है तो उसे दुनिया के सामने रखने का साहस कीजिए, चाहे पहला जवाब "नहीं" ही क्यों न हो।',
      en: 'If your idea is sound, have the courage to put it before the world, even when the first answer is “no”.',
    },
    url: 'https://en.wikipedia.org/wiki/Satyendra_Nath_Bose',
    tags: ['physics', 'quantum', 'bosons'],
  },
  {
    id: 'anna-mani',
    name: { hi: 'अन्ना मणि', en: 'Anna Mani' },
    years: '1918–2001',
    field: { hi: 'भौतिकी और मौसम विज्ञान', en: 'Physics and meteorology' },
    known: { hi: 'भारत में मौसम उपकरणों का मानकीकरण; सौर विकिरण और ओज़ोन मापन', en: 'Standardising weather instruments in India; solar radiation and ozone measurements' },
    story: {
      hi: 'केरल के पीरमेड में जन्मी अन्ना मणि को बचपन से किताबों का शौक था। उन्होंने बेंगलुरु के भारतीय विज्ञान संस्थान में सी. वी. रमन के मार्गदर्शन में हीरे और माणिक के प्रकाशीय गुणों पर शोध किया। फिर लंदन के इम्पीरियल कॉलेज में मौसम उपकरणों का अध्ययन कर 1948 में भारत मौसम विज्ञान विभाग से जुड़ीं। उन्होंने सौ से अधिक मौसम उपकरणों के डिज़ाइन और मानकीकरण पर काम किया ताकि भारत अपने उपकरण खुद बना सके, और देश भर में सौर विकिरण मापने वाले केंद्रों का जाल खड़ा किया। उन्होंने ओज़ोन मापने के उपकरण विकसित किए और पवन ऊर्जा की संभावनाओं का अध्ययन किया। वे विभाग की उप-महानिदेशक के पद तक पहुँचीं।',
      en: 'Born in Peermade, Kerala, Anna Mani loved books from childhood. At the Indian Institute of Science in Bengaluru she researched the optical properties of diamonds and rubies under C. V. Raman. She then studied meteorological instruments at Imperial College London and joined the India Meteorological Department in 1948. She worked on the design and standardisation of more than a hundred weather instruments so that India could make its own, and built a nationwide network of stations measuring solar radiation. She developed instruments for measuring ozone and studied the potential of wind energy. She rose to become Deputy Director General of the department.',
    },
    lesson: {
      hi: 'सटीक मापन विज्ञान की रीढ़ है, और अपने उपकरण खुद बनाना आत्मनिर्भरता की पहली सीढ़ी।',
      en: 'Precise measurement is the backbone of science, and making your own instruments is the first step to self-reliance.',
    },
    url: 'https://en.wikipedia.org/wiki/Anna_Mani',
    tags: ['meteorology', 'instruments', 'women in science'],
  },
  {
    id: 'marie-curie',
    name: { hi: 'मैरी क्यूरी', en: 'Marie Curie' },
    years: '1867–1934',
    field: { hi: 'भौतिकी और रसायन (रेडियोधर्मिता)', en: 'Physics and chemistry (radioactivity)' },
    known: { hi: 'पोलोनियम और रेडियम की खोज; दो अलग विज्ञानों में नोबेल पुरस्कार', en: 'Discovery of polonium and radium; Nobel Prizes in two different sciences' },
    story: {
      hi: 'पोलैंड के वारसॉ में मारिया स्क्लोदोव्स्का के रूप में जन्मी मैरी क्यूरी को अपने देश में विश्वविद्यालय में पढ़ने की अनुमति नहीं थी, इसलिए वे पेरिस गईं और सोरबोन में भौतिकी और गणित पढ़ीं। पति पियरे क्यूरी के साथ उन्होंने 1898 में दो नए तत्वों, पोलोनियम और रेडियम, की खोज की और "रेडियोधर्मिता" शब्द गढ़ा। 1903 में उन्हें पियरे क्यूरी और आँरी बेकरेल के साथ भौतिकी का नोबेल पुरस्कार मिला, और 1911 में रसायन का नोबेल पुरस्कार; दो अलग-अलग विज्ञानों में नोबेल पाने वाली वे पहली व्यक्ति हैं। पहले विश्व युद्ध में उन्होंने घायल सैनिकों के लिए चलते-फिरते एक्स-रे वाहन तैयार किए। लंबे समय तक विकिरण के संपर्क में रहने से हुई बीमारी के कारण 1934 में उनका निधन हुआ।',
      en: 'Born Maria Skłodowska in Warsaw, Poland, Marie Curie was not allowed to study at university in her own country, so she went to Paris and studied physics and mathematics at the Sorbonne. With her husband Pierre Curie she discovered two new elements, polonium and radium, in 1898 and coined the word “radioactivity”. She received the Nobel Prize in Physics in 1903 with Pierre Curie and Henri Becquerel, and the Nobel Prize in Chemistry in 1911, becoming the first person to win Nobel Prizes in two different sciences. During the First World War she equipped mobile X-ray vehicles for wounded soldiers. She died in 1934 from an illness caused by long exposure to radiation.',
    },
    lesson: {
      hi: 'बाधाएँ कितनी भी हों, जिज्ञासा और अनुशासन रास्ता बना लेते हैं; साथ ही विज्ञान हमें सुरक्षा की समझ भी सिखाता है।',
      en: 'Whatever the obstacles, curiosity and discipline find a way; and science also teaches us to understand and respect safety.',
    },
    url: 'https://en.wikipedia.org/wiki/Marie_Curie',
    tags: ['chemistry', 'physics', 'nobel'],
  },
]
export { scientistsDefaults }
export const scientists: Scientist[] = withOverride('students.scientists', scientistsDefaults)
