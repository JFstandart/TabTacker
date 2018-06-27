<template>
<panel title="Recenty Viewed Songs">
  <v-list>
    <v-list-tile v-for="song in songs" :key="song.title" avatar>
      <v-list-tile-avatar>
        <img :src="song.albumImageUrl">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="song.title"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</panel>
</template>

<script>
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      songs: []
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
      this.songs = (await SongHistoryService.index({
        userId: this.user.id
      })).data
      this.songs = this.songs.reverse()
      console.log('history', this.songs)
    }
  }
}
</script>

<style scoped>

</style>
