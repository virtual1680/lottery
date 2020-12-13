/**
 *
 *mac
 *2020/12/2
 *495301515@qq.com
 */
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next)=>{
    NProgress.start();
    let token = window.localStorage.getItem("Token");
    if(to.path!=='/' &&  !token){
        next({path: '/'})
    } else {
        if(to.path ==='/' && token){
            next('/index')
        }else{
            next()
        }
    }
    NProgress.done()
});

router.afterEach(()=>{
    NProgress.done()
});
