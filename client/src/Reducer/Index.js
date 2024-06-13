const initialState = {
  drivers: [],
  driverDetail: null,
  teams: [],
};

const driversReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVERS':
      return { ...state, drivers: action.payload };
    case 'SET_DRIVER_DETAIL':
      return { ...state, driverDetail: action.payload };
    case 'SET_TEAMS':
      return { ...state, teams: action.payload };
    default:
      return state;
  }
};

export default driversReducer;