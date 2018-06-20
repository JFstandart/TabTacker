<template>
<v-layout>
  <v-flex xs5>
    <panel title="Song Metadata">
      <v-text-field name="title" label="Title" required :rules="[required]" v-model="song.title" single-line></v-text-field>
      <v-text-field name="artist" label="Artist" required :rules="[required]" v-model="song.artist" single-line></v-text-field>
      <v-text-field name="genre" label="Genre" required :rules="[required]" v-model="song.genre" single-line></v-text-field>
      <v-text-field name="album" label="Album" required :rules="[required]" v-model="song.album" single-line></v-text-field>
      <v-text-field name="albumImageUrl" label="Album Image Url" required :rules="[required]" v-model="song.albumImageUrl" single-line></v-text-field>
      <v-text-field name="youtubeId" label="Youtube Id" required :rules="[required]" v-model="song.youtubeId" single-line></v-text-field>
    </panel>
  </v-flex>
  <v-flex xs7>
    <panel title="Song Structure" class="ml-3">
      <v-text-field name="lyrics" label="Lyrics" required :rules="[required]" v-model="song.lyrics" multi-line></v-text-field>
      <v-text-field name="tab" label="Tab" required :rules="[required]" v-model="song.tab" multi-line></v-text-field>
    </panel>
    <br>
    <div class="error" v-if="error">{{error}}</div>
    <br>
    <v-btn class="grey darken-4 white--text" @click="create" type="button" name="button">Create</v-btn>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: false,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>

</style>
