<?php include '../include/header.php';?>

<script type="text/javascript">
window.setTimeout(pageScroll, 60000); // delay scrolling for 60 seconds
function pageScroll() {
    	window.scrollBy(0,1); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}
</script>

				<h1 class="title">I Will Survive</h1>
			</div><!--header-->

			<div class="content">
                
				<div class="tab">
					<pre><p><?php include '../../tab/cake/cake - i will survive.txt';?> </p></pre>

<?php include '../include/footer.php';?>