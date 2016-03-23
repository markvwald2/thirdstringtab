<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN SVG 1.1//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>Third String Tab</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" id="vp" content="initial-scale=1.0,user-scalable=no,maximum-scale=1" media="(device-height: 568px)" />

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

	function random_tab($dirName = "/home/content/v/w/a/vwald/html/tab/bands/*/")
	{
		$files = glob($dirName . '*.php');
		$files = preg_grep('~/index.php~i', $files, PREG_GREP_INVERT);
		$file = array_rand($files);
		$link = $files[$file];	
		$filetrim = str_replace("/home/content/v/w/a/vwald/html/tab/bands/","/tab/bands/",$link);
		return $filetrim;
	}

	?>
	<div id="wrap">
		<div id="main">
			<div class="header">