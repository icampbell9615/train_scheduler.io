$( document ).ready(function() {
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
    $("#infoTrain").on("click", function(event) {
        event.preventDefault(); //no button reset
    
    //Set user input values 
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
    
    
        //Get all the new train info
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };
    
    });
    });
    
    