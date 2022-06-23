const canvas = document.querySelector('canvas');
const {width,height} = canvas.getBoundingClientRect();
const context = canvas.getContext('2d')

function animate(selector) {
 

    let fromHSL = `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256})`

    let fireworksFactory = function fireworksFactory() {
        let centerX = (0.2 + 0.6 * Math.random()) * width;
        let centerY = (0.1 + 0.4 * Math.random()) * height;
        let color = fromHSL
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

    this.redrawInterval = setInterval(redraw, 30);
    this.factoryInterval = setInterval(launch, 1500);
}

Animation.prototype.stop = function stop() {
    clearInterval(this.redrawInterval);
    clearInterval(this.factoryInterval);
}



function Firework(centerX, centerY, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.color = color;
    this.particles = new Array(500);
    this.Δr = 20;
    this.age = 0;

    let τ = 2 * Math.PI;
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i] = new Particle(
            this.centerX, this.centerY,
            0, τ * Math.random(), τ * Math.random(),3, color
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
    this.sinθ = Math.sin(θ);
  
    this.sinφ = Math.sin(φ);
    this.cosφ = Math.cos(φ);
    this.size = size;
    this.color = color;
    this.recalcCartesianProjection();
}

Particle.prototype.recalcCartesianProjection = function() {
    this.x = this.origX + this.r * this.sinθ * this.cosφ;
    this.y = this.origY + this.r * this.sinθ * this.sinφ;
};
(function(){
  const anim = animate('#sky');
            setTimeout(function() { anim.stop(); }, 60000);
  
})()
