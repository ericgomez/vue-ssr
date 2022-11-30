import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import blog from './blog';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function ({ ssrContext }) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      blog
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  if (ssrContext) {
    console.log('Content SSR');
    // execute mutation
    console.log(ssrContext.req.session);
    Store.commit('auth/setUser', {
      user: ssrContext.req.session,
      logged: ssrContext.req.session.logged
    });
  }

  return Store;
}
