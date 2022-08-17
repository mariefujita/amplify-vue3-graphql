<template>
  <div>
    <h3 class="text-3xl">Create Or Choose An Album</h3>
    <div class="flex flex-col m-auto w-64">
      <input
        class="my-4 bg-grey-200 appearance-none border-2 border-grey-200 rounded w-full py-2 px-4 text-grey-700"
        placeholder="Album Name"
        type="text"
        v-model="albumName"
      />
      <button class="btn-blue mb-4" @click="createAlbum">Create Album</button>
    </div>
    <div class="text-red-500">{{ error }}</div>
    <hr />
    <h5 class="mt-4 text-2xl">List Of Albums</h5>
    <div class="flex flex-wrap w-full justify-center">
      <div
        v-for="(album, id) in albums"
        :key="id"
        class="cursor-pointer mt-4 ml-4 w-3/12 h-24 shadow-xl flex items-center justify-center"
        @click="openAlbumDetail(album)"
      >
        <div class="text-2xl">{{ album.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data () {
    return {
      albumName: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      albums: 'albumInfo/albums'
    })
  },
  async mounted () {
    this.$store.dispatch('albumInfo/getAlbumsData')
  },
  methods: {
    openAlbumDetail (album) {
      this.$router.push(`/album/${album.id}`)
    },
    async createAlbum () {
      this.error = ''
      if (!this.albumName) {
        this.error = 'Please enter an album name'
        return
      }
      const newAlbum = {
        name: this.albumName,
        owner: this.user.username,
        ownerId: this.user.id
      }
      this.$store.dispatch('albumInfo/createAlbum', newAlbum)
    }
  }
}
</script>

<style>

</style>
