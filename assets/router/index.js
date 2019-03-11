import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/web/Index.vue'
import About from '../components/web/About.vue'
import Contact from '../components/web/Contact.vue'
import ChatIndex from '../components/chat/Index.vue'
import ChatRoom from '../components/chat/Chat.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/chat', component: ChatIndex },
    { path: '/chat/:id', component: ChatRoom, name: 'chatroom' }
  ],
})