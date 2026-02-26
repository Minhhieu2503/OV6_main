import express from 'express';
import {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController.js';
import { validateBlogPost } from '../middleware/validator.js';

const router = express.Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPost);
router.post('/', validateBlogPost, createBlogPost);
router.put('/:id', validateBlogPost, updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;

