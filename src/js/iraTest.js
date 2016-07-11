
$(document).ready(function() {


	function calcActivePage (pagesCount, currentSlide) {
		var active;
		// code here
		active = currentSlide % pagesCount;
		console.log(active);
		activePage = (currentSlide - active)/pagesCount;
		console.log(activePage);
	}
	calcActivePage(3,9);


});
