const initialState = {
  drivers: [],
  driverDetail: null,
  teams: [],
  loading: false,
  error: null,
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVERS':
      return { ...state, drivers: action.payload };
    case 'SET_DRIVER_DETAIL':
      return { ...state, driverDetail: action.payload };
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    case 'FETCH_DRIVER_DETAIL_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_DRIVER_DETAIL_SUCCESS':
      return { ...state, loading: false, driverDetail: action.payload };
    case 'FETCH_DRIVER_DETAIL_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default driverReducer;