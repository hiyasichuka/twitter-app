<template>
  <div clas="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div
        class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer"
      >
        <div class="w-6 h-6">
          <MagnifyingGlassIcon @click="handleSearch" />
        </div>
      </div>
      <input
        v-model="search"
        class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
        placeholder="Search tweet"
        type="text"
      />
    </div>

    <!-- Preview Card : What's happening -->
    <SidebarRightPreviewCard title="ここに偉い人たちのツイートが表示される">
      <SidebarRightPreviewCardItem
        v-for="(whatsHappening, index) in whatsHappeningItems"
        :key="index"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>

          <p class="text-xs text-gray-400">
            {{ whatsHappening.count }}
          </p>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a
            href="#"
            class="hover:underline"
            @click.prevent="handleToggleDarkMode"
            >Dark mode</a
          >
        </li>
      </ul>
    </footer>
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
const search = ref('')
const emitter = useEmitter()

function handleSearch() {
  useRouter().push({
    path: '/search',
    query: {
      q: search.value,
    },
  })
}

const whatsHappeningItems = ref([
  {
    title: '久世 和資',
    count: '18.8k Likes',
  },
  {
    title: '原田 典明',
    count: '8.8k Likes',
  },
  {
    title: '奈木野 豪秀',
    count: '1.8k Likes',
  },
])

function handleToggleDarkMode() {
  emitter.$emit('toggleDarkMode')
}
</script>
