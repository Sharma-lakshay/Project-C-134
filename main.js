status= "";
object= [];
song= "";

function preload(){
song= loadSound("ALAEMA.mp3");
}

function setup(){
    canvas= createCanvas(380, 380);
    canvas.position(320, 130);
    video= createCapture(VIDEO);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status: Dectecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML= "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML= "Number of Objects Detected are: " + object.length;

            fill(r, g, b);
            percent= floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
    if (object.length == 0){
       song.loop()
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    status= true;

}

function gotResult(error, results){
 if(error){
     console.error(error);
 }

else{
    console.log(results);
    object= results;
}
}

