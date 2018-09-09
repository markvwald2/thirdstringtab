<?php $title="Aerosmith - What It Takes"; include '../../include/header.php';?>

<script type="text/javascript">
window.setTimeout(pageScroll, 70000); // delay scrolling for 70 seconds
function pageScroll() {
    	window.scrollBy(0,1); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}
</script>
			<a class="left" href="index.php"><span class="arrow">&nbsp;</span> Aerosmith</a>
				<h1 class="title"><?php echo $title; ?></h1>
				<a class="right" href="<?php echo random_tab(); ?>">Random!</a>
			</div><!--header-->

			<div class="content">
                
				<div class="tab">
					<pre><p><?php include '../../tab/aerosmith/Aerosmith - What It Takes.txt';?> </p></pre>

<?php include '../../include/footer.php';?>