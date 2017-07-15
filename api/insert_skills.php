<?php
  header('Access-Control-Allow-Origin: *');
  include_once 'config.php';

  $page='insert_visitors.php';

  if($_GET['ip'] && $_GET['name'] && $_GET['gender'] && $_GET['email'] && $_GET['city'] && $_GET['phone'] && $_GET['skills']) {
    try {
      $dbc = new PDO("mysql:host=$server;dbname=$db", $config['username'], $config['password']);
      // set the PDO error mode to exception
      $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $message = 'DB Connected Successfully';
      } catch(PDOException $e) {
      $message = 'Connection Error';
      goto message;
    }
    $name = $_GET['name'];
    $gender = $_GET['gender'];
    $email = $_GET['email'];
    $city = $_GET['city'];
    $message = $_GET['phone'];
    $skills = $_GET['skills'];
    $ip = $_GET['ip'];
    $resume = 'N';
    $del_flg = 'N';

    $insertNewSkills = "INSERT INTO `resume`(`name`, `gender`, `email_id`, `city`, `mobile`, `key_skills`, `resume`, `CRTD_DT`, `CRTD_IP`, `DEL_FLG`) VALUES (:name,:gender,:email,:city,:phone,:skills,:resume,NOW(3),:ip,:del_flg)";

    $query = $dbc->prepare($insertNewSkills);
    $query->bindParam(":name", $name);
    $query->bindParam(":gender", $gender);
    $query->bindParam(":email", $email);
    $query->bindParam(":city", $city);
    $query->bindParam(":phone", $phone);
    $query->bindParam(":skills", $skills);
    $query->bindParam(":resume", $resume);
    $query->bindParam(":ip", $ip);
    $query->bindParam(":del_flg", $del_flg);

    if ($query->execute()) {
      $status = 'S';
      $last_id = $dbc->lastInsertId();

      // Send mail
        $email_subject = "Your Enquiry - Reg";
				$email_body = "<html><body>";
				$email_body .= "Dear ".$name.",<br> We received your resume, Thank you for contacting us. We will reach you soon regarding your query.<br><br><strong>Thanks and Regards</strong><br>ABC Private Limited";
				$email_body .='</body></html>';
				$headers = $config["from_email"]. "\r\n";
				$headers .= "MIME-Version: 1.0\r\n";
				$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
        $email_admin_body = "<html><body>";
        $email_admin_body .= "Dear Sir,<br> We received a resume from <strong>Mr.".$name."</strong>, The job seeker query is <strong>".$message."</strong>";
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
