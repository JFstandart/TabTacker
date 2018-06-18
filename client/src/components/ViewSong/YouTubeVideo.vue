<template>
    <youtube :video-id="youtubeId" :player-width="500" :player-height="300"></youtube>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>

</style>
