import { Router } from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import {
  createFavorite,
  deleteFavorite,
  getFavoriteAlgorithms
} from '../controllers/favoriteController.js'

const router = Router()

router.use(authenticate)
router.get('/', getFavoriteAlgorithms)
router.post('/:algorithmSlug', createFavorite)
router.delete('/:algorithmSlug', deleteFavorite)

export default router
