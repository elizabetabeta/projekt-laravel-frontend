import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/students',
    name: 'Students',
    component: () => import('@/views/StudentsView.vue')
  },
  {
    path: '/professors',
    name: 'Professors',
    component: () => import('../views/ProfessorsView.vue')
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: () => import('../views/SubjectsView.vue')
  },
  {
    path: '/lectures',
    name: 'Lectures',
    component: () => import('../views/LecturesView.vue')
  },
  {
    path: '/lecturesandstudents',
    name: 'LecturesStudents',
    component: () => import('../views/LecturesStudentsView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
