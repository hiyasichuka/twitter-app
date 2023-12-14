<template>
  <div class="flex flex-col h-screen">
    <div
      class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <img class="object-fill" src="@/img/clic.png" />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab active to="/">
        <template #icon>
          <HomeIcon />
        </template>
        <template #name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <HashtagIcon />
        </template>
        <template #name> Explore </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BellIcon />
        </template>
        <template #name> Notifications </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <BookmarkIcon />
        </template>
        <template #name> Bookmarks </template>
      </SidebarLeftTab>

      <SidebarLeftTab>
        <template #icon>
          <UserIcon />
        </template>
        <template #name> Profile </template>
      </SidebarLeftTab>

      <div class="hidden xl:block">
        <UIButton liquid size="lg">
          <span class="font-bold">Post</span>
        </UIButton>
      </div>

      <div class="block xl:hidden">
        <UIButton @on-click="emits('on-tweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>

    <div
      class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
      :class="defaultTransition"
      @click="emits('on-logout')"
    >
      <div class="flex flex-row">
        <img
          :src="props.user.image || 'https://picsum.photos/200/200'"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-col hidden ml-2 xl:block">
          <h1 class="text-sm font-bold text-gray-800 dark:text-white">
            {{ user.name }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ user.email }}
          </p>
        </div>
      </div>

      <!-- ICON -->
      <div class="hidden ml-auto xl:block">
        <div class="w-6 h-6">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid'
import {
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  UserIcon,
  PencilIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(['on-tweet', 'on-logout'])

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>
