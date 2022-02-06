import './initFirebase.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const scene = new THREE.Scene({ antialias: true })
scene.background = new THREE.Color('#ADD8E6')
let current_cube
let current_cube_water
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

//plain
var geo = new THREE.PlaneBufferGeometry(140, 140, 8, 8)
const texture = new THREE.TextureLoader().load('grass.jpg')
const mat = new THREE.MeshBasicMaterial({ map: texture })

var plane = new THREE.Mesh(geo, mat)
plane.rotateX(-Math.PI / 2)
plane.position.set(0, -2.5, 0)
scene.add(plane)

//77 a = 381 m
//:381
// 0,202099737 a = 1m

//box 2
const edgeLength = 0.202099737 * 8 //for one ton
const geometry2 = new THREE.BoxGeometry(edgeLength, edgeLength, edgeLength)

const material = new THREE.MeshBasicMaterial({ color: '#1c1c1c' })

const firstCube = new THREE.Mesh(geometry2, material)
firstCube.position.set(-10, -2, 0)
scene.add(firstCube)

//light
const light = new THREE.PointLight(0x8f8f8f, 2, 100)
light.position.set(10, 10, 10)
scene.add(light)

//light2
const light2 = new THREE.PointLight(0x8f8f8f, 2, 100)
light2.position.set(-10, 10, -10)
scene.add(light2)

const objLoader = new OBJLoader()
objLoader.load(
  'es.obj',
  (object) => {
    // (object.children[0] as THREE.Mesh).material = material
    // object.traverse(function (child) {
    //     if ((child as THREE.Mesh).isMesh) {
    //         (child as THREE.Mesh).material = material
    //     }
    // })
    object.scale.setScalar(0.001)
    object.rotateX(-Math.PI / 2)
    object.position.set(0, -3, 0)
    scene.add(object)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

//camera
camera.position.z = 80
camera.position.y = 20
controls.autoRotate = true
controls.enablePan = false

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)
}

const removeOldCube = () => {
  try {
    scene.remove(current_cube)
    scene.remove(firstCube)
    scene.remove(current_cube_water)
  } catch {
    console.log('no cubes')
  }
}

window.onload = function () {
  const checkbox = document.getElementById('myCheckbox')
  checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      controls.autoRotate = false
    } else {
      controls.autoRotate = true
    }
  })

  //Car
  const element = document.getElementById('Auto')
  element.addEventListener('click', function () {
    document.getElementById('amount').innerHTML = '379 kg CO2'

    removeOldCube()
    const new_geometry = new THREE.BoxGeometry(
      edgeLength * 0.379,
      edgeLength * 0.379,
      edgeLength * 0.379
    )

    current_cube = new THREE.Mesh(new_geometry, material)
    current_cube.position.set(-10, -2, 0)

    scene.add(current_cube)
  })

  //Person
  const element2 = document.getElementById('Person')
  element2.addEventListener('click', function () {
    document.getElementById('amount').innerHTML = '14.24 Tons CO2 & x L Water'

    removeOldCube()

    //co2
    const new_geometry = new THREE.BoxGeometry(
      edgeLength * 14.25,
      edgeLength * 14.25,
      edgeLength * 14.25
    )
    current_cube = new THREE.Mesh(new_geometry, material)
    current_cube.position.set(-10 + -10, 9, 0)
    scene.add(current_cube)

    //water
    // 0,202099737 a = 1m
    const new_geometry2 = new THREE.BoxGeometry(
      0.202099737 * 5.5178483527622 * 10,
      0.202099737 * 5.5178483527622 * 10,
      0.202099737 * 5.5178483527622 * 10
    )
    const water_material = new THREE.MeshBasicMaterial({ color: '#0394fc' })
    current_cube_water = new THREE.Mesh(new_geometry2, water_material)
    current_cube_water.position.set(14, 2, 0)
    scene.add(current_cube_water)
  })

  //Beef
  const element3 = document.getElementById('Beef')
  element3.addEventListener('click', function () {
    document.getElementById('amount').innerHTML = '123 kg CO2 & 150.415 L Water'

    removeOldCube()

    //co2
    const new_geometry = new THREE.BoxGeometry(
      edgeLength * 0.123,
      edgeLength * 0.123,
      edgeLength * 0.123
    )
    current_cube = new THREE.Mesh(new_geometry, material)
    current_cube.position.set(-10, -2, 0)
    scene.add(current_cube)

    //water
    // 0,202099737 a = 1m
    const new_geometry2 = new THREE.BoxGeometry(
      0.202099737 * 2.4662120743305 * 10,
      0.202099737 * 2.4662120743305 * 10,
      0.202099737 * 2.4662120743305 * 10
    )
    const water_material = new THREE.MeshBasicMaterial({ color: '#0394fc' })
    current_cube_water = new THREE.Mesh(new_geometry2, water_material)
    current_cube_water.position.set(10, 0, 0)
    scene.add(current_cube_water)
  })


  //calc

  let overall_co2 = 0
  //calc
  function update_overall_text() {
    document.getElementById('amount2').innerHTML = overall_co2
  }
  function update_3d() {
    removeOldCube()
    
    //ein Kilogramm CO2 ein Volumen von 509 Litern

    const new_geometry = new THREE.BoxGeometry(
      edgeLength * 7.9843443826911 * overall_co2,
      edgeLength * 7.9843443826911 * overall_co2,
      edgeLength * 7.9843443826911 * overall_co2
    )
    current_cube = new THREE.Mesh(new_geometry, material)
    current_cube.position.set(-10 + -10, 9, 0)
    scene.add(current_cube)

  }


  //kilometers car
  var myelem = document.getElementById('car_commutes');
  myelem.addEventListener("change", function(){
    console.log("yoo change")
    const x = document.getElementById('car_commutes').value
    const co2_amount = x * 0.13
    overall_co2 += co2_amount

    update_overall_text()
    update_3d()
  })

  //meat
  var myelem = document.getElementById('car_commutes');
  myelem.addEventListener("change", function(){
    console.log("yoo change")
    const x = document.getElementById('car_commutes').value
    const co2_amount = x * 0.13
    overall_co2 += co2_amount

    update_overall_text()
    
  })


}

animate()
