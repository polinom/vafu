import axios from 'axios';

const ROUTES = {
  USERS: '/api/users/',
  CURRENT_USER: '/api/users/current/',
  DEALS: '/api/deals/',
  FAVORITES: '/api/favorites/',
};

function request({ method, url, params, data }) {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const req = axios({
    method,
    url,
    params,
    data,
  });

  return req
    .then(({ data }) => data)
    .then(data => data)
    .catch(function (error) {

      if (error.response) {
        return { error: error.response }
      } else {
        // Something happened in setting up the request that triggered an Error
        return { error: error.message }
      }
    })
}

export function fetchCurrentUser() {
  return request({ method: 'GET', url: ROUTES.CURRENT_USER })
}

export function toggleFavoriteDeal(dealId, favoriteId, callback) {
  const url = favoriteId ? `${ROUTES.FAVORITES}${favoriteId}/` : ROUTES.FAVORITES;
  const method = favoriteId ? 'DELETE' : 'POST';
  const data = favoriteId ? '' : { 'deal_id': dealId };

  request({ method, url, data }).then(() => callback());
}

export function fetchDealsData(section) {
  const params = {
    'Browse': null,
    'Favourites': { 'section': 'favorites' },
    'For You': { 'section': 'for_you' },
  }[section];

  return request({ method: 'GET', url: ROUTES.DEALS, params })
}
