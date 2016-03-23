<?php include '../../include/header.php';?>

<script type="text/javascript">
window.setTimeout(pageScroll, 50000); // delay scrolling for 50 seconds
function pageScroll() {
    	window.scrollBy(0,1); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}
</script>
			<a class="left" href="index.php"><span class="arrow">&nbsp;</span> Back</a>
				<h1 class="title">Gillian Welch - Look at Miss Ohio</h1>
				<a class="right" href="<?php echo random_tab(); ?>">Random!</a>
			</div><!--header-->

			<div class="content">
                
				<div class="tab">
					<pre><p><?php include '../../tab/gillianwelch/Gillian Welch - Look at Miss Ohio.txt';?> </p></pre>

<?php include '../../include/footer.php';?>