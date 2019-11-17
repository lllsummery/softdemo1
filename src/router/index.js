import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import register from "../view/register/register";
import hello from '../view/demo/HelloWorld'
import  home from '../view/index/home';
import  login from '../view/login/Login';
import nom from "../components/demo/nom";
import TopNav from '../components/nav/topNav.vue'
import LeftNav from '../components/nav/leftNav.vue'
import index from "../view/index/index";
import  NotFound from "../components/erro/404"
import upload  from "../components/demo/upload";
import test from "../view/demo/test";
import enterpriseList from "../view/enterprise/index"
import enterpriseAdd from '../view/enterprise/add.vue'
import enterpriseDetail from '../view/enterprise/detail.vue'
import enterpriseValidate from '../view/enterprise/validate.vue'

const loginpage = resolve => require(['../view/login/Login'],resolve)

Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path:'/login',
      name :'login',
      component:loginpage
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path:'/',
      type:'home',
      name :'home',
      redirect: '/index',
      component: home,
      children: [
        {
          path: '/index',
          name: '首页',
          components: {
            default: index,
            top: TopNav,
          },
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true
        },
      ]
    },
    {
      path: '/enterpriseManager',
      type: 'enterprise',
      name: 'enterprise',
      component: home,
      redirect: '/enterprise/list',
      menuShow: true,
      children: [
        {
          path: '/enterprise/list',
          name: '企业信息',
          components: {
            default: enterpriseList,
            top: TopNav,
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: true
        },
        {
          path: '/enterprise/detail',
          name: '企业详情',
          components: {
            default: enterpriseDetail,
            top: TopNav,
          },
          leaf: true,
          iconCls: 'el-icon-setting',
          menuShow: false
        },
        {
          path: '/enterprise/add',
          name: '添加企业',
          components: {
            default: enterpriseAdd,
            top: TopNav,
          },
          leaf: true,
          iconCls: 'el-icon-menu',
          menuShow: true
        },
        {
          path: '/enterprise/validate',
          name: '企业认证',
          components: {
            default:  enterpriseValidate,
            top: TopNav,
          },
          leaf: true,
          iconCls: 'el-icon-menu',
          menuShow: true
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component:register,
    },
    {
      path:'/nom',
      name:'nom',
      component:nom,
    },
    {
      path:'/test',
      name:'test',
      component:test,
    },
  ]
});
//对每次访问之前都要先看是否已经登录



export default router
