import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomePage.vue"
import NoteCreation from "../views/NoteCreation.vue"

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/new-note',
        name: 'NoteCreation',
        component: NoteCreation
    },
    {
        path: '/edit-note/:id',
        name: 'NoteEdit',
        component: () => import(/* webpackChunkName: "NoteCreation" */ '../views/NoteCreation.vue'),
      }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
