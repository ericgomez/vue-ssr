import Vue from 'vue';

export function login(context, user) {
  return Vue.prototype.$axios.post('/api/login', user);
}

export function register(context, user) {
  return Vue.prototype.$axios.post('/api/register', user);
}

export function updateProfile(context, user) {
  return Vue.prototype.$axios.patch('/api/profile/update', user);
}

export function logout(context) {
  return Vue.prototype.$axios.post('/api/logout');
}
