// firebase api 
var config = {
    apiKey: "AIzaSyArs_TIbKeL5vWjdUdamqkNSyKlAc7dul8",
    authDomain: "pleasework-b2de6.firebaseapp.com",
    databaseURL: "https://pleasework-b2de6.firebaseio.com",
    projectId: "pleasework-b2de6",
    storageBucket: "pleasework-b2de6.appspot.com",
    messagingSenderId: "480831941137"
};
firebase.initializeApp(config);

var database = firebase.database();


// on click to create new train
$("#add-train-button").on("click", function (event) {
    event.preventDefault();

    //getting users inputs using .val
    var nameOfTrain = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequencyOfTrain = $("#frequency-input").val().trim();

    //variables that will be stored in firebase, creating a local object to be pushed into database.

    var train = {
        name: nameOfTrain,
        destination: destinationInput,
        time: trainTime,
        frequency: frequencyOfTrain

    };

    // time to push the object to firebase
    database.ref().push(train);

    console.log(train.name);
    console.log(train.destination);
    console.log(train.time);
    console.log(train.frequency);

    //clear text
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

})


//row adding event for every new train added
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //store into variables
    var nameOfTrain = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequencyOfTrain = childSnapshot.val().frequency;

    //train information 
    console.log(nameOfTrain);
    console.log(destinationInput);
    console.log(trainTime);
    console.log(frequencyOfTrain);


    //using moment.js math
    var trainPrettyTime = moment.unix(trainTime).subtract(1, "years");
 


    var remainder = moment().diff(moment(trainPrettyTime), "X","minutes") % frequencyOfTrain;
  
    var nextTrainMin = frequencyOfTrain - remainder;
  

    var arrivalTrain = moment().add(nextTrainMin, "minutes").format("hh:mm");

 

    var createRow = $("<tr>").append(
        $("<td>").text(nameOfTrain),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyOfTrain),
        $("<td>").text(arrivalTrain),
        $("<td>").text(nextTrainMin),
    );


    $("#train-table > tbody").append(createRow);




})