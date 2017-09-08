<?php
mb_language('ja');
mb_internal_encoding('UTF-8');

$mailTo = "★メールアドレス設置★";
$subject = mb_encode_mimeheader("フォームより送信されました");
$from = "From:".$outputdata["mailNo"];

//送信メッセージ
$message = <<< EOD
以下の内容がフォームより送信されました。
────────────────────────────────────
[氏名]
{$outputdata["Name"]}

[メールアドレス]
{$outputdata["mailNo"]}

[メッセージ]
{$outputdata["inquiry"]}
────────────────────────────────────
EOD;

$message = mb_convert_encoding($message , "ISO-2022-JP", "auto");
?>
