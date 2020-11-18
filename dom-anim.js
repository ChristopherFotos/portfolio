function startScene(the_scene) {
  function u() {
    the_scene.update();
    requestAnimationFrame(u);
  }
  u();
}

class DOMscene {
  constructor() {
    this.props = [];
  }

  addProp(prop) {
    this.props.push(prop);
  }

  update() {
    this.props.forEach(prop => {
      prop.update();
    });
  }
}

class Mover {
  constructor(element, scene) {
    this.element = element;
    this.scene = scene;

    this.left = this.element.style.left;
    this.top = this.element.style.top;

    this.accel = new Vector(0, 0);
    this.velocity = new Vector(0, 0);
    this.friction = 0;

    this.counter = 0

    this.customFunctions = [];

    this.initToScene();
  }

  initToScene() {
    this.scene.props.push(this);
  }

  setDirection(direction) {
    this.velocity.setAngle(direction);
    this.accel.setAngle(direction);
  }

  setFriction(val){
    this.friction = val
  }

  getDirection() {
    return this.velocity.getAngle();
  }

  setAccel(accel) {
    this.accel.setLength(accel);
  }

  getAccel() {
    return this.accel.getLength;
  }

  setTop(val) {
    this.element.style.top = val + "px";
  }

  setLeft(val) {
    this.element.style.left = val + "px";
  }

  addCustomFunction(customFunction) {
    this.customFunctions.push(customFunction);
  }

  update() {
    if (this.customFunctions.length > 0) { this.customFunctions.forEach(f => { f.bind(this)() }) }


    this.velocity.addTo(this.accel);
    this.velocity.multiplyBy(this.friction);
    let newLeft = this.left + this.velocity._x;
    let newTop = this.top + this.velocity._y;

    this.setLeft(newLeft);
    this.setTop(newTop);
    
  }
}


