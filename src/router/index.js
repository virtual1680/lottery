/**
 *
 *mac
 *2020/12/2
 *495301515@qq.com
 */
import Vue from 'vue'
import Router from 'vue-router'
export const asyncRouterMap = [
    {
        path: '/',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/index',
        component: () => import('@/views/home/index'),
        hidden: true
    }
];
export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: asyncRouterMap
})


Vue.use(Router);
