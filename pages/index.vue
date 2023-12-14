<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <div class="border-b" :class="clicBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>
<script setup>
const { clicBorderColor } = useTailwindConfig()
const { getTweets } = useTweets()

const loading = ref(true)
const homeTweets = ref([])
const { data } = useAuth()

const user = data.value.user

onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = await getTweets()

    homeTweets.value = tweets
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    loading.value = false
  }
})

function handleFormSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>
