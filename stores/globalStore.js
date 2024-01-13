import { defineStore } from 'pinia'

export const useUserStore = defineStore('global', {
  state: () => ({
    posts: [],
    isMenuOverlay: false,
    isLogoutOverlay: false,
  }),

  actions: {
    async getAllPosts() {
      let res = await useFetch('/api/get-all-posts')
      this.posts = res.data
      return res.data
    }
  },
})