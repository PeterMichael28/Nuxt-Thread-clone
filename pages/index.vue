<template>
    <MainLayout >
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Posts" class="px-4 max-w-[600px] mx-auto" >
                    <div v-if="isPosts" v-for="post in posts" :key="post">
                        {{ post }}
                        <Post :post="post" @isDeleted="posts = userStore.getAllPosts()" />
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const user = useSupabaseUser()

let posts = ref([])
let isPosts = ref(false)
let isLoading = ref(false)

watchEffect(() => {
    if (!user.value) {
        return navigateTo('/auth')
    }
})

onBeforeMount(async () => {
    try {
        isLoading.value = true
        await userStore.getAllPosts()
        isLoading.value = false
    } catch (error) {
        console.log(error)
    }
})

onMounted(() => {
    watchEffect(() => {
        if (userStore.posts && userStore.posts.length >= 1) {
            posts.value = userStore.posts
            isPosts.value = true
        }
    })
})

watch(() => posts.value, () => {
    if (userStore.posts && userStore.posts.length >= 1) {
        posts.value = userStore.posts
        isPosts.value = true
    }
}, { deep: true })
</script>

