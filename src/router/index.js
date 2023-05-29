import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
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
  {
    path: '/students/edit/:id',
    name: 'studentEdit',
    component: () => import('../views/StudentEditView.vue')
  },
  {
    path: '/professors/edit/:id',
    name: 'professorEdit',
    component: () => import('../views/ProfessorEditView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
