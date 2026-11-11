let slider; // variable for slider
let focusToggle; // variables for toggles
let pathToggle;

function setup() {
    createCanvas(windowWidth, windowHeight); // make canvas whole window

    // slider for sliding parabola
    slider = createSlider(-10, 10, 0, 0.01);
    slider.position(100, windowHeight - 60);
    slider.size(windowWidth - 200);

    // toggle for both focus point and path
    focusToggle = createCheckbox("Show Focus", false);
    focusToggle.position(100, windowHeight - 110);

    pathToggle = createCheckbox("Show Focus Path", false);
    pathToggle.position(100, windowHeight - 150);
}

function draw() {
    //slider for making it roll
    let t = slider.value()
    background("#f1f1f1");

    //makes the origin the centre of the window
    translate(width / 2, height / 2);
    scale(1, -1);

    //if the path is toggled 
    if (pathToggle.checked()) {
        stroke("yellow");
        strokeWeight(2);
        noFill();

        beginShape();

        stroke(255, 220, 80, 120);
        strokeWeight(2);

        for (let u = -10; u <= 10; u += 0.02) {
            let pos = focusPosition(u);
            vertex(50 * pos.x, 50 * pos.y);
        }

        endShape();
    }

    //draws horizontal
    stroke(100);
    strokeWeight(1);
    line(-width / 2, 0, width / 2, 0);

    // transating and rotating everything
    translate(50 * arcLength(t), 0);
    rotate(-atan(t/2));

    // colour and etc for parabola
    noFill();
    stroke("#60a5fa");
    strokeWeight(3);
    noFill();

    // drawing parabola
    beginShape();
    for (let x = -30; x <= 30; x += 0.01) {
        let y = (1/4) * (x**2);
        let newX = x - t;
        let newY = y - (t**2 / 4)
        vertex(50*newX,50*newY);
    }
    endShape();

    // if focus point is toggled 
    if (focusToggle.checked()) {
        let fx = - t;
        let fy = 1 - (t**2)/4
        stroke('yellow');
        strokeWeight(10);
        point(50*fx, 50*fy);
    }

    //draws the contact point between parabola and horizontal
    stroke('orange');
    strokeWeight(10);
    point(0,0);
}

function arcLength(t) { // function for calculating arc length
    return Math.asinh(t/2) + (t/4)*Math.sqrt(4+t**2);
}

function focusPosition(t) { // calculates the focus position for the path 
    let theta = atan(t / 2);
    let s = arcLength(t);

    // Calculate fx and fy using the equations above
    let fx = s - t*cos(theta) + (1-(t**2)/4)*sin(theta);
    let fy = t*sin(theta) + (1-(t**2)/4)*cos(theta);

    return { x: fx, y: fy };
}

function windowResized() { // makes sure the slider and toggles fit whatever the size of window
    resizeCanvas(windowWidth, windowHeight);

    slider.position(100, windowHeight - 60);
    slider.size(windowWidth - 200);

    focusToggle.position(100, windowHeight - 110);
    pathToggle.position(100, windowHeight - 150);
}