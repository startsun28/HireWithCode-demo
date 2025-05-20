<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <!-- 流式布局 -->
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div class="text-center">
        <!-- 左箭头 -->
        <el-page-header @click="router.push('/interview-form')" class="no-divider w-20">
        </el-page-header>
        <!-- 标题 -->
        <h1 class="font-bold text-4xl mb-5">继续挑战</h1>
        <!-- 分隔线 -->
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>请完成以下回答并提交</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form :model="form"
                 ref="formRef"
                 :rules="rules"
                 @submit.prevent="onSubmit"
                 label-width="auto"
                 class="space-y-4"
        >
          <el-form-item label="Git仓库地址" prop="gitHubUrl">
            <el-input v-model="form.gitHubUrl"
                      placeholder="请输入您的Git仓库URL"
                      size="large"
                      clearable
                      :prefix-icon="Connection"
            />
          </el-form-item>

          <el-form-item label="项目演示" prop="address">
            <el-input v-model="form.address"
                      placeholder="请输入项目演示地址"
                      size="large"
                      :prefix-icon="Monitor"
                      clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button class=" w-1/2 mt-4 mx-auto"
                       size="large"
                       type="primary"
                       @click="onSubmit"
            >
              完成挑战
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <FormDialog v-model="dialogVisible"
              @submit="handleConfirm"
              :close-on-press-escape="false"
              :fullscreen="mobileFullscreen"
  >
    <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
      <span class="h-[1px] w-14 bg-gray-200"></span>
      <span>温馨提示：请确认信息无误后再提交</span>
      <!-- 右边横线 -->
      <span class="h-[1px] w-14 bg-gray-200"></span>
    </div>
    <el-form label-width="80px" class="confirm-form">
      <el-form-item label="GitHubID:">
        <el-input :model-value="savedData?.githubId" readonly />
      </el-form-item>
      <el-form-item label="邮箱地址:">
        <el-input :model-value="savedData?.email" readonly />
      </el-form-item>
      <el-form-item label="仓库地址:">
        <el-input :model-value="form.gitHubUrl" readonly />
      </el-form-item>
      <el-form-item label="演示地址:">
        <el-input :model-value="form.address" readonly />
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
import { Connection, Monitor, ArrowLeft } from '@element-plus/icons-vue'
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
import FormDialog from '@/components/FormDialog.vue'

const router = useRouter()
const dialogVisible = ref(false)
const isMobile = ref(window.innerWidth < 768)
// 保存数据引用
const savedData = ref(JSON.parse(sessionStorage.getItem('formData') || '{}'))

const form = reactive({
  gitHubUrl: '',
  address: '',
  // 合并本地存储
  ...(JSON.parse(sessionStorage.getItem('formData') || '{}'))
})

// 表单引用
const formRef = ref(null)

// 表单验证
const rules = {
  gitHubUrl: [
    { required: true, message: '请输入Git仓库URL', trigger: 'blur' },
    { type: 'url', message: '请输入有效的网址格式（需包含http/https协议头）', trigger: ['blur', 'change'] }
  ],
  address: [
    { required: true, message: '请输入项目演示地址', trigger: 'blur' },
    { type: 'url', message: '请输入有效的网址格式（需包含http/https协议头）', trigger: ['blur', 'change'] }
  ]
}

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 合并表单数据
      const savedData = JSON.parse(sessionStorage.getItem('formData') || '{}')
      const fullData = {
        ...savedData,
        ...form
      }
      // 将数据做本地存储
      try {
        sessionStorage.setItem('formData', JSON.stringify(fullData))
      } catch (e) {
        ElMessage.error('数据存储失败')
        return
      }
      dialogVisible.value = true
    } else {
      ElMessage.error('请填写完整且正确的信息')
      return false
    }
  })
}

// 完成
const handleConfirm = () => {
  router.push('/finish');
  dialogVisible.value = false;
}

// 按回车键后，执行登录事件
function onKeyUp(e) {
  if (e.key == 'Enter') {
    onSubmit()
  }
}

// 添加键盘监听
onMounted(() => {
  // 恢复数据
  const savedData = sessionStorage.getItem('formData')

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      Object.assign(form, parsedData)
    } catch (e) {
      console.error('本地存储数据解析失败:', e)
      sessionStorage.removeItem('formData')
    }
  }

  // 窗口尺寸监听
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })

  // 键盘监听逻辑
  document.addEventListener('keyup', onKeyUp)
})

// 移动端
const mobileFullscreen = computed(() => isMobile.value)

// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>