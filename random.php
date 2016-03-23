<?php

function random_tab($dirName = "/home/content/v/w/a/vwald/html/tab/bands/*/")
{
	$files = glob($dirName . '*.php');

	$files = preg_grep('~/index.php~i', $files, PREG_GREP_INVERT);

	//print_r ($filestrim);

	$file = array_rand($files);



	$link = $files[$file];	
	//$filetrim = trim($link, "vwald");
	$filetrim = str_replace("/home/content/v/w/a/vwald/html/tab/bands/","/tab/bands/",$link);
	return $filetrim;
}

?>

<a href="<?php echo random_tab(); ?>">Get me a random song!</a>
