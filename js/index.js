/* 

JavaScript Development - Assignment 5

Countly MVC

The assignment is to make an MVC application used for counting things. Here are the specifications for the application:

It should have three buttons (one for counting up, one for counting down, one for resetting to 0)
It will display the count to the user
If the count goes above 100, the color of the number will be red
If the count goes below 0, the color of the number will be blue

*/

//Model - displays the state of the application

// Note that countInfo is an object

var countInfo = {
	count: 0,
	greaterThanOneHundred: false,
	lessThanZero: false
}

//View - contains the templates and functions to render data into the templates.

/*
	renderCount() is called initially by setup(), which is called when the document is ready.
	
	It is then called again after the event 'click' on each button triggers its respective
	function. Each button changes the count, either increasing, decreasing, or resetting it. 
	renderCount() visually updates the count to reflect the putton pressed.

	renderCount() first references and compiles the Handlebars template created in index.html.
	It does this by first creating a local variable 'source' and setting it equal to the contents
	currently contained within the #count-template block in index.html. Then, it compiles that
	html so that it can be used like a function that objects can be passed into and dynamic 
	content rendered. 

	var source = $('#count-template').html();
	var template = Handlebars.compile(source);

	Finally, renderCount() adds html to the '#count' id tag of the <h3></h3> block by
	passing the object countInfo into the just compiled template, thereby adding the new 
	rendered element to the DOM:

	$('#count').html(template(countInfo));
*/

function renderCount() {
	var source = $('#count-template').html();
	var template = Handlebars.compile(source);
	$('#count').html(template(countInfo));
}


// Controller - Controller is responsible for event listeners and communicating those 
// events to the Model.

/* 
	Setup first calls renderCount() in order to display the initial count, and then it
	established event listeners .on and 'click' for each of the three buttons:
	countUp
	coundDown
	reset
*/

function setup() {
	renderCount();

	$('#countUp').on('click', countUp);
	$('#countDown').on('click', countDown);
	$('#reset').on('click', reset);
}

/*
	countUp first adds 1 to the current count stored in the object countInfo and
	the key count. 

	Next, it checks if the count is greater than 100, changing the 
	key greaterThanOneHundred to true if it is.

	Then, it checks if the count is less than 0, changing the 
	key lessThanZero to false if it is. 

	Finally, it calls renderCount() in order to update the count.
*/

function countUp() {
	countInfo.count += 1;
	if (countInfo.count > 100) {
		countInfo.greaterThanOneHundred = true;
	} else if (countInfo.count >= 0) {
		countInfo.lessThanZero = false;
	} 
	renderCount();
}

/*
	countDown first subtracts 1 to the current count stored in the object 
	countInfo and the key count. 

	Next, it checks if the count is less than 0, changing the 
	key lessThanZero to true if it is. 

	Then, it checks if the count is less than or equal to 100, changing the 
	key greaterThanOneHundred to false if it is.

	Finally, it calls renderCount() in order to update the count.
*/

function countDown() {
	countInfo.count -= 1;
	if (countInfo.count < 0) {
		countInfo.lessThanZero = true;
	} else if (countInfo.count <= 100) {
		countInfo.greaterThanOneHundred = false;
	} 
	renderCount();
}

/*
	Self-explanatory
*/

function reset() {
	countInfo.count = 0;
	countInfo.greaterThanOneHundred = false;
	countInfo.lessThanZero = false;

	renderCount();
}


$(document).ready(setup);
