<template>
    <panel title="Songs">
      <v-btn fab slot="action" Large absolute right middle class="grey darken-1" :to="{name: 'songs-create'}">
        <v-icon>playlist_add</v-icon>
      </v-btn>
      <div class="song" v-for="song in songs" :key="song.id">
        <v-layout>
          <v-flex xs6>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>
            <v-btn class="grey darken-4 white--text" :to="{name:'song', params: {songId: song.id}}" type="button" name="button">View</v-btn>
          </v-flex>
          <v-flex xs6>
            <img class="album-image" :src="song.albumImageUrl" />
          </v-flex>
        </v-layout>
      </div>
    </panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
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
