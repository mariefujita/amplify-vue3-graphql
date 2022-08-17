import { API, graphqlOperation, Storage } from 'aws-amplify'
import { createAlbum as createAlbumMutation} from '@/graphql/mutations'
import { getAlbum as getAlbumQuery } from '@/graphql/queries'
import { listAlbums as listAlbumsQuery } from '@/graphql/queries'
import { v4 as uuidv4 } from 'uuid'
import awsconfig from '@/aws-exports'
import { createPhoto as createPhotoMutation } from "@/graphql/mutations"

export const albumInfo = {
  namespaced: true,
  state: {
    albums: null
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload
    }
  },
  actions: {
    async createAlbum ({ dispatch }, newAlbum) {
      try {
        await API.graphql(graphqlOperation(createAlbumMutation, { input: newAlbum }))
        dispatch('getAlbumsData')
      } catch (e) {
        console.error('createAlbum', e)
      }
    },
    async getAlbum (_, albumId) {
      return API.graphql(graphqlOperation(getAlbumQuery, { id: albumId }))
    },
    async getAlbumsData ({ commit }) {
      const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery))
      commit('setAlbums', albumsData.data.listAlbums.items)
    },
    async createPhoto (_, data) {
      const {
        aws_user_files_s3_bucket_region: region,
        aws_user_files_s3_bucket: bucket
      } = awsconfig
      const { file, id } = data
      const extension = file.name.substr(file.name.lastIndexOf('.')+1)
      const photoId = uuidv4()
      const key = `images/${photoId}.${extension}`
      const inputData = {
        id: photoId,
        photoAlbumId: id,
        contentType: 'mimeType',
        fullsize: {
          key,
          region,
          bucket
        }
      }
      try {
        await Storage.put(key, file, {
          level: 'protected',
          contentType: 'mimeType',
          metadata: {
            albumId: id,
            photoId
          }
        })
        const res = await API.graphql(graphqlOperation(createPhotoMutation, { input: inputData }))
        console.info(res)
        console.info(inputData)
        return Promise.resolve('success!')
      } catch (e) {
        console.log('createPhoto', e)
        return Promise.reject(e)
      }
    }
  },
  getters: {
    albums: (state) => state.albums
  }
}
