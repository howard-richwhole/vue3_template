import { LocalStorage } from 'storage-manager-js'

const state = () => {
  return {
    token: LocalStorage.get('token'),
    size: { vw: innerWidth, vh: innerHeight },
  }
}
const mutations = {
  SET_TOKEN(state, token) {
    if (token) {
      state.token = token
      LocalStorage.set('token', state.token)
    } else {
      LocalStorage.delete('token')
    }
  },
  SET_SIZE(state) {
    state.size = { vw: innerWidth, vh: innerHeight }
  },
}
const actions = {
  detectSize({ commit }) {
    commit('SET_SIZE')
    addEventListener('resize', () => {
      commit('SET_SIZE')
    })
  },
}

export default { namespaced: true, state, mutations, actions }
