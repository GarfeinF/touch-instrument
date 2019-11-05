let osc
let env
let osc2
let noise
let noiseEnv
let circleX = 0
let circleY = 0
let numInstruments = 6
let maxVol = 0
let volume
let numBinds

let sax

function preload(){
	sax = new Image("saxitysax.jpg")
}

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight)
	canvas.parent("p5")

	numBinds = [[null], [null], [null], [null], [null], [null], [null], [null], [null], [null]]

	osc = new p5.Oscillator()
	osc2 = new p5.Oscillator()
	env = new p5.Envelope()
	env.setADSR(.1, .1, .3, .1)
    noise = new p5.Noise()
    noise.setType("white") // "brown" "pink"
    noise.start()
    noise.amp(0)  // set initial amplitude to 0

    noiseEnv = new p5.Envelope()
    noiseEnv.setADSR(0.01, 0.1, 0, 0)

	osc.start()
	osc.amp(0)

	osc2.start()
	osc2.amp(0)

	volume = new p5.Amplitude()
}

function draw(){

	noStroke()
	for (var i = 0; i < numInstruments; i++) {
		fill(255*(i+1)/numInstruments, 0, 255-(255*i/numInstruments))
		rect(width*i/numInstruments, 0, (width*i/numInstruments)+(width/numInstruments), height)
	}
	
	fill(255-(255*circleY/height), 255, 255*circleY/height)

	ellipse(circleX, circleY, volume.getLevel()*500/maxVol, volume.getLevel()*500/maxVol)

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function mousePressed(){

	osc.amp(env)
	osc2.amp(env)
	// noise.amp(noiseEnv)
	env.triggerAttack()
	noiseEnv.triggerAttack()
	//osc2.start()
	mouseDragged()
}

function mouseReleased() {
	//osc.stop()
	noiseEnv.triggerRelease()
	env.triggerRelease()
}

function mouseDragged() {
	let frequency = map(mouseY, 0, height, 800, 100)
	osc.freq(frequency)

	if (mouseX<width/numInstruments){
		osc.setType("sine")
		osc2.setType("triangle")
		osc2.freq(frequency*870/300)
		env.setADSR(0.1, 0.1, 0.5, 0.1)
		noiseEnv.setADSR(0, 0, 0, 0.1)
	}else if (mouseX<2*width/numInstruments){
		osc.setType("sine")
		osc2.setType("square")
		osc2.freq(frequency*229 /35)
		env.setADSR(0.4, 0.4, 0.5, 0.6)
		noiseEnv.setADSR(0.4, 0.4, 0, 0.1)
	} else if (mouseX<3*width/numInstruments){
		osc.setType("sawtooth")
		osc2.setType("sawtooth")
		osc2.freq(frequency+2)
		env.setADSR(0.1, 0.1, 0.5, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0, 0.1)
	} else if (mouseX<4*width/numInstruments){
		osc.setType("square")
		osc2.setType("square")
		osc2.freq(frequency/2)
		env.setADSR(0.1, 0.1, 0.5, 0.4)
		noiseEnv.setADSR(0.1, 0.1, 0, 0.1)
	} else if (mouseX<5*width/numInstruments){
		osc.setType("sine")
		osc2.setType("sine")
		osc2.freq(frequency/5)
		env.setADSR(0.1, 0.1, 0.7, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0.0, 0.1)
	} else if (mouseX<6*width/numInstruments){
		osc.setType("sine")
		osc2.setType("sine")
		osc2.freq(frequency/5)
		env.setADSR(0.1, 0.1, 0.7, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0.0, 0.1)
	} else {
		osc.setType("square")
		osc2.setType("triangle")
		osc2.freq(frequency+2)
		env.setADSR(0.1, 0.1, 0.5, 0.1)
		noiseEnv.setADSR(0.1, 0.1, 0, 0.1)
	}

	maxVol = 2
	circleX = mouseX
	circleY = mouseY
}

function touchStarted(){
	mousePressed()
}

function touchEnded(){
	mouseReleased()
}

function keyTyped(){
	let currentKey = parseInt(key, 10)
	if (numBinds[currentKey][0] == null){
		numBinds[currentKey] = [new p5.Oscillator, new p5.Oscillator, new p5.Envelope, new p5.Noise, new p5.Envelope]
		numBinds[currentKey][0].amp(numBinds[currentKey][2])
		numBinds[currentKey][1].amp(numBinds[currentKey][2])
		numBinds[currentKey][3].amp(0)

		numBinds[currentKey][3].setType("white")
		numBinds[currentKey][0].start()
		numBinds[currentKey][1].start()
		numBinds[currentKey][3].start()

		let frequency = map(mouseY, 0, height, 800, 100)
		numBinds[currentKey][0].freq(frequency)
		if (mouseX<width/numInstruments){
			numBinds[currentKey][0].setType("sine")
			numBinds[currentKey][1].setType("triangle")
			numBinds[currentKey][1].freq(frequency*870/300)
			numBinds[currentKey][2].setADSR(0.1, 0.1, 0.6, 0.1)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		} else if (mouseX<2*width/numInstruments){
			numBinds[currentKey][0].setType("sine")
			numBinds[currentKey][1].setType("square")
			numBinds[currentKey][1].freq(frequency*229 /35)
			numBinds[currentKey][2].setADSR(0.4, 0.4, 0.6, 0.6)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		} else if (mouseX<3*width/numInstruments){
			numBinds[currentKey][0].setType("sawtooth")
			numBinds[currentKey][1].setType("sawtooth")
			numBinds[currentKey][1].freq(frequency+2)
			numBinds[currentKey][2].setADSR(0.1, 0.1, 0.1, 0.1)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		} else if (mouseX<4*width/numInstruments){
			numBinds[currentKey][0].setType("square")
			numBinds[currentKey][1].setType("square")
			numBinds[currentKey][1].freq(frequency/2)
			numBinds[currentKey][2].setADSR(0.1, 0.1, 0.5, 0.4)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		} else if (mouseX<5*width/numInstruments){
			numBinds[currentKey][0].setType("sine")
			numBinds[currentKey][1].setType("sine")
			numBinds[currentKey][1].freq(frequency/5)
			numBinds[currentKey][2].setADSR(0.1, 0.1, 0.3, 0.1)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		} else {
			numBinds[currentKey][0].setType("square")
			numBinds[currentKey][1].setType("triangle")
			numBinds[currentKey][1].freq(frequency+2)
			numBinds[currentKey][2].setADSR(0.1, 0.1, 0.05, 0.1)
			numBinds[currentKey][3].amp(0)
			// numBinds[currentKey][4].setADSR(0.1, 0.1, 0.2, 0.1)
		}
	}
	numBinds[currentKey][2].triggerAttack()
	numBinds[currentKey][4].triggerAttack()

	return false
}

function keyReleased(){
	let currentKey = parseInt(key, 10)
	numBinds[currentKey][2].triggerRelease()
	numBinds[currentKey][4].triggerRelease()
}