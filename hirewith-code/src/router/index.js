import Index from '@/view/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import InterviewDetail from '@/view/interview-detail.vue';
import InterviewForm from '@/view/interview-form.vue'
import InterviewTest from '@/view/interview-test.vue'
import Finish from '@/view/finish.vue'
// 统一在这里声明所有路由
const routes = [
    {
        path: '/', // 路由地址
        component: Index, // 对应组件
        meta: { // meta 信息
            title: ' 首页' // 页面标题
        }
    },
    {
        path: '/interview-detail', // 路由地址
        component: InterviewDetail, // 对应组件
        meta: { // meta 信息
            title: ' 面试流程' // 页面标题
        }
    },
    {
        path: '/interview-form', // 路由地址
        component: InterviewForm, // 对应组件
        meta: { // meta 信息
            title: ' 面试信息' // 页面标题
        }
    },
    {
        path: '/interview-test', // 路由地址
        component: InterviewTest, // 对应组件
        meta: { // meta 信息
            title: ' 测试' // 页面标题
        }
    },
    {
        path: '/finish', // 路由地址
        component: Finish, // 对应组件
        meta: { // meta 信息
            title: ' 完成' // 页面标题
        }
    },
]

// 创建路由
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    // routes: routes 的缩写
    routes,
})

// ES6 模块导出语句，它用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router
