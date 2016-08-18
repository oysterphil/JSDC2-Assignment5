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
        email: 'teat@test.com',
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

// Login Controller

function handleRegister() {
  var email = $('input[name="email"]').val();
  var password = $('input[name="password"]').val();

  firebase.auth().createUserWithEmailAndPassword(email, password);
}

function handleLogin() {
  var email = $('input[name="email"]').val();
  var password = $('input[name="password"]').val();

  firebase.auth().signInWithEmailAndPassword(email, password);
}

function handleGoogleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
}

function handleSignout() {
  firebase.auth().signOut();
}

function handleAuthStateChange() {
  var user = firebase.auth().currentUser;

  if (user) {
    customer.signedIn = true;
    customer.user = user;
  } else {
    customer.signedIn = false;
    customer.user = undefined;
  }

  renderAllTemplates();
}

// Delivery Controller

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
  
  renderAllTemplates();
  hideDeliveryForm();
}

//General Controller 

function renderAllTemplates() {
  renderLogin();
  renderProfile();
  renderDeliveries();
  renderItems();
  renderScheduleDelivery();
}

function setup() {
  compileTemplates();
  renderLogin();
  renderProfile();
  renderDeliveries();
  renderItems();
  renderScheduleDelivery();

  // Auth Event Listeners
  $('#loginInformation').on('click', '#register', handleRegister);
  $('#loginInformation').on('click', '#login', handleLogin);
  $('#loginInformation').on('click', '#googleLogin', handleGoogleLogin);
  $('#loginInformation').on('click', '#logout', handleSignout);
  firebase.auth().onAuthStateChanged(handleAuthStateChange);

  // Database Event Listeners
  
  // Create
  // firebase.database().ref(key).on('value', __callback__g)

  $('#scheduleDelivery').on('click', '#showScheduleDelivery', revealDeliveryForm);
  $('#scheduleDelivery').on('click', '#scheduleDeliverySubmit', processDeliveryRequest);
  // $( "input[type=checkbox]" ).on( "click", countChecked);
  //$('#selectItems').on('click', '.status', markChecked);

  // document.querySelector('#loginInformation').addEventListener('click', handleLogin, '#login');
  // document.querySelector('#loginInformation').addEventListener('click', handleGoogleLogin, '#googleLogin');
  // document.querySelector('#loginInformation').addEventListener('click', handleSignout, '#logout');
  // document.querySelector('#scheduleDelivery').addEventListener('click', revealDeliveryForm, '#showScheduleDelivery');
  // document.querySelector('#scheduleDelivery').addEventListener('click', processDeliveryRequest, '#scheduleDeliverySubmit');

}

$(document).ready(setup);
