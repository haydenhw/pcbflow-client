import shortid from 'shortid';
import { fetchProjects } from 'actions/indexActions';
import { isJWTExpired, setJWT, setUser } from 'helpers/users';
import { loginUrl, userUrl } from 'config/endpointUrls.js';

const generateDemoUser = () => ({
  username: shortid.generate(),
  password: 'public_placeholder_pw',
});

const getUserCredentials = username => ({
  username,
  password: 'public_placeholder_pw',
});

const postJSON = (url) => (data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
};

const createNewUser = (userData, userUrl) => postJSON(userUrl)(userData);

const fetchJWT = (loginUrl, user) => {
  const loginUser = postJSON(loginUrl);
  return loginUser(user).then(jwtObject => jwtObject.authToken);
};

export const handleNewUserVisit = () => (dispatch) => {
  const newUser = generateDemoUser();

  createNewUser(newUser, userUrl)
  .then((user) => {
    setUser(user);
    return fetchJWT(loginUrl, newUser);
  })
  .then((jwt) => {
    setJWT(jwt);
  });
};

export const handleExistingUserVisit = (jwt, user) => (dispatch) => {
  const userCredentials = getUserCredentials(user.username);
  const getNewJWT = postJSON(loginUrl);

  if(isJWTExpired(jwt)) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('jwt is expired. fetching a new one...')
    }
    return getNewJWT(userCredentials)
    .then((newJWTObj) => {
      const { authToken } = newJWTObj;
      setJWT(authToken)
      dispatch(fetchProjects(authToken));
    });
  }

  dispatch(fetchProjects(jwt));
};
