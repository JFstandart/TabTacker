<template>
<div>
  <v-layout row wrap>
    <v-layout column>
      <v-flex xs6>
        <panel title="Song Metadata" class="ma-2">
          <v-btn fab slot="action" Large absolute right middle class="mr-8 grey darken-1" :to="{name:'song-edit', params: {songId: this.$store.state.route.params.songId}}">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="$store.state.isUserLoggedIn" fab slot="action" Large left middle @click="Bookmark" class="grey darken-1">
            <v-icon>{{star}}</v-icon>
            <v-checkbox v-model="checkbox" class="hidden">{{checkbox}}</v-checkbox>
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
import BookmarkService from '@/services/BookmarkService'
import SongHistoryService from '@/services/SongHistoryService'
import SongMetadata from './SongMetadata'
import YoutubeVideo from './YouTubeVideo'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      checkbox: false,
      star: 'star_border',
      song: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    if (this.isUserLoggedIn) {
      await SongHistoryService.post({
        songId: this.$store.state.route.params.songId,
        userId: this.user.id
      })
    }

    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
      const bookmark = (await BookmarkService.index({
        songId: songId,
        userId: this.user.id
      })).data
      bookmark.length === 0 ? this.checkbox = false : this.checkbox = true // !!bookmark
      this.checkbox === true ? this.star = 'star' : this.star = 'star_border'
    } catch (err) {
      console.log('error', err)
    }
  },
  components: {
    SongMetadata,
    YoutubeVideo
  },
  methods: {
    async Bookmark () {
      this.checkbox = !this.checkbox
      if (this.checkbox === false) {
        try {
          console.log('delete')
          await BookmarkService.delete({
            songId: this.$store.state.route.params.songId,
            userId: this.user.id
          })
        } catch (err) {
          console.log('error', err)
        }
        this.star = 'star_border'
      } else {
        try {
          console.log('create', this.$store.state.user)
          await BookmarkService.post({
            songId: this.$store.state.route.params.songId,
            userId: this.user.id
          })
        } catch (err) {
          console.log('error', err)
        }
        this.star = 'star'
      }
    }
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
.hidden {
  display: none;
}
</style>
