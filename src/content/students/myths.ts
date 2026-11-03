import type { Myth } from '../types'
import { withOverride } from '../overrides'

/** Common misconceptions, each answered with evidence. */
const mythsDefaults: Myth[] = [
  {
    id: 'ten-percent-brain',
    myth: { hi: 'हम अपने मस्तिष्क का केवल 10 प्रतिशत उपयोग करते हैं।', en: 'We use only 10 percent of our brain.' },
    fact: { hi: 'हम अपने लगभग पूरे मस्तिष्क का उपयोग करते हैं, बस एक ही पल में सब कुछ नहीं।', en: 'We use virtually all of our brain, just not all of it at the same moment.' },
    explanation: {
      hi: 'मस्तिष्क की स्कैनिंग (fMRI, PET) दिखाती है कि एक दिन में लगभग हर हिस्सा सक्रिय होता है, नींद में भी। मस्तिष्क शरीर की लगभग 20 प्रतिशत ऊर्जा खर्च करता है; विकास इतना महँगा अंग 90 प्रतिशत बेकार नहीं रखता। चोट लगने पर मस्तिष्क का लगभग कोई भी हिस्सा नष्ट हो तो उसका असर साफ़ दिखता है।',
      en: "Brain scans such as fMRI and PET show that nearly every region is active over the course of a day, even during sleep. The brain uses about 20 percent of the body's energy; evolution would not keep such a costly organ 90 percent idle. Damage to almost any area produces noticeable effects.",
    },
    topic: 'body',
    tags: ['brain', 'neuroscience', 'myth'],
  },
  {
    id: 'great-wall-from-space',
    myth: { hi: 'चीन की महान दीवार अंतरिक्ष से नंगी आँखों से दिखाई देती है।', en: 'The Great Wall of China is visible from space with the naked eye.' },
    fact: { hi: 'दीवार लंबी ज़रूर है, लेकिन इतनी पतली है कि कक्षा से बिना दूरबीन के दिखाई नहीं देती।', en: 'The Wall is long but so narrow that it cannot be seen from orbit without a telescope.' },
    explanation: {
      hi: 'दीवार की चौड़ाई कुछ ही मीटर है और उसका रंग आसपास की ज़मीन से मिलता-जुलता है। कई अंतरिक्ष यात्रियों, जिनमें चीन के यांग लिवेई भी शामिल हैं, ने बताया कि उन्हें यह दिखाई नहीं दी। इसके उलट रात में शहरों की रोशनी और बड़े हवाई अड्डे आसानी से दिखते हैं।',
      en: "The Wall is only a few metres wide and its colour blends into the surrounding land. Many astronauts, including China's Yang Liwei, have reported that they could not see it. By contrast, city lights at night and large airports are easy to spot.",
    },
    topic: 'space',
    tags: ['space', 'perception', 'myth'],
  },
  {
    id: 'lightning-never-twice',
    myth: { hi: 'बिजली एक ही जगह दो बार नहीं गिरती।', en: 'Lightning never strikes the same place twice.' },
    fact: { hi: 'बिजली एक ही जगह बार-बार गिरती है, खासकर ऊँची जगहों पर।', en: 'Lightning strikes the same spot again and again, especially tall structures.' },
    explanation: {
      hi: 'बिजली ज़मीन तक सबसे छोटे और आसान रास्ते से पहुँचती है, इसलिए ऊँची इमारतें, पेड़ और मीनारें बार-बार निशाना बनती हैं। न्यूयॉर्क की एम्पायर स्टेट बिल्डिंग पर हर साल लगभग 20–25 बार बिजली गिरती है। इसी वजह से इमारतों पर तड़ित चालक लगाए जाते हैं।',
      en: 'Lightning takes the shortest, easiest path to the ground, so tall buildings, trees and towers are hit repeatedly. The Empire State Building in New York is struck about 20 to 25 times a year. That is exactly why buildings are fitted with lightning rods.',
    },
    topic: 'earth',
    tags: ['lightning', 'weather', 'myth'],
  },
  {
    id: 'bats-are-blind',
    myth: { hi: 'चमगादड़ अंधे होते हैं।', en: 'Bats are blind.' },
    fact: { hi: 'चमगादड़ देख सकते हैं; कई प्रजातियाँ तो कम रोशनी में इंसानों से बेहतर देखती हैं।', en: 'Bats can see; many species see better than humans in dim light.' },
    explanation: {
      hi: 'सभी चमगादड़ों की आँखें काम करती हैं। फल खाने वाले बड़े चमगादड़ मुख्यतः आँखों और सूँघने की शक्ति पर निर्भर रहते हैं, जबकि छोटे कीटभक्षी चमगादड़ देखने के साथ-साथ ध्वनि की गूँज (इकोलोकेशन) से भी रास्ता खोजते हैं। "चमगादड़ जैसा अंधा" वाली कहावत विज्ञान पर नहीं टिकती।',
      en: 'All bats have working eyes. Large fruit bats rely mainly on sight and smell, while small insect-eating bats combine vision with echolocation to find their way. The saying "blind as a bat" simply does not hold up.',
    },
    topic: 'biology',
    tags: ['bats', 'senses', 'myth'],
  },
  {
    id: 'seasons-from-distance',
    myth: { hi: 'गर्मी इसलिए पड़ती है क्योंकि पृथ्वी सूर्य के पास आ जाती है।', en: 'Summer happens because Earth moves closer to the Sun.' },
    fact: { hi: 'ऋतुएँ पृथ्वी की झुकी हुई धुरी के कारण होती हैं, सूर्य से दूरी के कारण नहीं।', en: "Seasons are caused by the tilt of Earth's axis, not by its distance from the Sun." },
    explanation: {
      hi: 'पृथ्वी की धुरी लगभग 23.5 डिग्री झुकी है, इसलिए साल के अलग-अलग समय उत्तरी या दक्षिणी गोलार्ध सूर्य की ओर अधिक झुका होता है और वहाँ किरणें सीधी पड़ती हैं व दिन लंबे होते हैं। असल में पृथ्वी जनवरी की शुरुआत में सूर्य के सबसे पास होती है, जब उत्तरी गोलार्ध में सर्दी होती है। जब भारत में गर्मी होती है, ऑस्ट्रेलिया में सर्दी होती है।',
      en: "Earth's axis is tilted about 23.5 degrees, so at different times of year the northern or southern hemisphere leans towards the Sun, receiving more direct rays and longer days. In fact Earth is closest to the Sun in early January, during the northern winter. When it is summer in India, it is winter in Australia.",
    },
    topic: 'earth',
    tags: ['seasons', 'earth', 'myth'],
  },
  {
    id: 'knuckles-arthritis',
    myth: { hi: 'उँगलियाँ चटकाने से गठिया हो जाता है।', en: 'Cracking your knuckles causes arthritis.' },
    fact: { hi: 'अध्ययनों में उँगलियाँ चटकाने और गठिया के बीच कोई संबंध नहीं मिला।', en: 'Studies have found no link between knuckle cracking and arthritis.' },
    explanation: {
      hi: 'चटकने की आवाज़ जोड़ के तरल में बनने वाले गैस के बुलबुलों से आती है, हड्डियों के रगड़ने से नहीं। डॉक्टर डोनाल्ड अंगर ने 60 साल तक केवल एक हाथ की उँगलियाँ चटकाईं और दोनों हाथों में कोई अंतर नहीं पाया; बड़े अध्ययनों ने भी यही दिखाया। हाँ, बहुत ज़ोर से बार-बार खींचना असहज ज़रूर हो सकता है।',
      en: 'The sound comes from gas bubbles forming in the fluid of the joint, not from bones grinding. Dr Donald Unger cracked the knuckles of only one hand for 60 years and found no difference between his hands, and larger studies agree. Very forceful, repeated pulling can still be uncomfortable, though.',
    },
    topic: 'body',
    tags: ['joints', 'health', 'myth'],
  },
  {
    id: 'goldfish-memory',
    myth: { hi: 'सुनहरी मछली की याददाश्त केवल तीन सेकंड की होती है।', en: 'A goldfish has a three-second memory.' },
    fact: { hi: 'सुनहरी मछलियाँ महीनों तक चीज़ें याद रख सकती हैं।', en: 'Goldfish can remember things for months.' },
    explanation: {
      hi: 'प्रयोगों में सुनहरी मछलियों को किसी रंग, आवाज़ या समय को भोजन से जोड़ना सिखाया गया और उन्होंने हफ़्तों-महीनों बाद भी उसे याद रखा। कुछ मछलियाँ छोटी भूलभुलैया पार करना और लीवर दबाना भी सीख लेती हैं। यह मिथक शायद लोगों को मछली छोटे कटोरे में रखने का बहाना देता रहा।',
      en: 'In experiments goldfish have learned to link a colour, a sound or a time of day with food and remembered it weeks or months later. Some even learn simple mazes and how to press a lever. The myth may simply have offered an excuse for keeping fish in tiny bowls.',
    },
    topic: 'biology',
    tags: ['fish', 'memory', 'myth'],
  },
  {
    id: 'sugar-hyperactivity',
    myth: { hi: 'मीठा खाने से बच्चे अति-सक्रिय (हाइपर) हो जाते हैं।', en: 'Sugar makes children hyperactive.' },
    fact: { hi: 'नियंत्रित अध्ययनों में चीनी का बच्चों के व्यवहार पर ऐसा कोई असर नहीं मिला।', en: "Controlled studies have found no such effect of sugar on children's behaviour." },
    explanation: {
      hi: 'कई "डबल-ब्लाइंड" अध्ययनों में बच्चों को चीनी वाला या बिना चीनी वाला पेय दिया गया और न बच्चे, न माता-पिता, न शोधकर्ता जानते थे कि किसे क्या मिला; व्यवहार में कोई अंतर नहीं दिखा। एक अध्ययन में जिन माताओं को बताया गया कि उनके बच्चे ने चीनी खाई है (जबकि नहीं खाई थी), उन्होंने बच्चे को ज़्यादा शरारती बताया। यानी असर चीनी का नहीं, उम्मीद का था। फिर भी, ज़्यादा चीनी दाँतों और सेहत के लिए ठीक नहीं है।',
      en: 'In several double-blind studies children received drinks with or without sugar while neither the children, their parents nor the researchers knew which was which, and no difference in behaviour appeared. In one study, mothers who were told their child had eaten sugar (when they had not) rated the child as more hyperactive. The effect came from expectation, not sugar. Too much sugar is still bad for teeth and health.',
    },
    topic: 'body',
    tags: ['nutrition', 'behaviour', 'myth'],
  },
  {
    id: 'coin-from-skyscraper',
    myth: { hi: 'ऊँची इमारत से गिराया गया सिक्का नीचे किसी की जान ले सकता है।', en: 'A coin dropped from a skyscraper can kill someone below.' },
    fact: { hi: 'गिरता हुआ सिक्का चुभ सकता है, पर जानलेवा नहीं होता।', en: 'A falling coin would sting, but it cannot kill.' },
    explanation: {
      hi: 'हवा का प्रतिरोध हर गिरती चीज़ की गति को एक सीमा, "अंतिम वेग", पर रोक देता है। हल्का और चपटा सिक्का लड़खड़ाते हुए गिरता है और लगभग 50–80 किलोमीटर प्रति घंटे से तेज़ नहीं हो पाता, जो बस एक हल्की चोट देने लायक है। निर्वात में बात अलग होती, लेकिन हम हवा में रहते हैं।',
      en: 'Air resistance limits every falling object to a top speed called terminal velocity. A light, flat coin tumbles as it falls and cannot go much faster than about 50 to 80 kilometres per hour, enough for a sting but no more. In a vacuum things would be different, but we live in air.',
    },
    topic: 'physics',
    tags: ['gravity', 'air resistance', 'myth'],
  },
  {
    id: 'shaving-thicker-hair',
    myth: { hi: 'बाल शेव करने से वे मोटे और काले उगते हैं।', en: 'Shaving makes hair grow back thicker and darker.' },
    fact: { hi: 'शेविंग बालों की मोटाई, रंग या बढ़ने की गति नहीं बदलती।', en: 'Shaving does not change the thickness, colour or growth rate of hair.' },
    explanation: {
      hi: 'बाल त्वचा के नीचे की जड़ (फ़ॉलिकल) से बढ़ता है, और ब्लेड केवल ऊपर का मृत हिस्सा काटता है। कटा हुआ बाल नुकीला नहीं, चपटे सिरे वाला होता है, इसलिए छूने में कड़ा और शुरुआत में गहरा लगता है। 1928 से हुए अध्ययनों में बालों की मोटाई या बढ़ने की गति में कोई बदलाव नहीं मिला।',
      en: 'Hair grows from the follicle beneath the skin, and a blade cuts only the dead shaft above it. The regrowing hair has a blunt tip instead of a tapered one, so it feels coarser and looks darker at first. Studies dating back to 1928 found no change in thickness or growth rate.',
    },
    topic: 'body',
    tags: ['hair', 'skin', 'myth'],
  },
  {
    id: 'heat-loss-through-head',
    myth: { hi: 'शरीर की ज़्यादातर गर्मी सिर से बाहर निकलती है।', en: 'You lose most of your body heat through your head.' },
    fact: { hi: 'सिर से उतनी ही गर्मी निकलती है जितनी उसकी सतह के हिसाब से होनी चाहिए, लगभग 10 प्रतिशत।', en: 'The head loses heat roughly in proportion to its surface area, about 10 percent.' },
    explanation: {
      hi: 'यह मिथक एक पुराने सैन्य प्रयोग से आया, जिसमें लोगों को सिर खुला रखकर बाकी शरीर पर गर्म कपड़े पहनाए गए थे; ज़ाहिर है, गर्मी खुले हिस्से से ही निकली। खुले हाथ या पैर भी उतनी ही आसानी से गर्मी छोड़ते हैं। टोपी ज़रूर पहनें, लेकिन इसलिए कि सिर भी शरीर का एक खुला हिस्सा है।',
      en: 'The myth comes from an old military experiment in which volunteers wore warm clothing everywhere except on their heads, so naturally most heat escaped from the one exposed part. Bare hands or legs lose heat just as readily. Do wear a hat, but simply because the head is one more exposed part of the body.',
    },
    topic: 'body',
    tags: ['heat', 'body', 'myth'],
  },
  {
    id: 'heavier-falls-faster',
    myth: { hi: 'भारी चीज़ें हल्की चीज़ों से तेज़ गिरती हैं।', en: 'Heavier objects fall faster than lighter ones.' },
    fact: { hi: 'हवा का प्रतिरोध हटा दें, तो हर वस्तु एक ही गति से गिरती है।', en: 'Take away air resistance and every object falls at the same rate.' },
    explanation: {
      hi: 'गैलीलियो ने चार सौ साल पहले यह दिखाया था, और 1971 में अपोलो 15 के यात्री डेविड स्कॉट ने चंद्रमा पर हथौड़ा और पंख एक साथ गिराए; दोनों एक ही समय पर ज़मीन पर पहुँचे। पृथ्वी पर पंख धीरे इसलिए गिरता है क्योंकि हवा उसे रोकती है, वज़न कम होने से नहीं। गुरुत्वाकर्षण हर वस्तु को बराबर त्वरण देता है।',
      en: 'Galileo showed this four hundred years ago, and in 1971 Apollo 15 astronaut David Scott dropped a hammer and a feather together on the Moon; they landed at the same moment. On Earth a feather falls slowly because air holds it back, not because it is light. Gravity gives every object the same acceleration.',
    },
    topic: 'physics',
    tags: ['gravity', 'galileo', 'myth'],
  },
]
export { mythsDefaults }
export const myths: Myth[] = withOverride('students.myths', mythsDefaults)
