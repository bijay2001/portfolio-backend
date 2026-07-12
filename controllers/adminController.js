// backend/controllers/adminController.js
import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Admin Login
// @route   POST /api/admin/login
export const loginAdmin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const [admins] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
        if (admins.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'your_super_secret_key', {
            expiresIn: '1d',
        });

        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

// @desc    Update Profile Details
// @route   PUT /api/admin/profile
export const updateProfile = async (req, res, next) => {
    const { id, name, title, hero_headline, summary, photo_url, resume_url } = req.body;

    try {
        await db.query(
            'UPDATE profile SET name=?, title=?, hero_headline=?, summary=?, photo_url=?, resume_url=? WHERE id=?',
            [name, title, hero_headline, summary, photo_url, resume_url, id || 1]
        );
        res.status(200).json({ success: true, message: 'Profile updated successfully!' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get Dashboard Statistics
// @route   GET /api/admin/stats
export const getDashboardStats = async (req, res, next) => {
    try {
        const [[{ totalProjects }]] = await db.query('SELECT COUNT(*) AS totalProjects FROM projects');
        const [[{ totalExperiences }]] = await db.query('SELECT COUNT(*) AS totalExperiences FROM experience');
        const [[{ totalSkills }]] = await db.query('SELECT COUNT(*) AS totalSkills FROM skills');
        const [[{ totalMessages }]] = await db.query('SELECT COUNT(*) AS totalMessages FROM contact_messages');

        // Fetch recent messages for the bottom table
        const [recentMessages] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 3');

        res.status(200).json({
            success: true,
            stats: {
                projects: totalProjects,
                experiences: totalExperiences,
                skills: totalSkills,
                messages: totalMessages
            },
            recentMessages
        });
    } catch (error) {
        next(error);
    }
};

// backend/controllers/adminController.js
// ... keep your existing loginAdmin, updateProfile, and getDashboardStats ...

// ==========================================
// EXPERIENCES CRUD
// ==========================================
export const getAdminExperiences = async (req, res, next) => {
    try {
        const [experiences] = await db.query('SELECT * FROM experience ORDER BY id DESC'); //[cite: 1]
        res.status(200).json({ success: true, data: experiences });
    } catch (error) { next(error); }
};

export const addExperience = async (req, res, next) => {
    const { role, company, duration, description, location } = req.body;
    try {
        await db.query(
            'INSERT INTO experience (role, company, duration, description, location) VALUES (?, ?, ?, ?, ?)',
            [role, company, duration, description, location || 'Bhubaneswar, India'] //[cite: 1]
        );
        res.status(201).json({ success: true, message: 'Experience added successfully' });
    } catch (error) { next(error); }
};

export const updateExperience = async (req, res, next) => {
    const { role, company, duration, description, location } = req.body;
    try {
        await db.query(
            'UPDATE experience SET role=?, company=?, duration=?, description=?, location=? WHERE id=?',
            [role, company, duration, description, location, req.params.id] //[cite: 1]
        );
        res.status(200).json({ success: true, message: 'Experience updated successfully' });
    } catch (error) { next(error); }
};

export const deleteExperience = async (req, res, next) => {
    try {
        await db.query('DELETE FROM experience WHERE id=?', [req.params.id]); //[cite: 1]
        res.status(200).json({ success: true, message: 'Experience deleted' });
    } catch (error) { next(error); }
};

// ==========================================
// PROJECTS CRUD
// ==========================================
export const getAdminProjects = async (req, res, next) => {
    try {
        const [projects] = await db.query('SELECT * FROM projects ORDER BY id DESC'); //
        res.status(200).json({ success: true, data: projects });
    } catch (error) { next(error); }
};

export const addProject = async (req, res, next) => {
    const { title, description, link, image_url } = req.body;
    try {
        await db.query(
            'INSERT INTO projects (title, description, link, image_url) VALUES (?, ?, ?, ?)',
            [title, description, link, image_url] //
        );
        res.status(201).json({ success: true, message: 'Project added successfully' });
    } catch (error) { next(error); }
};

export const updateProject = async (req, res, next) => {
    const { title, description, link, image_url } = req.body;
    try {
        await db.query(
            'UPDATE projects SET title=?, description=?, link=?, image_url=? WHERE id=?',
            [title, description, link, image_url, req.params.id] //
        );
        res.status(200).json({ success: true, message: 'Project updated successfully' });
    } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
    try {
        await db.query('DELETE FROM projects WHERE id=?', [req.params.id]); //
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (error) { next(error); }
};

// ==========================================
// SKILLS CRUD
// ==========================================
export const getAdminSkills = async (req, res, next) => {
    try {
        const [skills] = await db.query('SELECT * FROM skills ORDER BY display_order ASC'); //
        res.status(200).json({ success: true, data: skills });
    } catch (error) { next(error); }
};

export const addSkill = async (req, res, next) => {
    const { name, category, display_order } = req.body;
    try {
        await db.query(
            'INSERT INTO skills (name, category, display_order) VALUES (?, ?, ?)',
            [name, category, display_order || 99] //
        );
        res.status(201).json({ success: true, message: 'Skill added successfully' });
    } catch (error) { next(error); }
};

export const updateSkill = async (req, res, next) => {
    const { name, category, display_order } = req.body;
    try {
        await db.query(
            'UPDATE skills SET name=?, category=?, display_order=? WHERE id=?',
            [name, category, display_order, req.params.id] //
        );
        res.status(200).json({ success: true, message: 'Skill updated successfully' });
    } catch (error) { next(error); }
};

export const deleteSkill = async (req, res, next) => {
    try {
        await db.query('DELETE FROM skills WHERE id=?', [req.params.id]); //
        res.status(200).json({ success: true, message: 'Skill deleted' });
    } catch (error) { next(error); }
};

export const getAdminCertifications = async (req, res, next) => {
    try {
        const [certifications] = await db.query('SELECT * FROM certifications ORDER BY id DESC'); //
        res.status(200).json({ success: true, data: certifications });
    } catch (error) { next(error); }
};

export const addCertification = async (req, res, next) => {
    const { title, description, certificate_url, live_url, issue_date } = req.body;
    try {
        await db.query(
            'INSERT INTO certifications (title, description, certificate_url, live_url, issue_date) VALUES (?, ?, ?, ?, ?)',
            [title, description, certificate_url, live_url, issue_date] //
        );
        res.status(201).json({ success: true, message: 'Certification added successfully' });
    } catch (error) { next(error); }
};

export const updateCertification = async (req, res, next) => {
    const { title, description, certificate_url, live_url, issue_date } = req.body;
    try {
        await db.query(
            'UPDATE certifications SET title=?, description=?, certificate_url=?, live_url=?, issue_date=? WHERE id=?',
            [title, description, certificate_url, live_url, issue_date, req.params.id] //
        );
        res.status(200).json({ success: true, message: 'Certification updated successfully' });
    } catch (error) { next(error); }
};

export const deleteCertification = async (req, res, next) => {
    try {
        await db.query('DELETE FROM certifications WHERE id=?', [req.params.id]); //
        res.status(200).json({ success: true, message: 'Certification deleted' });
    } catch (error) { next(error); }
};

// ==========================================
// CONTACT MESSAGES READ/DELETE
// ==========================================
export const getAdminMessages = async (req, res, next) => {
    try {
        const [messages] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC'); //
        res.status(200).json({ success: true, data: messages });
    } catch (error) { next(error); }
};

export const deleteMessage = async (req, res, next) => {
    try {
        await db.query('DELETE FROM contact_messages WHERE id=?', [req.params.id]); //
        res.status(200).json({ success: true, message: 'Message deleted' });
    } catch (error) { next(error); }
};