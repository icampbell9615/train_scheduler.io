$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyDO0H87iPV-gb6wvW2YCCt9PAc45MfqYeI",
        authDomain: "train-scheduler-c034a.firebaseapp.com",
        databaseURL: "https://train-scheduler-c034a.firebaseio.com",
        projectId: "train-scheduler-c034a",
        storageBucket: "train-scheduler-c034a.appspot.com",
        messagingSenderId: "1004870621281",
        appId: "1:1004870621281:web:24872452b0cfbf51"
      };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    var database = firebase.database();
   
    
    //Submit given info
    $("#addTrainBtn").on("click", function(event) {
        event.preventDefault(); //no button reset
        
  // Your web app's Firebase configuration

        console.log("hello")
    //Set user input values 
        var trainName = $("#trainName").val().trim();
        var destination = $("#dest").val().trim();
        var firstTime = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();
    
    
        //Get all the new train info
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency

        };

        database.ref().push(newTrain);

        console.log(newTrain.train);
        console.log(newTrain.trainGoing);
        console.log(newTrain.trainComing);
        console.log(newTrain.everyXMin);

        trainName= $("#trainName").val("");
        destination = $("#dest").val("");
        firstTime = $("#firstTrain").val("");
        frequency = $("#frequency").val("");

    });

    
        database.ref().on("child_added", function(childSnapshot){
            console.log(childSnapshot)
            /*Create variables to store the data inside of*/
            var locoName = childSnapshot.val().name;
            var locoDestination = childSnapshot.val().destination;
            var locoFrequency = childSnapshot.val().frequency;
            var locoFirstTrain = childSnapshot.val().firstTrain;
        
                /*Create variables for time storage*/
                var firstTimeTransfered = moment(locoFirstTrain, "hh:mm").subtract(1, "years");
                    console.log(firstTimeTransfered);
        
                var presentTime = moment();
                    console.log("Current Time: " + moment(presentTime).format("hh:mm"));
        
                var differenceInTimes = moment().diff(moment(firstTimeTransfered), "minutes");
                    console.log("Time difference: " + differenceInTimes);
        
                var timeRemainder = differenceInTimes % locoFrequency;
                    console.log(timeRemainder);
        
                var minutesTilTrain = locoFrequency - timeRemainder;
                    console.log("Minutes til train: " + minutesTilTrain);
        
                var nextTrain = moment().add(minutesTilTrain, "minutes");
                    console.log("Next train arrival: " + moment(nextTrain).format("hh:mm"));
        
                var nextTime = moment(nextTrain).format("hh:mm");
        
            /*Add the train data into table*/
            $("tbody").append("<tr><td>" + locoName + "</td><td>" + locoDestination + "</td><td>" + locoFrequency + "</td><td>" + nextTime + "</td><td>" + minutesTilTrain + "</td></tr>");
        
        /*Childsnapshot and prevchildkey function*/
        });
        
        /*close function*/
        



});
    

    