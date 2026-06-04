import db from '../config/db.js';

export const getCertifications = async (req, res, next) => {
    try {
        // Tip: In the future, replace '*' with specific columns like 'SELECT id, title, image FROM certifications'
        const [rows] = await db.query('SELECT * FROM certifications');
        res.status(200).json({ status: "success", data: rows });
    } catch (error) {
        next(error); // Passes the error to the server.js global handler
    }
};

export const getExperiences = async (req, res, next) => {
    try {
        let [experience] = await db.query('SELECT * FROM experience ORDER BY id ASC');

        if (experience.length === 0) {
            experience = [
                {
                    role: 'Junior Software Developer (PHP)', company: 'Orisys Infotech Pvt Ltd',
                    duration: 'Feb 2025 - Present', location: 'Bhubaneswar',
                    description: 'Develop and maintain dynamic PHP applications.||Optimize database queries to improve speed by 25%.||Implement secure login systems.'
                },
                {
                    role: 'Full Stack Web Developer Intern', company: 'Cloudedge Technology',
                    duration: 'Feb 2024 - June 2024', location: 'Bhubaneswar',
                    description: 'Developed dynamic web applications using PHP and MySQL.||Designed authentication systems.||Built responsive UI with Bootstrap.'
                }
            ];
        }

        res.status(200).json({ status: "success", data: experience });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
        const profile = rows.length > 0 ? rows[0] : null;

        const education = [
            { title: "Master of Computer Applications", year: "2022 - 2024", inst: "Aryan Institute of Engineering and Technology, Bhubaneswar", desc: "Affiliated to BPUT, Odisha" },
            { title: "B.Sc in Chemistry", year: "2019 - 2022", inst: "Fakir Mohan University, Balasore", desc: "Bachelor of Science (Honours)" },
            { title: "Higher Secondary (+2)", year: "2017 - 2019", inst: "CHSE Odisha", desc: "Science Stream (PCMB)" },
            { title: "Matriculation", year: "2017", inst: "BSE Odisha", desc: "High School Certificate" }
        ];

        res.status(200).json({
            status: "success",
            profile: profile,
            education: education
        });
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM projects');
        res.status(200).json({ status: "success", data: rows });
    } catch (error) {
        next(error);
    }
};

export const getSkills = async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM skills ORDER BY display_order ASC');
        res.status(200).json({ status: "success", data: rows });
    } catch (error) {
        next(error);
    }
};

export const submitContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ status: "error", message: "All fields are required." });
        }

        // --- NEW: Validate Email Format ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: "error", message: "Please provide a valid email address." });
        }

        // Basic string sanitization
        const cleanName = name.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const cleanEmail = email.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const cleanMessage = message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const [result] = await db.query(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
            [cleanName, cleanEmail, cleanMessage]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({ status: "success", message: "Message sent successfully!" });
        } else {
            // Throwing an error here triggers the catch block and goes to the global handler
            throw new Error("Failed to save message to the database.");
        }
    } catch (error) {
        next(error);
    }
};