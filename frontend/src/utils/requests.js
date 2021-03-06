import axios from 'axios';

const ROUTES = {
  CURRENT_USER: '/api/users/current/',
  DEALS: '/api/deals/',
  FAVORITES: '/api/favorites/',
  FOLLOWERS: '/api/followers/',
  GOALS: '/api/goals/',
  USERS: '/api/users/',
  SAVE_PAYMENT: '/save-stripe-token/',
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

export function savePayment(data) {
    const url = ROUTES.SAVE_PAYMENT
    const method = 'POST'
    return request({ method, url, data })
}

export function fetchCurrentUser() {
  return request({ method: 'GET', url: ROUTES.CURRENT_USER })
}

export function fetchUserData(username) {
  const url = `${ROUTES.USERS}${username}/`;
  return request({ method: 'GET', url })
}

export function toggleFavoriteDeal(dealId, favoriteId, callback) {
  const url = favoriteId ? `${ROUTES.FAVORITES}${favoriteId}/` : ROUTES.FAVORITES;
  const method = favoriteId ? 'DELETE' : 'POST';
  const data = favoriteId ? '' : { 'deal_id': dealId };

  request({ method, url, data }).then(() => callback());
}

export function toggleFollow(targetUserId, followerId, callback) {
  const url = followerId ? `${ROUTES.FOLLOWERS}${followerId}/` : ROUTES.FOLLOWERS;
  const method = followerId ? 'DELETE' : 'POST';
  const data = followerId ? '' : { 'following_id': targetUserId };

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
