import jwtDecode from 'jwt-decode';
import shortid from 'shortid';

export const getUser = () => ({ username: 'chief', _id: 1 }); // TODO unmock this
// export const getUser = () => JSON.parse(localStorage.getItem('pcbflowDemoUser'));
export const getJWT= () => localStorage.getItem('pcbflowJWT');
export const setUser = user => localStorage.setItem('pcbflowDemoUser', JSON.stringify(user));
export const setJWT = jwt => localStorage.setItem('pcbflowJWT', jwt);
export const clearUser = () => localStorage.removeItem('pcbflowDemoUser');
export const clearJWT = () => localStorage.removeItem('pcbflowJWT');

export const isJWTExpired = jwt => {
  const jwtExp = jwtDecode(jwt).exp;
  const now = new Date() / 1000;

  return now > jwtExp;
}

export const createNewUser = () => {
  const id = shortid.generate();
  localStorage.setItem('userId', id);
  return id;
}

export const getUserId = () => {
  return localStorage.getItem('userId')
}
// TODO check to see if this can be removed
const postJSON = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const refreshJWT = (refreshURL) => {

}

export const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});
