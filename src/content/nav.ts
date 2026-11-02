import type { NavItem } from './types'

export const primaryNav: NavItem[] = [
  { label: { hi: 'होम', en: 'Home' }, to: '/' },
  {
    label: { hi: 'हमारे बारे में', en: 'About' },
    to: '/about',
    children: [
      { label: { hi: 'परिचय', en: 'About us' }, to: '/about' },
      { label: { hi: 'दृष्टि एवं मिशन', en: 'Vision & Mission' }, to: '/vision-mission' },
      { label: { hi: 'हमारे उद्देश्य', en: 'Objectives' }, to: '/objectives' },
    ],
  },
  { label: { hi: 'वैज्ञानिक दृष्टिकोण', en: 'Scientific Temper' }, to: '/scientific-temper' },
  { label: { hi: 'गतिविधियाँ', en: 'Activities' }, to: '/activities' },
  { label: { hi: 'विद्यार्थी कॉर्नर', en: 'Students' }, to: '/students' },
  { label: { hi: 'शिक्षक कॉर्नर', en: 'Teachers' }, to: '/teachers' },
  { label: { hi: 'गैलरी', en: 'Gallery' }, to: '/gallery' },
  { label: { hi: 'संपर्क', en: 'Contact' }, to: '/contact' },
]

export const footerNav = {
  explore: [
    { label: { hi: 'हमारे बारे में', en: 'About us' }, to: '/about' },
    { label: { hi: 'दृष्टि एवं मिशन', en: 'Vision & Mission' }, to: '/vision-mission' },
    { label: { hi: 'हमारे उद्देश्य', en: 'Objectives' }, to: '/objectives' },
    { label: { hi: 'वैज्ञानिक दृष्टिकोण', en: 'Scientific Temper' }, to: '/scientific-temper' },
    { label: { hi: 'गतिविधियाँ', en: 'Activities' }, to: '/activities' },
    { label: { hi: 'गैलरी', en: 'Gallery' }, to: '/gallery' },
  ] satisfies NavItem[],
  corners: [
    { label: { hi: 'विद्यार्थी कॉर्नर', en: 'Students Corner' }, to: '/students' },
    { label: { hi: 'विज्ञान क्विज़', en: 'Science Quiz' }, to: '/students/quiz' },
    { label: { hi: 'सरल प्रयोग', en: 'Simple Experiments' }, to: '/students/experiments' },
    { label: { hi: 'मिथक और तथ्य', en: 'Myths & Facts' }, to: '/students/myths' },
    { label: { hi: 'शिक्षक कॉर्नर', en: 'Teachers Corner' }, to: '/teachers' },
  ] satisfies NavItem[],
}
