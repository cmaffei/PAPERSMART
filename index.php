<html>
<head>
  <title>PaperSmart HTML Preview</title>
</head>
<body>

<h1>PaperSmart HTML Preview</h1>
<table>
  <tr>
    <th width="230">Filename</th>
    <th align="left">Modified</th>
  </tr>
<?php


if ($handle = opendir('.')) {
  $filesArray = array();
  while (false !== ($file = readdir($handle)))
  {
    if ($file != "." && $file != ".." && (substr($file, -4) == 'html'))
    {
      $filesArray[] = $file;
      //$thelist .= '<p>'.$file.'</a></p>';
    }
  }
  closedir($handle);
  sort($filesArray);
}

foreach ($filesArray as $fl) {
  echo '
  <tr>
    <td><a href="'.$fl.'">'. $fl .'</a></td>
    <td>'. date('Y-m-d', filemtime($fl)) .'</td>
  </tr>
';
}



?>
</table>

<h2><a href="download.php">Create and download ZIP</a></h2>


</body>
</html>