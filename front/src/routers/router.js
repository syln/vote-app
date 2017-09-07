import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 页面
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import AddAlbum from 'pages/AddAlbum';


const routes = [
  {path:'/',component:Home},
  {path:'/home',component:Home},
  {path:'/Login',component:Login},
  {path:'/signup',component:Register},
  {path:'/add',component:AddAlbum}
]

const router = new VueRouter({
  routes:routes,
  mode:'history'
});

export default router;
