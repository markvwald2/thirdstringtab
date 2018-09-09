<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN SVG 1.1//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title><?php echo $title;?></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" id="vp" content="initial-scale=1.0,user-scalable=no,maximum-scale=1" media="(device-height: 568px)" />

<!-- Enabling Rich Previews Of Shared Links -->
<meta property="og:title" content="<?php echo $title; ?>" />
<meta property="og:image" content="http://zerobureau.com/tab/img/tab-preview.png" />
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="465" />
<meta property="og:image:height" content="466" />
<meta name="description" content="Zero Bureau Guitar Tablature" />
<meta property="og:description" content="Zero Bureau Guitar Tablature" />

<link rel="apple-touch-icon" href="favicon/favicon-114.png" />
<link rel="apple-touch-icon" href="favicon/favicon-144.png" />
<link rel="apple-touch-icon" href="favicon/favicon-512.png" />
<link rel="apple-touch-icon" href="favicon/favicon-1024.png" />
<meta name="apple-mobile-web-app-capable" content="yes" /><!-- hide top bar in mobile safari-->
<meta name="apple-mobile-web-app-status-bar-style" content="black" /><!-- translucent top bar -->
<link rel="shortcut icon" href="/favicon.ico">
<link rel="stylesheet" href="/tab/css/style.css">

<script src="/tab/js/stay_standalone.js" type="text/javascript"></script>
</head>

<body>
	<!-- random tab selector -->
	<?php

	function random_tab($dirName = "/home/content/59/4342359/html/tab/bands/*/")
	{
		$files = glob($dirName . '*.php');
		$files = preg_grep('~/index.php~i', $files, PREG_GREP_INVERT);
		$files = preg_grep('~/stevesongs~i', $files, PREG_GREP_INVERT);
		$files = preg_grep('~/wilco~i', $files, PREG_GREP_INVERT);
		$files = preg_grep('~/old97s~i', $files, PREG_GREP_INVERT);
		$files = preg_grep('~/humor-in-uniform~i', $files, PREG_GREP_INVERT);
		$file = array_rand($files);
		$link = $files[$file];	
//		$filetrim = str_replace("/home/content/v/w/a/vwald/html/tab/bands/","/tab/bands/",$link);
		$filetrim = str_replace("/home/content/59/4342359/html/tab/bands/","/tab/bands/",$link);
		return $filetrim;
	}

	?>
	<div id="wrap">
		<div id="main">
			<div class="header">