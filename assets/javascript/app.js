// Initialize Firebase
var config = {
	apiKey: "AIzaSyAETKprmQY34jnFYjh5wMrbXabyAF4uLdQ",
    authDomain: "trainschedule-614ee.firebaseapp.com",
    databaseURL: "https://trainschedule-614ee.firebaseio.com",
    storageBucket: "trainschedule-614ee.appspot.com"
};
firebase.initializeApp(config);

var dataRef = firebase.database();


// Initial Values
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = "";


// Capture Button Click
$("#addTrainBtn").on("click", function() {

	// Code in the logic for storing and retrieving the most recent user.
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrainTime = $('#firstTrainTime').val().trim();
	var frequency = $('#frequency').val().trim();


	// Code for the push
	dataRef.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	// Don't refresh the page!
	return false;
});

//Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot,value) {
	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrainTime);
	console.log(childSnapshot.val().frequency);

	// time for the first train
	var startingTime = moment(firstTrainTime, 'hh:mm');
	console.log('first time is: ' + moment(startingTime).format('hh:mm'));

	//current time for the time 
	var currentTime = moment();
	console.log("current time: " + moment(currentTime).format('hh:mm'));

	//difference between both
	var differentTime = moment().diff(moment(startingTime), "minutes");
	console.log("difference in startingTime and currentTime: " + differentTime);

	// mathematical equation
	var remaindingTime = differentTime % frequency;
	console.log('The remaining time is: ' + remaindingTime);

	//how far it is
	var timeAway = frequency - remaindingTime;
	console.log("time till train arrives: " + timeAway);

	//next train arrival
	var upcomingTrain = moment().add(timeAway, "minutes");
	console.log("Arrival Time: " + moment(upcomingTrain).format('hh:mm'));

	$('table').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + moment(upcomingTrain).format("hh:mm") + "</td><td>" + timeAway + "</td></tr>");


// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

