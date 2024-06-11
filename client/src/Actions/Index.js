// Acción para manejar la solicitud de perros por ID
export const fetchDogsRequest = () => {
  return {
    type: 'FETCH_DOGS_REQUEST'
  };
};

export const fetchDogsSuccess = (dogs) => {
  return {
    type: 'FETCH_DOGS_SUCCESS',
    payload: dogs
  };
};

// Acción para manejar el fallo en la carga de perros por ID
export const fetchDogsFailure = (error) => {
  return {
    type: 'FETCH_DOGS_FAILURE',
    payload: error
  };
};

// Acción para manejar la solicitud de lista de perros desde la base de datos local
export const fetchDogsListRequest = () => {
  return (dispatch) => {
    // Indica que se está realizando una solicitud de lista de perros
    dispatch({
      type: 'FETCH_DOGS_LIST_REQUEST'
    });

    // Realiza la solicitud a tu servidor local para obtener la lista de perros
    fetch('http://localhost:3001/dogs')
      .then(response => response.json())
      .then(data => {
        // Indica que la solicitud de lista de perros fue exitosa y pasa los datos
        dispatch({
          type: 'FETCH_DOGS_LIST_SUCCESS',
          payload: data
        });
      })
      .catch(error => {
        // Indica que la solicitud de lista de perros falló y pasa el error
        dispatch({
          type: 'FETCH_DOGS_LIST_FAILURE',
          payload: error
        });
      });
  };
};

export const filterDogsBySearchTerm = (searchTerm) => {
  return {
    type: 'FILTER_DOGS_BY_SEARCH_TERM',
    payload: searchTerm
  };
};

// Acción para filtrar perros por temperamento
export const filterDogsByTemperament = (temperament) => {
  return {
    type: 'FILTER_DOGS_BY_TEMPERAMENT',
    payload: temperament
  };
};

// Acción para filtrar perros por origen
export const filterDogsByOrigin = (origin) => {
  return {
    type: 'FILTER_DOGS_BY_ORIGIN',
    payload: origin
  };
};

export const createNewDog = (newDogData) => {
  return (dispatch) => {
    // Realiza una solicitud POST al servidor para crear un nuevo perro
    fetch('http://localhost:3001/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDogData)
    })
    .then(response => response.json())
    .then(data => {
      // Indica que la creación del perro fue exitosa y pasa los datos
      dispatch({
        type: 'CREATE_NEW_DOG_SUCCESS',
        payload: data
      });
    })
    .catch(error => {
      // Indica que la creación del perro falló y pasa el error
      dispatch({
        type: 'CREATE_NEW_DOG_FAILURE',
        payload: error
      });
    });
  };
};