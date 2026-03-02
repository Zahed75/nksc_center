-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: nksc-db:3306
-- Generation Time: Mar 02, 2026 at 03:24 PM
-- Server version: 10.11.16-MariaDB-ubu2204
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nksc_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_aboutsection`
--

CREATE TABLE `about_aboutsection` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `subtitle` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `section_type` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `meta_title` varchar(200) NOT NULL,
  `meta_description` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_aboutsection`
--

INSERT INTO `about_aboutsection` (`id`, `title`, `subtitle`, `content`, `section_type`, `icon`, `display_order`, `is_active`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
(7, 'About Nazmul Karim Study Center', 'A Center for Sociological Excellence', 'The Nazmul Karim Study Center was established in honor of Professor Dr. A.K. Nazmul Karim, a pioneer in Bangladeshi sociology and the founding chairman of the Sociology Department at the University of Dhaka. Established on May 10, 2000, at the Curzon Hall, the center aims to preserve and promote Professor Karim\'s intellectual legacy while advancing sociological research and education.', 'history', 'pi-info-circle', 0, 1, '', '', '2026-02-16 00:06:47.191411', '2026-02-16 00:06:47.191646'),
(8, 'Our Mission', 'Academic Excellence', 'To preserve and promote the work and philosophy of Professor Dr. A.K. Nazmul Karim, conduct advanced research projects in sociology and related fields, and provide a platform for academic discourse and knowledge exchange.', 'mission', 'pi-info-circle', 0, 1, '', '', '2026-02-16 00:06:47.192499', '2026-02-16 00:06:47.192507'),
(9, 'Our Vision', 'Future Outlook', 'To be a global center of excellence in sociological research and to apply research-based knowledge to address contemporary social challenges.', 'vision', 'pi-info-circle', 0, 1, '', '', '2026-02-16 00:06:47.193092', '2026-02-16 00:06:47.193104');

-- --------------------------------------------------------

--
-- Table structure for table `about_contactinfo`
--

CREATE TABLE `about_contactinfo` (
  `id` bigint(20) NOT NULL,
  `contact_type` varchar(50) NOT NULL,
  `label` varchar(100) NOT NULL,
  `value` varchar(200) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_contactinfo`
--

INSERT INTO `about_contactinfo` (`id`, `contact_type`, `label`, `value`, `icon`, `display_order`, `is_active`) VALUES
(1, 'address', 'ঠিকানা', 'নাজমুল করিম স্টাডি সেন্টার, কলাভবন, ঢাকা বিশ্ববিদ্যালয়, ঢাকা-১০০০', 'pi-map-marker', 1, 1),
(2, 'phone', 'ফোন', '+৮৮০-২-৯৬৬১৯০০', 'pi-phone', 2, 1),
(3, 'email', 'ইমেইল', 'nksc@du.ac.bd', 'pi-envelope', 3, 1),
(4, 'office_hours', 'অফিস সময়', 'রবিবার - বৃহস্পতিবার: সকাল ৯টা - বিকাল ৫টা', 'pi-clock', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `about_director`
--

CREATE TABLE `about_director` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `position` varchar(100) NOT NULL,
  `director_type` varchar(50) NOT NULL,
  `period` varchar(100) NOT NULL,
  `bio` longtext NOT NULL,
  `qualifications` longtext NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `website` varchar(200) NOT NULL,
  `linkedin` varchar(200) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_director`
--

INSERT INTO `about_director` (`id`, `name`, `position`, `director_type`, `period`, `bio`, `qualifications`, `email`, `phone`, `image`, `website`, `linkedin`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 'Professor Dr. Taiabur Rahman', 'Former Director', 'previous', '17 May 2025 - 2026', 'Professor Dr. Taiabur Rahman served as the Director of Nazmul Karim Study Center. He is a Professor at the Department of Development Studies, University of Dhaka.', 'Ph.D. in Public Policy and Governance', 'taiaburrahman.dvs@du.ac.bd', '', '', '', '', 0, 1, '2026-02-16 00:06:47.198203', '2026-02-16 00:06:47.198211');

-- --------------------------------------------------------

--
-- Table structure for table `about_facility`
--

CREATE TABLE `about_facility` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `icon` varchar(50) NOT NULL,
  `location` varchar(200) NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `capacity` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_facility`
--

INSERT INTO `about_facility` (`id`, `title`, `description`, `icon`, `location`, `room_number`, `capacity`, `display_order`, `is_active`, `image`) VALUES
(7, 'Digital Library', 'Access to thousands of digital resources.', 'pi pi-desktop', '', '', '', 0, 1, ''),
(8, 'Seminar Room', 'Fully equipped for academic events.', 'pi pi-comments', '', '', '', 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `about_statistic`
--

CREATE TABLE `about_statistic` (
  `id` bigint(20) NOT NULL,
  `label` varchar(100) NOT NULL,
  `value` varchar(50) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `suffix` varchar(10) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_statistic`
--

INSERT INTO `about_statistic` (`id`, `label`, `value`, `prefix`, `suffix`, `icon`, `display_order`, `is_active`) VALUES
(5, 'Years of Activity', '25', '', '+', 'pi pi-calendar', 0, 1),
(6, 'Research Papers', '500', '', '+', 'pi pi-file', 0, 1),
(7, 'Library Resources', '1000', '', '+', 'pi pi-book', 0, 1),
(8, 'Successful Directors', '5', '', '+', 'pi pi-user-check', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `about_timelineevent`
--

CREATE TABLE `about_timelineevent` (
  `id` bigint(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `icon` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_timelineevent`
--

INSERT INTO `about_timelineevent` (`id`, `year`, `title`, `description`, `icon`, `display_order`, `is_active`, `image`) VALUES
(8, '2000', 'Establishment', 'Center founded on May 10, 2000.', 'pi-calendar', 1, 1, ''),
(9, '2025', 'Silver Jubilee', 'Celebrating 25 years of excellence.', 'pi-calendar', 5, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add journal', 7, 'add_journal'),
(26, 'Can change journal', 7, 'change_journal'),
(27, 'Can delete journal', 7, 'delete_journal'),
(28, 'Can view journal', 7, 'view_journal'),
(29, 'Can add user profile', 8, 'add_userprofile'),
(30, 'Can change user profile', 8, 'change_userprofile'),
(31, 'Can delete user profile', 8, 'delete_userprofile'),
(32, 'Can view user profile', 8, 'view_userprofile'),
(33, 'Can add pinned application', 9, 'add_pinnedapplication'),
(34, 'Can change pinned application', 9, 'change_pinnedapplication'),
(35, 'Can delete pinned application', 9, 'delete_pinnedapplication'),
(36, 'Can view pinned application', 9, 'view_pinnedapplication'),
(37, 'Can add bookmark', 10, 'add_bookmark'),
(38, 'Can change bookmark', 10, 'change_bookmark'),
(39, 'Can delete bookmark', 10, 'delete_bookmark'),
(40, 'Can view bookmark', 10, 'view_bookmark'),
(41, 'Can add user dashboard module', 11, 'add_userdashboardmodule'),
(42, 'Can change user dashboard module', 11, 'change_userdashboardmodule'),
(43, 'Can delete user dashboard module', 11, 'delete_userdashboardmodule'),
(44, 'Can view user dashboard module', 11, 'view_userdashboardmodule'),
(45, 'Can add publication', 12, 'add_publication'),
(46, 'Can change publication', 12, 'change_publication'),
(47, 'Can delete publication', 12, 'delete_publication'),
(48, 'Can view publication', 12, 'view_publication'),
(49, 'Can add news category', 13, 'add_newscategory'),
(50, 'Can change news category', 13, 'change_newscategory'),
(51, 'Can delete news category', 13, 'delete_newscategory'),
(52, 'Can view news category', 13, 'view_newscategory'),
(53, 'Can add news', 14, 'add_news'),
(54, 'Can change news', 14, 'change_news'),
(55, 'Can delete news', 14, 'delete_news'),
(56, 'Can view news', 14, 'view_news'),
(57, 'Can add Gallery Statistic', 15, 'add_gallerystat'),
(58, 'Can change Gallery Statistic', 15, 'change_gallerystat'),
(59, 'Can delete Gallery Statistic', 15, 'delete_gallerystat'),
(60, 'Can view Gallery Statistic', 15, 'view_gallerystat'),
(61, 'Can add Gallery Event', 16, 'add_galleryevent'),
(62, 'Can change Gallery Event', 16, 'change_galleryevent'),
(63, 'Can delete Gallery Event', 16, 'delete_galleryevent'),
(64, 'Can view Gallery Event', 16, 'view_galleryevent'),
(65, 'Can add Gallery Category', 17, 'add_gallerycategory'),
(66, 'Can change Gallery Category', 17, 'change_gallerycategory'),
(67, 'Can delete Gallery Category', 17, 'delete_gallerycategory'),
(68, 'Can view Gallery Category', 17, 'view_gallerycategory'),
(69, 'Can add Gallery Image', 18, 'add_galleryimage'),
(70, 'Can change Gallery Image', 18, 'change_galleryimage'),
(71, 'Can delete Gallery Image', 18, 'delete_galleryimage'),
(72, 'Can view Gallery Image', 18, 'view_galleryimage'),
(73, 'Can add Staff', 19, 'add_staff'),
(74, 'Can change Staff', 19, 'change_staff'),
(75, 'Can delete Staff', 19, 'delete_staff'),
(76, 'Can view Staff', 19, 'view_staff'),
(77, 'Can add Department', 20, 'add_department'),
(78, 'Can change Department', 20, 'change_department'),
(79, 'Can delete Department', 20, 'delete_department'),
(80, 'Can view Department', 20, 'view_department'),
(81, 'Can add Staff Education', 21, 'add_staffeducation'),
(82, 'Can change Staff Education', 21, 'change_staffeducation'),
(83, 'Can delete Staff Education', 21, 'delete_staffeducation'),
(84, 'Can view Staff Education', 21, 'view_staffeducation'),
(85, 'Can add Staff Experience', 22, 'add_staffexperience'),
(86, 'Can change Staff Experience', 22, 'change_staffexperience'),
(87, 'Can delete Staff Experience', 22, 'delete_staffexperience'),
(88, 'Can view Staff Experience', 22, 'view_staffexperience'),
(89, 'Can add About Section', 23, 'add_aboutsection'),
(90, 'Can change About Section', 23, 'change_aboutsection'),
(91, 'Can delete About Section', 23, 'delete_aboutsection'),
(92, 'Can view About Section', 23, 'view_aboutsection'),
(93, 'Can add Contact Information', 24, 'add_contactinfo'),
(94, 'Can change Contact Information', 24, 'change_contactinfo'),
(95, 'Can delete Contact Information', 24, 'delete_contactinfo'),
(96, 'Can view Contact Information', 24, 'view_contactinfo'),
(97, 'Can add Director', 25, 'add_director'),
(98, 'Can change Director', 25, 'change_director'),
(99, 'Can delete Director', 25, 'delete_director'),
(100, 'Can view Director', 25, 'view_director'),
(101, 'Can add Facility', 26, 'add_facility'),
(102, 'Can change Facility', 26, 'change_facility'),
(103, 'Can delete Facility', 26, 'delete_facility'),
(104, 'Can view Facility', 26, 'view_facility'),
(105, 'Can add Statistic', 27, 'add_statistic'),
(106, 'Can change Statistic', 27, 'change_statistic'),
(107, 'Can delete Statistic', 27, 'delete_statistic'),
(108, 'Can view Statistic', 27, 'view_statistic'),
(109, 'Can add Timeline Event', 28, 'add_timelineevent'),
(110, 'Can change Timeline Event', 28, 'change_timelineevent'),
(111, 'Can delete Timeline Event', 28, 'delete_timelineevent'),
(112, 'Can view Timeline Event', 28, 'view_timelineevent'),
(113, 'Can add Chairman', 29, 'add_chairman'),
(114, 'Can change Chairman', 29, 'change_chairman'),
(115, 'Can delete Chairman', 29, 'delete_chairman'),
(116, 'Can view Chairman', 29, 'view_chairman'),
(117, 'Can add Update History', 30, 'add_chairmanupdatehistory'),
(118, 'Can change Update History', 30, 'change_chairmanupdatehistory'),
(119, 'Can delete Update History', 30, 'delete_chairmanupdatehistory'),
(120, 'Can view Update History', 30, 'view_chairmanupdatehistory'),
(121, 'Can add Video', 31, 'add_galleryvideo'),
(122, 'Can change Video', 31, 'change_galleryvideo'),
(123, 'Can delete Video', 31, 'delete_galleryvideo'),
(124, 'Can view Video', 31, 'view_galleryvideo'),
(125, 'Can add Event/Seminar', 32, 'add_event'),
(126, 'Can change Event/Seminar', 32, 'change_event'),
(127, 'Can delete Event/Seminar', 32, 'delete_event'),
(128, 'Can view Event/Seminar', 32, 'view_event');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$LAKeasD3Yx88w5L8ahhKWl$3Je8IbE/DfkQDC8Vsx5L+L+Exs3+Byieh83+nmxfits=', '2026-02-15 23:39:59.198973', 1, 'admin', '', '', '', 1, 1, '2026-01-13 13:43:37.119420'),
(3, 'pbkdf2_sha256$600000$SakpnqLCkV9FRewFWqM6er$iOTmjX6JhP375bV+nu9ECx3/DC0xUUoONYnhcTgyd0k=', '2026-02-16 09:30:20.395114', 1, 'nksc_admin', '', '', 'nksc@gmail.com', 1, 1, '2026-02-16 09:29:51.667405');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_userdashboardmodule`
--

CREATE TABLE `dashboard_userdashboardmodule` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `app_label` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `column` int(10) UNSIGNED NOT NULL CHECK (`column` >= 0),
  `order` int(11) NOT NULL,
  `settings` longtext NOT NULL,
  `children` longtext NOT NULL,
  `collapsed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dashboard_userdashboardmodule`
--

INSERT INTO `dashboard_userdashboardmodule` (`id`, `title`, `module`, `app_label`, `user_id`, `column`, `order`, `settings`, `children`, `collapsed`) VALUES
(1, 'Quick links', 'jet.dashboard.modules.LinkList', NULL, 1, 0, 0, '{\"draggable\": false, \"deletable\": false, \"collapsible\": false, \"layout\": \"inline\"}', '[{\"title\": \"Return to site\", \"url\": \"/\"}, {\"title\": \"Change password\", \"url\": \"/admin/password_change/\"}, {\"title\": \"Log out\", \"url\": \"/admin/logout/\"}]', 0),
(2, 'Applications', 'jet.dashboard.modules.AppList', NULL, 1, 1, 0, '{\"models\": null, \"exclude\": [\"auth.*\"]}', '', 0),
(3, 'Administration', 'jet.dashboard.modules.AppList', NULL, 1, 2, 0, '{\"models\": [\"auth.*\"], \"exclude\": null}', '', 0),
(4, 'Recent Actions', 'jet.dashboard.modules.RecentActions', NULL, 1, 0, 1, '{\"limit\": 10, \"include_list\": null, \"exclude_list\": null, \"user\": null}', '', 0),
(5, 'Latest Django News', 'jet.dashboard.modules.Feed', NULL, 1, 1, 1, '{\"feed_url\": \"http://www.djangoproject.com/rss/weblog/\", \"limit\": 5}', '', 0),
(6, 'Support', 'jet.dashboard.modules.LinkList', NULL, 1, 2, 1, '{\"draggable\": true, \"deletable\": true, \"collapsible\": true, \"layout\": \"stacked\"}', '[{\"title\": \"Django documentation\", \"url\": \"http://docs.djangoproject.com/\", \"external\": true}, {\"title\": \"Django \\\"django-users\\\" mailing list\", \"url\": \"http://groups.google.com/group/django-users\", \"external\": true}, {\"title\": \"Django irc channel\", \"url\": \"irc://irc.freenode.net/django\", \"external\": true}]', 0),
(7, 'Application models', 'jet.dashboard.modules.ModelList', 'about', 1, 0, 0, '{\"models\": [\"about.*\"], \"exclude\": null}', '', 0),
(8, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'about', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"about.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(9, 'Application models', 'jet.dashboard.modules.ModelList', 'media_stuff', 1, 0, 0, '{\"models\": [\"media_stuff.*\"], \"exclude\": null}', '', 0),
(10, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'media_stuff', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"media_stuff.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(11, 'Application models', 'jet.dashboard.modules.ModelList', 'journal', 1, 0, 0, '{\"models\": [\"journal.*\"], \"exclude\": null}', '', 0),
(12, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'journal', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"journal.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(13, 'Application models', 'jet.dashboard.modules.ModelList', 'news', 1, 0, 0, '{\"models\": [\"news.*\"], \"exclude\": null}', '', 0),
(14, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'news', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"news.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(15, 'Application models', 'jet.dashboard.modules.ModelList', 'staff', 1, 0, 0, '{\"models\": [\"staff.*\"], \"exclude\": null}', '', 0),
(16, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'staff', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"staff.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(17, 'Application models', 'jet.dashboard.modules.ModelList', 'auth', 1, 0, 0, '{\"models\": [\"auth.*\"], \"exclude\": null}', '', 0),
(18, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'auth', 1, 1, 0, '{\"limit\": 10, \"include_list\": [\"auth.*\"], \"exclude_list\": null, \"user\": null}', '', 0),
(19, 'Quick links', 'jet.dashboard.modules.LinkList', NULL, 3, 0, 0, '{\"draggable\": false, \"deletable\": false, \"collapsible\": false, \"layout\": \"inline\"}', '[{\"title\": \"Return to site\", \"url\": \"/\"}, {\"title\": \"Change password\", \"url\": \"/admin/password_change/\"}, {\"title\": \"Log out\", \"url\": \"/admin/logout/\"}]', 0),
(20, 'Applications', 'jet.dashboard.modules.AppList', NULL, 3, 1, 0, '{\"models\": null, \"exclude\": [\"auth.*\"]}', '', 0),
(21, 'Administration', 'jet.dashboard.modules.AppList', NULL, 3, 2, 0, '{\"models\": [\"auth.*\"], \"exclude\": null}', '', 0),
(22, 'Recent Actions', 'jet.dashboard.modules.RecentActions', NULL, 3, 0, 1, '{\"limit\": 10, \"include_list\": null, \"exclude_list\": null, \"user\": null}', '', 0),
(23, 'Latest Django News', 'jet.dashboard.modules.Feed', NULL, 3, 1, 1, '{\"feed_url\": \"http://www.djangoproject.com/rss/weblog/\", \"limit\": 5}', '', 0),
(24, 'Support', 'jet.dashboard.modules.LinkList', NULL, 3, 2, 1, '{\"draggable\": true, \"deletable\": true, \"collapsible\": true, \"layout\": \"stacked\"}', '[{\"title\": \"Django documentation\", \"url\": \"http://docs.djangoproject.com/\", \"external\": true}, {\"title\": \"Django \\\"django-users\\\" mailing list\", \"url\": \"http://groups.google.com/group/django-users\", \"external\": true}, {\"title\": \"Django irc channel\", \"url\": \"irc://irc.freenode.net/django\", \"external\": true}]', 0),
(25, 'Application models', 'jet.dashboard.modules.ModelList', 'journal', 3, 0, 0, '{\"models\": [\"journal.*\"], \"exclude\": null}', '', 0),
(26, 'Recent Actions', 'jet.dashboard.modules.RecentActions', 'journal', 3, 1, 0, '{\"limit\": 10, \"include_list\": [\"journal.*\"], \"exclude_list\": null, \"user\": null}', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2026-01-13 21:25:21.585606', '1', 'Journal of Sociology - Volume 14 Issue 1&2, 2023', 2, '[{\"changed\": {\"fields\": [\"Pdf file\"]}}]', 7, 1),
(2, '2026-01-13 21:25:27.344397', '1', 'Journal of Sociology - Volume 14 Issue 1&2, 2023', 2, '[{\"changed\": {\"fields\": [\"Is published\"]}}]', 7, 1),
(3, '2026-01-14 14:59:33.044219', '2', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Pdf file\", \"Preview image\", \"Is published\"]}}]', 7, 1),
(4, '2026-01-14 14:59:44.396237', '3', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Pdf file\", \"Preview image\", \"Is published\"]}}]', 7, 1),
(5, '2026-01-14 14:59:52.584448', '5', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Pdf file\", \"Is published\"]}}]', 7, 1),
(6, '2026-01-14 15:00:02.286718', '4', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Preview image\", \"Is published\"]}}]', 7, 1),
(7, '2026-01-14 15:00:08.024223', '6', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Is published\"]}}]', 7, 1),
(8, '2026-01-14 21:21:17.975571', '3', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 2, '[{\"changed\": {\"fields\": [\"Short description\", \"Category\"]}}]', 14, 1),
(9, '2026-01-18 08:35:51.058378', '1', 'সেমিনার (Seminar)', 1, '[{\"added\": {}}]', 17, 1),
(10, '2026-01-18 08:37:30.086559', '1', 'Test', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Gallery Image\", \"object\": \"Test - Test\"}}, {\"added\": {\"name\": \"Gallery Image\", \"object\": \"Test - Image\"}}, {\"added\": {\"name\": \"Gallery Image\", \"object\": \"Test - Image\"}}]', 16, 1),
(11, '2026-01-18 08:53:07.345685', '1', 'Test', 2, '[{\"changed\": {\"fields\": [\"Status\", \"Is featured\"]}}]', 16, 1),
(12, '2026-01-18 09:24:42.079657', '1', 'Sociology Department', 1, '[{\"added\": {}}]', 20, 1),
(13, '2026-01-18 09:36:42.656553', '1', 'অধ্যাপক ড. তাইয়েবুর রহমান (অধ্যাপক (Professor))', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Staff Education\", \"object\": \"PhD - UK\"}}, {\"added\": {\"name\": \"Staff Experience\", \"object\": \"Dean at NKSC\"}}]', 19, 1),
(14, '2026-01-18 14:24:30.933461', '1', 'অধ্যাপক ড. তাইয়েবুর রহমান (পরিচালক)', 1, '[{\"added\": {}}]', 25, 1),
(15, '2026-01-24 11:48:25.866627', '1', 'Professor Dr. Taiabur Rahman\" - Director, Nazmul Karim Study Center', 1, '[{\"added\": {}}]', 29, 1),
(16, '2026-01-24 18:59:12.842350', '1', 'Professor Dr. Taiabur Rahman - Director, Nazmul Karim Study Center', 2, '[{\"changed\": {\"fields\": [\"Name (English)\"]}}]', 29, 1),
(17, '2026-01-24 19:08:38.589993', '1', 'Professor Dr. Taiabur Rahmanewe - Director, Nazmul Karim Study Center', 2, '[{\"changed\": {\"fields\": [\"Name (English)\"]}}]', 29, 1),
(18, '2026-01-24 19:10:57.966684', '1', 'Professor Dr. Taiabur Rahman - Director, Nazmul Karim Study Center', 2, '[{\"changed\": {\"fields\": [\"Name (English)\", \"Academic Qualifications\"]}}]', 29, 1),
(19, '2026-01-24 20:33:21.124235', '6', 'অধ্যাপক ড. তাইয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Bio\", \"Image\"]}}]', 25, 1),
(20, '2026-01-24 20:36:44.155285', '5', 'প্রতিষ্ঠার ইতিহাস (ইতিহাস (History))', 2, '[{\"changed\": {\"fields\": [\"Content\"]}}]', 23, 1),
(21, '2026-01-24 20:37:16.835316', '5', 'প্রতিষ্ঠার ইতিহাস (ইতিহাস (History))', 2, '[{\"changed\": {\"fields\": [\"Content\"]}}]', 23, 1),
(22, '2026-01-24 20:38:36.433139', '5', 'অধ্যাপক কামাল আহসান চৌধুরী (সাবেক পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Period\"]}}]', 25, 1),
(23, '2026-01-24 20:41:08.948027', '1', 'প্রতিষ্ঠার ইতিহাস (ইতিহাস (History))', 3, '', 23, 1),
(24, '2026-01-24 20:41:22.766457', '3', 'আমাদের অভিলক্ষ্য (অভিলক্ষ্য (Mission))', 3, '', 23, 1),
(25, '2026-01-24 20:42:08.386480', '2', 'অধ্যাপক ড. তাইয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 25, 1),
(26, '2026-01-30 15:26:24.132354', '1', 'সেমিনার (Seminar)', 2, '[{\"changed\": {\"fields\": [\"Description\"]}}]', 17, 1),
(27, '2026-01-30 15:30:45.874068', '1', 'Seminar (2018)', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar\"}}]', 16, 1),
(28, '2026-01-30 22:30:47.904463', '1', 'Video: Nazmul Karim memorial lecture', 1, '[{\"added\": {}}]', 31, 1),
(29, '2026-01-30 23:55:15.486527', '1', 'Video: Nazmul Karim memorial lecture', 2, '[{\"changed\": {\"fields\": [\"Video url\"]}}]', 31, 1),
(30, '2026-01-31 00:07:14.736030', '1', 'Video: Nazmul Karim memorial lecture', 2, '[{\"changed\": {\"fields\": [\"Video url\"]}}]', 31, 1),
(31, '2026-01-31 00:17:41.449644', '1', 'Video: Nazmul Karim memorial lecture', 2, '[{\"changed\": {\"fields\": [\"Video url\"]}}]', 31, 1),
(32, '2026-01-31 20:19:15.922777', '2', '04-09-2016 (2016)', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\"}}]', 16, 1),
(33, '2026-01-31 20:19:38.645638', '2', '04-09-2016 (2016)', 2, '[{\"changed\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\", \"fields\": [\"Is cover\"]}}, {\"changed\": {\"name\": \"Image\", \"object\": \"Image for 04-09-2016\", \"fields\": [\"Is cover\"]}}]', 16, 1),
(34, '2026-01-31 20:25:13.215247', '3', 'আয়োজিতনাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং) (2019)', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Video\", \"object\": \"Video: \\u09b8\\u09cd\\u09ae\\u09be\\u09b0\\u0995 \\u09ac\\u0995\\u09cd\\u09a4\\u09c3\\u09a4\\u09be\"}}, {\"added\": {\"name\": \"Video\", \"object\": \"Video: \\u09b8\\u09cd\\u09ae\\u09be\\u09b0\\u0995 \\u09ac\\u0995\\u09cd\\u09a4\\u09c3\\u09a4\\u09be\"}}, {\"added\": {\"name\": \"Video\", \"object\": \"Video: \\u09b8\\u09cd\\u09ae\\u09be\\u09b0\\u0995 \\u09ac\\u0995\\u09cd\\u09a4\\u09c3\\u09a4\\u09be\"}}, {\"added\": {\"name\": \"Video\", \"object\": \"Video: \\u09b8\\u09cd\\u09ae\\u09be\\u09b0\\u0995 \\u09ac\\u0995\\u09cd\\u09a4\\u09c3\\u09a4\\u09be\"}}, {\"added\": {\"name\": \"Video\", \"object\": \"Video: \\u09b8\\u09cd\\u09ae\\u09be\\u09b0\\u0995 \\u09ac\\u0995\\u09cd\\u09a4\\u09c3\\u09a4\\u09be\"}}]', 16, 1),
(35, '2026-01-31 20:25:31.726003', '3', 'আয়োজিতনাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং) (2019)', 2, '[{\"changed\": {\"fields\": [\"Status\", \"Is featured\"]}}]', 16, 1),
(36, '2026-01-31 20:26:06.435643', '3', 'আয়োজিতনাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং) (2019)', 2, '[{\"changed\": {\"fields\": [\"Status\"]}}]', 16, 1),
(37, '2026-01-31 21:08:22.733163', '4', 'Seminar (19-5-22) (2022)', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\"}}]', 16, 1),
(38, '2026-01-31 21:11:21.242633', '5', '26-5-14 Najmul Karim Sarok Boktita (R.C Majumder) (2025)', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}, {\"added\": {\"name\": \"Image\", \"object\": \"Image for 26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)\"}}]', 16, 1),
(39, '2026-01-31 21:27:01.052862', '6', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 2, '[{\"changed\": {\"fields\": [\"Preview image\"]}}]', 7, 1),
(40, '2026-01-31 21:38:25.372450', '6', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 3, '', 7, 1),
(41, '2026-01-31 21:38:25.376014', '5', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 3, '', 7, 1),
(42, '2026-01-31 21:38:25.379531', '4', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 3, '', 7, 1),
(43, '2026-01-31 21:38:25.380920', '3', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 3, '', 7, 1),
(44, '2026-01-31 21:38:25.381736', '2', 'Journal of Sociology - Volume 14 Issue 1&2, 2025', 3, '', 7, 1),
(45, '2026-01-31 21:38:25.382910', '1', 'Journal of Sociology - Volume 14 Issue 1&2, 2023', 3, '', 7, 1),
(46, '2026-01-31 22:03:45.590721', '7', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(47, '2026-01-31 22:40:56.896505', '8', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(48, '2026-01-31 22:44:11.789370', '9', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(49, '2026-01-31 23:24:55.390487', '10', 'COLLECTED SEMINAR PAPERS', 1, '[{\"added\": {}}]', 7, 1),
(50, '2026-02-01 06:43:48.465171', '11', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(51, '2026-02-01 06:50:11.319008', '12', 'A.K. NAZMUL KARIM MEMORIAL LECTURES', 1, '[{\"added\": {}}]', 7, 1),
(52, '2026-02-01 14:07:45.996488', '10', 'COLLECTED SEMINAR PAPERS', 2, '[]', 7, 1),
(53, '2026-02-01 14:09:38.430401', '7', 'JOURNAL OF SOCIOLOGY', 2, '[]', 7, 1),
(54, '2026-02-01 18:10:32.578260', '13', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(55, '2026-02-01 18:38:17.042105', '14', 'JOURCNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(56, '2026-02-01 19:07:58.092945', '15', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(57, '2026-02-01 19:15:04.994848', '16', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(58, '2026-02-01 19:18:37.300957', '17', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(59, '2026-02-01 19:24:04.334891', '18', 'JOURNAL OF SOCIOLOGY', 1, '[{\"added\": {}}]', 7, 1),
(60, '2026-02-01 19:24:29.287597', '14', 'JOURNAL OF SOCIOLOGY', 2, '[{\"changed\": {\"fields\": [\"Title\"]}}]', 7, 1),
(61, '2026-02-01 19:24:42.634475', '12', 'A.K. NAZMUL KARIM MEMORIAL LECTURES', 2, '[]', 7, 1),
(62, '2026-02-01 19:28:51.446642', '19', 'JOURNAL OF SOCIOLOGY-2013', 1, '[{\"added\": {}}]', 7, 1),
(63, '2026-02-01 19:37:33.560185', '20', 'JOURNAL OF SOCIOLOGY-2013', 1, '[{\"added\": {}}]', 7, 1),
(64, '2026-02-01 19:47:45.297347', '21', 'JOURNAL OF SOCIOLOGY-2016', 1, '[{\"added\": {}}]', 7, 1),
(65, '2026-02-01 19:50:25.652175', '22', 'JOURNAL OF SOCIOLOGY-2017', 1, '[{\"added\": {}}]', 7, 1),
(66, '2026-02-01 20:09:53.605082', '6', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 2, '[{\"changed\": {\"fields\": [\"Short description\", \"Event date\"]}}]', 14, 1),
(67, '2026-02-01 20:22:29.663057', '23', 'JOS-V-1-I-2-20019-Qamrul', 1, '[{\"added\": {}}]', 7, 1),
(68, '2026-02-02 07:34:11.661332', '5', 'Nazmul Karim Center', 1, '[{\"added\": {}}]', 20, 1),
(69, '2026-02-02 07:35:07.535598', '2', 'Nasrin Pathan (হিসাবরক্ষক (Accountant))', 1, '[{\"added\": {}}]', 19, 1),
(70, '2026-02-02 07:45:07.520817', '2', 'Nasrin Pathan (হিসাবরক্ষক (Accountant))', 2, '[{\"changed\": {\"fields\": [\"Profile image\"]}}]', 19, 1),
(71, '2026-02-02 07:46:14.248333', '1', 'অধ্যাপক ড. তাইয়েবুর রহমান (অধ্যাপক (Professor))', 2, '[{\"changed\": {\"fields\": [\"Cv\"]}}]', 19, 1),
(72, '2026-02-02 07:47:17.983331', '1', 'অধ্যাপক ড. তাইয়েবুর রহমান (অধ্যাপক (Professor))', 2, '[{\"changed\": {\"fields\": [\"Profile image\"]}}]', 19, 1),
(73, '2026-02-02 07:47:32.352378', '2', 'Nasrin Pathan (হিসাবরক্ষক (Accountant))', 2, '[{\"changed\": {\"fields\": [\"Profile image\"]}}]', 19, 1),
(74, '2026-02-02 09:34:53.841250', '24', 'Test Journal', 1, '[{\"added\": {}}]', 7, 1),
(75, '2026-02-02 09:45:06.713825', '2', 'Nasrin Pathan (প্রশাসনিক কর্মকর্তা (Administrative Officer))', 2, '[{\"changed\": {\"fields\": [\"Designation\"]}}]', 19, 1),
(76, '2026-02-02 09:47:39.476992', '1', 'অধ্যাপক ড. তৈয়েবুর রহমান (অধ্যাপক (Professor))', 2, '[{\"changed\": {\"fields\": [\"Name\", \"Meta title\"]}}]', 19, 1),
(77, '2026-02-02 09:48:27.208294', '1', 'অধ্যাপক ড. তৈয়েবুর রহমান (অধ্যাপক (Professor))', 2, '[{\"changed\": {\"fields\": [\"Department\"]}}]', 19, 1),
(78, '2026-02-02 09:48:58.451727', '2', 'Nasrin Pathan (প্রশাসনিক কর্মকর্তা (Administrative Officer))', 2, '[{\"changed\": {\"fields\": [\"Profile image\"]}}]', 19, 1),
(79, '2026-02-02 09:49:29.274319', '1', 'অধ্যাপক ড. তৈয়েবুর রহমান (অধ্যাপক (Professor))', 2, '[{\"changed\": {\"fields\": [\"Profile image\"]}}]', 19, 1),
(80, '2026-02-02 09:51:25.618109', '6', 'অধ্যাপক ড. তৈয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Name\"]}}]', 25, 1),
(81, '2026-02-02 09:51:29.218752', '6', 'অধ্যাপক ড. তৈয়েবুর রহমান (পরিচালক)', 2, '[]', 25, 1),
(82, '2026-02-02 09:53:44.072766', '24', 'Test Journal', 3, '', 7, 1),
(83, '2026-02-02 09:54:18.303875', '2', 'অধ্যাপক ড. তৈয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Name\"]}}]', 25, 1),
(84, '2026-02-02 09:54:36.055750', '4', 'অধ্যাপক ড. নেহাল  করিম (সাবেক পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Name\"]}}]', 25, 1),
(85, '2026-02-02 09:54:43.724151', '3', 'অধ্যাপক ড. আ. ক. ম. জামাল উদ্দীন (সাবেক পরিচালক)', 3, '', 25, 1),
(86, '2026-02-02 09:55:01.101422', '6', 'অধ্যাপক ড. তৈয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Display order\"]}}]', 25, 1),
(87, '2026-02-02 09:55:01.105962', '5', 'অধ্যাপক কামাল আহসান চৌধুরী (সাবেক পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Display order\"]}}]', 25, 1),
(88, '2026-02-02 09:55:01.107623', '7', 'অধ্যাপক ড. আ. ক. ম. জামাল উদ্দীন (সাবেক পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Display order\"]}}]', 25, 1),
(89, '2026-02-02 09:55:55.222055', '8', 'অধ্যাপক ডা.সালমা বেগম (পরিচালক)', 1, '[{\"added\": {}}]', 25, 1),
(90, '2026-02-02 09:57:34.700594', '8', 'অধ্যাপক ডা.সালমা বেগম (পরিচালক)', 2, '[]', 25, 1),
(91, '2026-02-02 10:07:35.610378', '5', '২০১৩ - নতুন পরিচালক', 2, '[{\"changed\": {\"fields\": [\"Description\"]}}]', 28, 1),
(92, '2026-02-02 10:13:11.981322', '3', 'নাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং) (2019)', 2, '[{\"changed\": {\"fields\": [\"Title\", \"Description\", \"Short description\"]}}]', 16, 1),
(93, '2026-02-02 10:16:41.166920', '4', 'Seminar (19-5-22) (2022)', 2, '[{\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\"}}]', 16, 1),
(94, '2026-02-02 10:17:11.194662', '4', 'Seminar (19-5-22) (2022)', 2, '[{\"added\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\"}}, {\"changed\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\", \"fields\": [\"Display order\"]}}, {\"changed\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\", \"fields\": [\"Display order\"]}}, {\"changed\": {\"name\": \"Image\", \"object\": \"Image for Seminar (19-5-22)\", \"fields\": [\"Display order\"]}}]', 16, 1),
(95, '2026-02-02 10:18:00.556809', '4', 'Seminar (19-5-22) (2022)', 2, '[]', 16, 1),
(96, '2026-02-02 10:18:30.241543', '4', 'Seminar (19-5-22) (2022)', 3, '', 16, 1),
(97, '2026-02-15 23:40:59.085068', '10', 'COLLECTED SEMINAR PAPERS', 2, '[{\"changed\": {\"fields\": [\"Pdf file\"]}}]', 7, 1),
(98, '2026-02-15 23:43:45.636295', '8', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(99, '2026-02-15 23:43:45.637872', '7', 'নতুন গবেষণা প্রকল্প', 3, '', 14, 1),
(100, '2026-02-15 23:43:45.639043', '6', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(101, '2026-02-15 23:43:45.640150', '5', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(102, '2026-02-15 23:43:45.642431', '4', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(103, '2026-02-15 23:43:45.644538', '3', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(104, '2026-02-15 23:43:45.645703', '1', 'নতুন গবেষণা প্রকল্প: গ্রামীণ বাংলাদেশের সামাজিক পরিবর্তন', 3, '', 14, 1),
(105, '2026-02-15 23:58:01.438014', '2', 'অধ্যাপক ড. তৈয়েবুর রহমান (পরিচালক)', 2, '[{\"changed\": {\"fields\": [\"Image\"]}}]', 25, 1),
(106, '2026-02-16 09:31:05.623809', '10', 'COLLECTED SEMINAR PAPERS', 2, '[{\"changed\": {\"fields\": [\"Pdf file\"]}}]', 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(23, 'about', 'aboutsection'),
(24, 'about', 'contactinfo'),
(25, 'about', 'director'),
(26, 'about', 'facility'),
(27, 'about', 'statistic'),
(28, 'about', 'timelineevent'),
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(11, 'dashboard', 'userdashboardmodule'),
(10, 'jet', 'bookmark'),
(9, 'jet', 'pinnedapplication'),
(7, 'journal', 'journal'),
(17, 'media_stuff', 'gallerycategory'),
(16, 'media_stuff', 'galleryevent'),
(18, 'media_stuff', 'galleryimage'),
(15, 'media_stuff', 'gallerystat'),
(31, 'media_stuff', 'galleryvideo'),
(32, 'news', 'event'),
(14, 'news', 'news'),
(13, 'news', 'newscategory'),
(12, 'publications', 'publication'),
(6, 'sessions', 'session'),
(20, 'staff', 'department'),
(19, 'staff', 'staff'),
(21, 'staff', 'staffeducation'),
(22, 'staff', 'staffexperience'),
(29, 'user_management', 'chairman'),
(30, 'user_management', 'chairmanupdatehistory'),
(8, 'user_management', 'userprofile');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-01-13 13:43:20.371638'),
(2, 'auth', '0001_initial', '2026-01-13 13:43:20.569956'),
(3, 'admin', '0001_initial', '2026-01-13 13:43:20.615662'),
(4, 'admin', '0002_logentry_remove_auto_add', '2026-01-13 13:43:20.629310'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2026-01-13 13:43:20.635507'),
(6, 'contenttypes', '0002_remove_content_type_name', '2026-01-13 13:43:20.665711'),
(7, 'auth', '0002_alter_permission_name_max_length', '2026-01-13 13:43:20.687190'),
(8, 'auth', '0003_alter_user_email_max_length', '2026-01-13 13:43:20.697932'),
(9, 'auth', '0004_alter_user_username_opts', '2026-01-13 13:43:20.701839'),
(10, 'auth', '0005_alter_user_last_login_null', '2026-01-13 13:43:20.717442'),
(11, 'auth', '0006_require_contenttypes_0002', '2026-01-13 13:43:20.718993'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2026-01-13 13:43:20.723882'),
(13, 'auth', '0008_alter_user_username_max_length', '2026-01-13 13:43:20.734689'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2026-01-13 13:43:20.746765'),
(15, 'auth', '0010_alter_group_name_max_length', '2026-01-13 13:43:20.758681'),
(16, 'auth', '0011_update_proxy_permissions', '2026-01-13 13:43:20.764774'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2026-01-13 13:43:20.775692'),
(18, 'journal', '0001_initial', '2026-01-13 13:43:20.786600'),
(19, 'sessions', '0001_initial', '2026-01-13 13:43:20.811655'),
(20, 'user_management', '0001_initial', '2026-01-13 13:43:20.845188'),
(21, 'user_management', '0002_remove_userprofile_bio_userprofile_role_and_more', '2026-01-13 13:43:20.872879'),
(22, 'jet', '0001_initial', '2026-01-13 21:42:18.735787'),
(23, 'jet', '0002_delete_userdashboardmodule', '2026-01-13 21:42:18.737201'),
(24, 'jet', '0003_auto_20201228_1540', '2026-01-13 21:42:18.738233'),
(25, 'jet', '0004_auto_20201228_1802', '2026-01-13 21:42:18.739232'),
(26, 'jet', '0001_squashed_0004_auto_20201228_1802', '2026-01-13 21:42:18.742305'),
(27, 'dashboard', '0001_initial', '2026-01-13 21:44:33.754125'),
(28, 'dashboard', '0002_auto_20201228_1929', '2026-01-13 21:44:33.755696'),
(29, 'dashboard', '0001_squashed_0002_auto_20201228_1929', '2026-01-13 21:44:33.758216'),
(30, 'journal', '0002_alter_journal_options', '2026-01-14 14:20:45.038212'),
(31, 'journal', '0003_alter_journal_options', '2026-01-14 14:20:45.042348'),
(32, 'publications', '0001_initial', '2026-01-14 14:23:06.443493'),
(33, 'news', '0001_initial', '2026-01-14 15:33:35.986258'),
(34, 'news', '0002_alter_news_content_alter_news_short_description', '2026-01-14 18:50:51.815200'),
(36, 'staff', '0001_initial', '2026-01-18 09:12:36.546638'),
(37, 'staff', '0002_alter_department_color', '2026-01-18 09:25:25.737851'),
(38, 'staff', '0003_alter_department_color', '2026-01-18 09:30:40.568062'),
(39, 'staff', '0004_alter_department_color', '2026-01-18 09:31:32.685929'),
(40, 'about', '0001_initial', '2026-01-18 11:45:44.559252'),
(41, 'user_management', '0003_chairman_chairmanupdatehistory', '2026-01-24 11:19:18.481436'),
(42, 'user_management', '0004_alter_chairman_options_remove_chairman_cv_pdf_and_more', '2026-01-24 11:25:52.399480'),
(43, 'user_management', '0005_alter_chairman_bio_english', '2026-01-24 11:47:04.838590'),
(44, 'dashboard', '0003_alter_userdashboardmodule_id', '2026-01-30 14:45:11.415654'),
(45, 'jet', '0005_alter_bookmark_id_alter_pinnedapplication_id', '2026-01-30 14:45:11.451315'),
(46, 'media_stuff', '0001_initial', '2026-01-30 21:03:29.000000'),
(47, 'news', '0003_event', '2026-02-16 00:31:06.612846');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('axzh2v4gx4szsvzgskqqmmnyiz1dm4qk', '.eJxVjDsOwjAQBe_iGlle_2JT0nMGa9fe4ABypDipEHeHSCmgfTPzXiLhtta0dV7SVMRZgDj9boT5wW0H5Y7tNss8t3WZSO6KPGiX17nw83K4fwcVe_3WwYZRgxlyVEFZr4pmp2NEdqSgZODRWw-WQiA1RMfWEIP3BnU2HhyJ9we4wjbf:1vlpjE:IUdLW_KLu2mOuNZkCuhS_ODp90qjwqiwQr32F0qk4V4', '2026-02-13 14:44:08.522212'),
('itzsk8xot7u27pwu2xofeia8dkupb9wt', '.eJxVjDsOwjAQBe_iGlle_2JT0nMGa9fe4ABypDipEHeHSCmgfTPzXiLhtta0dV7SVMRZgDj9boT5wW0H5Y7tNss8t3WZSO6KPGiX17nw83K4fwcVe_3WwYZRgxlyVEFZr4pmp2NEdqSgZODRWw-WQiA1RMfWEIP3BnU2HhyJ9we4wjbf:1vflqG:qAue8waqueN_AevJWMtoz_QFV4BBk4zSyK6RkA7tzD4', '2026-01-27 21:22:20.691022'),
('mib5jy19on0f49q2wtsmv6zzegkky174', '.eJxVjDsOwjAQBe_iGlle_2JT0nMGa9fe4ABypDipEHeHSCmgfTPzXiLhtta0dV7SVMRZgDj9boT5wW0H5Y7tNss8t3WZSO6KPGiX17nw83K4fwcVe_3WwYZRgxlyVEFZr4pmp2NEdqSgZODRWw-WQiA1RMfWEIP3BnU2HhyJ9we4wjbf:1vmUv1:bSRTPjPsoQSt1RGywa3CQ2O_GWE8-QPls4sYSIaoF8o', '2026-02-15 10:43:03.091682'),
('p9wgb6x7rc02l63bmfzyv86i95cypcwv', '.eJxVjDsOwjAQBe_iGlle_2JT0nMGa9fe4ABypDipEHeHSCmgfTPzXiLhtta0dV7SVMRZgDj9boT5wW0H5Y7tNss8t3WZSO6KPGiX17nw83K4fwcVe_3WwYZRgxlyVEFZr4pmp2NEdqSgZODRWw-WQiA1RMfWEIP3BnU2HhyJ9we4wjbf:1vrliZ:I_a4fpiNS-DkhvH7gmWgp3zHp2YP6GCYz4lcUPOa9Uc', '2026-03-01 23:39:59.200956'),
('rokb3rnu0odusdnlshvkvkmgh7bi2yrn', '.eJxVjEEOwiAQRe_C2hDKTAu4dO8ZyDBMpWpoUtqV8e7apAvd_vfef6lI21ri1mSJU1ZnBer0uyXih9Qd5DvV26x5rusyJb0r-qBNX-csz8vh_h0UauVbm-SHkQUtcTDkQJwwJiQbnEXqwHnIKds0BgreIJjBGYauBzbW92jV-wPpkjcz:1vruvs:MhKAJJesa55CRysCVwGiGojsnOqoNdMIpjkeeU2toM0', '2026-03-02 09:30:20.397886');

-- --------------------------------------------------------

--
-- Table structure for table `jet_bookmark`
--

CREATE TABLE `jet_bookmark` (
  `id` bigint(20) NOT NULL,
  `url` varchar(200) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_add` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jet_pinnedapplication`
--

CREATE TABLE `jet_pinnedapplication` (
  `id` bigint(20) NOT NULL,
  `app_label` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date_add` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `journal_journal`
--

CREATE TABLE `journal_journal` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `volume` varchar(50) NOT NULL,
  `year` int(10) UNSIGNED NOT NULL CHECK (`year` >= 0),
  `issue` varchar(100) NOT NULL,
  `editor` varchar(255) NOT NULL,
  `issn` varchar(50) NOT NULL,
  `doi_url` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `pages` int(10) UNSIGNED NOT NULL CHECK (`pages` >= 0),
  `file_size_mb` decimal(5,2) NOT NULL,
  `pdf_file` varchar(100) NOT NULL,
  `preview_image` varchar(100) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal_journal`
--

INSERT INTO `journal_journal` (`id`, `title`, `volume`, `year`, `issue`, `editor`, `issn`, `doi_url`, `description`, `pages`, `file_size_mb`, `pdf_file`, `preview_image`, `is_published`, `created_at`) VALUES
(7, 'JOURNAL OF SOCIOLOGY', 'Volume 14 Issue 1&2, 2023', 2023, 'Issue 1&2, 2023', 'Professor Dr. A K M Jamal Uddin', 'ISSN: 1813-2871', 'https://www.doi.org/10.62272/JS.V14', 'Nazmul Karim Study Center\'s official sociology journal covering contemporary social issues and research', 254, 6.00, 'journals/Journal-Final-24-11-24.pdf', 'journal_previews/JOS.png', 1, '2026-01-31 22:03:45.578278'),
(8, 'JOURNAL OF SOCIOLOGY', 'Volume 13', 2022, 'Issue 1, January - June, 2022', 'Professor Dr. A K M Jamal Uddin', 'ISSN: 1813-2871', '', 'This study investigates the concept of social media use and its effect\r\non political interest, political participation, and political information\r\nefficacy among rural and urban youths in Bangladesh.The study sought\r\nto establish the relationship between the use of social and the concepts\r\nof political interest, political participation, and political information\r\nefficacy. The analysis of the study is based on the online survey\r\nconducted among the youths of Bangladesh. The result of the study\r\nrejects the hypothesis that political interest is a stirring factor\r\npositively associates with social media. The study has enhanced the\r\nprevious theoretical notion of the association between political\r\ninformation efficacy and social media use in the case of rural youths.\r\nHowever, the result shows no association between the urban youths’\r\npolitical information efficacy and their use of social media. Rural\r\nyouths’ social media use showsa strong relationship with online\r\npolitical participation. Conversely, their urban counterpart shows no\r\nrelationship. No significant association is found between offline\r\npolitical participation and youths’ use of social media. The study\r\nestablishes evidence that rural youths are more politically engaged\r\nthan their urban counterpart.', 200, 6.00, 'journals/Volume_13_Issue_1_January_-_June_2022.pdf', 'journal_previews/JOS2.png', 1, '2026-01-31 22:40:56.893669'),
(9, 'JOURNAL OF SOCIOLOGY', 'Volume 13', 2022, 'Issue 2,', 'Professor Dr. A K M Jamal Uddin', 'ISSN: 1813-2871', '', 'The first issue of Journal of Sociology has come out. I am very pleased to say\r\nthat the editorial board took decision to bring out the first issue on time,\r\ntherefore, more articles were invited from the teachers, researchers and scholars.\r\nAt the call, the center received a huge number of articles, and out of those, some\r\nwere sorted out for review and only recommended articles are being published.\r\nFurther, like previous issues also it took much time to bring out the current issue\r\non time. Because it was very difficult to get the articles reviewed by the\r\nreviewers. On the other hand, some reviewers took much time to revise and\r\ncorrect the articles as per suggessions of the reviewers. Like previous issue, the\r\njournal is bilingual with resourceful articles. In this volume altogether 13 articles\r\nhave been published, out of which 6 are in Bangla and 7 are in English. We hope\r\nthat this issue will be readable and helpful for both academics and researchers.\r\nOnce again, I am thankful to the members of the editorial board, reviewers, and\r\ncontributors and especially to Prof. Dr. Md. Akhtaruzzaman, the Vice-\r\nChancellor of the University of Dhaka for his generous cooperation.', 240, 6.00, 'journals/Volume_13_Issue_2_July-_December_2022.pdf', 'journal_previews/JOS3.png', 1, '2026-01-31 22:44:11.787117'),
(10, 'COLLECTED SEMINAR PAPERS', 'Nill', 2019, 'Nill', 'Dr. Nehal Karim', '', '', 'This volume is a compilation of eassys which were presented\r\na t the Nazmul Karim Study Centre, University o f Dhaka by\r\nthe different scholars and academics of the country in\r\ndifferent times. All together 1 6 (sixteen) articles are\r\ncompiled here and out of this figure, only two are i n English.\r\nThe intension o f compilation o f all seminar papers that the\r\nreaders and researchers would b e benefitted t o get those i n\r\none fold. No doubt that, articles which are compiled here\r\nare from the top academics and scholars of the country.\r\nTherefore, definitely all papers are verty thoughtful and\r\nthese will reflect their thoughts and philosophy of our\r\ncontemporary society.', 304, 10.00, 'journals/JOS-Collected_Seminar_Papers_9dLra3x.pdf', 'journal_previews/Collected-Seminar.png', 1, '2026-01-31 23:24:55.382034'),
(11, 'JOURNAL OF SOCIOLOGY', 'Volume 1', 2011, 'Number 3 ,', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813-2871', '', 'The paper focuses on the role of rituals in modern state\r\nsetting. Considering the assumption that the role of\r\nrituals is being changed\r\ndue to increasing\r\nsecularization and declining role of religion in modern\r\nsocieties and, the paper examines the role of state\r\nrituals in determining different aspects of modern social\r\nlife. The paper looks into the various features of rituals\r\nincluding its role for creating and maintaining identity.\r\nsymbolizing solidarity, legitimising ruling elite,\r\nachieving or controlling power, promoting alternative\r\nsources of power in modern states.', 102, 6.00, 'journals/JOSV-1.pdf', 'journal_previews/JOS-V-1.png', 1, '2026-02-01 06:43:48.462186'),
(12, 'A.K. NAZMUL KARIM MEMORIAL LECTURES', 'Volume - 1', 2019, 'None', 'Professor M. Afsaruddin', '', '', 'A.K. NAZMUL KARIM MEMORIAL LECTURES Committee', 213, 90.00, 'journals/Nazmul_Karim_Collected_Memorial.pdf', 'journal_previews/Nazmul_Karim_Memorial.png', 1, '2026-02-01 06:50:11.317308'),
(13, 'JOURNAL OF SOCIOLOGY', 'Volume 5', 2013, 'nil', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813-2871', '', 'TRACT\r\nThe study reveals how profoundly anthropology investigates and embraces vulnerability, risk-hazard and disaster analysis by introducing different approaches\r\nin the human history. Contemporary anthropology has most indelibly marked by\r\nnatural catastrophes, political strife, displacement and resettlement, development\r\nprojects, public health crises etc driven by a global environment concern. Anthropology, however, examines its subjects as holistically and cross-culturally,\r\ngiving its spotlight on the broader context of human interactions in the present,\r\nhistorical, and prehistorically time, as well as the relationships between social,\r\ncultural, institutional, technical, ecological, political, physical, education, economic, institutional, and environment domains. It, moreover, shows the framing of vulnerability by scrutinizing internal, external dynamics as well as framing of\r\ndisaster by exploring local, national and international factors. Besides, in its\r\napproach to studying disasters, primary focus has given on progression of vulnerability causing disaster both influence and are product of human actions,\r\nrather than representing simply isolated, spontaneous, and unpredictable events. In addition, it scrutinizes the complex interrelationships between human, culture, and\r\ntheir environment from the human actions that might cause or influence the severity\r\nof disaster resulted of intensifying human vulnerability. Finally and most\r\nimportantly the following approaches of disaster research in anthropology have\r\nbeen developed i.e.- a) Historical approach b) A Behavioral and organizational\r\nresponse approach) Political Ecological approach d) A social change approach e) A\r\npolitical economic approach f) Applied anthropological approach.', 280, 140.00, 'journals/JOS_V-5_I-2_JAN-JUNE_2013.pdf', 'journal_previews/JOS_PkuRIRn.png', 1, '2026-02-01 18:10:32.575085'),
(14, 'JOURNAL OF SOCIOLOGY', 'Volume -4', 2012, 'Issue-2', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813-2871', '', 'Every community of the world. especially those dependent on the nature\r\ntheir livelihood, makes some innovations to deal with the challenges of nature\r\nconservation and disaster management in the course of making a living in a\r\nparticular environment. These innovations are particularly evident in their\r\nagricultural production, food preservation and storage, health care, and in\r\ndealing with natural disasters. Moreover, these innovations covers all forms of\r\nknowledge - technologies, know-how, skills, practices and beliefs - that enable\r\nthe community to achieve stable livelihoods in their environment (UNEPР, 2008).\r\nAccording to the Third Assessment Report of IPCC, South Asia is the most\r\nvulnerable region of the world to climate change impacts (McCarthy et al.,\r\n2001). The international community also recognizes that Bangladesh ranks high\r\nin the list of most vulnerable countries on earth (Ahmed, 2006). The core\r\nelements of its vulnerability are primarily contextual. It is probably the only\r\ncountry in the world with most of its territory lying on the deltaic flood-plain of\r\nthree major rivers and their numerous tributaries. Bangladesh lies in a very\r\nactive cyclone corridor that transects the Bay of Bengal. The societal exposure to\r\ncyclonic risks is further enhanced by its very high population and population\r\ndensity. Very low levels of development and high levels of poverty add to the\r\nsocial sensitivity to external hazards (Agrawala, Ota. Ahmed. Smith and Aalst,\r\n2003).Most of the developed countries in the world face environmental\r\nchallenges with efficient scientific technologies. But in most of the\r\nunderdeveloped and developing countries, like Bangladesh, people are helpless', 267, 120.00, 'journals/Journal_2012.pdf', 'journal_previews/JOS-IS-1813-2012.png', 1, '2026-02-01 18:38:17.038634'),
(15, 'JOURNAL OF SOCIOLOGY', 'Volume 10', 2019, 'Issue-2', 'Dr. Nehal Karim', 'ISSN: 1813-2871', '', 'It has become a common practice that the Nazmul Karim Study Center is again\r\nlate in bringing out the Journal of Sociology. Indeed it is very tough to publish\r\nany research journal for many reasons. Firstly, one has to get quality research\r\npapers, secondly, the reviewer takes time to review and thirdly, the authors take\r\ntime to modify as per suggestions.\r\nAll those issues are not only the problems for the Journal of Sociology also for\r\nevery Journal. The center received a good number of articles out of these some\r\nwere selected for review and only recommended articles are published in this\r\njournal.\r\nLike previous issue the journal is bilingual with qualitative articles .In this\r\nvolume altogether 9 articles are published out of which 5 are in Bangla and 4 are\r\nin English. The editorial board thinks that the present issue will be readable and\r\nhelpful for both academies and researchers.', 150, 90.00, 'journals/JOS-V-10-I-2-July-Dec2019.pdf', 'journal_previews/JOS-2012.png', 1, '2026-02-01 19:07:58.091749'),
(16, 'JOURNAL OF SOCIOLOGY', 'Volume 1', 2005, 'Number 1', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813 2871', '', 'Profesor Quamrul Ahsan Chowdhury\r\nChairman\r\nDepartment of Sociology, University of Dhaka\r\nand\r\nDirector\r\nNazmul Karim Study Centre University of Dhaka', 188, 90.00, 'journals/JOS-V-1N-1_June-1-2005.pdf', 'journal_previews/JOS-2005.png', 1, '2026-02-01 19:15:04.993259'),
(17, 'JOURNAL OF SOCIOLOGY', 'Volume 4', 2012, 'Issue 1', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813-2871', '', 'The paper is an attempt to examine and analyze two aspects of medical\r\nsociology i.e. (a) development of medicine in different phases of human\r\ncivilizations and (b) health seeking practices followed by human being in\r\ndifferent phases of civilizations. Materials for this study has been collected\r\nby careful study of relevant research materials associated with the\r\ndevelopment of medicine and health seeking behavior in primitive and\r\nmedieval civilizations. Comparative technique has been carefully applied to\r\ninvestigate and reveal the contributions of different peoples in the\r\ndevelopment of medicine in different phases of human history. The paper\r\nends with some concluding remarks of the author.', 236, 200.00, 'journals/JOS-V4_I1-Jan-June_2012.pdf', 'journal_previews/June-20212.png', 1, '2026-02-01 19:18:37.299956'),
(18, 'JOURNAL OF SOCIOLOGY', 'Volume 10', 2018, 'Issues-2', 'Dr. Nehal Karim', 'ISSN: 1813-2871', '', 'It has become a common practice that the Nazmul Karim Study Center is again\r\nlate in bringing out the Journal of Sociology. Indeed it is very tough to publish\r\nany research journal for many reasons. Firstly, one has to get quality research\r\npapers, secondly, the reviewer takes time to review and thirdly, the authors take\r\ntime to modify as per suggestions.\r\nAll those issues are not only the problems for the Journal of Sociology also for\r\nevery Journal. The center received a good number of articles out of these some\r\nwere selected for review and only recommended articles are published in this\r\njournal.\r\nLike previous issue the journal is bilingual with qualitative articles .In this\r\nvolume altogether 9 articles are published out of which 5 are in Bangla and 4 are\r\nin English. The editorial board thinks that the present issue will be readable and\r\nhelpful for both academies and researchers.', 150, 90.00, 'journals/JOS-V-10-I-2-July-Dec-2019.pdf', 'journal_previews/JOS-2019.png', 1, '2026-02-01 19:24:04.321752'),
(19, 'JOURNAL OF SOCIOLOGY-2013', 'Volume-5', 2013, 'Issue-1', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813-2871', '', 'This article offers a reading of Edward Said\'s legacy to accord the prominence and\r\nevaluation to his insights and of his contribution in postcolonial studies. It engages\r\nSaid\'s insights on international politics, guidance to anthropological studies, and\r\nphilosophy on intellectual vocations. It seeks to highlight the works of Edward Said\r\nand its implications in the field of international relations in light of present political\r\ncontext. It exposes the appropriateness of Said\'s opinion regarding anthropologists\'\r\nworks. It also contextualizes Said\'s works in light of his vision and life as an\r\nintellectual. Finally it will show that because of Said', 220, 100.00, 'journals/JOS_V-5_I-1_Jan-June_2013.pdf', 'journal_previews/JOS-2013.png', 1, '2026-02-01 19:28:51.445640'),
(20, 'JOURNAL OF SOCIOLOGY-2013', 'Volume-5', 2013, 'Issues-2', 'Professor Quamrul Ahsan Chowdhury', '', '', 'The study reveals how profoundly anthropology investigates and embraces vulnerability, risk-hazard and disaster analysis by introducing different approaches\r\nin the human history. Contemporary anthropology has most indelibly marked by\r\nnatural catastrophes, political strife, displacement and resettlement, development\r\nprojects, public health crises etc driven by a global environment concern. Anthropology, however, examines its subjects as holistically and cross-culturally,\r\ngiving its spotlight on the broader context of human interactions in the present,\r\nhistorical, and prehistorically time, as well as the relationships between social,\r\ncultural, institutional, technical, ecological, political, physical, education, economic, institutional, and environment domains. It, moreover, shows the framing of vulnerability by scrutinizing internal, external dynamics as well as framing of\r\ndisaster by exploring local, national and international factors. Besides, in its\r\napproach to studying disasters, primary focus has given on progression of vulnerability causing disaster both influence and are product of human actions,\r\nrather than representing simply isolated, spontaneous, and unpredictable events. In addition, it scrutinizes the complex interrelationships between human, culture, and\r\ntheir environment from the human actions that might cause or influence the severity\r\nof disaster resulted of intensifying human vulnerability. Finally and most\r\nimportantly the following approaches of disaster research in anthropology have\r\nbeen developed i.e.- a) Historical approach b) A Behavioral and organizational\r\nresponse approach) Political Ecological approach d) A social chan', 266, 120.00, 'journals/JOS_-Complete-JAN-JUNE_2013.pdf', 'journal_previews/JOS-2013-jan-June.png', 1, '2026-02-01 19:37:33.557176'),
(21, 'JOURNAL OF SOCIOLOGY-2016', 'Volume-7', 2016, 'Issue-2', 'Professor Nehal Karim', 'ISSN: 1813-2871', '', 'The second issue Journal of Sociology has come out. I am very pleased to say\r\nthat the editorial board took decision to bring out the second issue ontime,\r\ntherefore, more articles were invited from the teachers, researchers and scholars.\r\nAt the call, the center received a huge number of articles, and out of those, some\r\nwere sorted out for review and only recommended articles are being published.\r\nIt should be noted here that two very old published articles by two learned\r\nscholars of this sub-continent are included for the new generation readers and\r\nresearchers for enrichment of their knowledge.\r\nFurther, like the previous issue also it took much time to bring out the current\r\nissue ontime. Because it was very difficult to get the articles reviewed by the\r\nreviewers. On the other hand, some reviewers took much time to review the\r\narticles. Besides this, authors also took much time to revise and correct the\r\narticles as per suggestions of the reviewers. Like previous issues, the journal is\r\nbilingual with resourceful articles. In this volume altogether 16 articles have\r\nbeen published, out of which 7 are in Bangla and 9 in English. We hope that this\r\nissue will be readable and helpful for both academics and researchers. Once\r\nagain, I am thankful to the members of the editorial board, reviewers,\r\ncontributors, and especially to Prof. Dr. AASM Arefin Siddique, the ViceChancellor of the University of Dhaka for his generous cooperation.', 239, 120.00, 'journals/JOS-V-7-I-2_July_-Dec_2016.pdf', 'journal_previews/JOS-2016.png', 1, '2026-02-01 19:47:45.283899'),
(22, 'JOURNAL OF SOCIOLOGY-2017', 'Volume-9', 2017, 'issue-1', 'Dr. Nehal Karim', 'ISSN: 1813-2871', '', 'It has become a common practice that the Nazmul Karim Study Center is again\r\nlate in bringing out the Journal of Sociology. Indeed it is very tough to publish\r\nany research journal for many reasons. Firstly, to get quality research papers, secondly, the reviewer takes time to review and thirdly, the authors take time to modify as per suggestions.\r\nAll those issues are not only the problems for the Journal of Sociology also for\r\nevery Journal. The center received a good number of articles out of there some\r\nwere selected for review and only recommended articles are published in this journal.\r\nLike previous issue the journal is bilingual with qualitative articles .In this\r\nvolume altogether 12 articles are published out of which 6 are in Bangla and 6\r\nare in English. The editorial board thinks that the present issue will be readable\r\npaper and helpful for both academies and researchers.\r\nLastly on behalf of the editorial board. I welcome Dr. Fatema Rezina Iqbal\r\nProfessor of Sociology, University of Dhaka as member of the editorial board.', 164, 120.00, 'journals/JOS-V-9_I-1_Jan-July-2017.pdf', 'journal_previews/JOS-2017.png', 1, '2026-02-01 19:50:25.638959'),
(23, 'JOS-V-1-I-2-20019-Qamrul', 'V-1', 2019, 'I-2', 'Professor Quamrul Ahsan Chowdhury', 'ISSN 1813 -2871', '', 'Globalization, a historical process, is the result o f human innovation and\r\ntechnological progress. Its’ economic benefits are; faster growth, cheaper\r\nimports, greater exports and investment and new technologies, that few countries\r\nhave enjoyed in recent years. Despite all the gains that the Globalization brings,\r\nit has also created losers- mostly developing countries. The significance o f\r\nGlobalization differs for individuals, groups and countries. The main focus o f the\r\npaper is that, the impact o f various global flows varies depending on the stages\r\no f economic development o f a country, its access to technology, strength o f its\r\nstate and democratic institutions, and cultural characteristics. This paper, aims\r\nto show the impact o f Globalization on the developing countries focusing on\r\ntrade, labor, migration flows and socio-cultural context.', 215, 120.00, 'journals/JOS-V-1-I-2-20019-Qamrul.pdf', 'journal_previews/2019-JOS.png', 1, '2026-02-01 20:22:29.663057');

-- --------------------------------------------------------

--
-- Table structure for table `media_stuff_gallerycategory`
--

CREATE TABLE `media_stuff_gallerycategory` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media_stuff_gallerycategory`
--

INSERT INTO `media_stuff_gallerycategory` (`id`, `name`, `slug`, `description`, `display_order`) VALUES
(1, 'seminar', 'seminar', 'Moments from seminars, research activities, workshops, and academic gatherings at Nazmul Karim Study Center', 0);

-- --------------------------------------------------------

--
-- Table structure for table `media_stuff_galleryevent`
--

CREATE TABLE `media_stuff_galleryevent` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` longtext NOT NULL,
  `short_description` longtext NOT NULL,
  `event_date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `views_count` int(10) UNSIGNED NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_stuff_galleryevent`
--

INSERT INTO `media_stuff_galleryevent` (`id`, `title`, `slug`, `description`, `short_description`, `event_date`, `location`, `status`, `is_featured`, `views_count`, `created_at`, `updated_at`, `published_at`, `category_id`) VALUES
(1, 'Seminar', 'seminar', 'Moments from seminars, research activities, workshops, and academic gatherings at Nazmul Karim Study Center', 'scholarly interactions at Nazmul Karim Study Center, University of Dhaka', '2018-01-22', 'NKSC', 'published', 1, 89, '2026-01-30 15:30:45.864130', '2026-01-30 15:30:45.864152', '2026-01-30 15:30:45.863887', 1),
(2, '04-09-2016', '04-09-2016', 'Moments from seminars, research activities, workshops, and academic gatherings at Nazmul Karim Study Center', 'scholarly interactions at Nazmul Karim Study Center, University of Dhaka', '2016-09-04', 'NKSC', 'published', 1, 8, '2026-01-31 20:19:15.910454', '2026-01-31 20:19:38.639471', '2026-01-31 20:19:15.910247', 1),
(3, 'নাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং)', 'event-20260131', 'নাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং)', 'নাজমুল করিম স্মারক বক্তৃতা (১০-০৭-২০১৯ইং)', '2019-10-07', 'NKSC', 'published', 1, 17, '2026-01-31 20:25:13.207255', '2026-02-02 10:13:11.980064', '2026-01-31 20:26:06.431884', 1),
(5, '26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)', '26-5-14-najmul-karim-sarok-boktita-rc-majumder', '26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)', '26-5-14 Najmul Karim Sarok Boktita (R.C Majumder)', '2025-05-14', 'RC Majumdar', 'published', 1, 9, '2026-01-31 21:11:21.234944', '2026-01-31 21:11:21.234954', '2026-01-31 21:11:21.234851', 1);

-- --------------------------------------------------------

--
-- Table structure for table `media_stuff_galleryimage`
--

CREATE TABLE `media_stuff_galleryimage` (
  `id` bigint(20) NOT NULL,
  `image` varchar(100) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL,
  `is_cover` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `event_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_stuff_galleryimage`
--

INSERT INTO `media_stuff_galleryimage` (`id`, `image`, `caption`, `display_order`, `is_cover`, `created_at`, `event_id`) VALUES
(1, 'gallery/events/1/images/8c1f65e2-9a0c-4940-a81d-1db8d64902de.JPG', '', 0, 1, '2026-01-30 15:30:45.867518', 1),
(2, 'gallery/events/1/images/0436c30c-4e61-49e5-a377-b1469f1e3012.JPG', '', 1, 0, '2026-01-30 15:30:45.868673', 1),
(3, 'gallery/events/1/images/f5a866c6-6947-41b7-8406-14e28f30f6e9.JPG', '', 2, 0, '2026-01-30 15:30:45.869762', 1),
(4, 'gallery/events/1/images/ae8fda9c-a2a9-4b7a-9d60-7f1a7829283b.JPG', '', 3, 0, '2026-01-30 15:30:45.871404', 1),
(5, 'gallery/events/1/images/a5c0fc94-4561-4c1f-a303-9566c1f66c75.JPG', '', 4, 0, '2026-01-30 15:30:45.872410', 1),
(6, 'gallery/events/1/images/a9444cfd-1e62-404f-93f3-be0da273987f.JPG', '', 5, 0, '2026-01-30 15:30:45.873212', 1),
(7, 'gallery/events/2/images/cd1e55f3-61fa-4622-bec5-e83cc9139026.JPG', '', 0, 0, '2026-01-31 20:19:15.916267', 2),
(8, 'gallery/events/2/images/02f11909-d1d9-4868-a376-d63c1327f899.jpg', '', 1, 1, '2026-01-31 20:19:15.917794', 2),
(9, 'gallery/events/2/images/065c3ed6-d651-4230-be73-fd03b134916a.JPG', '', 2, 0, '2026-01-31 20:19:15.918889', 2),
(10, 'gallery/events/2/images/f2fc2162-926e-46fb-8088-869aeb6a28da.JPG', '', 3, 0, '2026-01-31 20:19:15.920536', 2),
(11, 'gallery/events/2/images/6bbed62f-f3e0-450e-855c-7a78af850721.JPG', '', 0, 0, '2026-01-31 20:19:15.921938', 2),
(15, 'gallery/events/5/images/59b9b752-a600-462b-af2e-6b6b57caa7d9.jpg', '', 0, 0, '2026-01-31 21:11:21.237310', 5),
(16, 'gallery/events/5/images/3a017391-ab45-4b1c-8149-37252a9fa31f.jpg', '', 1, 0, '2026-01-31 21:11:21.238077', 5),
(17, 'gallery/events/5/images/abab3f21-4de6-42d0-b677-0deda6828e7b.jpg', '', 2, 0, '2026-01-31 21:11:21.239683', 5),
(18, 'gallery/events/5/images/ac09c747-382c-44e8-ac9f-9a36623830d2.jpg', '', 3, 0, '2026-01-31 21:11:21.240204', 5),
(19, 'gallery/events/5/images/1dcc4bd1-adb3-4280-9e92-acd958ed165a.jpg', '', 4, 1, '2026-01-31 21:11:21.241282', 5),
(20, 'gallery/events/5/images/63939c87-beed-4cb4-925d-d687494da647.jpg', '', 5, 0, '2026-01-31 21:11:21.242114', 5);

-- --------------------------------------------------------

--
-- Table structure for table `media_stuff_galleryvideo`
--

CREATE TABLE `media_stuff_galleryvideo` (
  `id` bigint(20) NOT NULL,
  `video_url` varchar(200) NOT NULL,
  `platform` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `event_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media_stuff_galleryvideo`
--

INSERT INTO `media_stuff_galleryvideo` (`id`, `video_url`, `platform`, `title`, `description`, `display_order`, `created_at`, `event_id`) VALUES
(1, 'https://www.youtube.com/watch?v=xhhz0Vr_N3w&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=2', 'youtube', 'Nazmul Karim memorial lecture', 'Dhaka University, Nazmul Karim memorial lecture ( 06-05-2019) - ঢাকা', 0, '2026-01-30 22:30:47.902980', 1),
(2, 'https://www.youtube.com/watch?v=WzFG89CSQ6w&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=2', 'youtube', 'স্মারক বক্তৃতা', '', 0, '2026-01-31 20:25:13.209222', 3),
(3, 'https://www.youtube.com/watch?v=l_PUewPiDwM&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=3', 'youtube', 'স্মারক বক্তৃতা', '', 1, '2026-01-31 20:25:13.211404', 3),
(4, 'https://www.youtube.com/watch?v=0285bUW7o2g&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=4', 'youtube', 'স্মারক বক্তৃতা', '', 2, '2026-01-31 20:25:13.213189', 3),
(5, 'https://www.youtube.com/watch?v=dFBpRh5ihIQ&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=5', 'youtube', 'স্মারক বক্তৃতা', '', 3, '2026-01-31 20:25:13.213811', 3),
(6, 'https://www.youtube.com/watch?v=3WZppMNXfT8&list=PL4yN0XZ1IABhpk5XVzjOxcMB19MrUi52j&index=6', 'youtube', 'স্মারক বক্তৃতা', '', 4, '2026-01-31 20:25:13.214255', 3);

-- --------------------------------------------------------

--
-- Table structure for table `news_news`
--

CREATE TABLE `news_news` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` longtext NOT NULL,
  `content` longtext NOT NULL,
  `tags` varchar(255) NOT NULL,
  `urgency` varchar(20) NOT NULL,
  `language` varchar(10) NOT NULL,
  `is_event` tinyint(1) NOT NULL,
  `event_date` date DEFAULT NULL,
  `event_location` varchar(255) NOT NULL,
  `event_speakers` longtext NOT NULL,
  `is_research` tinyint(1) NOT NULL,
  `research_topic` varchar(255) NOT NULL,
  `research_department` varchar(100) NOT NULL,
  `thumbnail_image` varchar(100) DEFAULT NULL,
  `banner_image` varchar(100) DEFAULT NULL,
  `attachment_file` varchar(100) DEFAULT NULL,
  `author` varchar(100) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `publish_date` datetime(6) NOT NULL,
  `views_count` int(10) UNSIGNED NOT NULL CHECK (`views_count` >= 0),
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_news`
--

INSERT INTO `news_news` (`id`, `title`, `slug`, `short_description`, `content`, `tags`, `urgency`, `language`, `is_event`, `event_date`, `event_location`, `event_speakers`, `is_research`, `research_topic`, `research_department`, `thumbnail_image`, `banner_image`, `attachment_file`, `author`, `is_published`, `publish_date`, `views_count`, `created_at`, `updated_at`, `category_id`) VALUES
(9, 'Annual Memorial Lecture 2025', 'annual-memorial-lecture-2025', 'Dr. Sarah Johnson on \'Modern Sociology Trends\'', 'Dr. Sarah Johnson delivered the keynote on Modern Sociology Trends.', '', 'normal', 'bn', 1, '2025-03-15', 'RC Majumdar Arts Auditorium', 'Dr. Sarah Johnson', 0, '', '', '', '', '', 'গবেষণা বিভাগ (Research Department)', 1, '2026-02-16 00:06:47.204206', 0, '2026-02-16 00:06:47.204355', '2026-02-16 00:06:47.204359', 7),
(10, 'Research Methodology Workshop', 'research-methodology-workshop', 'Advanced qualitative research techniques', 'A comprehensive workshop on qualitative research methods.', '', 'normal', 'bn', 1, '2025-02-28', 'NKSC Seminar Room', 'Prof. Dr. A.K.M. Jamal Uddin', 0, '', '', '', '', '', 'গবেষণা বিভাগ (Research Department)', 1, '2026-02-16 00:06:47.204933', 0, '2026-02-16 00:06:47.205017', '2026-02-16 00:06:47.205021', 8),
(11, 'আধুনিকতা ও রবীন্দ্রনাথ (Modernity & Rabindranath)', 'modernity-rabindranath-26052014', 'Speaker: ড. সিরাজুল ইসলাম চৌধুরী (Dr. Serajul Islam Choudhury)', '<p>Seminar on <strong>আধুনিকতা ও রবীন্দ্রনাথ (Modernity & Rabindranath)</strong> by ড. সিরাজুল ইসলাম চৌধুরী (Dr. Serajul Islam Choudhury).</p>', '', 'normal', 'bn', 1, '2014-05-26', 'Nazmul Karim Study Center, Dhaka University', 'ড. সিরাজুল ইসলাম চৌধুরী (Dr. Serajul Islam Choudhury)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.247809', 0, '2026-02-16 00:49:44.248175', '2026-02-16 00:49:44.248180', 7),
(12, 'নৈতিক চেতনা ও সমাজ (Moral Consciousness & Society)', 'moral-consciousness-society-18112014', 'Speaker: অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)', '<p>Seminar on <strong>নৈতিক চেতনা ও সমাজ (Moral Consciousness & Society)</strong> by অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque).</p>', '', 'normal', 'bn', 1, '2014-11-18', 'Nazmul Karim Study Center, Dhaka University', 'অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.250842', 0, '2026-02-16 00:49:44.250932', '2026-02-16 00:49:44.250935', 7),
(13, 'সমাজ ভাবনায় বঙ্কিম ও বিদ্যাসাগর (Bankim & Vidyasagar in Social Thought)', 'bankim-vidyasagar-in-social-thought-28012015', 'Speaker: ড. আনিসুজ্জামান (Dr. Anisuzzaman)', '<p>Seminar on <strong>সমাজ ভাবনায় বঙ্কিম ও বিদ্যাসাগর (Bankim & Vidyasagar in Social Thought)</strong> by ড. আনিসুজ্জামান (Dr. Anisuzzaman).</p>', '', 'normal', 'bn', 1, '2015-01-28', 'Nazmul Karim Study Center, Dhaka University', 'ড. আনিসুজ্জামান (Dr. Anisuzzaman)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.254245', 0, '2026-02-16 00:49:44.254336', '2026-02-16 00:49:44.254339', 7),
(14, '১৯৭১ সাল এবং বাংলাদেশের স্বাধীনতা (1971 and Independence of Bangladesh)', '1971-and-independence-of-bangladesh-16042015', 'Speaker: আফসান চৌধুরী (Afsan Chowdhury)', '<p>Seminar on <strong>১৯৭১ সাল এবং বাংলাদেশের স্বাধীনতা (1971 and Independence of Bangladesh)</strong> by আফসান চৌধুরী (Afsan Chowdhury).</p>', '', 'normal', 'bn', 1, '2015-04-16', 'Nazmul Karim Study Center, Dhaka University', 'আফসান চৌধুরী (Afsan Chowdhury)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.255740', 0, '2026-02-16 00:49:44.255840', '2026-02-16 00:49:44.255843', 7),
(15, 'মৌলবাদ ও নারী (Fundamentalism & Women)', 'fundamentalism-women-26082015', 'Speaker: ড. রওনক জাহান (Dr. Rounaq Jahan)', '<p>Seminar on <strong>মৌলবাদ ও নারী (Fundamentalism & Women)</strong> by ড. রওনক জাহান (Dr. Rounaq Jahan).</p>', '', 'normal', 'bn', 1, '2015-08-26', 'Nazmul Karim Study Center, Dhaka University', 'ড. রওনক জাহান (Dr. Rounaq Jahan)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.257433', 0, '2026-02-16 00:49:44.257524', '2026-02-16 00:49:44.257529', 7),
(16, 'The Challenges of Institutionalizing Democracy in Bangladesh', 'the-challenges-of-institutionalizing-democracy-in-bangladesh-28012016', 'Speaker: ড. আলী রিয়াজ (Dr. Ali Riaz)', '<p>Seminar on <strong>The Challenges of Institutionalizing Democracy in Bangladesh</strong> by ড. আলী রিয়াজ (Dr. Ali Riaz).</p>', '', 'normal', 'en', 1, '2016-01-28', 'Nazmul Karim Study Center, Dhaka University', 'ড. আলী রিয়াজ (Dr. Ali Riaz)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.258706', 0, '2026-02-16 00:49:44.258822', '2026-02-16 00:49:44.258825', 7),
(17, 'বাংলাদেশের কৃষি ও কৃষক (Agriculture & Farmers of Bangladesh)', 'agriculture-farmers-of-bangladesh-26052016', 'Speaker: ড. এম এম আকাশ (Dr. M M Akash)', '<p>Seminar on <strong>বাংলাদেশের কৃষি ও কৃষক (Agriculture & Farmers of Bangladesh)</strong> by ড. এম এম আকাশ (Dr. M M Akash).</p>', '', 'normal', 'bn', 1, '2016-05-26', 'Nazmul Karim Study Center, Dhaka University', 'ড. এম এম আকাশ (Dr. M M Akash)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.259918', 0, '2026-02-16 00:49:44.260004', '2026-02-16 00:49:44.260007', 7),
(18, 'বাংলাদেশের রাজনীতি: যা বলা হয় না (Politics of Bangladesh: What is Unsaid)', 'politics-of-bangladesh-what-is-unsaid-01082016', 'Speaker: জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)', '<p>Seminar on <strong>বাংলাদেশের রাজনীতি: যা বলা হয় না (Politics of Bangladesh: What is Unsaid)</strong> by জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad).</p>', '', 'normal', 'bn', 1, '2016-08-01', 'Nazmul Karim Study Center, Dhaka University', 'জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.261105', 0, '2026-02-16 00:49:44.261222', '2026-02-16 00:49:44.261225', 7),
(19, 'বর্তমান আন্দোলন ও তৎকালীন রাজনীতি (Current Movement & Politics of that Time)', 'current-movement-politics-of-that-time-04092016', 'Speaker: অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)', '<p>Seminar on <strong>বর্তমান আন্দোলন ও তৎকালীন রাজনীতি (Current Movement & Politics of that Time)</strong> by অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque).</p>', '', 'normal', 'bn', 1, '2016-09-04', 'Nazmul Karim Study Center, Dhaka University', 'অধ্যাপক আবুল কাশেম ফজলুল হক (Professor Abul Kashem Fazlul Haque)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.262492', 0, '2026-02-16 00:49:44.262591', '2026-02-16 00:49:44.262594', 7),
(20, 'বাংলাদেশের সেক্যুলারিজম (Secularism in Bangladesh)', 'secularism-in-bangladesh-31012017', 'Speaker: ড. গোলাম মর্তুজা (Dr. Golam Murshid)', '<p>Seminar on <strong>বাংলাদেশের সেক্যুলারিজম (Secularism in Bangladesh)</strong> by ড. গোলাম মর্তুজা (Dr. Golam Murshid).</p>', '', 'normal', 'bn', 1, '2017-01-31', 'Nazmul Karim Study Center, Dhaka University', 'ড. গোলাম মর্তুজা (Dr. Golam Murshid)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.263803', 0, '2026-02-16 00:49:44.263878', '2026-02-16 00:49:44.263881', 7),
(21, 'আমাদের মুক্তিযুদ্ধ: তাত্ত্বিক বয়ান (Our Liberation War: Theoretical Narrative)', 'our-liberation-war-theoretical-narrative-30012018', 'Speaker: সৈয়দ আনোয়ার হোসেন (Syed Anwar Husain)', '<p>Seminar on <strong>আমাদের মুক্তিযুদ্ধ: তাত্ত্বিক বয়ান (Our Liberation War: Theoretical Narrative)</strong> by সৈয়দ আনোয়ার হোসেন (Syed Anwar Husain).</p>', '', 'normal', 'bn', 1, '2018-01-30', 'Nazmul Karim Study Center, Dhaka University', 'সৈয়দ আনোয়ার হোসেন (Syed Anwar Husain)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.265698', 0, '2026-02-16 00:49:44.265784', '2026-02-16 00:49:44.265787', 7),
(22, 'সমাজ তো শুধুই সমাজ নয় (Society is not just society)', 'society-is-not-just-society-01032018', 'Speaker: ড. অনুপম সেন (Dr. Anupam Sen)', '<p>Seminar on <strong>সমাজ তো শুধুই সমাজ নয় (Society is not just society)</strong> by ড. অনুপম সেন (Dr. Anupam Sen).</p>', '', 'normal', 'bn', 1, '2018-03-01', 'Nazmul Karim Study Center, Dhaka University', 'ড. অনুপম সেন (Dr. Anupam Sen)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.266886', 0, '2026-02-16 00:49:44.266966', '2026-02-16 00:49:44.266970', 7),
(23, 'জাসদ ও বাংলাদেশের রাজনীতি (JSD & Politics of Bangladesh)', 'jsd-politics-of-bangladesh-28032018', 'Speaker: জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)', '<p>Seminar on <strong>জাসদ ও বাংলাদেশের রাজনীতি (JSD & Politics of Bangladesh)</strong> by জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad).</p>', '', 'normal', 'bn', 1, '2018-03-28', 'Nazmul Karim Study Center, Dhaka University', 'জনাব মহিউদ্দিন আহমদ (Mr. Mohiuddin Ahmad)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.268343', 0, '2026-02-16 00:49:44.268430', '2026-02-16 00:49:44.268434', 7),
(24, 'রবীন্দ্রনাথের রাষ্ট্রচিন্তা (Rabindranath\'s Political Thought)', 'rabindranaths-political-thought-09052018', 'Speaker: আহমেদ রফিক (Ahmed Rafiq)', '<p>Seminar on <strong>রবীন্দ্রনাথের রাষ্ট্রচিন্তা (Rabindranath\'s Political Thought)</strong> by আহমেদ রফিক (Ahmed Rafiq).</p>', '', 'normal', 'bn', 1, '2018-05-09', 'Nazmul Karim Study Center, Dhaka University', 'আহমেদ রফিক (Ahmed Rafiq)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.269684', 0, '2026-02-16 00:49:44.269777', '2026-02-16 00:49:44.269780', 7),
(25, 'স্বাধীন জাতির ভাষা ও শিক্ষা প্রসঙ্গ (Context of Language & Education of an Independent Nation)', 'context-of-language-education-of-an-independent-nation-29102018', 'Speaker: অধ্যাপক ড. সলিমুল্লাহ খান (Professor Dr. Salimullah Khan)', '<p>Seminar on <strong>স্বাধীন জাতির ভাষা ও শিক্ষা প্রসঙ্গ (Context of Language & Education of an Independent Nation)</strong> by অধ্যাপক ড. সলিমুল্লাহ খান (Professor Dr. Salimullah Khan).</p>', '', 'normal', 'bn', 1, '2018-10-29', 'Nazmul Karim Study Center, Dhaka University', 'অধ্যাপক ড. সলিমুল্লাহ খান (Professor Dr. Salimullah Khan)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.271138', 0, '2026-02-16 00:49:44.271207', '2026-02-16 00:49:44.271211', 7),
(26, 'ঝুঁকির বিশ্বায়ন, সাহিত্য ও সংস্কৃতি (Globalization of Risk, Literature & Culture)', 'globalization-of-risk-literature-culture-26022019', 'Speaker: অধ্যাপক সৈয়দ মনজুরুল ইসলাম (Professor Syed Manzoor-ul-Islam)', '<p>Seminar on <strong>ঝুঁকির বিশ্বায়ন, সাহিত্য ও সংস্কৃতি (Globalization of Risk, Literature & Culture)</strong> by অধ্যাপক সৈয়দ মনজুরুল ইসলাম (Professor Syed Manzoor-ul-Islam).</p>', '', 'normal', 'bn', 1, '2019-02-26', 'Nazmul Karim Study Center, Dhaka University', 'অধ্যাপক সৈয়দ মনজুরুল ইসলাম (Professor Syed Manzoor-ul-Islam)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.272299', 0, '2026-02-16 00:49:44.272377', '2026-02-16 00:49:44.272381', 7),
(27, 'পুঁজির বিশ্বায়ন, স্থানীয় মানুষ, বিপন্ন প্রাণ ও প্রকৃতি (Globalization of Capital, Local People, Endangered Lives & Nature)', 'globalization-of-capital-local-people-endangered-lives-nature-25032019', 'Speaker: আনু মুহাম্মদ (Anu Muhammad)', '<p>Seminar on <strong>পুঁজির বিশ্বায়ন, স্থানীয় মানুষ, বিপন্ন প্রাণ ও প্রকৃতি (Globalization of Capital, Local People, Endangered Lives & Nature)</strong> by আনু মুহাম্মদ (Anu Muhammad).</p>', '', 'normal', 'bn', 1, '2019-03-25', 'Nazmul Karim Study Center, Dhaka University', 'আনু মুহাম্মদ (Anu Muhammad)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.273840', 0, '2026-02-16 00:49:44.273939', '2026-02-16 00:49:44.273942', 7),
(28, 'Class, Shamaj and Shalish: Societal Maintenance, Break-ups, and the Cultural', 'class-shamaj-and-shalish-societal-maintenance-break-ups-and-the-cultural-06052019', 'Speaker: স্বপন আদনান (Swapan Adnan)', '<p>Seminar on <strong>Class, Shamaj and Shalish: Societal Maintenance, Break-ups, and the Cultural</strong> by স্বপন আদনান (Swapan Adnan).</p>', '', 'normal', 'en', 1, '2019-05-06', 'Nazmul Karim Study Center, Dhaka University', 'স্বপন আদনান (Swapan Adnan)', 0, '', '', '', '', '', 'System Import', 1, '2026-02-16 00:49:44.275218', 0, '2026-02-16 00:49:44.275299', '2026-02-16 00:49:44.275302', 7);

-- --------------------------------------------------------

--
-- Table structure for table `news_newscategory`
--

CREATE TABLE `news_newscategory` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_newscategory`
--

INSERT INTO `news_newscategory` (`id`, `name`, `slug`, `description`) VALUES
(7, 'Seminars', 'seminars', 'Academic seminars'),
(8, 'Research', 'research', 'Research updates');

-- --------------------------------------------------------

--
-- Table structure for table `publications_publication`
--

CREATE TABLE `publications_publication` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `publication_date` date NOT NULL,
  `pdf_file` varchar(100) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_department`
--

CREATE TABLE `staff_department` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `icon` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_department`
--

INSERT INTO `staff_department` (`id`, `name`, `slug`, `description`, `icon`, `color`, `display_order`) VALUES
(1, 'Sociology Department', 'sociology-department', 'Liven up your web layout wireframes and mockups with one of these lorem ipsum generators. Liven up your web layout wireframes and mockups with...\r\n1M+ visits in past month', 'pi-users', 'blue', 0),
(5, 'Nazmul Karim Center', 'nazmul-karim-center', '', 'pi-users', 'bg-blue-100 text-blue-800', 0);

-- --------------------------------------------------------

--
-- Table structure for table `staff_staff`
--

CREATE TABLE `staff_staff` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `alternate_phone` varchar(20) NOT NULL,
  `bio` longtext NOT NULL,
  `qualifications` longtext NOT NULL,
  `research_interests` longtext NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `cv` varchar(100) DEFAULT NULL,
  `website` varchar(200) NOT NULL,
  `linkedin` varchar(200) NOT NULL,
  `google_scholar` varchar(200) NOT NULL,
  `researchgate` varchar(200) NOT NULL,
  `orcid` varchar(50) NOT NULL,
  `office_room` varchar(50) NOT NULL,
  `office_hours` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `join_date` date DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `meta_title` varchar(255) NOT NULL,
  `meta_description` longtext NOT NULL,
  `meta_keywords` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `department_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_staff`
--

INSERT INTO `staff_staff` (`id`, `name`, `slug`, `designation`, `email`, `phone`, `alternate_phone`, `bio`, `qualifications`, `research_interests`, `profile_image`, `cv`, `website`, `linkedin`, `google_scholar`, `researchgate`, `orcid`, `office_room`, `office_hours`, `is_active`, `join_date`, `display_order`, `meta_title`, `meta_description`, `meta_keywords`, `created_at`, `updated_at`, `department_id`) VALUES
(1, 'অধ্যাপক ড. তৈয়েবুর রহমান', '-1', 'professor', 'taiybur@gmail.du.ac.bd', '+8801711914934', '', 'সংক্ষিপ্ত পরিচিতি:\r\nপ্রফেসর, ডেভেলপমেন্ট স্টাডিজ বিভাগ\r\nডিন (ভারপ্রাপ্ত), সামাজিক বিজ্ঞান অনুষদ, ঢাকা বিশ্ববিদ্যালয়\r\nচেয়ারম্যান, ডেভেলপমেন্ট স্টাডিজ বিভাগ (২০০৬-২০০৯)\r\nপিএইচডি, পাবলিক পলিসি অ্যান্ড গভর্নেন্স, সিটি ইউনিভার্সিটি অব হংকং\r\nএমফিল, পাবলিক অ্যাডমিনিস্ট্রেশন, ইউনিভার্সিটি অব বার্গেন, নরওয়ে', 'চেয়ারম্যান, ডেভেলপমেন্ট স্টাডিজ বিভাগ (২০০৬-২০০৯)\r\nপিএইচডি, পাবলিক পলিসি অ্যান্ড গভর্নেন্স, সিটি ইউনিভার্সিটি অব হংকং', 'বাংলাদেশ সমাজবিজ্ঞান গঠনের পথিকৃৎ এবং ঢাকা বিশ্ববিদ্যালয় সমাজবিজ্ঞান বিভাগের প্রতিষ্ঠাতা চেয়ারম্যান, দেশের শিক্ষাবিদ হিসাবে একুশে পদক ও স্বাধীনতা পদক প্রাপ্ত অধ্যাপক ড. এ. কে. নাজমুল করিমের নামকে স্মরণীয় রাখতে এই গবেষণা কেন্দ্র প্রতিষ্ঠিত হয়। ১৯৯৯ সালের ৩০শে আগস্ট সমাজবিজ্ঞান বিভাগের একাডেমিক কমিটি একটি প্রস্তাব গ্রহণ করে, যার ভিত্তিতে ২০০০ সালের ১০ই মে কলাভবনে এই সেন্টারটি যাত্রা শুরু করে। এই সেন্টারটির লক্ষ্য হলো উচ্চতর গবেষণা, জার্নাল প্রকাশনা এবং নাজমুল করিম স্মারক বক্তৃতার আয়োজন করা।', 'staff/profiles/dr.png', 'staff/cvs/cv_266_new.pdf', '', '', '', '', '', '502', '', 1, '2026-01-18', 0, 'অধ্যাপক ড. তৈয়েবুর রহমান', 'সংক্ষিপ্ত পরিচিতি:\r\nপ্রফেসর, ডেভেলপমেন্ট স্টাডিজ বিভাগ\r\nডিন (ভারপ্রাপ্ত), সামাজিক বিজ্ঞান অনুষদ, ঢাকা বিশ্ববিদ্যালয়\r\nচেয়ারম্যান, ডেভেলপমেন্ট স্টাডিজ বিভাগ (২০', '', '2026-01-18 09:36:42.653845', '2026-02-02 09:49:29.272657', 5),
(2, 'Nasrin Pathan', 'nasrin-pathan', 'administrative_officer', 'nasrin@gmail.com', '01677171934', '', '', '', '', 'staff/profiles/_DSC0183.jpg', '', '', '', '', '', '', '', '', 1, NULL, 0, 'Nasrin Pathan - হিসাবরক্ষক (Accountant)', '', '', '2026-02-02 07:35:07.534188', '2026-02-02 09:48:58.449751', 5);

-- --------------------------------------------------------

--
-- Table structure for table `staff_staffeducation`
--

CREATE TABLE `staff_staffeducation` (
  `id` bigint(20) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `year` varchar(20) NOT NULL,
  `description` longtext NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `staff_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_staffeducation`
--

INSERT INTO `staff_staffeducation` (`id`, `degree`, `institution`, `year`, `description`, `display_order`, `staff_id`) VALUES
(1, 'PhD', 'UK', '1990', 'ডিন (ভারপ্রাপ্ত), সামাজিক বিজ্ঞান অনুষদ, ঢাকা বিশ্ববিদ্যালয়', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff_staffexperience`
--

CREATE TABLE `staff_staffexperience` (
  `id` bigint(20) NOT NULL,
  `position` varchar(255) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_current` tinyint(1) NOT NULL,
  `description` longtext NOT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `staff_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_staffexperience`
--

INSERT INTO `staff_staffexperience` (`id`, `position`, `organization`, `start_date`, `end_date`, `is_current`, `description`, `display_order`, `staff_id`) VALUES
(1, 'Dean', 'NKSC', '2026-01-18', '2027-03-10', 1, '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_management_chairman`
--

CREATE TABLE `user_management_chairman` (
  `id` bigint(20) NOT NULL,
  `name_bangla` varchar(255) NOT NULL,
  `name_english` varchar(255) NOT NULL,
  `designation_bangla` varchar(255) NOT NULL,
  `designation_english` varchar(255) NOT NULL,
  `bio_bangla` longtext NOT NULL,
  `bio_english` longtext DEFAULT NULL,
  `qualifications` longtext NOT NULL,
  `current_positions` longtext NOT NULL,
  `previous_positions` longtext NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `signature_image` varchar(100) DEFAULT NULL,
  `display_order` int(10) UNSIGNED NOT NULL CHECK (`display_order` >= 0),
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_management_chairman`
--

INSERT INTO `user_management_chairman` (`id`, `name_bangla`, `name_english`, `designation_bangla`, `designation_english`, `bio_bangla`, `bio_english`, `qualifications`, `current_positions`, `previous_positions`, `email`, `phone`, `profile_image`, `signature_image`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'অধ্যাপক ড.  তৈয়েবুর রহমান', 'Professor Dr. Taiabur Rahman', 'পরিচালক, নাজমুল করিম স্টাডি সেন্টার', 'Director, Nazmul Karim Study Center', 'প্রফেসর, ডেভেলপমেন্ট স্টাডিজ বিভাগ\r\nডিন (ভারপ্রাপ্ত), সামাজিক বিজ্ঞান অনুষদ, ঢাকা বিশ্ববিদ্যালয়\r\nচেয়ারম্যান, ডেভেলপমেন্ট স্টাডিজ বিভাগ (২০০৬-২০০৯)\r\nপিএইচডি, পাবলিক পলিসি অ্যান্ড গভর্নেন্স, সিটি ইউনিভার্সিটি অব হংকং\r\nএমফিল, পাবলিক অ্যাডমিনিস্ট্রেশন, ইউনিভার্সিটি অব বার্গেন, নরওয়ে', 'Dr. Taiabur Rahman is a Professor of Development Studies and Acting Dean of the Faculty of Social Sciences at the University of Dhaka. He previously served as Dean of the School of Liberal Arts and Social Sciences at Independent University, Bangladesh (IUB), and as Chair of the Department of Development Studies at the University of Dhaka. His international academic experience includes serving as Associate Professor and Chair of Public Administration at KIMEP University, Kazakhstan.\r\n\r\nDr. Rahman holds a PhD in Public Policy and Governance from the City University of Hong Kong, along with Bachelor’s and Master’s degrees in Public Administration from the University of Dhaka, and an MPhil from the University of Bergen, Norway. A prolific scholar, he has published widely in national and international peer-reviewed journals and is the author of Parliamentary Control and Government Accountability in South Asia (Routledge). He is also an experienced reviewer for leading international publishers and journals.\r\n\r\nWith extensive consultancy experience for national and international organizations, Dr. Rahman’s research interests span Public Policy and Governance, Comparative Politics, and Development Studies. He is widely recognized for his expertise in international accreditation of tertiary education institutions and for his contributions as a researcher, resource person, and development practitioner.', 'ph.D.	Public Administration	City University of Hong Kong	Hong Kong 2005\r\nM.Phil.	Public Administration	University of Bergen	Norway	2000\r\nMasters	Public Administrtaion	University of Dhaka	Bangladesh	1991\r\nBachelor	Public Administration	University of Dhaka	Bangladesh	1990', 'Director, Nazmul Karim Study Center', '', 'taiaburrahman.dvs@du.ac.bd', '+88-01817590525', '', '', 0, 1, '2026-01-24 11:48:25.863805', '2026-01-24 19:10:57.962541');

-- --------------------------------------------------------

--
-- Table structure for table `user_management_userprofile`
--

CREATE TABLE `user_management_userprofile` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_aboutsection`
--
ALTER TABLE `about_aboutsection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_contactinfo`
--
ALTER TABLE `about_contactinfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_director`
--
ALTER TABLE `about_director`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_facility`
--
ALTER TABLE `about_facility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_statistic`
--
ALTER TABLE `about_statistic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_timelineevent`
--
ALTER TABLE `about_timelineevent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `dashboard_userdashboardmodule`
--
ALTER TABLE `dashboard_userdashboardmodule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dashboard_userdashboardmodule_user_id_97c13132_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `jet_bookmark`
--
ALTER TABLE `jet_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jet_bookmark_user_id_8efdc332_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `jet_pinnedapplication`
--
ALTER TABLE `jet_pinnedapplication`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jet_pinnedapplication_user_id_7765bcf9_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `journal_journal`
--
ALTER TABLE `journal_journal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media_stuff_gallerycategory`
--
ALTER TABLE `media_stuff_gallerycategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `media_stuff_galleryevent`
--
ALTER TABLE `media_stuff_galleryevent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `media_stuff_galleryimage`
--
ALTER TABLE `media_stuff_galleryimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `media_stuff_galleryvideo`
--
ALTER TABLE `media_stuff_galleryvideo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `news_news`
--
ALTER TABLE `news_news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `news_news_category_id_f060a768_fk_news_newscategory_id` (`category_id`);

--
-- Indexes for table `news_newscategory`
--
ALTER TABLE `news_newscategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `publications_publication`
--
ALTER TABLE `publications_publication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_department`
--
ALTER TABLE `staff_department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `staff_staff`
--
ALTER TABLE `staff_staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `staff_staff_department_id_7a1f5e16_fk_staff_department_id` (`department_id`);

--
-- Indexes for table `staff_staffeducation`
--
ALTER TABLE `staff_staffeducation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_staffeducation_staff_id_4bd0793a_fk_staff_staff_id` (`staff_id`);

--
-- Indexes for table `staff_staffexperience`
--
ALTER TABLE `staff_staffexperience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_staffexperience_staff_id_daa3e14f_fk_staff_staff_id` (`staff_id`);

--
-- Indexes for table `user_management_chairman`
--
ALTER TABLE `user_management_chairman`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_management_userprofile`
--
ALTER TABLE `user_management_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_aboutsection`
--
ALTER TABLE `about_aboutsection`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `about_contactinfo`
--
ALTER TABLE `about_contactinfo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `about_director`
--
ALTER TABLE `about_director`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `about_facility`
--
ALTER TABLE `about_facility`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `about_statistic`
--
ALTER TABLE `about_statistic`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `about_timelineevent`
--
ALTER TABLE `about_timelineevent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dashboard_userdashboardmodule`
--
ALTER TABLE `dashboard_userdashboardmodule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `jet_bookmark`
--
ALTER TABLE `jet_bookmark`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jet_pinnedapplication`
--
ALTER TABLE `jet_pinnedapplication`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal_journal`
--
ALTER TABLE `journal_journal`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `media_stuff_gallerycategory`
--
ALTER TABLE `media_stuff_gallerycategory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `media_stuff_galleryevent`
--
ALTER TABLE `media_stuff_galleryevent`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `media_stuff_galleryimage`
--
ALTER TABLE `media_stuff_galleryimage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `media_stuff_galleryvideo`
--
ALTER TABLE `media_stuff_galleryvideo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `news_news`
--
ALTER TABLE `news_news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `news_newscategory`
--
ALTER TABLE `news_newscategory`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `publications_publication`
--
ALTER TABLE `publications_publication`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_department`
--
ALTER TABLE `staff_department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `staff_staff`
--
ALTER TABLE `staff_staff`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `staff_staffeducation`
--
ALTER TABLE `staff_staffeducation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `staff_staffexperience`
--
ALTER TABLE `staff_staffexperience`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_management_chairman`
--
ALTER TABLE `user_management_chairman`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_management_userprofile`
--
ALTER TABLE `user_management_userprofile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `dashboard_userdashboardmodule`
--
ALTER TABLE `dashboard_userdashboardmodule`
  ADD CONSTRAINT `dashboard_userdashboardmodule_user_id_97c13132_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `jet_bookmark`
--
ALTER TABLE `jet_bookmark`
  ADD CONSTRAINT `jet_bookmark_user_id_8efdc332_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `jet_pinnedapplication`
--
ALTER TABLE `jet_pinnedapplication`
  ADD CONSTRAINT `jet_pinnedapplication_user_id_7765bcf9_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `media_stuff_galleryevent`
--
ALTER TABLE `media_stuff_galleryevent`
  ADD CONSTRAINT `media_stuff_galleryevent_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `media_stuff_gallerycategory` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `media_stuff_galleryimage`
--
ALTER TABLE `media_stuff_galleryimage`
  ADD CONSTRAINT `media_stuff_galleryimage_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `media_stuff_galleryevent` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media_stuff_galleryvideo`
--
ALTER TABLE `media_stuff_galleryvideo`
  ADD CONSTRAINT `media_stuff_galleryvideo_event_id_fk` FOREIGN KEY (`event_id`) REFERENCES `media_stuff_galleryevent` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news_news`
--
ALTER TABLE `news_news`
  ADD CONSTRAINT `news_news_category_id_f060a768_fk_news_newscategory_id` FOREIGN KEY (`category_id`) REFERENCES `news_newscategory` (`id`);

--
-- Constraints for table `staff_staff`
--
ALTER TABLE `staff_staff`
  ADD CONSTRAINT `staff_staff_department_id_7a1f5e16_fk_staff_department_id` FOREIGN KEY (`department_id`) REFERENCES `staff_department` (`id`);

--
-- Constraints for table `staff_staffeducation`
--
ALTER TABLE `staff_staffeducation`
  ADD CONSTRAINT `staff_staffeducation_staff_id_4bd0793a_fk_staff_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff_staff` (`id`);

--
-- Constraints for table `staff_staffexperience`
--
ALTER TABLE `staff_staffexperience`
  ADD CONSTRAINT `staff_staffexperience_staff_id_daa3e14f_fk_staff_staff_id` FOREIGN KEY (`staff_id`) REFERENCES `staff_staff` (`id`);

--
-- Constraints for table `user_management_userprofile`
--
ALTER TABLE `user_management_userprofile`
  ADD CONSTRAINT `user_management_userprofile_user_id_4e76c756_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
