// moment.min.js

var config = {
	apiKey: "AIzaSyACmRLL4zfp4VD1W3BxYfwZFxlGxUUb090",
    authDomain: "classproject-e1d9b.firebaseapp.com",
    databaseURL: "https://classproject-e1d9b.firebaseio.com",
    projectId: "classproject-e1d9b",
    storageBucket: "classproject-e1d9b.appspot.com",
    messagingSenderId: "1066118539728"
  };

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var current;
var curStamp;
var midStamp;
var stStamp;
var diffStamp;
var rem;
var minAway;
var nextArrival;

database.ref().on("child_added", function(childSnapshot) {

// Log everything that's coming out of childSnapshot
	console.log(childSnapshot.val().trainName);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrainTime);
	console.log(childSnapshot.val().frequency);

      // full list of items to the well
       // var str
    currenT = moment();
    curStamp = moment(currenT, "HH:mm");
    midStamp = moment("24:00", "HH:mm"); 
    stStamp = moment(childSnapshot.val().firstTrainTime, "HH:mm");
    if(curStamp <= stStamp) {
        nextArrival = stStamp;
        minAway =  stStamp.diff(curStamp, 'minutes');
    } else {
        console.log(curStamp.diff(stStamp, 'minutes'));
        console.log(midStamp.format("hh:mm"));
        diffStamp = curStamp.diff(stStamp, 'minutes');
        rem = diffStamp % (childSnapshot.val().frequency);
        minAway  = childSnapshot.val().frequency - rem;
        nextArrival = currenT.add(minAway, 'minutes')
        console.log("minutes to the next train " + minAway);
    }

    // var currenT = moment();
    // console.log("Display the current time plus 10 min: " + currDisp)
    // var 
    console.log("moment curStamp " + currenT);
    console.log("nextArrival " + nextArrival);

    // var diffStamp = curStamp - stStamp;
    // console.log(moment().format(diffStamp));
 
    // var tablerow = $("<tr></tr>");
    var tableRow = $("<tr>");

	tableRow.append("<td>" + childSnapshot.val().trainName + "</td>");
	tableRow.append("<td>" + childSnapshot.val().destination + "</td>");      
	tableRow.append("<td>" + childSnapshot.val().frequency + "</td>"); 
	tableRow.append("<td>" + nextArrival.format("hh:mm a") + "</td>");		     
	tableRow.append("<td>" + minAway + " minutes" + "</td>");   		   
      

      $('#trainTable').append(tableRow);

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

$("#addTrainBtn").on("click", function(event){
	event.preventDefault();
    var name = $("#trainNameInput").val().trim();
    var dest = $("#destinationInput").val().trim();
    var fTrT = $("#firstTTInput").val().trim();
    var firstTrainTime = moment(fTrT, 'HH:mm').format('hh:mm');
    console.log(firstTrainTime);
    // console.log(moment("13:00", 'HH:mm').format('hh:mm a'));
    var freq = $("#frequencyInput").val().trim();
    console.log("seeing the event")

    database.ref().push(
    {
        trainName: name,
        destination: dest,
        firstTrainTime: firstTrainTime,
        frequency: freq,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});