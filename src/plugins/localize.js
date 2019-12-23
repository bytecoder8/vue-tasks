import store from '@/store'
import en from '@/lang/en-US'
import ru from '@/lang/ru-RU'

const locales = {
  'en-US': en,
  'ru-RU': ru
}

export default {
  install(Vue) {
    Vue.prototype.$l = function localizeFilter(key) {
      const locale = store.state.locale || 'en-US'
      return locales[locale][key] || `${key}`
    }
  } 
}