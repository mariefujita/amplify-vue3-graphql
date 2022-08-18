<template>
  <div>
    <h3 class="text-4xl font-semibold mb-10">Album {{ albumName }}</h3>
    <div class="flex w-full items-center justify-center bg-grey-lighter mb-10">
      <form enctype="multipart/form-data" novalidate>
        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-600">
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input
            accept="image/*"
            type="file"
            class="hidden"
            @change="onFileChange"
          />
        </label>
      </form>
    </div>
    <hr />
    <div class="text-2xl mt-5">List Of Photos</div>
      <div v-if="photos" class="flex flex-wrap p-10 justify-center m-auto w-full">
        <div v-for="(photo, index) in photos" :key="index" class="shadow-xl ml-4 mt-4 w-3/12">
          <amplify-s3-image
            level="protected"
            :img-key="photo.thumbnail ? photo.thumbnail.key : photo.fullsize.key"
            class="w-3/12"
          />
          <div class="text-lg font-semibold cursor-pointer" @click="deletePhoto(photo)">×</div>
          <div v-if="photo.createdAt && photo.gps">
            <ul>
              <li>Created At {{ photo.createdAt }}</li>
              <li>
                latitude
                {{ photo.gps.latitude }}
              </li>
              <li>longitude At {{ photo.gps.longitude }}</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      photos: [],
      albumName: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getPhotos()
  },
  methods: {
    async onFileChange (file) {
        if (!file.target || !file.target.files[0]) {
          return
        }
        try {
          await this.$store.dispatch('albumInfo/createPhoto', {
            file: file.target.files[0],
            id: this.id
          })
          await this.getPhotos()
        } catch (e) {
          console.log('error create photo', e)
        }
    },
    async getPhotos () {
      while (this.photos.length > 0) {
        this.photos.pop()
      }
      const album = await this.$store.dispatch('albumInfo/getAlbum', this.id)
      for (const photo of album.data.getAlbum.photos.items) {
        this.photos.push(photo)
      }
      this.albumName = album.data.getAlbum.name
    },
    async deletePhoto (photo) {
      if (!photo.id) {
        return
      }
      try {
        await this.$store.dispatch('albumInfo/deletePhoto', photo.id)
        await this.getPhotos()
      } catch (e) {
        console.error(e)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
amplify-s3-image {
  --width: 75%;
}
</style>
