<template>
  <!--主体 -->
  <div class="custom-container max-w-screen-lg mx-auto px-4 sm:px-6 py-8 min-h-screen">
    <v-md-preview :text="detailmarkdown"
                  class="prose max-w-full text-sm sm:text-base overflow-y-auto overscroll-y-contain"
    />
    <el-checkbox v-model="checked" label="我已知悉流程并愿意接受挑战" size="large" class="ml-5 md:ml-8"/>
    <div class=" flex justify-center mt-3">
      <el-button @click="onNext"
                 type="success"
                 class="px-6 py-3 text-sm sm:text-base block w-fit"
      >
        下一步
      </el-button>
    </div>
  </div>
  <ScrollToTopButton></ScrollToTopButton>
</template>

<script setup>
import detailmarkdown from '@/assets/README.md?raw'
import { useRouter } from 'vue-router'
import { onMounted, onBeforeUnmount,ref } from 'vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import {ElMessage} from "element-plus";

const router = useRouter()
const checked = ref(false)

const onNext = () => {
  if (!checked.value) {
    ElMessage.error('请先阅读了解流程')
    return
  }
  router.push('/interview-form')
}

// 按回车键后，执行登录事件
function onKeyUp(e) {
  console.log(e)
  if (e.key == 'Enter') {
    onNext()
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.custom-container.py-8 {
  padding-top: 0;
}
</style>