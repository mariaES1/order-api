import { response, Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: '' });
});

export default routes;
