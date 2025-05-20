<template>
  <div class="grid grid-cols-1 h-screen bg-white content-around rounded-lg">
    <div class="col-span-1  h-full flex justify-center items-center rounded-lg flex-col">
      <div class="flex justify-center items-center flex-col  w-full mr-4 ml-4 bg-gray-50">
        <!-- 标题，设置字体粗细、大小、下边距 -->
        <h1 class="font-semibold text-2xl mb-4 mt-5">欢迎到来</h1>
        <h2 class="font-bold text-4xl mb-5">挑战者</h2>
        <!-- 设置 flex 布局，内容垂直水平居中，文字颜色，以及子内容水平方向 x 轴间距 -->
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <!-- 左边横线，高度为 1px, 宽度为 16，背景色设置 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>请填写报名信息</span>
          <!-- 右边横线 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form :model="form"
                 ref="formRef"
                 :rules="rules"
                 @submit.prevent="onSubmit"
                 label-width="auto"
                 class="w-5/6 md:w-2/5"
        >
          <el-form-item label="GitHudID" prop="githubId">
            <el-input
                v-model="form.githubId"
                placeholder="请输入您的GitHub账号"
                size="large"
                clearable
                :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item label="E-amil" prop="email">
            <el-input v-model="form.email"
                      placeholder="请输入联系邮箱"
                      size="large"
                      type="email"
                      :prefix-icon="Message"
                      clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button class="w-50% mt-2 mx-auto flex justify-center"
                       size="large"
                       :loading="loading"
                       type="primary"
                       @click="onSubmit"
            >
              接受挑战
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Message } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import {ElMessage} from "element-plus";

const router = useRouter()

const form = reactive({
  githubId: '',
  email: ''
})
// 表单引用
const formRef = ref(null)

// 表单验证
const rules = {
  githubId: [
    { required: true, message: '请输入GitHub ID', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱格式', trigger: ['blur', 'change'] }
  ]
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 异常处理
      try {
        sessionStorage.setItem('formData', JSON.stringify(form))
      } catch (e) {
        ElMessage.error('数据存储失败，请检查浏览器设置')
        return
      }
      router.push('/interview-test')
    } else {
      // 验证失败提示
      ElMessage.error('请填写完整且正确的信息')
      return false
    }
  })
}

// 按回车键后，执行登录事件
function onKeyUp(e) {
  if (e.key == 'Enter') {
    onSubmit()
  }
}

onMounted(() => {
  // 数据恢复逻辑
  const savedData = sessionStorage.getItem('formData')
  if (savedData) {
    try {
      Object.assign(form, JSON.parse(savedData))
    } catch (e) {
      console.error('本地存储数据解析失败:', e)
    }
  }
  
  // 键盘监听逻辑
  document.addEventListener('keyup', onKeyUp)
})

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>