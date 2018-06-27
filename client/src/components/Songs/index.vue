<template>
<v-layout row>
  <v-flex :class="{xs12:!isUserLoggedIn, xs6:isUserLoggedIn}">
    <songs-search-panel class="ma-2" />
    <song-panel class="ma-2"/>
  </v-flex>
  <v-flex xs6 sm6 v-if="isUserLoggedIn">
    <bookmark-panel class="ma-2"/>
    <recently-songs class="ma-2"/>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongPanel from './SongPanel'
import BookmarkPanel from './BookmarkPanel'
import SongsSearchPanel from './SongsSearchPanel'
import RecentlySongs from './RecentlyViewSongs'
import {mapState} from 'vuex'

export default {
  components: {
    SongPanel,
    SongsSearchPanel,
    BookmarkPanel,
    RecentlySongs
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  }
}
</script>

<style scoped>
.song {
  padding: 30px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 1.8em
}

.song-artist {
  font-size: 1.6em
}

.song-genre {
  font-size: 1em
}

.album-image {
  width: 85%;
  margin: 0 auto;
}
</style>
