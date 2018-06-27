import api from '@/services/api'

export default {
  index (params) {
    return api().get('history', {
      params: params
    })
  },
  post (history) {
    return api().post('history', {
      params: history
    })
  }
}
