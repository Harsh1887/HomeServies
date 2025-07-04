-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2025 at 05:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeservices`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins_table`
--

CREATE TABLE `admins_table` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(100) NOT NULL,
  `admin_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins_table`
--

INSERT INTO `admins_table` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'Admin', 'admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `employee_id` int(11) NOT NULL,
  `emp_aadhar_number` varchar(12) NOT NULL,
  `employee_name` varchar(255) NOT NULL,
  `employee_service_name` varchar(255) NOT NULL,
  `employee_image` text NOT NULL,
  `employee_phoneno` varchar(10) NOT NULL,
  `employee_email` text NOT NULL,
  `employee_password` varchar(255) NOT NULL,
  `employee_desc` text NOT NULL,
  `employee_rating` int(10) NOT NULL,
  `employee_location` varchar(100) NOT NULL,
  `employee_experience` int(11) NOT NULL,
  `employee_service_fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`employee_id`, `emp_aadhar_number`, `employee_name`, `employee_service_name`, `employee_image`, `employee_phoneno`, `employee_email`, `employee_password`, `employee_desc`, `employee_rating`, `employee_location`, `employee_experience`, `employee_service_fee`) VALUES
(22, '2147483647', 'Pritam Singh', 'Carpentry', 'uploads/emp_m8.png', '9845012345', 'employee3@gmail.com', '$2y$10$.EurGwhOl1TsCvYXK2ZDbeYpIZBDRDx7wwq3TIUC4ZIc9jOkKbqxG', 'Services will be only commence for about 1 to 2 hours. Repairs modular furniture.', 0, 'Badlapur', 5, 420),
(23, '2147483647', 'Vipul Zaveri', 'Vehicle Maintenance', 'uploads/emp_m3.png', '9890001122', 'employee4@gmail.com', '$2y$10$rB6BOJvnrZO6FKuLIWWBxunt0BWNeh2FwjO3uX/dQtym13qomTRMW', 'Services will be only commence for about 1 to 2 hours. Scooter and bike tune-up.', 0, 'Ulhasnagar', 6, 510),
(25, '673456712341', 'Ramesh Pawar', 'Housecleaning', 'uploads/emp_m9.png', '9820934561', 'ramesh@gmail.ccom', '$2y$10$a0Nq0cxBlayMEQlqHZ26sO/7eTduBSwy3FOk5hhIfA3MUQuW3XBGG', 'Services will be only commence for about 1 to 2 hours. Specializes in deep cleaning.', 0, 'Badlapur', 4, 300),
(26, '345678909871', 'Meena Koli', 'Doctor', 'uploads/emp_w5.png', '7802345678', 'meenakoli@gmail.com', '$2y$10$VHp9WsTgmUTQaU6UhgqKROcf1cS3XenidixuVOstLjQo1hJRG12da', 'Services will be only commeance for about 1 to 2 hours. Pediatric home visits.', 0, 'Ambernath', 2, 350),
(27, '647291145675', 'Mahesh Yadav', 'Carpentry', 'uploads/emp_m10.png', '6789023456', 'maheshyadav@gmail.com', '$2y$10$PM1aBj4QOf5XQcha886lWOuyeue9xvfd8TwztOoQMJrToabdze4pi', 'Services will be only commence for about 1 to 2 hours. Expert in fixing furniture.', 0, 'Ambernath', 4, 400),
(28, '834911345678', 'Ajay Kulkarni', 'Electrician', 'uploads/emp_m8.png', '9890934567', 'ajaykulkarni@gmail.com', '$2y$10$hhzV5czQJ2RAjFvHOOfaE.BZ.06HwZjnzR8v4c2fAxA5vzn9USYFy', 'Services will be only commence for about 1 to 2 hours. Repairs wiring and sockets.', 0, 'Badlapur', 3, 390),
(29, '345678901234', 'Prakash Gawde', 'Electrician', 'uploads/emp_m10.png', '9876543234', 'prakash@gmail.com', '$2y$10$EJupjmCIqTuFehXO11bQZee65BmyrNS12mA1ukDDOHf0StVPErps2', 'Services will be only commence for about 1 to 2 hours. Fan and light installation.', 0, 'Ambernath', 5, 300),
(30, '456789023423', 'Harish Kamble', 'Electrician', 'uploads/emp_m11.png', '9840987623', 'manishkamble@gmail.com', '$2y$10$4Bme1beMSJJeIVTnhrfHZ.Gry5HBFvhsfbF6mqugpxBckz5yVa9j.', 'Services will be only commence for about 1 to 2 hours. Experienced in inverter setup.', 0, 'Ulhashnagar', 3, 350),
(31, '586789345234', 'Dr.Asha Bhonsale', 'Doctor', 'uploads/emp_w7.png', '9876543210', 'asha@gmail.com', '$2y$10$KE66xCOujZEZ9uHwZAU4juvD/MJAEezVzAXhz2e293i0IhcSbWlZ.', 'Services will be only commence for about 1 to 2 hours. General physician consultation.', 0, 'Ambernath', 10, 1000),
(32, '678901234567', 'Tushar Ingle', 'Plumbing', 'uploads/emp_m1.png', '9877776123', 'tusharingle@gmail.com', '$2y$10$77DIf3o3PftAeAAUbJfamuKQ4.Icg.Uka7SCB.7RrsiayhKzP751.', 'Services will be only commence for about 1 to 2 hours. Water tank pipe fixing.', 0, 'Ambernath', 6, 350),
(33, '567890543214', 'Naresh Dubay', 'Plumbing', 'uploads/emp_m4.png', '8790765641', 'naresh@gmail.com', '$2y$10$dmRzQQYD/yrZIajXWEeViuPsNr6onHEtSAAzIn1OmO9p31xCiPHqm', 'Services will be only commence for about 1 to 2 hours. Bathroom & toilet issues fix.', 0, 'Badlapur', 3, 300),
(34, '876543210987', 'Sameer Sheikh', 'Home Security', 'uploads/emp_m10.png', '9812345432', 'sheikhsameer@gmail.com', '$2y$10$bVftLyOSJQ9WFmOjvUFwGeNB1hgswXntPohZeyBQYyEVr11TbSVW6', 'Services will be only commence for about 1 to 2 hours. Provides armed supervision.', 0, 'Badlapur', 4, 750),
(35, '876098765432', 'Ganesh Jagtap', 'Home Security', 'uploads/emp_m8.png', '7654321098', 'ganesh@gmail.com', '$2y$10$g5Cq7J47VoybdYff6ChdvusDSOD/QzwSKnlRnF/k.OF6wJFwOfpNO', 'Services will be only commence for about 1 to 6 hours. Guards for gated society.', 0, 'Ambernath', 6, 1000),
(36, '876543210987', 'Manish Mhatre', 'Vehicle Maintenance', 'uploads/emp_m9.png', '9080765432', 'manish@gmail.com', '$2y$10$4nLGtfqcHI8XFIY64K6zB.Okk0dBD/hv.F0o0.Mz9kbMXQK6ZOyz6', 'Services will be only commence for about 1 to 2 hours. Two-wheeler service expert.', 0, 'Ulhashnagar', 4, 500),
(37, '345634563456', 'Rohit Sharma', 'Cleaning', 'uploads/emp_m10.png', '7897897898', 'rohit@gmail.com', '$2y$10$XM58T7v.DowiFMmOsclmJ.CnEkF3Det1kXddJJ4eCaXchUUlFi/PO', 'Services will be only commence for about 1 to 2 hours. Cleaning full home floors.', 0, 'Badlapur', 3, 300);

-- --------------------------------------------------------

--
-- Table structure for table `favorites_table`
--

CREATE TABLE `favorites_table` (
  `favorite_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `order_total_amount` int(11) NOT NULL,
  `pay_amount_to_emp` int(11) NOT NULL,
  `emp_payment_status` int(11) NOT NULL,
  `order_payment_status` varchar(255) NOT NULL,
  `user_address` text NOT NULL,
  `user_phoneno` int(10) NOT NULL,
  `service_date` date NOT NULL,
  `service_time` time NOT NULL,
  `booking_time` datetime NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `order_location` varchar(255) NOT NULL,
  `datetime_of_service_completion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_table`
--

CREATE TABLE `users_table` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_phoneno` varchar(10) NOT NULL,
  `user_address` text NOT NULL,
  `user_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins_table`
--
ALTER TABLE `admins_table`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `favorites_table`
--
ALTER TABLE `favorites_table`
  ADD PRIMARY KEY (`favorite_id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `users_table`
--
ALTER TABLE `users_table`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins_table`
--
ALTER TABLE `admins_table`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `favorites_table`
--
ALTER TABLE `favorites_table`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
