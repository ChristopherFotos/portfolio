
/*======= 
move name
=========*/
let shape = document.getElementsByClassName('shape')[0]
let name = document.getElementById('name')
let heading = document.getElementsByClassName('heading')[0]

document.addEventListener('mousemove', e => {

    x1 = (e.clientX * 0.05).toString() + 'px'
    y1 = (e.clientY * 0.25).toString() + 'px'
    x2 = (e.clientX * 0.08).toString() + 'px'
    y2 = (e.clientY * 0.04).toString() + 'px'

    shape.style.top = y1
    if(e.clientX * 0.05 < 1000){shape.style.left = x1}

    name.style.top = y2
    name.style.left = x2
})

/*===============
move letter spans
=================*/

let move = Array.from(document.querySelectorAll('.move'))
let hover = Array.from(document.querySelectorAll('.cta-button'))
let rotate = Array.from(document.querySelectorAll('.rotate'))



hover.forEach(h => {
    h.addEventListener('mouseenter', e => { // space text out on hover
            let children = Array.from(e.target.children)

            let i = 0

            let clear = setInterval(()=> {
               children[i].classList.toggle('move-hover')
               i++
               if(i >= children.length){
                clearInterval(clear)
            }
            }, 10)

            i = 0
        }
    )}
)

hover.forEach(h => {
    h.addEventListener('mouseleave', e => { // return text back to normal
            let children = Array.from(e.target.children)

            let i = 0

            let clear = setInterval(()=> {
               children[i].classList.toggle('move-hover')
               i++
               if(i >= children.length){
                console.log('clearing')
                clearInterval(clear)
            }
            }, 10)

            i = 0
        }
    )}
)



document.addEventListener('mousemove', e => { //rotate 
    rotate.forEach(p => {
            let box = p.getBoundingClientRect()
            let p2 = {x: e.clientX, y: e.clientY - 30}
            let p1 = {x: box.x, y: box.y}
            let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
            p.style.transform = `rotate(${angle}deg)`
          }
        )
    }
)

/*=============
shooting effect
===============*/

const scene = new DOMscene()
let colorArray = ['images/redsplat.svg', 'images/blacksplat.svg', 'images/pinksplat.svg']

startScene(scene)



document.addEventListener('click', e => {

    if(scene.props.length > 10){
        scene.props = []
    }

    document.getElementById('rotate-large').src = 'images/artist2.svg'
    setTimeout(()=>{
        document.getElementById('rotate-large').src = 'images/artist1.svg'
    }, 250)

    let bullet = document.createElement('span')
    let body = document.getElementsByTagName('body')[0]
    bullet.style.position = 'absolute'
    bullet.style.width = '60px'
    bullet.style.height = '60px'
    bullet.style.zIndex = '2'
    bullet.id='bullet'
    bullet.innerHTML = `<img src='${colorArray[Math.floor(Math.random() * 3)]}' class= 'bullet-pic' >`
    body.append(bullet) 

    console.log(`<img src=${colorArray[2]} class= 'bullet-pic' >`)

    const firedBullet = new Mover(bullet, scene)

    firedBullet.left = window.innerWidth * 0.75
    firedBullet.top = window.innerHeight * 0.35
    
    firedBullet.velocity = new Vector(2, 0)
    firedBullet.setFriction(0.94)

    let box = document.getElementById('rotate-large').getBoundingClientRect()
    let p2 = {x: e.clientX, y: e.clientY - 90}
    let p1 = {x: box.x, y: box.y}
    let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let distance = getDistance(p2.x,p2.y,p1.x,p1.y) 
    firedBullet.setAccel(distance * 0.06)   

    firedBullet.setDirection(angle)
    scene.addProp(firedBullet)
  }
)

function getDistance( x1, y1, x2, y2 ) {
	let xs = x2 - x1,
		ys = y2 - y1;		
	xs *= xs;
	ys *= ys; 
	return Math.sqrt( xs + ys );
};

// a mousemove effect that makes it look like pieces are being removed from the facade and something revealed underneath.
// just do the same thing you did with the shape div, but put a 'hole' of the same shape underneath it.
// here's an idea: once they click 'stuff i've made,' the props.js div slides up (the page DOES NOT scroll), and all the 
// splatters they put on the screen (not just the props.js section) will take on the effect previously described. set their z-index 
// to be underneath everything so that it isn't invasive and doesnt make things unreadable. 

// a mousemove effect the makes it look like perspective is changing. it would just be a matter of moving objects in the background
// more slowly than ones in the foreground. idea for a scene: oldschool computer stuff mixed with art stuff. communicates that programming is an art.