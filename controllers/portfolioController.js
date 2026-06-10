import db from '../config/db.js';
import { sendEmail } from '../utils/emailService.js';

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

export const submitContact = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Save the message to your TiDB database (We DO want to wait for this)
        const [result] = await db.query(
            "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
            [name, email, message]
        );

        // 2. INSTANT SUCCESS RESPONSE! 
        // We tell the frontend "Success" right now, before the emails even start sending.
        res.status(200).json({ success: true, message: "Message sent successfully!" });

        // 3. The Polite Auto-Reply to the Visitor (Notice: NO 'await' here)
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Hello ${name},</h2>
                <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
                <br>
                <p>Best Regards,</p>
                <p><strong>Bijay Kumar Behera</strong><br>Full Stack Developer</p>
                <a href="https://bijay-portfolio-rho.vercel.app">View My Portfolio</a>
            </div>
        `;
        sendEmail({
            to: email, 
            subject: "Thank you for getting in touch!",
            html: userHtml
        }).catch(err => console.error("Visitor email failed to send in background:", err));

        // 4. The Notification to YOU (Notice: NO 'await' here)
        const adminHtml = `
            <h2>New Portfolio Contact!</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">${message}</blockquote>
        `;
        sendEmail({
            to: process.env.SMTP_USER, 
            subject: `New Message from ${name}`,
            html: adminHtml
        }).catch(err => console.error("Admin notification email failed to send in background:", err));

    } catch (error) {
        console.error(error);
        // Only send the error response if we haven't already sent the success response
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
};