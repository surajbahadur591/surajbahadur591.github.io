const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video : true, audio:false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject  = localMediaStream;
        video.play();
    })
    .catch("allow camera permission");
}

function paintToCanvas(){
    const width1 = video.videoWidth;
    const height1 = video.videoHeight;
    console.log(width1, height1);
    canvas.height = height1;
    canvas.width = width1;

    return setInterval( ()=> {
        ctx.drawImage(video, 0, 0, width1, height1);

        let pixels = ctx.getImageData(0, 0,width1, height1);
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function redEffect(pixels){
    for(let i=0; i<pixels.data.length;i+=4){
        pixels.data[i+0] = pixels.data[i+0] + 100 ;
        pixels.data[i+1] = pixels.data[i+1] - 50 ;
        pixels.data[i+2] = pixels.data[i+2] * 0.5;
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i=0; i<pixels.data.length;i+=4){
        pixels.data[i -150 ] = pixels.data[i+0] + 100 ;
        pixels.data[i +100] = pixels.data[i+1] - 50 ;
        pixels.data[i -150] = pixels.data[i+2] * 0.5;
    }
    return pixels;

}

function greenScreen(pixels){
    const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }

}
return pixels;
}
function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'cool');
    link.textContent = "download image";
    link.innerHTML = `<img src="${data}" alt="cool"/>`;
    strip.insertBefore(link, strip.firstChild);
}

 
getVideo();
video.addEventListener('canplay', paintToCanvas );