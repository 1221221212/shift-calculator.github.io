<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>Contact</title>
</head>
<body>
<table border="1">
  <tr>
    <td>name</td>
    <td><?php echo htmlspecialchars($_POST["name"], ENT_QUOTES) ?></td>
  </tr>
  <tr>
    <td>email</td>
    <td><?php echo htmlspecialchars($_POST["mail"], ENT_QUOTES) ?></td>
  </tr>
  <tr>
    <td>message</td>
    <td><?php echo htmlspecialchars($_POST["message"], ENT_QUOTES) ?></td>
  </tr>
</table>
</body>
</html>
