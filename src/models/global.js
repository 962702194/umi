export default {
  namespace: 'global',
  state: {
    
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
