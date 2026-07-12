// backend/routes/adminRoutes.js
import express from 'express';
import { 
    loginAdmin, updateProfile, getDashboardStats,
    getAdminExperiences, addExperience, updateExperience, deleteExperience,
    getAdminProjects, addProject, updateProject, deleteProject,
    getAdminSkills, addSkill, updateSkill, deleteSkill,getAdminCertifications, addCertification, updateCertification, deleteCertification,
    getAdminMessages, deleteMessage
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Protected routes
router.get('/stats', protect, getDashboardStats);
router.put('/profile', protect, updateProfile);

// Experiences
router.route('/experiences')
    .get(protect, getAdminExperiences)
    .post(protect, addExperience);
router.route('/experiences/:id')
    .put(protect, updateExperience)
    .delete(protect, deleteExperience);

// Projects
router.route('/projects')
    .get(protect, getAdminProjects)
    .post(protect, addProject);
router.route('/projects/:id')
    .put(protect, updateProject)
    .delete(protect, deleteProject);

// Skills
router.route('/skills')
    .get(protect, getAdminSkills)
    .post(protect, addSkill);
router.route('/skills/:id')
    .put(protect, updateSkill)
    .delete(protect, deleteSkill);

    router.route('/certifications')
    .get(protect, getAdminCertifications)
    .post(protect, addCertification);
router.route('/certifications/:id')
    .put(protect, updateCertification)
    .delete(protect, deleteCertification);
// Messages
router.route('/messages')
    .get(protect, getAdminMessages);
router.route('/messages/:id')
    .delete(protect, deleteMessage);

export default router;