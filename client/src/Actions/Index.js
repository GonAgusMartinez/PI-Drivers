import axios from 'axios';

// Acción para establecer la lista de conductores
export const setDrivers = (drivers) => ({
  type: 'SET_DRIVERS',
  payload: drivers,
});

// Acción para obtener la lista de conductores
export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    dispatch(setDrivers(response.data)); 
  } catch (error) {
    console.error('Error fetching drivers:', error);
  }
};

// Acción para establecer el detalle del conductor
export const setDriverDetail = (driverDetail) => ({
  type: 'SET_DRIVER_DETAIL',
  payload: driverDetail,
});

// Acción para obtener el detalle de un conductor
export const fetchDriverDetail = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5000/drivers/${id}`);
    dispatch(setDriverDetail(response.data));
  } catch (error) {
    console.error('Error fetching driver:', error);
  }
};

// Acción para establecer la lista de equipos
export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams,
});

// Acción para obtener la lista de equipos
export const fetchTeams = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/drivers');
    dispatch(setTeams(response.data));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};