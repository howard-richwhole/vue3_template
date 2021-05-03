import 'lodash'
import veeValidate from './veeValidate'
import modal from './modal'

export default {
  install(app) {
    app.use(veeValidate)
    app.component('Modal', modal)
  },
}
