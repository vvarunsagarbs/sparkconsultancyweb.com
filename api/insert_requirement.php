<?php
  header('Access-Control-Allow-Origin: *');
  include_once 'config.php';

  $page='insert_requirement.php';

  if($_GET['ip'] && $_GET['person'] && $_GET['companyName'] && $_GET['email'] && $_GET['city'] && $_GET['phone'] && $_GET['enquiry'] && $_GET['address'] && $_GET['sector']) {
    try {
      $dbc = new PDO("mysql:host=$server;dbname=$db", $config['username'], $config['password']);
      // set the PDO error mode to exception
      $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $message = 'DB Connected Successfully';
      } catch(PDOException $e) {
      $message = 'Connection Error';
      goto message;
    }

    $email = $_GET['email'];
    $phone = $_GET['phone'];
    $person = $_GET['person'];
    $companyName = $_GET['companyName'];
    $sector = $_GET['sector'];
    $city = $_GET['city'];
    $enquiry = $_GET['enquiry'];
    $address = $_GET['address'];
    $ip = $_GET['ip'];
    $del_flg = 'N';

    $insertNewRequirement = "INSERT INTO `requirements` (`email_id`, `mobile`, `person_name`, `company_name`, `sector`, `city`, `enquiry`, `address`, `CRTD_DT`, `CRTD_IP`, `DEL_FLG`) VALUES (:email,:phone,:person,:company,:sector,:city,:enquiry,:address,NOW(3),:ip,:del_flg)";

    $query = $dbc->prepare($insertNewRequirement);
    $query->bindParam(":email", $email);
    $query->bindParam(":phone", $phone);
    $query->bindParam(":person", $person);
    $query->bindParam(":company", $companyName);
    $query->bindParam(":sector", $sector);
    $query->bindParam(":city", $city);
    $query->bindParam(":enquiry", $enquiry);
    $query->bindParam(":address", $address);
    $query->bindParam(":ip", $ip);
    $query->bindParam(":del_flg", $del_flg);

    if ($query->execute()) {
      $status = 'S';
      $last_id = $dbc->lastInsertId();

      // Send mail
        $email_subject = "Your Enquiry - Reg";
				$email_body = "<html><body>";
				$email_body .= "Dear ".$person.",<br> We received your Requirement, Thank you for contacting us. We will reach you soon regarding your query.<br><br><strong>Thanks and Regards</strong><br>ABC Private Limited";
				$email_body .='</body></html>';
				$headers = $config["from_email"]. "\r\n";
				$headers .= "MIME-Version: 1.0\r\n";
				$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $email_admin_body = "<html><body>";
        $email_admin_body .= "Dear Sir,<br> We received a requirement from <strong>Mr.".$person."</strong>, The client query is <strong>".$enquiry."</strong>";
        $email_admin_body .='</body></html>';

				mail($email,$email_subject,$email_body,$headers);
        mail($config['to_email'], $email_subject, $email_admin_body, $headers);

    } else {
      $status = 'N';
    }
  }
  message:
   echo '{"page":"'.$page.'","status":"'.$status.'"}';
?>
