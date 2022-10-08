// let ans = localStorage.getItem("playaudio");
// if (ans == null) {
//     document.getElementById("audioprompt").style.display = "block";
//     document.getElementById("playbutton").addEventListener("click", () => {
//         document.getElementsByTagName("audio")[0].play()
//         localStorage.setItem("playaudio", true);
//         document.getElementById("audioprompt").style.display = "none";
//         alert("next time, click anywhere on the website to get the audio to start playing")
//     })
//     document.getElementById("nobutton").addEventListener("click", () => {
//         localStorage.setItem("playaudio", false);
//         document.getElementById("audioprompt").style.display = "none";
//     })
// } else {
//     if (ans == "true") {
//         document.addEventListener("click", () => {
//             document.getElementsByTagName("audio")[0].play()
//         })
//     }
// }

let x = 1;
function playpause() {
    if (x == 1) {
        document.getElementsByTagName("audio")[0].play()
        document.getElementsByClassName("playbutton")[0].innerText = "||";
        document.getElementsByClassName("playbutton")[0].style.margin = "0";
        x = 0;
    } else {
        document.getElementsByTagName("audio")[0].pause()
        document.getElementsByClassName("playbutton")[0].innerText = "⏵";
        document.getElementsByClassName("playbutton")[0].style.margin = "-30px";
        x = 1;
    }
}


window.onload = function() {
  
    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    audio.crossOrigin = "anonymous";
    
    file.onchange = function() {
        // var files = this.files;

        // audio.src = URL.createObjectURL(files[0]);
        // audio.load();
        
        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();

        var canvas = document.getElementById("canvas");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        var ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        var bufferLength = analyser.frequencyBinCount;

        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;
    
        function renderFrame() {
            requestAnimationFrame(renderFrame);

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                
                var r = barHeight + (25 * (i/bufferLength));
                var g = 250 * (i/bufferLength);
                var b = 50;
        
                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ", 0.5)";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth + 1.1, barHeight);
        
                x += barWidth + 1;
            }
        }
    
        audio.play();
        renderFrame();
    };
};