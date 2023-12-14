<template>
  <div class="flex h-screen">
    <div class="relative flex-1 hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="/img/deepDive.jpg"
      />
    </div>
    <div
      class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
        <div class="w-full">
          <div class="flex justify-center">
            <div class="w-10 h-10">
              <img class="object-fill" src="@/img/clic.png" />
            </div>
          </div>

          <div class="pt-5 space-y-6">
            <UIButton liquid @click="signIn">Sign In</UIButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { signIn } = useAuth()
</script>
