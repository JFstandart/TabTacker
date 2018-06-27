import api from '@/services/api'

export default {
  index (bookmark) {
    return api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return api().post('bookmarks', {
      params: bookmark
    })
  },
  delete (bookmark) {
    return api().delete(`bookmarks`, {
      params: bookmark
    })
  }
}
