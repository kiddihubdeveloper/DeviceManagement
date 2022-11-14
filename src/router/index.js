import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import Storage from "@/utils/storage";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

// chuyển đến trang login nếu chưa được login
router.beforeEach((to, from, next) => {

  const {requiresAdminAuth} = to.meta

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Storage.get('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (requiresAdminAuth) {
    const user = Storage.get('user');
    if (user && user["role"] === '1') {
      return next();
    }
    alert('Bạn không có quyền truy cập trang này');
  } else {
    next();
  }

})

export default router;
