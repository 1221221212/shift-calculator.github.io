<?php 

//不正呼び出しは弾く
if($_SERVER["REQUEST_METHOD"] != "POST" OR $_SERVER["HTTP_X_REQUESTED_WITH"] != "XMLHttpRequest"){

          header("HTTP/1.0 404 Not Found");
          return;
}

//なんか処理しているなーと思わせる 1秒間のスリープ
sleep(1);

$data =json_decode($_POST["data"],true);
$outputdata = array();

foreach ($data as $val1) {
	
	$outputdata += array(
		$val1["name"]	=> htmlspecialchars($val1["value"])
	);
	
}

include "tmpl.php";

if(mail($mailTo, $subject, $message ,$from)){

echo "true";

}else{

echo "false";

}


?>