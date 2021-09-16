


 function myFunction() {
  // document.getElementsByClassName('btn')[0].ur="hey";
  window.location.href="https://www.facebook.com/naturecottagebhopal/";
}
function mapFunction()
{
  window.location.href="https://www.google.com/maps/dir/23.1713234,77.4782782/Nature+Cottage,+to,+Barkhedi+Kalan,+National+Law+Institute+University,+Bhopal,+Madhya+Pradesh/@23.1961711,77.3853167,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x397c5cc60a4c7d99:0xf59e6a097477416c!2m2!1d77.3682664!2d23.1985664";
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"),
    cw = canvas.width,
    ch = canvas.height,
    objA = {},
    objB = {},
    objC = {},
    pIndexA = 0,
    pIndexB = 0,
    pIndexC = 0,
    pNum = 100, //the amount of active particles at any given time
    pSize =1, //size of each particle
    sprinklerXA = 500,
    sprinklerYA = 500,
    sprinklerXB = 100,
    sprinklerYB = 100,
    sprinklerXC = 900,
    sprinklerYC = 900,
    moveSprinkler = 5, //sets the incremental value of the sprinklers movement
    angleA = Math.PI / 2,
    angleB = Math.PI,
    angleC = Math.PI * 2,
    oscStart = 0,
    range = 20,
    rgbValue = 0,
    rgbSine = Math.PI / 2,
    rgbSineIncrease = 0.016;

//initial background color
ctx.fillStyle = "#fff";
ctx.fillRect(0,0,canva.width,canvas.height);

//creates a particle object
function Particle() {
    this.x = sprinklerXA;
    this.y = sprinklerYA;
    this.vx = Math.random() * 15 - 1; //sets random velocities for x and y
    this.vx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    this.vy = Math.random() * 15 - 1;
    this.vy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    objA[pIndexA] = this; //nests this newly created object within the 'obj' object
    this.id = pIndexA; //creates a pointer to reference this newly created object (for deletion)
    pIndexA++;
    this.life = 0; //life for each object
    this.maxLife = Math.random() * 100 + 25; //life-decay for each object
}

function ParticleB() {
    this.x = sprinklerXB;
    this.y = sprinklerYB;
    this.vx = Math.random() * 15 - 1; //sets random velocities for x and y
    this.vx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    this.vy = Math.random() * 15 - 1;
    this.vy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    objB[pIndexB] = this; //nests this newly created object within the 'obj' object
    this.id = pIndexB; //creates a pointer to reference this newly created object (for deletion)
    pIndexB++;
    this.life = 0; //life for each object
    this.maxLife = Math.random() * 100 + 25; //life-decay for each object
}

function ParticleC() {
    this.x = sprinklerXC;
    this.y = sprinklerYC;
    this.vx = Math.random() * 15 - 1; //sets random velocities for x and y
    this.vx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    this.vy = Math.random() * 15 - 1;
    this.vy *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    objC[pIndexC] = this; //nests this newly created object within the 'obj' object
    this.id = pIndexC; //creates a pointer to reference this newly created object (for deletion)
    pIndexC++;
    this.life = 0; //life for each object
    this.maxLife = Math.random() * 100 + 25; //life-decay for each object
}

//draws each particle
Particle.prototype.draw = function() {
    ctx.fillStyle = "rgba(6, 20, 209, 1)";
    ctx.fillRect(this.x, this.y, pSize, pSize);
    this.x += this.vx;
    this.y += this.vy;
    this.life += 1;
    this.vy += 0.2;
    //deletes a particle when it's life has maxed out
    if(this.life >= this.maxLife) {
        delete objA[this.id];
    }
};

ParticleB.prototype.draw = function() {
    ctx.fillStyle = "rgba(252, 0, 244, 1)";
    ctx.fillRect(this.x, this.y, pSize, pSize);
    this.x += this.vx;
    this.y += this.vy;
    this.life += 1;
    this.vy += 0.2;
    //deletes a particle when it's life has maxed out
    if(this.life >= this.maxLife) {
        delete objB[this.id];
    }
};

ParticleC.prototype.draw = function() {
    ctx.fillStyle = "rgba(25, 252, 0, 1)";
    ctx.fillRect(this.x, this.y, pSize, pSize);
    this.x += this.vx;
    this.y += this.vy;
    this.life += 1;
    this.vy += 0.2;
    //deletes a particle when it's life has maxed out
    if(this.life >= this.maxLife) {
        delete objC[this.id];
    }
};

setInterval(function() {
    //clears the canvas with a slight opacity value
    //this makes the particles look like they have a tail
    ctx.fillStyle = "rgba(" + rgbValue + "," + rgbValue + "," + rgbValue + ",0.05)";
    ctx.fillRect(0,0,cw,ch);
    //creates particles
    for (var i = 0; i < pNum; i++){
        new Particle();
        new ParticleB();
        new ParticleC();
    }
    //calls the draw function on each nested object
    for (var o in objA) {
        objA[o].draw();
    }

    for (var o in objB) {
        objB[o].draw();
    }

    for (var o in objC) {
        objC[o].draw();
    }

    //oscillates the movement of the sprinklers
    sprinklerXA += oscStart - range * Math.sin(angleA);
    sprinklerXB += oscStart - range * Math.sin(angleB);
    sprinklerXC += oscStart - range * Math.sin(angleC);
    angleA += 0.10;
    angleB += 0.05;
    angleC += 0.05;

    //shifts the rgb color values for the background
    rgbValue = Math.floor(128 - (128 * Math.sin(rgbSine)));
    rgbSine += rgbSineIncrease;
}, 30);
