  // import axios from 'axios';

const api = {
  getAllDrinks() {
    return fetch('/api/songs')
      .then(response => response.json());
  }
};

export default api;
