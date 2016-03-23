<?php include '../../include/header.php';?>

<script type="text/javascript">
window.setTimeout(pageScroll, 100000); // delay scrolling for 100 seconds
function pageScroll() {
    	window.scrollBy(0,1); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}
</script>

				<a class="left" href="../../index.php"><span class="arrow">&nbsp;</span> Home</a>
				<h1 class="title">Old Crow Medicine Show</h1>
				<a class="right" href="<?php echo random_tab(); ?>">Random!</a>
			</div><!--header-->

			<div class="content">

				<div class="box-white">
					<p><a href="take-em-away.php">Take 'Em Away<span><span class="arrow">&nbsp;</span></span></a></p>
					<p><a href="wagon-wheel.php">Wagon Wheel<span><span class="arrow">&nbsp;</span></span></a></p>

<?php include '../../include/footer.php';?>