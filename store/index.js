export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
  // you can request additional fields if they are optional (e.g. photoURL)
  const { uid, email } = authUser
  
  state.authUser = {
    uid,
    email
  }
}

}

export const actions = {
  async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
  if (!authUser) {
    await dispatch('cleanupAction')

    return
  }

  // you can request additional fields if they are optional (e.g. photoURL)
  const { uid, email, emailVerified, displayName, photoURL } = authUser

  commit('SET_USER', {
    uid,
    email,
    emailVerified,
    displayName,
    photoURL, // results in photoURL being undefined for server auth
    // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
    isAdmin: claims.custom_claim
  })
}

}
