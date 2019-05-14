import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      translation: {
        people: { label: 'People' },
        everybody: { label: 'Everybody' },
        male: { label: 'Male' },
        female: { label: 'Female' },
        over30: { label: 'Over 30' },
        under30: { label: 'Under 30' },
      },
    },
  },
});

export default i18next;
