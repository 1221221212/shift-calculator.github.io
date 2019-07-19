<?php

$ics_content = $_POST['ics_content'];
if (isset($_POST['ics_content'])) {
$ics_content = filter_input(INPUT_POST, 'ics_content');
$filepath = "worktime.ics";
if (($fp = fopen($filepath, 'w')) !== false) {
flock($fp, LOCK_EX);
fwrite($fp,$ics_content);
flock($fp, LOCK_UN);
fclose($fp);
}
}

?>
