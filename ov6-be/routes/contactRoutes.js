import express from 'express';
import {
  createContact,
  getContacts,
  getContact,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import { validateContact } from '../middleware/validator.js';

const router = express.Router();

router.post('/', validateContact, createContact);
router.get('/', getContacts);
router.get('/:id', getContact);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;

