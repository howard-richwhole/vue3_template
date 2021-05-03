import debounce from './debounce'

export default {
  install() {
    window.d = debounce
  },
}
