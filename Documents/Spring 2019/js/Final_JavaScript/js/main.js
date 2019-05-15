
$(document).ready(function(){
  pullData();
})

/* jQuery --------------------------------index.html(About) ----> About.html */
// Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "80%";
}

// Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}




/* ---------------------------------------index.html(input)----> firebase(real time db) */

// Initialize Firebase

const config = {
  apiKey: "AIzaSyDSZq-YwNumQkcW7BYfuwsYSmtEe_A-YqM",
  authDomain: "small-talk-2d253.firebaseapp.com",
  databaseURL: "https://small-talk-2d253.firebaseio.com",
  projectId: "small-talk-2d253",
  storageBucket: "small-talk-2d253.appspot.com",
  messagingSenderId: "924489210003"
};

//initial the database app 

firebase.initializeApp(config);
const database = firebase.database();


// Get a reference to the database service

const smallTalk = database.ref('smallTalk');
console.log("smallTalk")


const dataObject = {
  Response: "null", 
  Occupation: "null",
  Nationality: "null",
  Year: "null"
};



// first scene, submit response data into object

$( "#reCollector" ).submit(function( event ) {
  event.preventDefault();

  switchScene();
  var response = $("#response").val();
  console.log(response);
  dataObject.Response = response;
  console.warn("______jsobject: ", dataObject)

});


// Change scene in the index.html

function switchScene(){
  if($("#firstScene").is(":visible")){
    $("#firstScene").hide();
    console.log("sceneSwitched");
    $("#secondScene").show();
  }else if($("#contentOption").is(":visible")){
    alert("direct to pull data page!");
  }
  console.log("sceneSwitched")
}

// second scene

$("#Demo").submit(function(event){
  event.preventDefault();

  // submit Demo into object

  const occupationValue = $('input[name="occupation"]:checked').val();
  dataObject.Occupation = occupationValue;
  const nationalityValue = $('input[name="nationality"]:checked').val();
  dataObject.Nationality = nationalityValue;
  const yearValue = $('input[name="year"]:checked').val();
  dataObject.Year = yearValue;

  // push object into database

  const status_insert = smallTalk.push(dataObject,finished);
  console.log('inserted', status_insert.key);

  //callback
  // smallTalk.push(dataObject, finished);

  function finished(error) {
    if (error) {
      console.log('ooops');
    } else {
      console.log('data saved!');
    }
  }

  alert("Submited"); //confirmation for submition
  console.log(dataObject,'occupation Submited!');
  window.location.href="data.html";
})


// pull data from database

function pullData(){
    if($(".pulledData").is(':visible')){


          console.warn("pulling data for you....");

          smallTalk.on("value", function(snapshot) {

                  console.warn(JSON.stringify(snapshot.val()));
                  const savedResponse = Object.entries(snapshot.val());
                  console.log(savedResponse);
                  const usersResponse = savedResponse.map(function(item){
                    return item[1]
                  })

                  for (var i = 0; i < usersResponse.length;i++){

                    if(usersResponse[i].Occupation == "international student"
                      && usersResponse[i].Nationality == "Chinese"
                      && usersResponse[i].Year == "1"){
                          $("#responseList_Inter_Ch_1").append(
                          "<li>" + usersResponse[i].Response + "</li>")
                    } else if (usersResponse[i].Occupation == "international student"
                      && usersResponse[i].Nationality == "Chinese"
                      && usersResponse[i].Year == "4"){
                          $("#responseList_Inter_Ch_4").append(
                          "<li>" + usersResponse[i].Response + "</li>")
                    } else if (usersResponse[i].Occupation == "international student"
                      && usersResponse[i].Nationality == "Chinese"
                      && usersResponse[i].Year == "6"){
                          $("#responseList_Inter_Ch_6").append(
                          "<li>" + usersResponse[i].Response + "</li>")
                    } else if (usersResponse[i].Occupation == "domastic student"){
                          $("#responseList_Domestic").append(
                          "<li>" + usersResponse[i].Response + "</li>")
                    } 
                  }
                  console.log(usersResponse);

        
                  var y = usersResponse.length-1;
                  console.log (usersResponse[y].Response);

                        

          }, function (error) {
             console.warn("fecth Failed error code: ", error);
          });
    }    
}






