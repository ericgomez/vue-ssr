import Vue from 'vue';

export async function createPost(context, { post, tags }) {
  try {
    const { data } = await Vue.prototype.$axios.post("/api/blog/posts", { post, tags });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPosts(context) {
  try {
    const { data } = await Vue.prototype.$axios.get('/api/blog/posts');
    context.commit('blog/setPosts', data, { root: true });
  } catch (e) {
    console.log(e);
  }
}

export async function fetchTagsAndCategories(context) {
  try {
    const { data } = await Vue.prototype.$axios.get('/api/blog/tagsAndCategories');
    context.commit('blog/setTagsAndCategories', data, { root: true });
  } catch (e) {
    console.log(e);
  }
}


export async function fetchPost(context, id) {
  try {
    const { data } = await Vue.prototype.$axios.get(`/api/blog/posts/${id}`);
    context.commit('blog/setPost', data, { root: true });
  } catch (e) {
    console.log(e);
  }
}

export async function deletePost(context, id) {
  try {
    await Vue.prototype.$axios.delete(`/api/blog/posts/${id}`);
    context.commit('blog/unsetPost', id, { root: true });
  } catch (e) {
    console.log(e);
  }
}
