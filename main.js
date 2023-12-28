// Tutorial Reference:
// Three.js Crash Course For Beginners | Create This Awesome 3D Website!
// by developedbyed
// https://www.youtube.com/watch?v=_OwJV2xL8M8&t=2175s
//
// use 'npm run dev' in terminal to view

import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xfff4b2 );


//Create our sphere
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 )
const material = new THREE.MeshStandardMaterial({
  color: "#0031F8",
  roughness: 0.3,
  metalness: 0.6,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 100, 100)
light.position.set(0, 10, 10)
scene.add(light)


const light2 = new THREE.PointLight(0xffffff, 10, 100)
light.position.set(10, 0, 0)
scene.add(light2)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 180)
camera.position.z = 80
scene.add(camera)


//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 2

//Resize
window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  // mesh.rotation.x += 0.002
  // mesh.rotation.z -= 0.002
  // mesh.position.y += 0.01

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline magic
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
//tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo("nav", {opacity: 0}, {duration: 0.5, opacity: 1})
tl.fromTo(".title",{opacity: 0}, {opacity: 1})


//Mouse Animation Color Change
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e)=> {
  if(mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      255,
    ]
    //Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r:newColor.r,g:newColor.g,b:newColor.b})
  }
})
