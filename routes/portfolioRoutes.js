import express from 'express';
import {
    getCertifications,
    getExperiences,
    getProfile,
    getProjects,
    getSkills,
    submitContact
} from '../controllers/portfolioController.js'; 

const router = express.Router();

// Define all API endpoints
router.get('/certifications', getCertifications);
router.get('/experience', getExperiences);
router.get('/profile', getProfile);
router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.post('/contact', submitContact);

export default router;