export function setUser(state, data) {
  state.id = data.user.userID;
  state.email = data.user.email;
  state.name = data.user.name;
  state.logged = data.logged;
}

export function setName(state, name) {
  state.name = name;
}

