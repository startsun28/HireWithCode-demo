<template>
  <div class="flex flex-col items-center justify-center p-5 text-center h-screen bg-gray-100">
    <div class="animate__animated animate__backInDown animate__delay-0.2s">
      <img src="@/assets/logo.png"
           alt="HireWithCode Logo"
           class="w-[200px] max-w-[80%] mb-4 sm:mb-4 "
      />
    </div>
    <div class="animate__animated animate__backInUp animate__delay-0.3s">
      <h1 class="font-bold text-5xl mb-5">
        欢迎来到 infist 线上面试环节，期待你的加入！
      </h1>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/interview-detail')
  }, 2000)
})
</script>
