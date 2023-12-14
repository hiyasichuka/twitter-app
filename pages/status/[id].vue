<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>
<script setup>
const loading = ref(false)
const tweet = ref(null)
const { getTweetById } = useTweets()
const { data } = useAuth()
const user = data.value.user
const route = useRoute()

watch(
  () => route.fullPath,
  () => getTweet()
)

async function getTweet() {
  loading.value = true
  try {
    if (!route.params.id) return // パラメータがうまく渡らない場合の対応
    const response = await getTweetById(route.params.id)
    tweet.value = response.tweet
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => {
  getTweet()
})
</script>
