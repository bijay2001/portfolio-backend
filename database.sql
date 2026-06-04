-- phpMyAdmin SQL Dump Cleaned for Aiven Migration

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

-- Table structure for table `admin`
CREATE TABLE `admin` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'beherabijay685@gmail.com', '$2b$10$Yq8QaXT1F/j7ko76AVcq9OBD/Jg6Atpe9PMqj5YeLrm.ODztfrgsq');

-- --------------------------------------------------------

-- Table structure for table `certifications`
CREATE TABLE `certifications` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `certificate_url` varchar(255) DEFAULT NULL,
  `live_url` varchar(255) DEFAULT NULL,
  `issue_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `certifications` (`id`, `title`, `description`, `certificate_url`, `live_url`, `issue_date`) VALUES
(1, 'MySQL', 'GUVI - Database Design & Query Optimization', '', 'https://www.guvi.in/share-certificate/cn7193h59O1k6x741K', '2024-05-16'),
(2, 'JavaScript', 'GUVI - DOM Manipulation, ES6 Features', '', 'https://www.guvi.in/share-certificate/6710h87056s121UF2T', '2024-07-16'),
(3, 'Cloud Computing', 'NPTEL', '', 'https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs89/Course/NPTEL23CS89S63300237020121922.pdf', 'Jul-Oct 2023'),
(4, 'Advanced Computer Networks', 'NPTEL', '', 'https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs11/Course/NPTEL24CS11S45300206330431418.pdf', 'jan-Apr 2024'),
(5, 'Industry 4.0 & Internet of Things', 'NPTEL', '', 'https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs34/Course/NPTEL24CS34S65300263930431418.pdf', 'Jan-Apr 2024'),
(6, 'Introduction to the Fundamentals of Databases', 'Simplilearn', NULL, 'https://simpli-web.app.link/e/q1pvuMkzMXb', '2023-08-23');

-- --------------------------------------------------------

-- Table structure for table `contact_messages`
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `contact_messages` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'bijay kumar behera', 'Saga47@gmail.com', 'hgfgdjgh', '2025-12-15 18:46:07'),
(2, 'Bijay Kumar Behera', 'beherabijay685@gmail.com', 'Test', '2025-12-15 18:47:33'),
(3, 'BIJAY KUMAR BEHERA', 'jenan8220@gmail.com', 'hiiii', '2026-04-08 16:06:00'),
(4, 'bijay', 'bbb@gmail.com', 'nafsdhgfsahdf', '2026-04-19 15:11:23'),
(5, 'BIjay', 'behera@gmail.com', 'hjguydyjhcnbcghyedythgc', '2026-06-03 18:38:26');

-- --------------------------------------------------------

-- Table structure for table `experience`
CREATE TABLE `experience` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(100) DEFAULT 'Bhubaneswar, India'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO `experience` (`id`, `role`, `company`, `duration`, `description`, `location`) VALUES
(1, 'Junior Software Developer (PHP)', 'Orisys Infotech Pvt Ltd', 'Feb 2025 - Present', 'Develop and maintain dynamic PHP and MySQL-based applications.||Optimize database queries to improve page load speed by 25%.||Implement secure login systems, session management, and data validation.', 'Bhubaneswar'),
(2, 'SEO Intern', 'SEOCZAR IT Services Pvt Ltd', 'Dec 2024 - Jan 2025', 'Conducted keyword research, on-page SEO, and performance optimization.||Improved organic search ranking for client websites through targeted SEO strategies.', 'Bhubaneswar'),
(3, 'Full Stack Web Developer Intern', 'Cloudedge Technology', 'Feb 2024 – June 2024', 'Developed dynamic web applications using PHP and MySQL, implementing secure CRUD operations.||Designed and integrated a user authentication system with login/logout functionality.||Built responsive, mobile-friendly UI using HTML, CSS, JavaScript, and Bootstrap.||Worked closely with a team of developers, gaining new ideas and practical experience.', 'Bhubaneswar');

-- --------------------------------------------------------

-- Table structure for table `profile`
CREATE TABLE `profile` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `hero_headline` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `profile` (`id`, `name`, `title`, `hero_headline`, `summary`, `photo_url`) VALUES
(1, 'Bijay Kumar Behera', 'Full Stack Developer | React, Node, MySQL & PHP', 'Building Secure, Scalable <br> <span class=\"text-gradient\">Digital Experiences.</span>', 'I’m a Full Stack Developer who enjoys the logic behind the code. I built my profile on the reliability of PHP and MySQL, developing comprehensive solutions like a Student Fees Management System and a Daily Transaction Dashboard from scratch. These projects taught me how to handle real-world challenges—like securing user logins and optimizing financial databases. Currently, I am expanding that strong experience into the modern stack, actively learning and applying React and Node.js to build equally robust, scalable applications.', 'URL_to_profile_photo_here');

-- --------------------------------------------------------

-- Table structure for table `projects`
CREATE TABLE `projects` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `projects` (`id`, `title`, `description`, `link`, `image_url`) VALUES
(1, 'Driver Attendance System for Patra Travels', 'Developed a sophisticated real-time driver attendance management application to streamline clock-ins, shift scheduling, and automated reporting.', 'https://drivers.patratravels.com/', 'assets/img/driver_attendance.png'),
(2, 'Full-Stack AI Ad Script & Storyboard Generator', 'Engineered a React, Node.js, and MySQL application that orchestrates the Gemini API to generate high-converting marketing scripts, featuring intelligent rate-limiting and a custom backend.', 'https://github.com/bijay2001', 'assets/img/ai_ad_generator.png'),
(3, 'Hisab Hub - Financial Daybook', 'A comprehensive financial management application built with PHP and MySQL. Features include daily receipt/payment tracking, bank account management, credit ledgers, and file attachments.', 'https://daybook-bijay.rf.gd/index.php?i=1', 'assets/img/hisab_hub.png'),
(4, 'Login System Using PHP', 'Implemented secure authentication with password hashing and session handling', 'https://github.com/bijay2001', 'assets/img/login_system.png'),
(5, 'PHP CRUD Application', 'Created complete create, read, update, delete functionality with MySQL', 'https://github.com/bijay2001', 'assets/img/php_crud.png'),
(6, 'E-commerce Website', 'Built a demo online store with product listing, basic cart system, and user authentication', 'https://github.com/bijay2001', 'assets/img/ecommerce.png');

-- --------------------------------------------------------

-- Table structure for table `skills`
CREATE TABLE `skills` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `display_order` int(11) DEFAULT 99
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `skills` (`id`, `name`, `category`, `display_order`) VALUES
(1, 'JavaScript (ES6+)', 'Languages', 1),
(2, 'TypeScript (Learning)', 'Languages', 2),
(3, 'PHP', 'Languages', 3),
(4, 'SQL', 'Languages', 4),
(5, 'React.js', 'Frontend', 5),
(6, 'React Hooks', 'Frontend', 6),
(7, 'Redux / Context API', 'Frontend', 7),
(8, 'HTML5 & CSS3', 'Frontend', 8),
(9, 'Bootstrap 5', 'Frontend', 9),
(10, 'Responsive Design', 'Frontend', 10),
(11, 'Node.js', 'Backend', 11),
(12, 'Express.js', 'Backend', 12),
(13, 'REST APIs', 'Backend', 13),
(14, 'MVC Architecture', 'Backend', 14),
(15, 'WebSockets (Socket.io)', 'Backend', 15),
(16, 'JWT Authentication', 'Backend', 16),
(17, 'MySQL', 'Database', 17),
(18, 'Joins & Indexing', 'Database', 18),
(19, 'Normalization', 'Database', 19),
(20, 'Transactions', 'Database', 20),
(21, 'Git & GitHub', 'Tools & Cloud', 21),
(22, 'Postman', 'Tools & Cloud', 22),
(23, 'VS Code', 'Tools & Cloud', 23),
(24, 'AWS (Learning)', 'Tools & Cloud', 24);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;