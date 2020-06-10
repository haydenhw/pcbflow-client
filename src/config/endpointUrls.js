const localServer = 'http://localhost:8000';
const cloudServer = 'https://lula.wtf/pcbflow';
const baseUrl = process.env.NODE_ENV === 'production' ? cloudServer : localServer;
export const projectsUrl = `${baseUrl}/api/projects`;
export const loginUrl = `${baseUrl}/auth/login`;
export const userUrl = `${baseUrl}/users`;

