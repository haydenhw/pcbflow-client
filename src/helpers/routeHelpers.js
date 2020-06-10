import { hashHistory } from 'react-router';

export function routeToProjects() {
  hashHistory.push('/projects');
}

export function routeToHome() {
  hashHistory.push('/');
}
