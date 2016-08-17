/*
    GA JS-DC-2 Final Project - Build a Storganize Profile
*/

//Model - displays the state of the application

var customer = 
    {
        user: undefined,
        signedIn: false,
        token: '',
        firstName: 'test',
        lastName: 'test1',
        email: '',
        serviceTier: '',
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
          },
          {
            itemTagNumber: 3,
            itemPhoto: 'img/img3.jpg',
            itemDescription: 'Item3'
          }
        ],
        paidUpfront: true,
        dateOfFirstBilling: '5/3/2016',
        payMonthlyDate: '',
        deliveryLog: [
          {
            deliveryDate: '1/15/2016',
            deliveryAddress: '3378 Stephenon',
            deliveryTime: '2 pm',
            deliveryItems: [
              {
                itemTagNumber: 1,
                itemPhoto: 'img/img1.jpg',
                itemDescription: 'Item1',
              },
              {
                itemTagNumber: 2,
                itemPhoto: 'img/img2.jpg',
                itemDescription: 'Item2',
              }
            ],
            delivered: true
          },
          {
            deliveryDate: '3/13/2016',
            deliveryAddress: 'Hughes Hall',
            deliveryTime: '4 pm',
            deliveryItems: [
              {
              
                itemTagNumber: 1,
                itemPhoto: 'img/img1.jpg',
                itemDescription: 'Item1',
              },
              {
                itemTagNumber: 2,
                itemPhoto: 'img/img2.jpg',
                itemDescription: 'Item2',
              }
            ],
            delivered: true
          },
          {
            deliveryDate: '12/2/2017',
            deliveryAddress: 'Some Random Place',
            deliveryTime: '11 am',
            deliveryItems: [
              {
              
                itemTagNumber: 34,
                itemPhoto: 'img/img1.jpg',
                itemDescription: 'Item1',
              },
              {
                itemTagNumber: 432,
                itemPhoto: 'img/img2.jpg',
                itemDescription: 'Item2',
              }
            ],
            delivered: false
          }
        ],
    };

//View - contains the templates and functions to render data into the templates.

var loginTemplate;
var profileTemplate;
var deliveriesTemplate;
var itemsTemplate;
var scheduleDeliveryTemplate;

function compileTemplates() {
  var loginSource = $('#loginInformationTemplate').html();
  loginTemplate = Handlebars.compile(loginSource);

  var profileSource = $('#profileInformationTemplate').html();
  profileTemplate = Handlebars.compile(profileSource);

  var deliveriesSource = $('#viewDeliveriesTemplate').html();
  deliveriesTemplate = Handlebars.compile(deliveriesSource);

  var itemsSource = $('#viewItemsTemplate').html();
  itemsTemplate = Handlebars.compile(itemsSource);

  var scheduleDeliverySource = $('#scheduleDeliveryTemplate').html();
  scheduleDeliveryTemplate = Handlebars.compile(scheduleDeliverySource);
}

function renderLogin() {
  var loginHtml = loginTemplate(customer);
  $('#loginInformation').html(loginHtml);
}

function renderProfile() {  
  var profileHtml = profileTemplate(customer);
  $('#profileInformation').html(profileHtml);
}

function renderDeliveries() {
  var deliveriesHtml = deliveriesTemplate(customer);
  $('#deliveryLog').html(deliveriesHtml);
}

function renderItems() {
  var itemsHtml = itemsTemplate(customer);
  $('#viewItems').html(itemsHtml);
}

function renderScheduleDelivery() {
  var scheduleDeliveryHtml = scheduleDeliveryTemplate(customer);
  $('#scheduleDelivery').html(scheduleDeliveryHtml);
}


// Controller - Controller is responsible for event listeners and communicating those 
// events to the Model.

function loggedIn() {
  document.getElementById("googleLogin").hidden = "hidden";
  document.getElementById("logout").hidden = "";
}

function authenticate() {
  var provider = new firebase.auth.GoogleAuthProvider();
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
  loggedIn();
}

function logOut() {
  firebase.auth().signOut().then(function() {
    document.querySelector('#googleLogin').style.display="inline";
    document.querySelector('#logout').style.display="none";  }, function(error) {
    // An error happened.
  });
}

function revealDeliveryForm() {
  document.querySelector('#scheduleDeliveryForm').style.display="inline";
}

function hideDeliveryForm() {
  document.querySelector('#scheduleDeliveryForm').style.display="none";
}

function processDeliveryRequest() {
  event.preventDefault();

  var itemsToDeliver = [];
  $("input:checked").each(function(){
    itemsToDeliver.push(
      {
        itemTagNumber: $(this).val(),
        itemPhoto: $(this).attr('data-photo'),
        itemDescription: $(this).attr('data-description')
      });
  }),

  customer.deliveryLog.push({
    deliveryDate: $('#scheduleDeliveryDate').val(),
    deliveryAddress: $('#scheduleDeliveryAddress').val(),
    deliveryTime: $('#scheduleDeliveryTime').val(),
    deliveryItems: itemsToDeliver,
    delivered: false
  });
  
  renderDeliveries();
  renderScheduleDelivery();
  hideDeliveryForm();
}

// function countChecked() {
//   var n = $( "input:checked" ).length;
//   $("#countChecked").text( n + (n === 1 ? " is" : " are") + " checked!" );
// }

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.querySelector('#googleLogin').style.display="none";
    document.querySelector('#logout').style.display="inline";
  } else {
    // No user is signed in.
  }
});

function setup() {
  compileTemplates();
  renderLogin();
  renderProfile();
  renderDeliveries();
  renderItems();
  renderScheduleDelivery();

  //document.querySelector('#signUp').addEventListener('click', firebaseAuthenticate);
  document.querySelector('#googleLogin').addEventListener('click', authenticate);
  document.querySelector('#logout').addEventListener('click', logOut);
  document.querySelector('#showScheduleDelivery').addEventListener('click', revealDeliveryForm);
  document.querySelector('#scheduleDeliverySubmit').addEventListener('click', processDeliveryRequest);
  // $( "input[type=checkbox]" ).on( "click", countChecked);
  //$('#selectItems').on('click', '.status', markChecked);

/*  EXAMPLE LISTENERS:
    $('#countUp').on('click', countUp);
    $('#countDown').on('click', countDown);
    $('#reset').on('click', reset);
*/

}

$(document).ready(setup);
