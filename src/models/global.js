export default {
  namespace: 'global',
  state: {
    item: [{name: 'nav 1', id: '1'}, {name: 'nav 2', id: '2'}, {name: 'nav 3', id: '3'}],
    content: 'nav 1'
  },
  subscriptions: {
    setup ({ dispatch, history }) {

    }
  },
  effects: {

  },
  reducers: {
    updateState (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
