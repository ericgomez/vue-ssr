export function setPosts(state, posts) {
  state.posts = posts;
}

export function setTagsAndCategories(state, { tags, categories }) {
  state.categories = categories;
  state.tags = tags;
}

export function setPost(state, post) {
  state.post = post;
}

export function unsetPost(state, id) {
  state.posts = state.posts.filter(p => p.id !== id);
}
