const setLocaleMixin = {
  methods: {
    setLocale(locale) {
      localStorage.locale = locale;
    },
  },
};

const initLocaleMixin = {
  created() {
    if (localStorage.locale) {
      this.$i18n.locale = localStorage.locale;
    } else {
      localStorage.locale = this.$i18n.locale;
    }
  },
};

export { setLocaleMixin, initLocaleMixin };
