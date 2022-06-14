import { Router, json } from 'express';
import { AuthController } from '../Controller/Auth';

const router = Router();
const Controller = new AuthController();

router.post('/api/table', json(), (request, response) => {
    Controller.create(request, response);
})

router.get('/api/table', json(), (request, response) => {
    Controller.getData(request, response);
})

router.put('/api/table/:id', json(), (request, response) => {
    Controller.update(request, response);
})

router.delete('/api/table/:id', json(), (request, response) => {
    Controller.delete(request, response);
})

export default router;