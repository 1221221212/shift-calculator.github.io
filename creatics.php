<?php

$ics_contents = $_POST['ics_contents'];
if (isset($_POST['ics_contents'])) {
$ics_contents = filter_input(INPUT_POST, 'ics_contents');
$filepath = "worktime.ics";
if (($fp = fopen($filepath, 'w')) !== false) {
flock($fp, LOCK_EX);
fwrite($fp,$ics_contents);
flock($fp, LOCK_UN);
fclose($fp);
}
}

?>
