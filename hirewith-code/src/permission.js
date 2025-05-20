import router from '@/router/index'
import {hidePageLoading, showMessage, showPageLoading} from '@/composables/util'
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    // 展示页面加载 Loading
    showPageLoading()

    next()
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    // 动态设置页面 Title
    let title = (to.meta.title ? to.meta.title : '')
    document.title = title

    // 隐藏页面加载 Loading
    hidePageLoading()
})

