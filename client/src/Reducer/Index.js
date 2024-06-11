const initialState = {
  dogs: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DOGS_REQUEST':
    case 'FETCH_DOGS_LIST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_DOGS_SUCCESS':
    case 'FETCH_DOGS_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        dogs: action.payload,
        error: null
      };
    case 'FETCH_DOGS_FAILURE':
    case 'FETCH_DOGS_LIST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'FILTER_DOGS_BY_SEARCH_TERM':
      // Lógica para filtrar perros por término de búsqueda
      return {
        ...state,
        // Actualizar el estado con los perros filtrados según el término de búsqueda
      };
    case 'FILTER_DOGS_BY_TEMPERAMENT':
      // Lógica para filtrar perros por temperamento
      return {
        ...state,
        // Actualizar el estado con los perros filtrados por temperamento
      };
    case 'FILTER_DOGS_BY_ORIGIN':
      // Lógica para filtrar perros por origen
      return {
        ...state,
        // Actualizar el estado con los perros filtrados por origen
      };
    case 'CREATE_NEW_DOG_SUCCESS':
      // Lógica para la creación exitosa de un nuevo perro
      return {
        ...state,
        // Actualizar el estado si es necesario después de crear un nuevo perro
      };
    case 'CREATE_NEW_DOG_FAILURE':
      // Lógica para el fallo en la creación de un nuevo perro
      return {
        ...state,
        // Puedes manejar el error si es necesario
      };
    default:
      return state;
  }
};

export default reducer;