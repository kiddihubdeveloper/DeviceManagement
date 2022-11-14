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
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Storage.get('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;
