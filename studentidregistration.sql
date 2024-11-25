-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2024 at 01:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentidregistration`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `role`) VALUES
(1, 'marcx', 'marcx ', 'admin\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `idcredentials`
--

CREATE TABLE `idcredentials` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `studentname` varchar(255) NOT NULL,
  `studentemail` varchar(255) NOT NULL,
  `studentphone` varchar(255) NOT NULL,
  `studentaddress` varchar(255) NOT NULL,
  `guardianname` varchar(255) NOT NULL,
  `guardianphone` varchar(255) NOT NULL,
  `guardianemail` varchar(255) NOT NULL,
  `alternativeaddress` varchar(255) NOT NULL,
  `emergencycontact` varchar(255) NOT NULL,
  `studentnumber` varchar(255) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `idcredentials`
--

INSERT INTO `idcredentials` (`id`, `userid`, `studentname`, `studentemail`, `studentphone`, `studentaddress`, `guardianname`, `guardianphone`, `guardianemail`, `alternativeaddress`, `emergencycontact`, `studentnumber`, `image`) VALUES
(359, '123456', 'renedel ', 'rendel@gmail.com', '444444444', '123 Student St. ', 'Jane Doe', '5555555', 'guardian@gmail.com', 'guardian@gmail.com', '99999999', '20190410', 'asd_2.jfif'),
(360, '111111', 'marcx', 'marcx@gmail.com', '11111111', '111 Antero St. ', 'Jane Doe ', '11111111111', 'guardian@gmail.com', '456 guardian Ave', '999999999', '20190410', 'asd_3.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar`
--

CREATE TABLE `sidebar` (
  `id` int(11) NOT NULL,
  `sidebar` varchar(255) NOT NULL,
  `icons` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sidebar`
--

INSERT INTO `sidebar` (`id`, `sidebar`, `icons`, `link`) VALUES
(1, 'Home', 'fa-solid fa-house', 'Home');

-- --------------------------------------------------------

--
-- Table structure for table `studentcred`
--

CREATE TABLE `studentcred` (
  `id` int(11) NOT NULL,
  `studid` varchar(255) NOT NULL,
  `studpass` varchar(255) NOT NULL,
  `user_progress` varchar(255) NOT NULL,
  `user_stage` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `studname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentcred`
--

INSERT INTO `studentcred` (`id`, `studid`, `studpass`, `user_progress`, `user_stage`, `status`, `studname`) VALUES
(1, '123456', 'renedel', '100', 'stage2', 'waiting', 'renedel'),
(2, '111111', 'marcx', '100', 'stage1', 'waiting', 'marcx'),
(4, 'admin', 'admin', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `idcredentials`
--
ALTER TABLE `idcredentials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sidebar`
--
ALTER TABLE `sidebar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentcred`
--
ALTER TABLE `studentcred`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `idcredentials`
--
ALTER TABLE `idcredentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=374;

--
-- AUTO_INCREMENT for table `sidebar`
--
ALTER TABLE `sidebar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studentcred`
--
ALTER TABLE `studentcred`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;