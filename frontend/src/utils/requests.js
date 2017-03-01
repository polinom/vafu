import axios from 'axios';

const ROUTES = {
  CURRENT_USER: '/api/users/current/',
  DEALS: '/api/deals/',
  FAVORITES: '/api/favorites/',
  GOALS: '/api/goals/',
  USERS: '/api/users/',
};

function request(config) {
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  const req = axios(config);

  return req
    .then(({ data }) => data)
    .then(data => data)
    .catch(function (error) {

      let resp;
      if (error.response) {
        resp = error.response
      } else {
        // Something happened in setting up the request that triggered an Error
        resp = error.message
      }

      if (config.hasOwnProperty('errorHandler')) config.errorHandler(resp);
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

export function fetchDealListData(section) {
  const params = { section };

  return request({ method: 'GET', url: ROUTES.DEALS, params })
}

export function fetchDealData(dealId) {
  const url = `${ROUTES.DEALS}${dealId}/`;

  return request({ method: 'GET', url })
}

export function fetchGoalsData(section) {
  const params = {
    'My Goals': null,
    'Shared': { 'section': 'shared' },
    'Friends': { 'section': 'friends' },
  }[section];

  return request({ method: 'GET', url: ROUTES.GOALS, params })
}

export function postGoalsData(goalId, data, errorHandler, callback) {
  const url = goalId ? `${ROUTES.GOALS}${goalId}/` : ROUTES.GOALS;
  const method = goalId ? 'PUT' : 'POST';

  request({ method, url, data, errorHandler }).then(callback);
}
