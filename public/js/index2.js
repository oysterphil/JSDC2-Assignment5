/*
	GA JS-DC-2 Final Project - Build a Storganize Profile
*/

//Model - displays the state of the application
var provider = new firebase.auth.GoogleAuthProvider();

var customer = [
	{
		user: '',
		token: '',
		firstName: 'first',
		lastName: 'last',
		email: '',
		serviceTier: 'premium',
		items: [
			{
				itemTagNumber: 1,
				itemPhoto: 'img/img1.jpg',
				itemDescription: 'Item1'
			},
			{
				itemTagNumber: 2,
				itemPhoto: 'img/img2.jpg',
				itemDescription: 'Item2'
			}
		],
		paidUpfront: true,
		dateOfFirstBilling: '5/3/2016',
		payMonthlyDate: '',
		deliveryHistory: [
			{
				deliveryDate: '1/15/2016',
				deliveryAddress: '3378 Stephenon',
				deliveryTime: '2 pm',
				deliveryItems: [
					{
					
						itemTagNumber: 1,
						itemPhoto: 'img/img1.jpg',
						itemDescription: 'Item1'
					},
					{
						itemTagNumber: 2,
						itemPhoto: 'img/img2.jpg',
						itemDescription: 'Item2'
					}
				]
			},
			{
				deliveryDate: '3/134/2016',
				deliveryAddress: 'Hughes Hall',
				deliveryTime: '2 pm',
				deliveryItems: [
					{
					
						itemTagNumber: 1,
						itemPhoto: 'img/img1.jpg',
						itemDescription: 'Item1'
					},
					{
						itemTagNumber: 2,
						itemPhoto: 'img/img2.jpg',
						itemDescription: 'Item2'
					}
				]
			}
		]
	}
];

//View - contains the templates and functions to render data into the templates.

function firebaseAuthenticate() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  customer.token = result.credential.accessToken;
	  // The signed-in user info.
	  customer.user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function renderProfile() {	
	var source = $('#profileInformationTemplate').html();
	var template = Handlebars.compile(source);
	$('#profileInformation').html(template(customer[0]));
}

function renderDeliveries() {	
	var source = $('#deliveryHistoryTemplate').html();
	var template = Handlebars.compile(source);
	$('#deliveryHistory').html(template(customer[0]));
}

// function renderDeliveries() {
// 	var source = $('#deliveryHistoryTemplate').html();
// 	var template = Handlebars.compile(source);
// 	$('#deliveryHistory').html(template(customer[0]));
// }

function renderItems() {
	var source = $('#viewItemsTemplate').html();
	var template = Handlebars.compile(source);
	$('#viewItems').html(template(customer[0]));
}

function renderScheduleDelivery() {

}

// Controller - Controller is responsible for event listeners and communicating those 
// events to the Model.

function setup() {
	renderProfile();
	// renderDeliveries();
	renderItems();
	renderScheduleDelivery();

	$('#signUp').on('click', firebaseAuthenticate);
	$('#login').on('click', firebaseAuthenticate);

/* 	EXAMPLE LISTENERS:
	$('#countUp').on('click', countUp);
	$('#countDown').on('click', countDown);
	$('#reset').on('click', reset);
*/

}

$(document).ready(setup);
