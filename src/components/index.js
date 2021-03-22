import 'lodash'
import debounce from '@/utils/debounce'
import veeValidate from './veeValidate'
import modal from './modal'

global.d = debounce

export default {
  install(app) {
    app.use(veeValidate)
    app.component('Modal', modal)
  },
}
