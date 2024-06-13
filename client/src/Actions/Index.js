import axios from 'axios';

export const setDrivers = (drivers) => ({
  type: 'SET_DRIVERS',
  payload: drivers,
});


export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/drivers');
    const data = await response.json();
    dispatch(setDrivers(data)); 
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export const setDriverDetail = (driverDetail) => ({
  type: 'SET_DRIVER_DETAIL',
  payload: driverDetail,
});

export const fetchDriverDetail = (driverId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/drivers/${driverId}`);
    dispatch(setDriverDetail(response.data));
  } catch (error) {
    console.error('Error fetching driver:', error);
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

    const teams = data.map(driver => driver.teams).flat();
    const uniqueTeams = Array.from(new Set(teams));

    dispatch(setTeams(uniqueTeams));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};