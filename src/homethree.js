let canvas = document.querySelector('canvas');

let scene, camera, renderer;
const BG_COLOR = 0xA7ACB4;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(35, window.innerWidth/ window.innerHeight, 1, 1000);
camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(BG_COLOR);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
} 
  
function enableScroll() { 
    window.onscroll = function() {}; 
} 

let loadingScreen;

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = function(){
    loadingScreen = document.querySelector('.loading-screen');
    disableScroll();
}

loadingManager.onLoad = function(){
    loadingScreen.classList.add( 'fade-out' );
    enableScroll();
}

var light = new THREE.DirectionalLight( 0xffffff, 0.4 );
light.position.x = 5;
light.position.y = 5;
light.position.z = 10;
scene.add( light );


var pointLight2 = new THREE.PointLight( 0xffffff, 0.5);
pointLight2.position.set( -5, 4, 0 );
scene.add( pointLight2 );

var pointLight3 = new THREE.PointLight( 0xffffff, 0.8);
pointLight3.position.set( 5, 5, 4 );
scene.add( pointLight3 );
pointLight3.castShadow = true;
pointLight3.shadow.bias = -0.001;


var pointLight4 = new THREE.PointLight( 0xffffff, 1);
pointLight4.position.set( 0, 0, 6 );
scene.add( pointLight4 );

let geometry = new THREE.PlaneGeometry(5, 5, 20);
let material = new THREE.MeshStandardMaterial({
    color: BG_COLOR,
    roughness: 0.5,
    metalness: 0.1,
    side: THREE.DoubleSide
});
let plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
plane.castShadow = true;
plane.position.set(0, -2, 0);
plane.rotation.set(Math.PI/2, 0, 0);
plane.scale.set(window.innerWidth/100, 5, 20);
scene.add(plane);

let showcase = new THREE.Mesh();
modelLoader = new THREE.GLTFLoader(loadingManager);
modelLoader.load('./assets/showcase.gltf', (gltf) => {
    showcase.add(gltf.scene);
    scene.add(showcase);
    
    showcase.traverse((child) => {
        if(child.isMesh){
            child.receiveShadow = true;
            child.castShadow = true;
        }
    })
});
showcase.position.set(0, -2, 0);

if(window.innerWidth < 500){
        showcase.scale.set(0.5, 0.5, 0.5);
        camera.position.set(0, -0.5, 17);
    }
    else{
        showcase.scale.set(0.6, 0.6, 0.6);
        camera.position.set(0, 0, 15);
    }



window.addEventListener('resize', function(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width < 500){
        showcase.scale.set(0.5, 0.5, 0.5);
        showcase.position.set(0, -2, -1);
    }
    plane.scale.x = width/100;
    renderer.setSize(width, height);
    camera.aspect =  width/height;
    camera.updateProjectionMatrix();
}, false);

function easeOutQuad(x){
    return 1 - (1 - x) * (1 - x);
}

let mouse = new THREE.Vector2();
function handleMouse(){
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    camera.rotation.y = easeOutQuad((mouse.x/2) * 0.03);
    camera.rotation.z = easeOutQuad(mouse.y * 0.01);
    showcase.rotation.y = mouse.x/8;
}

function handleTouch(){
    mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;
    camera.rotation.y = easeOutQuad((mouse.x/2) * 0.03);
    camera.rotation.z = easeOutQuad(mouse.y * 0.01);
    showcase.rotation.y = mouse.x/8;

}
canvas.addEventListener('mousemove', handleMouse, false);
canvas.addEventListener("touchmove", handleTouch, false);


let render = function(){
	renderer.render( scene, camera );
}

let animate = function(){
    requestAnimationFrame(animate);
  
    render();
}

animate();
