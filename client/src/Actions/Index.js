import axios from 'axios';

export const setDrivers = (drivers) => ({
  type: 'SET_DRIVERS',
  payload: drivers,
});

export const fetchDrivers = () => async (dispatch) => {
  try {
    console.log('Fetching drivers...');
    const response = await axios.get('http://localhost:5000/drivers');
    console.log('Response:', response.data); 
    dispatch(setDrivers(response.data));
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

export const setDriverDetail = (driverDetail) => ({
  type: 'SET_DRIVER_DETAIL',
  payload: driverDetail,
});

export const fetchDriverDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/drivers/${id}`);
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
    const response = await axios.get('http://localhost:5000/drivers');
    dispatch(setTeams(response.data));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

export const postDriver = (driverData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/drivers', driverData);
    dispatch(fetchDrivers()); 
  } catch (error) {
    console.error('Error posting driver:', error);
  }
};