import type { Fact } from '../types'

/** General, verifiable science facts for the Students Corner. */
export const facts: Fact[] = [
  {
    id: 'sunlight-eight-minutes',
    title: { hi: 'सूर्य की रोशनी 8 मिनट पुरानी होती है', en: 'Sunlight is eight minutes old' },
    body: {
      hi: 'सूर्य से निकली रोशनी को पृथ्वी तक पहुँचने में लगभग 8 मिनट 20 सेकंड लगते हैं। यानी जब आप सूर्य को देखते हैं, तो आप उसे वैसा देख रहे होते हैं जैसा वह 8 मिनट पहले था। प्रकाश ब्रह्मांड की सबसे तेज़ चीज़ है, फिर भी इतनी दूरी तय करने में उसे समय लगता है।',
      en: 'Light leaving the Sun takes about 8 minutes and 20 seconds to reach Earth. So when you look at the Sun, you are seeing it as it was 8 minutes ago. Light is the fastest thing in the universe, yet even it needs time to cover such a distance.',
    },
    topic: 'physics',
    tags: ['light', 'sun', 'speed'],
  },
  {
    id: 'sound-faster-in-water',
    title: { hi: 'पानी में आवाज़ चार गुना तेज़ चलती है', en: 'Sound travels four times faster in water' },
    body: {
      hi: 'हवा में आवाज़ लगभग 343 मीटर प्रति सेकंड की गति से चलती है, जबकि पानी में लगभग 1,480 मीटर प्रति सेकंड। कारण यह है कि पानी के अणु हवा के अणुओं की तुलना में बहुत पास-पास होते हैं, इसलिए कंपन एक से दूसरे तक जल्दी पहुँचता है। इसी वजह से व्हेल सैकड़ों किलोमीटर दूर एक-दूसरे की आवाज़ सुन सकती हैं।',
      en: 'Sound moves through air at about 343 metres per second, but through water at about 1,480 metres per second. Water molecules are packed much closer together than air molecules, so vibrations pass from one to the next far more quickly. This is why whales can hear each other across hundreds of kilometres.',
    },
    topic: 'physics',
    tags: ['sound', 'water', 'waves'],
  },
  {
    id: 'ice-floats-expands',
    title: { hi: 'बर्फ़ इसलिए तैरती है क्योंकि पानी जमते समय फैलता है', en: 'Ice floats because water expands as it freezes' },
    body: {
      hi: 'लगभग हर पदार्थ ठंडा होने पर सिकुड़ता है, लेकिन पानी जमते समय लगभग 9 प्रतिशत फैल जाता है। जमने पर पानी के अणु एक खुली, षट्कोणीय जाली में जम जाते हैं, जिसमें बीच में खाली जगह रह जाती है। इसी कारण बर्फ़ पानी से हल्की होती है और झीलों पर ऊपर तैरती रहती है, जिससे नीचे का पानी और उसमें रहने वाले जीव सर्दियों में बचे रहते हैं।',
      en: 'Almost every substance shrinks as it cools, but water expands by about 9 percent when it freezes. Its molecules lock into an open, hexagonal lattice with empty space in the middle. That makes ice lighter than liquid water, so it floats on lakes and shelters the water and living things beneath it through winter.',
    },
    topic: 'chemistry',
    tags: ['water', 'ice', 'density'],
  },
  {
    id: 'diamond-graphite-carbon',
    title: { hi: 'हीरा और पेंसिल की लेड, दोनों शुद्ध कार्बन', en: 'Diamond and pencil lead are both pure carbon' },
    body: {
      hi: 'दुनिया का सबसे कठोर प्राकृतिक पदार्थ हीरा और पेंसिल में इस्तेमाल होने वाला नरम ग्रेफ़ाइट, दोनों एक ही तत्व, कार्बन, से बने हैं। अंतर सिर्फ़ इतना है कि परमाणु किस तरह जुड़े हैं: हीरे में हर कार्बन परमाणु चार दिशाओं में मज़बूती से बँधा है, जबकि ग्रेफ़ाइट में परतें एक-दूसरे पर फिसलती हैं। इसीलिए एक काँच काटता है और दूसरा काग़ज़ पर निशान छोड़ता है।',
      en: 'Diamond, the hardest natural material known, and the soft graphite inside a pencil are both made of the same element: carbon. The only difference is how the atoms are joined. In diamond every carbon atom is firmly bonded in four directions, while graphite is made of layers that slide over one another. That is why one cuts glass and the other leaves marks on paper.',
    },
    topic: 'chemistry',
    tags: ['carbon', 'diamond', 'structure'],
  },
  {
    id: 'octopus-three-hearts',
    title: { hi: 'ऑक्टोपस के तीन दिल और नीला खून', en: 'An octopus has three hearts and blue blood' },
    body: {
      hi: 'ऑक्टोपस के शरीर में तीन दिल होते हैं: दो गलफड़ों (गिल्स) में खून भेजते हैं और एक पूरे शरीर में। उसके खून में लोहे की जगह ताँबा-आधारित प्रोटीन हीमोसायनिन ऑक्सीजन ले जाता है, जिससे खून का रंग नीला दिखता है। ठंडे और कम ऑक्सीजन वाले समुद्री पानी में यह व्यवस्था बेहतर काम करती है।',
      en: 'An octopus has three hearts: two pump blood through the gills and one pumps it around the rest of the body. Instead of iron-based haemoglobin, its blood uses a copper-based protein called haemocyanin to carry oxygen, which makes the blood look blue. This arrangement works well in cold ocean water with little oxygen.',
    },
    topic: 'biology',
    tags: ['octopus', 'blood', 'ocean'],
  },
  {
    id: 'banana-is-a-berry',
    title: { hi: 'केला बेरी है, स्ट्रॉबेरी नहीं', en: 'A banana is a berry, a strawberry is not' },
    body: {
      hi: 'वनस्पति विज्ञान में बेरी वह फल है जो एक फूल के एक अंडाशय से बनता है और जिसका गूदा नरम होता है। इस परिभाषा के अनुसार केला, टमाटर और अंगूर बेरी हैं, जबकि स्ट्रॉबेरी नहीं, क्योंकि उसका लाल भाग अंडाशय से नहीं बल्कि फूल के आधार से बनता है और उसके असली फल ऊपर लगे छोटे-छोटे बीज जैसे दाने हैं। रोज़मर्रा के नाम और वैज्ञानिक परिभाषाएँ हमेशा मेल नहीं खातीं।',
      en: 'In botany, a berry is a fleshy fruit that develops from a single ovary of one flower. By that definition bananas, tomatoes and grapes are berries, but strawberries are not: their red flesh grows from the base of the flower, and the true fruits are the tiny seed-like specks on the outside. Everyday names and scientific definitions do not always agree.',
    },
    topic: 'biology',
    tags: ['plants', 'fruit', 'classification'],
  },
  {
    id: 'venus-day-longer-than-year',
    title: { hi: 'शुक्र पर एक दिन उसके साल से लंबा है', en: 'A day on Venus is longer than its year' },
    body: {
      hi: 'शुक्र ग्रह अपनी धुरी पर इतना धीरे घूमता है कि एक चक्कर पूरा करने में पृथ्वी के लगभग 243 दिन लग जाते हैं। लेकिन सूर्य का एक चक्कर वह लगभग 225 दिनों में पूरा कर लेता है। यानी शुक्र पर एक "दिन" उसके एक "साल" से लंबा होता है, और वह ज़्यादातर ग्रहों की उल्टी दिशा में घूमता है।',
      en: 'Venus spins on its axis so slowly that one full turn takes about 243 Earth days. Yet it completes one orbit around the Sun in only about 225 days. So a single "day" on Venus lasts longer than its "year", and the planet even rotates in the opposite direction to most others.',
    },
    topic: 'space',
    tags: ['venus', 'planets', 'rotation'],
  },
  {
    id: 'moon-drifting-away',
    title: { hi: 'चाँद हर साल हमसे थोड़ा दूर जा रहा है', en: 'The Moon drifts a little farther away every year' },
    body: {
      hi: 'अपोलो यात्रियों ने चंद्रमा पर दर्पण रखे थे, जिन पर आज भी पृथ्वी से लेज़र चमकाकर दूरी मापी जाती है। इन मापों से पता चला कि चंद्रमा हर साल लगभग 3.8 सेंटीमीटर दूर खिसक रहा है, लगभग उतना ही जितना आपके नाखून बढ़ते हैं। इसका कारण पृथ्वी और चंद्रमा के बीच ज्वार-भाटे से जुड़ा गुरुत्वीय खिंचाव है।',
      en: 'Apollo astronauts left mirrors on the Moon, and scientists still bounce lasers off them from Earth to measure the distance. Those measurements show the Moon moving away by about 3.8 centimetres a year, roughly the rate your fingernails grow. The cause is the tidal tug of gravity between Earth and the Moon.',
    },
    topic: 'space',
    tags: ['moon', 'gravity', 'measurement'],
  },
  {
    id: 'earth-core-hot-as-sun',
    title: { hi: 'पृथ्वी का केंद्र सूर्य की सतह जितना गर्म', en: "Earth's core is as hot as the Sun's surface" },
    body: {
      hi: 'हमारे पैरों के लगभग 6,400 किलोमीटर नीचे पृथ्वी का आंतरिक क्रोड है, जिसका तापमान लगभग 5,000 से 6,000 डिग्री सेल्सियस माना जाता है, यानी सूर्य की सतह के बराबर। इतनी गर्मी के बावजूद भारी दबाव के कारण वहाँ का लोहा और निकल ठोस अवस्था में हैं। यह गर्मी पृथ्वी के बनने के समय से बची हुई ऊर्जा और रेडियोधर्मी क्षय से आती है।',
      en: "About 6,400 kilometres beneath your feet lies Earth's inner core, estimated at roughly 5,000 to 6,000 degrees Celsius, about the same as the surface of the Sun. Despite that heat, the enormous pressure keeps its iron and nickel solid. The warmth comes from energy left over from Earth's formation and from radioactive decay.",
    },
    topic: 'earth',
    tags: ['earth', 'core', 'heat'],
  },
  {
    id: 'lightning-hotter-than-sun',
    title: { hi: 'बिजली की कड़क सूर्य की सतह से पाँच गुना गर्म', en: "Lightning is five times hotter than the Sun's surface" },
    body: {
      hi: 'बिजली गिरते समय उसके रास्ते की हवा कुछ ही पलों में लगभग 30,000 डिग्री सेल्सियस तक गर्म हो जाती है, जो सूर्य की सतह से लगभग पाँच गुना अधिक है। इतनी तेज़ी से गर्म हुई हवा अचानक फैलती है और यही धमाका हमें गड़गड़ाहट के रूप में सुनाई देता है। रोशनी पहले दिखती है और आवाज़ बाद में आती है, क्योंकि आवाज़ प्रकाश से बहुत धीमी है।',
      en: "As lightning strikes, the air along its path heats to about 30,000 degrees Celsius within moments, roughly five times hotter than the Sun's surface. The air expands violently, and that explosion is the thunder we hear. We see the flash first and hear the rumble later because sound travels far more slowly than light.",
    },
    topic: 'earth',
    tags: ['lightning', 'weather', 'thunder'],
  },
  {
    id: 'born-with-more-bones',
    title: { hi: 'जन्म के समय हड्डियाँ ज़्यादा होती हैं', en: 'You were born with more bones than you have now' },
    body: {
      hi: 'नवजात शिशु के शरीर में लगभग 300 हड्डियाँ और उपास्थि के टुकड़े होते हैं, जबकि वयस्क में केवल 206 हड्डियाँ होती हैं। बढ़ने के साथ कई छोटी हड्डियाँ आपस में जुड़कर एक हो जाती हैं, जैसे खोपड़ी और रीढ़ के हिस्से। इसी लचीलेपन की वजह से बच्चे का शरीर जन्म के समय इतना मुड़ पाता है।',
      en: "A newborn has about 300 bones and pieces of cartilage, while an adult has only 206 bones. As we grow, many small bones fuse together into one, for example in the skull and the spine. This flexibility is part of what lets a baby's body bend so easily at birth.",
    },
    topic: 'body',
    tags: ['bones', 'growth', 'skeleton'],
  },
  {
    id: 'two-million-blood-cells',
    title: { hi: 'हर सेकंड 20 लाख नई रक्त कोशिकाएँ', en: 'Two million new blood cells every second' },
    body: {
      hi: 'आपकी हड्डियों के भीतर मौजूद अस्थि मज्जा हर सेकंड लगभग 20 लाख नई लाल रक्त कोशिकाएँ बनाती है। हर कोशिका लगभग 120 दिन तक ऑक्सीजन ढोती है और फिर उसकी जगह नई कोशिका ले लेती है। यानी आपका शरीर लगातार खुद को बना और बदल रहा है, बिना आपको पता चले।',
      en: 'The marrow inside your bones produces about two million new red blood cells every second. Each cell carries oxygen for roughly 120 days before it is replaced by a fresh one. Your body is constantly rebuilding itself without you noticing.',
    },
    topic: 'body',
    tags: ['blood', 'cells', 'bone marrow'],
  },
  {
    id: 'microwave-water-molecules',
    title: { hi: 'माइक्रोवेव पानी के अणुओं को नचाता है', en: 'A microwave oven makes water molecules dance' },
    body: {
      hi: 'माइक्रोवेव ओवन भोजन को बाहर से नहीं, भीतर मौजूद पानी के अणुओं को तेज़ी से घुमाकर गर्म करता है। ओवन की तरंगें (लगभग 2.45 गीगाहर्ट्ज़) हर सेकंड अरबों बार दिशा बदलती हैं और पानी के अणु उनके साथ घूमने की कोशिश करते हैं; इसी रगड़ से गर्मी पैदा होती है। इसीलिए सूखी प्लेट ठंडी रहती है, जबकि उस पर रखा खाना गर्म हो जाता है।',
      en: 'A microwave oven does not heat food from the outside; it makes the water molecules inside spin rapidly. Its waves, at about 2.45 gigahertz, flip direction billions of times a second, and water molecules keep trying to follow them. That molecular jostling creates heat, which is why a dry plate stays cool while the food on it gets hot.',
    },
    topic: 'everyday',
    tags: ['microwave', 'heat', 'molecules'],
  },
  {
    id: 'why-sky-is-blue',
    title: { hi: 'आसमान नीला क्यों और शाम लाल क्यों', en: 'Why the sky is blue and sunsets are red' },
    body: {
      hi: 'सूर्य की सफ़ेद रोशनी में सभी रंग होते हैं, लेकिन हवा के छोटे अणु नीली रोशनी को लाल की तुलना में कहीं अधिक बिखेरते हैं। यही बिखरी हुई नीली रोशनी हमें हर दिशा से आती दिखती है, इसलिए आसमान नीला लगता है। शाम को रोशनी को हवा की मोटी परत पार करनी पड़ती है, नीला रास्ते में बिखर जाता है और बचा हुआ लाल-नारंगी हम तक पहुँचता है।',
      en: 'White sunlight contains every colour, but the tiny molecules in air scatter blue light far more than red. That scattered blue reaches our eyes from every direction, so the sky looks blue. At sunset the light must cross a much thicker layer of air; the blue is scattered away on the journey and the remaining red and orange reach us.',
    },
    topic: 'everyday',
    tags: ['light', 'sky', 'scattering'],
  },
  {
    id: 'zero-from-india',
    title: { hi: 'शून्य को संख्या बनाने का श्रेय भारत को', en: 'India gave the world zero as a number' },
    body: {
      hi: 'खाली जगह दिखाने के लिए चिह्न कई सभ्यताओं ने बनाए, लेकिन शून्य को एक पूरी संख्या मानकर उससे जोड़ने-घटाने के नियम सबसे पहले भारतीय गणितज्ञ ब्रह्मगुप्त ने सातवीं शताब्दी में लिखे। स्थानीय मान वाली दशमलव प्रणाली भी भारत से अरब देशों होते हुए यूरोप पहुँची। आज कंप्यूटर की पूरी दुनिया 0 और 1 पर टिकी है।',
      en: 'Several civilisations used a symbol for an empty place, but the Indian mathematician Brahmagupta was the first, in the seventh century, to treat zero as a full number and write rules for adding and subtracting with it. The decimal place-value system also travelled from India through the Arab world to Europe. Today the entire digital world runs on 0 and 1.',
    },
    topic: 'math',
    tags: ['zero', 'history', 'numbers'],
  },
  {
    id: 'honeycomb-hexagons',
    title: { hi: 'मधुमक्खियाँ षट्कोण क्यों चुनती हैं', en: 'Why bees build hexagons' },
    body: {
      hi: 'मधुमक्खियों के छत्ते की हर कोठरी षट्कोण (छह भुजाओं वाली) होती है। गणित बताता है कि किसी सतह को बिना खाली जगह छोड़े बराबर टुकड़ों में बाँटने के लिए षट्कोण में सबसे कम दीवार लगती है, यानी सबसे कम मोम में सबसे ज़्यादा शहद रखा जा सकता है। इस "हनीकॉम्ब अनुमान" को गणितज्ञ थॉमस हेल्स ने 1999 में औपचारिक रूप से सिद्ध किया।',
      en: 'Every cell in a honeycomb is a hexagon. Mathematics shows that, to divide a surface into equal cells with no gaps, hexagons need the least total wall, so the bees store the most honey with the least wax. This "honeycomb conjecture" was formally proved by the mathematician Thomas Hales in 1999.',
    },
    topic: 'math',
    tags: ['geometry', 'bees', 'efficiency'],
  },
  {
    id: 'phone-vs-apollo-computer',
    title: { hi: 'आपका फ़ोन अपोलो के कंप्यूटर से कहीं शक्तिशाली', en: 'Your phone outperforms the Apollo Moon computer' },
    body: {
      hi: 'इंसानों को चाँद तक ले जाने वाले अपोलो गाइडेंस कंप्यूटर में लगभग 4 किलोबाइट रैम थी और वह लगभग 1 मेगाहर्ट्ज़ की गति से काम करता था। आज का एक साधारण स्मार्टफ़ोन उससे लाखों गुना तेज़ है और लाखों गुना अधिक मेमोरी रखता है। फिर भी उस छोटे कंप्यूटर ने सटीक गणनाओं से यात्रियों को चाँद पर उतारा और सुरक्षित वापस लाया।',
      en: 'The Apollo Guidance Computer that took humans to the Moon had about 4 kilobytes of RAM and ran at roughly 1 megahertz. An ordinary smartphone today is millions of times faster and holds millions of times more memory. Yet that small computer performed the precise calculations that landed astronauts on the Moon and brought them home.',
    },
    topic: 'technology',
    tags: ['computers', 'apollo', 'history'],
  },
  {
    id: 'ocean-oxygen',
    title: { hi: 'आधी से ज़्यादा ऑक्सीजन समुद्र से आती है', en: 'More than half our oxygen comes from the ocean' },
    body: {
      hi: 'हम अक्सर जंगलों को "पृथ्वी के फेफड़े" कहते हैं, लेकिन वायुमंडल की आधी से अधिक ऑक्सीजन समुद्र में तैरने वाले सूक्ष्म पादप प्लवक (फ़ाइटोप्लैंकटन) बनाते हैं। ये नन्हे जीव भी पेड़ों की तरह प्रकाश संश्लेषण करते हैं और भारी मात्रा में कार्बन डाइऑक्साइड सोखते हैं। इसलिए समुद्र की सेहत सीधे हमारी हर साँस से जुड़ी है।',
      en: 'We often call forests the "lungs of the Earth", but more than half of the oxygen in the atmosphere is produced by microscopic phytoplankton drifting in the ocean. Like trees, these tiny organisms photosynthesise and absorb huge amounts of carbon dioxide. The health of the ocean is tied to every breath we take.',
    },
    topic: 'environment',
    tags: ['ocean', 'oxygen', 'plankton'],
  },
]
