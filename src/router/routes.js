
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
  {
    path: '/blog',
    component: () => import('layouts/LoggedLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
        meta: { title: 'Tu perfil' }
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('pages/Blog/PostList.vue'),
        meta: { title: 'Blog' }
      },
      {
        path: 'post/:id',
        name: 'PostDetail',
        component: () => import('pages/Blog/Post.vue'),
        meta: { title: 'Detalle del post' }
      },
      {
        path: 'create-post',
        name: 'PostCreate',
        component: () => import('pages/Blog/PostCreate.vue'),
        meta: { title: 'Alta de un nuevo post' }
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
