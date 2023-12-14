<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetItem
        v-if="props.replyTo && props.showReply"
        :tweet="props.replyTo"
        hide-actions
      />
      <TweetFormInput
        :placeholder="props.placeholder"
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['on-success'])
const loading = ref(false)
const { postTweet } = useTweets()

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'いまどうしてる？',
  },
  replyTo: {
    type: Object,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false,
  },
})

async function handleFormSubmit(data) {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: props.replyTo?.id,
    })

    emits('on-success', response.tweet)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
