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
  delete (bookmarkId) {
    return api().get(`bookmarks/${bookmarkId}`)
  }
}
