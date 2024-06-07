export const setDrivers = (drivers) => ({
  type: 'SET_DRIVERS',
  payload: drivers,
});

export const setDriverDetail = (driverDetail) => ({
  type: 'SET_DRIVER_DETAIL',
  payload: driverDetail,
});

export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/drivers');
    const data = await response.json();
    dispatch(setDrivers(data.drivers));
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export const fetchDriverDetail = (driverId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/drivers/${driverId}`);
    const data = await response.json();
    dispatch(setDriverDetail(data));
  } catch (error) {
    console.error('Error fetching driver detail:', error);
  }
};

export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams,
});

export const fetchTeams = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/drivers');
    const data = await response.json();
    const uniqueTeams = Array.from(new Set(data.teams));
    dispatch(setTeams(uniqueTeams));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}; //