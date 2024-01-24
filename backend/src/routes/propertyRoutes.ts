import { Router } from 'express';
import { validateDto } from '../middlewares';
import { CreatePropertyDto, UpdatePropertyDto } from '../dtos';
import { PropertyController } from '../controllers';
import { PropertyService } from '../services';

const router = Router();
const propertyController = new PropertyController(new PropertyService());

router.get('/', async (req, res) => {
  propertyController.getProperty(req, res);
});

router.get('/:id', async (req, res) => {
  propertyController.getByIdProperty(req, res);
});

router.post('/', validateDto(CreatePropertyDto), (req, res) =>
  propertyController.createProperty(req, res),
);

router.put('/:id', validateDto(UpdatePropertyDto), async (req, res) => {
  propertyController.updateProperty(req, res);
});

router.delete('/:id', async (req, res) => {});

export default router;
