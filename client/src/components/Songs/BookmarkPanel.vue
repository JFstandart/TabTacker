<template>
<panel title="Bookmarks">
  <v-data-table
    :headers="headers"
    :items="bookmarks"
    class="elevation-1"
    :pagination.sync="pagination">
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{props.item.title}}</td>
      <td class="text-xs-right">{{props.item.artist}}</td>
    </template>
  </v-data-table>
</panel>
</template>

<script>
import BookmarkService from '@/services/BookmarkService'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headers: [{
        text: 'Title',
        value: 'title'
      },
      {
        text: 'Artist',
        value: 'artist'
      }],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarkService.index({
        userId: this.user.id
      })).data
      console.log('testing', this.bookmarks)
    }
  }
}
</script>

<style scoped>

</style>
