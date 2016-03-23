<?php include '../include/header.php';?>

<script type="text/javascript">
window.setTimeout(pageScroll, 90000); // delay scrolling for 30 seconds
function pageScroll() {
    	window.scrollBy(0,1); // horizontal and vertical scroll increments
    	scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
}
</script>

				<h1 class="title">New Madrid</h1>
			</div><!--header-->

			<div class="content">
                
				<div class="tab" style="font-size: 14px">
					<pre><p><?php include '../../tab/uncletupelo/uncle tupelo - new madrid.txt';?> </p></pre>

<?php include '../include/footer.php';?>