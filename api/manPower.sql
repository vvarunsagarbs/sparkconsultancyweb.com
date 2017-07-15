
--
-- Database: `manpower`
--

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--
CREATE TABLE `visitors` (
  `visitor_id`       		int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `visitor_ip`       		varchar(39) NOT NULL,
  `views`       		varchar(40) NOT NULL,
  `visited_date`       		date NOT NULL,
  `DEL_FLG`       		char(1) NOT NULL,
  PRIMARY KEY(`visitor_id`),
  UNIQUE(`visitor_ip`,`visited_date`)
)

CREATE TABLE `enquires` (
  `enquiry_id`       		int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `enquiry_ip`       		varchar(39) NOT NULL,
  `name`            		varchar(100) NOT NULL,
  `email_id`            		varchar(100) NOT NULL,
  `message`            		varchar(1000) NOT NULL,
  `visited_date`       		date NOT NULL,
  `DEL_FLG`       		char(1) NOT NULL,
  PRIMARY KEY(`enquiry_id`)
)

CREATE TABLE `users` (
  `login_id`       		int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `google_login_id`   varchar(50) DEFAULT NULL,
  `email_id`       		varchar(100) NOT NULL,
  `mobile`    			  varchar(10) DEFAULT NULL,
  `name`  				    varchar(50) NOT NULL,
  `password`      		varchar(256) NOT NULL,
  `img_url`           varchar(1000) DEFAULT NULL,
  `user_type`   			char(1) NOT NULL,
  `e_verify`   			  char(1) NOT NULL,
  `CRTD_DT`       		datetime NOT NULL,
  `CRTD_IP`       		varchar(39) NOT NULL,
  `DEL_FLG`       		char(1) NOT NULL,
  PRIMARY KEY(`login_id`),
  UNIQUE(`email_id`),
  UNIQUE(`google_login_id`)
)

CREATE TABLE `requirements` (
  `id`       		int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email_id`       		varchar(100) NOT NULL,
  `mobile`    			  varchar(10) DEFAULT NULL,
  `person_name`  				    varchar(50) NOT NULL,
  `company_name`      		varchar(256) NOT NULL,
  `sector`      		varchar(256) NOT NULL,
  `city`           varchar(50) DEFAULT NULL,
  `enquiry`   			varchar(1000) NOT NULL,
  `address`   			varchar(1000) NOT NULL,
  `CRTD_DT`       		datetime NOT NULL,
  `CRTD_IP`       		varchar(39) NOT NULL,
  `DEL_FLG`       		char(1) NOT NULL,
  PRIMARY KEY(`id`)
)
CREATE TABLE `resume` (
  `id`       		int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`  				    varchar(50) NOT NULL,
  `gender`       		varchar(1) NOT NULL,
  `email_id`       		varchar(100) NOT NULL,
  `city`           varchar(50) DEFAULT NULL,
  `mobile`    			  varchar(10) DEFAULT NULL,
  `key_skills`      		varchar(256) NOT NULL,
  `resume`      		varchar(256) NOT NULL,
  `CRTD_DT`       		datetime NOT NULL,
  `CRTD_IP`       		varchar(39) NOT NULL,
  `DEL_FLG`       		char(1) NOT NULL,
  PRIMARY KEY(`id`)
)
