/* //////////////////// SEARCH MODULE ///////////////////// */
// https://codepen.io/MichaelHelgesen/pen/wjWMOo

var searchController = (function () {

})();


/* //////////////////// UI MODULE ///////////////////// */

var UIcontroller = (function () {

	// Collect the DOM strings for easy editing
	var DOMstrings = {
		searchBox: "#searchBox input",
		list: "#list ul",
		noResult: "#noResult",
		resetLink: "#reset",
		resetButton: ".close-icon-inactive",
		hits: "#numberOfHits"		
	}

	// Return the DOM strings so they are avaliable in other modules
	return {

		getDOMstrings: function () {

			return DOMstrings;

		}
	};
})();


/* //////////////////// CONTROLLER MODULE ///////////////////// */

var controller = (function (searchController, UIcontroller) {

	// Get access to the DOM strings
	var DOM = UIcontroller.getDOMstrings();

	// Define the list to search
	var listToSearch = document.querySelector(DOM.list).getElementsByTagName("li");

	// Define the search field
	var input = document.querySelector(DOM.searchBox);

	// Define the "number of hits" text
	var totalHits = document.querySelector(DOM.hits);

	// Define the "no result" text
	var noResult = document.querySelector(DOM.noResult);

	// Define the reset buttons
	var resetLnk = document.querySelector(DOM.resetLink);
	var resetBtn = document.querySelector(DOM.resetButton);

	// Set up the event listeners
	var setupEventListeners = function () {

		// The searchBox
		document.querySelector(DOM.searchBox).addEventListener("change", filterList);
		document.querySelector(DOM.searchBox).addEventListener("keyup", filterList);

		// The reset buttons
		document.querySelector(DOM.resetLink).addEventListener("click", resetList);
		document.querySelector(DOM.resetButton).addEventListener("click", resetList);
	};

	// The functions that fires when you insert a character in the search field
	var filterList = function () {

		// Define how many items in the list
		var	numberOfVisibleItems = listToSearch.length;

		// Define the search input
		searchInput = input.value;

		// Making sure the "no results" text is hidden
		noResult.style.display = "none";

		// Mking sure the total number of hits is displayed
		totalHits.style.display = "block";

		/* I found out that an empty RexEx matches all lines. That created a lot of unwanted code if the search field was emptied.
		To avoid this I created an if statement that checks to see if the search field has at least one character.
		If not, it removes all previously created spans if there were any, or stops it from beeing created.*/
		var regex = new RegExp(searchInput, 'gi');

		// If input field contains more than one character
		if (searchInput.length > 0) {

			// Set the reset button to inactive
			resetBtn.classList.add("close-icon-active");

			// Iterate through all the elements in the list. 
			for (i = 0; i < listToSearch.length; i++) {

				// If the content in one of the elements in the list matches the input from the search field...
				if (listToSearch[i].textContent.match(regex)) {

					// ...we display it using CSS 
					// Note to self: They are visible by standard. Better if we apply "block" only if it's "none"?
					listToSearch[i].style.display = "block";

					// We make a function that replaces the inner text of the element in the list with the characters from the input.
					var response = listToSearch[i].innerText.replace(regex, function (str) {

						// We insert a span to be able to hightlight the matching text
						return "<span class='hl'>" + str + "</span>"

					});

					// The inner HTML is replaced by the variable created above. 
					listToSearch[i].innerHTML = response;
				
				// If the input doesn't match any elements in the list...
				} else {
					// ...we hide them using CSS
					listToSearch[i].style.display = "none";

					// Update number of visible items
					numberOfVisibleItems -= 1;					
				};

				// If no visible items, we display a "no result" message and hide number of hits.
				if (numberOfVisibleItems === 0) {
					
					noResult.style.display = "block";

					totalHits.style.display = "none";
				
				};
			};

		} else {

			// If no characters are in the search field, we show all...
			for (i = 0; i < listToSearch.length; i++) {

				listToSearch[i].style.display = "block";

				// ...and remove all instances of span if there were any. Cleans up
				listToSearch[i].innerHTML = listToSearch[i].textContent;

				// Set the reset button to inactive
				resetBtn.classList.remove("close-icon-active");

				totalHits.style.display = "none";
			};
		};

		// Display the number of hits
		totalHits.innerHTML = "<span>" + numberOfVisibleItems + " / " + listToSearch.length + "</span>";

		
	};

	// The reset function that fires when pressing "reset" in "no result" text.
	var resetList = function () {

		// We reset the search field
		input.value = "";

		// And fire the filterList function once again. Since input now is empty, all elements will show.
		filterList();

	};

	return {
		init: function () {
			console.log("Application has started");
			setupEventListeners();
		}
	};

})(searchController, UIcontroller);

controller.init();
