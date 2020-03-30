const canvas = document.querySelector('canvas');
const btn = document.querySelector('.generate-tree-button');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const canvas = document.querySelector('canvas');
    canvs.width = window.innerWidth;
    canvs.height = window.innerHeight;
}


function drawTree(startX, startY, len, angle, branchWidth, color1,color2){
    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle= color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = branchWidth;
    const shadow_l = ['rgb(200, 241, 162)','rgb(209, 244, 93)','rgb(255,240,245)']
    let randomShadow = shadow_l[Math.floor(Math.random()*shadow_l .length)];

    ctx.shadowBlur = 6;
    ctx.shadowColor =randomShadow;


    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    ctx.lineTo(0,-len);
    if(angle>0){
        ctx.bezierCurveTo(10,-len/2,10,-len/2,0,len);
    }else{
        ctx.bezierCurveTo(-10,-len/2,-10,-len/2,0,len);
    }
    
    ctx.stroke();
    sizeLeaf = getRandomIntInclusive(10, 15);
    if(len<7){
        ctx.beginPath();
        ctx.arc(0,-len,sizeLeaf,0,Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    
    curve = (Math.random()*10) +10;
    perc = getRandomIntInclusive(0.7, 0.8);
    perc2 = getRandomIntInclusive(0.5, 0.7);

    drawTree(0,-len,len * 0.75, angle +curve, branchWidth* perc2);
    drawTree(0,-len,len * 0.75, angle -curve, branchWidth* 0.7);

    ctx.restore();

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

function generateRandomTree(flower_color,positionX,positionY){
    let tree_angle= getRandomIntInclusive(0, 0.5);
    let tree_width =getRandomIntInclusive(2, 5);
    let size =getRandomIntInclusive(60, 150);
    
    drawTree(positionX, positionY, size,tree_angle,tree_width,'brown',flower_color);
}



function animation(){
    const color_l = ['rgb(255,182,193)','rgb(255,105,180)','rgb(255,240,245)', 'rgb(255,228,225)','rgb(255,182,193)','rgb(255,228,225)','rgb(255,182,193)']
    let randomColor1 = color_l[Math.floor(Math.random()*color_l.length)];
    let randomColor2 = color_l[Math.floor(Math.random()*color_l.length)];
    let randomColor3 = color_l[Math.floor(Math.random()*color_l.length)];


    ctx.clearRect(0,0,canvas.width,canvas.height);
    generateRandomTree(randomColor1 ,canvas.width*0.4,canvas.height-160);
    generateRandomTree(randomColor2,canvas.width*0.6,canvas.height-180);
    generateRandomTree(randomColor3,canvas.width*0.7,canvas.height-170);
    requestAnimationFrame(animation);
}

btn.addEventListener('click',animation);