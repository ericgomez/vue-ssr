
const routes = [
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Auth/Login.vue'),
        meta: { title: 'Iniciar sesión' }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Auth/Register.vue'),
        meta: { title: 'Regístrate' }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
