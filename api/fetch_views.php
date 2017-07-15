<?php
  header('Access-Control-Allow-Origin: *');
  include_once 'config.php';

  $page='fetch_visitors.php';

  if($_GET['ip']) {
    try {
      $dbc = new PDO("mysql:host=$server;dbname=$db", $config['username'], $config['password']);
      // set the PDO error mode to exception
      $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $message = 'DB Connected Successfully';
      } catch(PDOException $e) {
      $message = 'Connection Error';
      goto message;
    }
    $row_count = '';

    $result_array = array();

    $del_flg = 'N';
    $checkForViews = "SELECT SUM(`views`) as views FROM `visitors`";
    $query = $dbc->prepare($checkForViews);
    $query->bindParam(":del_flg", $del_flg);

    $query->execute();
		$result = $query->setFetchMode(PDO::FETCH_ASSOC);
		$result = $query->fetchAll();

      $jsonResult = json_encode($result);
  }
  message:
  //  echo '{"page":"'.$page.'","status":"'.$message.'"}';

   echo $jsonResult;
?>
