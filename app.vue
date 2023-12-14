<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- Loding -->
      <LoadingPage v-if="isAuthLoading" />
      <!-- App -->
      <div v-else-if="loggedIn" clas="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                :user="user"
                @on-tweet="handleOpenTweetModal"
                @on-logout="signOut"
              />
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right Sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else />
      <UIModal :is-open="postTweetModal" @on-close="handleModalClose">
        <TweetForm
          :reply-to="replyTweet"
          show-reply
          :user="user"
          @on-success="handleFormSuccess"
        />
      </UIModal>
    </div>
  </div>
</template>
<script setup>
const darkMode = ref(false)
const { status, data, signOut } = useAuth()
const isAuthLoading = computed(() => status.value === 'loading')
const loggedIn = computed(() => status.value === 'authenticated')

const {
  closePostTweetModal,
  usePostTweetModal,
  openPostTweetModal,
  useReplyTweet,
} = useTweets()

// TODO: refactor
let user
if (data.value) {
  user = data.value.user
}

const postTweetModal = usePostTweetModal()
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})

emitter.$on('toggleDarkMode', () => {
  darkMode.value = !darkMode.value
})

function handleFormSuccess(tweet) {
  closePostTweetModal()

  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}
</script>
