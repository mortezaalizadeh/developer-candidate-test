import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      translation: {},
    },
    zh: {
      translation: {},
    },
  },
});

export default i18next;
