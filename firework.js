  <!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <style>
        canvas {
    background: black;
    background: linear-gradient(to bottom, black, rgba(0,0,99,0) 400%);
}
div.marquee {
    white-space: nowrap;
    position: absolute;
    top: 60px;
  animation: flyby 30s linear infinite;
  display:none
;
    
}
@keyframes flyby {
    from {
        left: 640px;
    }
    to {
        left: -640px;
    }
}
div.marquee img {
    display: inline-block;
}
div.marquee div {
    display: inline-block;
    position: relative;
    top: -0.8em;
    font: small-caps bold 18px Optima, Futura, sans-serif;
    background: orange;
    padding: 2px 10px;
}
    </style>
  </head>
  <body>

  <div id="viewport" style="width: 640px; height: 480px;">
      <canvas id="sky" width="640" height="480"></canvas>
      <!-- Based on public domain image
           https://pixabay.com/en/aeroplane-aircraft-airplane-flight-161999/ -->
      <div class="marquee">
        <img src="https://i.stack.imgur.com/bGZ1m.png" width="80" height="43">
        <div id="banner">Using an incompatible browser? No celebration for you.</div>
      </div>
    </div>
    <button>Clcik</button>
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <!--
    <script type="text/javascript">
        $(function() {
            fillBanner('#banner');
            let anim = animate('#sky');
            setTimeout(function() { anim.stop(); }, 60000);
        });
    </script>
    <script>


        const canvas = document.querySelector('canvas');
        const {width,height} = canvas.getBoundingClientRect();
        const context = canvas.getContext('2d')

        function animate(selector) {

   // function fromHSL(hue, saturation, lightness) {
        /*
     

    </script>-->
    <script>
    const canvas = document.querySelector('canvas');
const {width,height} = canvas.getBoundingClientRect();
const context = canvas.getContext('2d')

function animate(selector) {
 

    let fromHSL = function(){
      return `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256})`}

    let fireworksFactory = function fireworksFactory() {
        let centerX = (0.2 + 0.6 * Math.random()) * width;
        let centerY = (0.1 + 0.4 * Math.random()) * height;
        let color = fromHSL();
        return new Firework(centerX, centerY, color);
    };

    let fireworks = [fireworksFactory()];
    let animation = new Animation(canvas, fireworks, fireworksFactory);
    animation.start();
    return animation;
}


function Animation(canvas, objects, factory) {
    this.objects = objects;
    this.factory = factory;
}

Animation.prototype.start = function start() {
    let objects = this.objects;
    let factory = this.factory;

    let redraw = function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let f = objects.length - 1; f >= 0; f--) {
            let particles = objects[f].particles;
            for (let p = particles.length - 1; p >= 0; p--) {
                let particle = particles[p];
                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI, false);
                context.fillStyle = particle.color;
                context.fill();
            }
            objects[f].update();
        }
    };

    let launch = function launch() {
        objects.push(factory());
        while (objects.length > 4) {
            objects.shift();
        }
    };

    this.redrawInterval = setInterval(redraw,30);
    this.factoryInterval = setInterval(launch, 1500);
}

Animation.prototype.stop = function stop() {
    clearInterval(this.redrawInterval);
    clearInterval(this.factoryInterval);
}

class Firework{
    constructor(centerX,centerY,color){
        this.centerX = centerX;
        this.centerY = centerY;
        this.colorArray = colorArray;
        this.particle_array = [];
        this.radius_all =50
        const full_circle = 2 * Math.PI;
        for(let i =0; i < 1000;i++){
        this.particle_array.push(new Particle(this.centerX,this.centerY,0,full_circle * Math.random(), full_circle * Math.random(),2, color)) 
        }
    
       this.Δr -= 0.00005 * this.Δr * this.Δr;                    
        this.particles[i].y += 0.00000008 * this.age * this.age;   
        this.particles[i].size *= 0.98;                           
        this.age++;
    update(){
       this.particle_array.forEach(particle=>{
        particle.radius_single +=this.radius_all;
        this.radius_all;
        particle.update();
       })


    }

}

class Particle{
    //radius_all is for the whole circle, the radian_single is for a single practice
    constructor(original_x,original_y,radius_single,radian_one,radian_two){
        this.original_x = original_x;
        this.original_y = original_y;
        this.radius_single = radius_single;
        //this.radius_all = radius_all;
        this.radian_one = radian_one;
        this.radian_two = radian_two;
        this.color = fromHSL(); 
     
    }
    update(){
           this.x = this.original_x + this.radius_all * Math.sin(this.radian_one) * Math.cos(this.radian_two);
       this.y = this.original_y  + this.radius_all * Math.sin(this.radian_one) * Math.sin(this.radian_two)

    }
}

function Firework(centerX, centerY, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.particles = new Array(1000);
    this.Δr = 50;
    this.age = 0;
    
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i] = new Particle(
            this.centerX, this.centerY,
            0, full_circle * Math.random(), full_circle * Math.random(),2, color
        );
    }
}

Firework.prototype.update = function update() {
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].r += this.Δr;
        this.particles[i].recalcCartesianProjection();

        this.Δr -= 0.00005 * this.Δr * this.Δr;                    
        this.particles[i].y += 0.00000008 * this.age * this.age;   
        this.particles[i].size *= 0.98;                           
        this.age++;
    }
};


function Particle(x, y, r, θ, φ, size, color) {
    this.origX = x;
    this.origY = y;
    this.r = r;
    //Note js Math.sin return sin value of radian not angles!!!
    this.sinθ = Math.sin(θ);
    this.sinφ = Math.sin(φ);
    this.cosφ = Math.cos(φ);
    //console.table([["θ","φ","this.sinθ", "this.sinφ","this.cosφ"],[θ,φ,this.sinθ, this.sinφ,this.cosφ]])
    this.size = size;
    this.color = color;
    this.recalcCartesianProjection();
}

Particle.prototype.recalcCartesianProjection = function() {

    this.x = this.origX + this.r * this.sinθ * this.cosφ;
    this.y = this.origY + this.r * this.sinθ * this.sinφ
};
(function(){
  const anim = animate('#sky');
            setTimeout(function() { anim.stop(); }, 60000);
            document.querySelector('button').addEventListener('click',()=>anim.stop())
  
})()


</script>
</body>
