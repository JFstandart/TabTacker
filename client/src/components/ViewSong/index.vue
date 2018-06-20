<template>
<div>
  <v-layout row wrap>
    <v-layout column>
      <v-flex xs6>
        <panel title="Song Metadata" class="ma-2">
          <v-btn fab slot="action" Large absolute right middle class="grey darken-1" :to="{name:'song-edit', params: {songId: song.id}}">
            <v-icon>edit</v-icon>
          </v-btn>
          <song-metadata :song="song" />
        </panel>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-flex xs6 class="ma-2">
        <panel title="Tabs">
          <textarea readonly v-model="song.tab"></textarea>
        </panel>
      </v-flex>
    </v-layout>
  </v-layout>
  <v-layout row wrap>
    <v-layout column>
      <v-flex xs7 class="ma-2">
        <panel title="Youtube Video">
          <youtube-video :youtubeId="song.youtubeId" />
        </panel>
      </v-flex>
    </v-layout>
    <v-layout column>
      <v-flex xs6 class="ma-2">
        <panel title="Lyrics">
          <textarea readonly v-model="song.lyrics"></textarea>
        </panel>
      </v-flex>
    </v-layout>
  </v-layout>
</div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetadata from './SongMetadata'
import YoutubeVideo from './YouTubeVideo'

export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    SongMetadata,
    YoutubeVideo
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 450px;
  border-style: none;
  outline: none;
  border-color: transparent;
  overflow: auto;
  padding: 35px;
}
</style>
