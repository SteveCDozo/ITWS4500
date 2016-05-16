$(function() {
	// show the forms if the button is clicked
	$("#searchButton").click(function() {
		$("#searchForm input[type=text]").toggle();
	});
	$("#exportButton").click(function() {
		$("#exportForm input[type=text], #exportForm select").toggle();
	});
	// if the user clicks anywhere in the document (except for the corresponding form),
	// hide them if they are visible
	$(document).click(function(event) {
		if(!$(event.target).closest('#searchForm').length &&
		   !$(event.target).is('#searchForm')) {
			if($("#searchForm input[type=text]").is(":visible")) {
				$("#searchForm input[type=text]").hide();
			}
		}
		if(!$(event.target).closest('#exportForm').length &&
		   !$(event.target).is('#exportForm')) {
			if($("#exportForm input[type=text]").is(":visible")) {
				$("#exportForm input[type=text]").hide();
			}
			if($("#exportForm select").is(":visible")) {
				$("#exportForm select").hide();
			}
		}  
	});

});