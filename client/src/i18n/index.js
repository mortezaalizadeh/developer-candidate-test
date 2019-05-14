import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  resources: {
    en: {
      translation: {
        everybody: { label: 'Everybody' },
        male: { label: 'Male' },
        female: { label: 'Female' },
        over30: { label: 'Over 30' },
        under30: { label: 'Under 30' },
        delete: { button: { caption: 'Delete' } },
        selectPersonToRemoveMessage: 'Select person(s) to remove',
        selected: { label: 'selected' },
      },
    },
  },
});

export default i18next;
