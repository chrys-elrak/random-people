const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return { ...state, socket: action.payload };
    case 'SET_ROOM':
      console.log('SET ROOM')
      return { ...state, room: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_IS_CONNECTED':
      return { ...state, isConnected: action.payload };
    default:
      return state;
  }
};

export default Reducer;