<template>
<v-layout>
  <v-flex xs6>
    <div class="song song-title">
      {{song.title}}
    </div>
    <div class="song song-artist">
      {{song.artist}}
    </div>
    <div class="song song-genre">
      {{song.genre}}
    </div>
  </v-flex>
  <v-flex xs6>
    <img class="album-image" :src="song.albumImageUrl" />
    <br> {{song.album}}
  </v-flex>
</v-layout>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
.song {
  padding: 30px;
  height: auto;
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
