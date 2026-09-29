import { Router } from 'express'
import { authenticate } from '../middleware/authMiddleware.js'
import {
  getProgress,
  markProgressComplete,
  patchProgress
} from '../controllers/progressController.js'

const router = Router()

router.use(authenticate)
router.get('/', getProgress)
router.post('/:algorithmSlug/complete', markProgressComplete)
router.patch('/:algorithmSlug', patchProgress)

export default router
