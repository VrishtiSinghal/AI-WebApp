scoreLeftWrist=0; 
scoreRightWrist=0;
song= "";
leftX=0;
leftY=0;
rightX=0;
rightY=0;
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();   
    poseNet= ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet is initialized')
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score; 
        scoreLeftWrist = results[0].pose.keypoints[9].score; 
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist); 
        rightX = results[0].pose.rightWrist.x; 
        rightY = results[0].pose.rightWrist.y; 
        console.log("rightWristX = " + rightX +" rightWristY = "+ rightY); 
        leftX = results[0].pose.leftWrist.x; 
        leftY = results[0].pose.leftWrist.y; 
        console.log("leftWristX = " + leftX +" leftWristY = "+ leftY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist>0.02){
        circle(rightX,rightY,20);

        if(rightY>0 && rightY<=100){
            document.getElementById("speed").innerHTML="Speed= 0.5x";
            song.rate(0.5);
        }
        if(rightY>100 && rightY<=200){
            document.getElementById("speed").innerHTML="Speed= 1x";
            song.rate(1);
        }
        if(rightY>200 && rightY<=300){
            document.getElementById("speed").innerHTML="Speed= 1.5x";
            song.rate(1.5);
        }
        if(rightY>300 && rightY<=400){
            document.getElementById("speed").innerHTML="Speed= 2x";
            song.rate(2);
        }
        if(rightY>400 && rightY<=500){
            document.getElementById("speed").innerHTML="Speed= 2.5x";
            song.rate(2.5);
        }
    }
    

    

    if(scoreLeftWrist> 0.2){
        circle(leftX,leftY,20);
        InNumberleftWristY=Number(leftY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
}


function preload(){
    song= loadSound("music2.mp3")
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
