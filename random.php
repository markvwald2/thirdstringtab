<?php

function random_tab($dirName = "/home/content/v/w/a/vwald/html/tab/bands/*/")
{
	$files = glob($dirName . '*.php');

	$files = preg_grep('~/index.php~i', $files, PREG_GREP_INVERT);
	$files = preg_grep('~/stevesongs~i', $files, PREG_GREP_INVERT);
	$files = preg_grep('~/wilco~i', $files, PREG_GREP_INVERT);
	$files = preg_grep('~/old97s~i', $files, PREG_GREP_INVERT);

	$file = array_rand($files);

	$link = $files[$file];	
	$filetrim = str_replace("/home/content/v/w/a/vwald/html/tab/bands/","/tab/bands/",$link);
	return $filetrim;
}

?>

<a href="<?php echo random_tab(); ?>">Get me a random song!</a>

<br>
<br>
<?php echo random_tab(); ?>