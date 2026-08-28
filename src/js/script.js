import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const roomObject = new URL('../assets/dorm_room5.glb', import.meta.url).href;
const roomTexture = new URL('../assets/allFurnitureBake5.hdr', import.meta.url).href;

const chairObject = new URL('../assets/chair.glb', import.meta.url).href;
const chairTexture = new URL('../assets/chairbake.hdr', import.meta.url).href;

const glassJarObject = new URL('../assets/glassJar_combo.glb', import.meta.url).href;
const glassJarTexture = new URL('../assets/glassJar_combo.hdr', import.meta.url).href;

const bookStackObject = new URL('../assets/bookStack.glb', import.meta.url).href;
const bookStackTexture = new URL('../assets/bookStackBake.hdr', import.meta.url).href;

const shelfSuppliesObject = new URL('../assets/shelfSupplies.glb', import.meta.url).href;
const shelfSuppliesTexture = new URL('../assets/shelfSuppliesBake.hdr', import.meta.url).href;

const firstRosesObject = new URL('../assets/firstRoses.glb', import.meta.url).href;
const firstRosesTexture = new URL('../assets/firstRosesBake.hdr', import.meta.url).href;

const spainFanObject = new URL('../assets/spainFan.glb', import.meta.url).href;
const spainFanTexture = new URL('../assets/spainFan.hdr', import.meta.url).href;

const ceramicsObject = new URL('../assets/ceramics.glb', import.meta.url).href;
const ceramicsTexture = new URL('../assets/ceramicsBake.hdr', import.meta.url).href;

const colosseumObject = new URL('../assets/colosseum3.glb', import.meta.url).href;
const colosseumTexture = new URL('../assets/colosseumBake3.hdr', import.meta.url).href;

const desktopObject = new URL('../assets/desktop.glb', import.meta.url).href;
const desktopTexture = new URL('../assets/desktopBake.hdr', import.meta.url).href;

const deskJournalObject = new URL('../assets/deskJournal.glb', import.meta.url).href;
const deskJournalTexture = new URL('../assets/deskJournalBake.hdr', import.meta.url).href;

const deskMugObject = new URL('../assets/deskMug.glb', import.meta.url).href;
const deskMugTexture = new URL('../assets/deskMugBake.hdr', import.meta.url).href;

const harvardFlagObject = new URL('../assets/harvardFlag.glb', import.meta.url).href;
const harvardFlagTexture = new URL('../assets/harvardFlagBake.hdr', import.meta.url).href;

const wallImagesObject = new URL('../assets/wallImages3.glb', import.meta.url).href;
const wallImagesTexture = new URL('../assets/wallImagesBake2.hdr', import.meta.url).href;

const eiffelTowerObject = new URL('../assets/eiffel_tower.glb', import.meta.url).href;
const eiffelTowerTexture = new URL('../assets/eiffelTowerBake.hdr', import.meta.url).href;

const vikingShipObject = new URL('../assets/vikingShipObj.glb', import.meta.url).href;
const vikingShipTexture = new URL('../assets/vikingFullBake.hdr', import.meta.url).href;

const modelAssets = [
    { model: roomObject, texture: roomTexture, uvChannel: 2, name: 'Room', bio: null },
    { model: chairObject, texture: chairTexture, uvChannel: 0, name: 'Desk Chair', bio: 'The chair that saw dozens of late-night study sessions.' },
    { model: glassJarObject, texture: glassJarTexture, uvChannel: 1, name: 'Jar of Roses', bio: 'I love to preserve and collect any roses I\'m given!' },
    { model: bookStackObject, texture: bookStackTexture, uvChannel: 1, name: 'Book Stack', bio: 'I LOVE to read-- I spent my senior year of college reading fantasy and French dystopians.' },
    { model: shelfSuppliesObject, texture: shelfSuppliesTexture, uvChannel: 1, name: 'Art Supplies', bio: 'You can constantly find me creating art, whether with oil paints, graphic sketches, or paper crafts.' },
    { model: firstRosesObject, texture: firstRosesTexture, uvChannel: 0, name: 'Pair of Roses', bio: 'Roses don\'t last forever, but they can be nice mementos of a time.' },
    { model: spainFanObject, texture: spainFanTexture, uvChannel: 1, name: 'Fan from Spain', bio: 'A souvenir from a friend who studied abroad in Spain. I turned this into a short animation clip!' },
    { model: ceramicsObject, texture: ceramicsTexture, uvChannel: 0, name: 'Ceramics', bio: 'I decided to try ceramics for the first time in my last semester-- these were absolutely not my first attempts...' },
    { model: colosseumObject, texture: colosseumTexture, uvChannel: 0, name: 'Colosseum from Rome', bio: 'Another souvenir from a friend.' },
    { model: desktopObject, texture: desktopTexture, uvChannel: 1, name: 'Desktop Computer', bio: 'The poor machine that had to witness hours and hours of coding and software engineering.' },
    { model: deskJournalObject, texture: deskJournalTexture, uvChannel: 1, name: 'My Journal', bio: 'I\'ve been journaling regularly for over a decade. It helps me collect my thoughts and reflect on how to move forward.' },
    { model: deskMugObject, texture: deskMugTexture, uvChannel: 1, name: 'Tea Cup', bio: 'A tea cup I painted. It was constantly filled with chamomile tea to get me through long work nights. Watch this <a href="https://youtu.be/R6S3M9nhOBk?si=ZpZxpnFegMG6alfa" class="bio-link" target="_blank" rel="noopener">short stop-motion animation about it!</a>' },
    { model: harvardFlagObject, texture: harvardFlagTexture, uvChannel: 1, name: 'Harvard Pennant', bio: 'From its historic libraries to the lawn chairs in the Yard, Harvard became my home in a way I had never thought possible.' },
    { model: wallImagesObject, texture: wallImagesTexture, uvChannel: 1, name: 'Wall Photos', bio: 'Forever someone who likes to keep memories, you can frequently find me with a camera.' },
    { model: eiffelTowerObject, texture: eiffelTowerTexture, uvChannel: 0, name: 'Eiffel Tower Souvenir from Paris', bio: 'One day, I\'ll be at GOBELINS Paris studying computer graphics. For now, I\'ll keep on learning French on my own :)' },
    { model: vikingShipObject, texture: vikingShipTexture, uvChannel: 0, name: 'Viking Ship Snowglobe from Norway', bio: 'I studied abroad in Norway and fell in love with a culture I previously didn\'t know much about.' }
];

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// let axesHelper, gridHelper;

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();

// axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);
// gridHelper = new THREE.GridHelper(30, 30);
// scene.add(gridHelper);

// const coordHUD = document.createElement('div');
// coordHUD.style.position = 'fixed';
// coordHUD.style.left = '12px';
// coordHUD.style.top = '12px';
// coordHUD.style.padding = '8px 10px';
// coordHUD.style.background = 'rgba(0,0,0,0.6)';
// coordHUD.style.color = '#ffd697';
// coordHUD.style.fontFamily = 'monospace';
// coordHUD.style.fontSize = '12px';
// coordHUD.style.zIndex = 9999;
// coordHUD.style.pointerEvents = 'none';
// coordHUD.innerText = 'loading...';
// document.body.appendChild(coordHUD);

const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-5, 5, 5);
camera.lookAt(scene.position);
orbit.update();

orbit.minAzimuthAngle = -Math.PI / 3;
orbit.maxAzimuthAngle = Math.PI / 3;
orbit.minPolarAngle = Math.PI / 6;
orbit.maxPolarAngle = Math.PI / 2.1;

const AZIMUTH_RANGE = Math.PI / 3.7;

const cameraBounds = {
    minX: -8,
    maxX: 8,
    minY: 1.0,
    maxY: 12,
    minZ: -8,
    maxZ: 8
};

function clampCameraPosition() {
    const p = camera.position;
    p.x = Math.max(cameraBounds.minX, Math.min(cameraBounds.maxX, p.x));
    p.y = Math.max(cameraBounds.minY, Math.min(cameraBounds.maxY, p.y));
    p.z = Math.max(cameraBounds.minZ, Math.min(cameraBounds.maxZ, p.z));
    camera.position.copy(p);
}

orbit.addEventListener('change', clampCameraPosition);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -0.01;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
directionalLight.position.set(-5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// --- Postprocessing setup (needed for the hover glow outline) ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
);
outlinePass.edgeStrength = 5;
outlinePass.edgeGlow = 1.2;
outlinePass.edgeThickness = 2;
outlinePass.pulsePeriod = 0;
outlinePass.visibleEdgeColor.set('#ffb07f');
outlinePass.hiddenEdgeColor.set('#2a3d4d');
outlinePass.selectedObjects = [];
composer.addPass(outlinePass);

composer.addPass(new OutputPass());

const rgbeLoader = new RGBELoader();
const assetLoader = new GLTFLoader();

// --- Click / hover-to-inspect objects ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const pickableObjects = [];
let hoveredObject = null;
let selectedObject = null; // the object whose info card is currently open

// Info card UI
const infoBox = document.createElement('div');
infoBox.style.position = 'fixed';
infoBox.style.maxWidth = '280px';
infoBox.style.padding = '16px 18px';
infoBox.style.background = 'rgba(252, 248, 235, 0.81)';
infoBox.style.color = '#483408';
infoBox.style.fontFamily = 'sans-serif';
infoBox.style.fontSize = '14px';
infoBox.style.lineHeight = '1.5';
infoBox.style.borderRadius = '10px';
infoBox.style.boxShadow = '0 8px 24px rgba(0,0,0,0.35)';
infoBox.style.zIndex = 10000;
infoBox.style.opacity = '0';
infoBox.style.transform = 'translateY(6px)';
infoBox.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
infoBox.style.pointerEvents = 'none';
infoBox.style.display = 'none';
document.body.appendChild(infoBox);

const infoBoxTitle = document.createElement('div');
infoBoxTitle.style.fontWeight = '600';
infoBoxTitle.style.fontSize = '15px';
infoBoxTitle.style.marginBottom = '6px';
infoBoxTitle.style.paddingRight = '20px';
infoBox.appendChild(infoBoxTitle);

const infoBoxBody = document.createElement('div');
infoBox.appendChild(infoBoxBody);

const infoBoxClose = document.createElement('div');
infoBoxClose.innerText = '\u00D7'; // ×
infoBoxClose.style.position = 'absolute';
infoBoxClose.style.top = '8px';
infoBoxClose.style.right = '12px';
infoBoxClose.style.cursor = 'pointer';
infoBoxClose.style.fontSize = '18px';
infoBoxClose.style.color = '#a49770';
infoBoxClose.style.pointerEvents = 'auto';
infoBoxClose.addEventListener('click', hideInfoBox);
infoBox.appendChild(infoBoxClose);

function showInfoBox(object, screenX, screenY) {
    infoBoxTitle.innerText = object.userData.name;
    // infoBoxBody.innerText = object.userData.bio;
    infoBoxBody.innerHTML = object.userData.bio;
    infoBox.style.display = 'block';
    infoBox.style.pointerEvents = 'auto';

    requestAnimationFrame(() => {
        const boxWidth = infoBox.offsetWidth;
        const boxHeight = infoBox.offsetHeight;
        const canvasRect = renderer.domElement.getBoundingClientRect();
        const padding = 12;

        let left = screenX + padding;
        let top = screenY + padding;

        const minLeft = canvasRect.left + padding;
        const maxLeft = canvasRect.right - boxWidth - padding;
        const minTop = canvasRect.top + padding;
        const maxTop = canvasRect.bottom - boxHeight - padding;

        left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
        top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

        // If the box would overflow past the right or bottom edge, flip it to the left/top side
        if (screenX + boxWidth + padding > canvasRect.right) {
            left = screenX - boxWidth - padding;
        }
        if (screenY + boxHeight + padding > canvasRect.bottom) {
            top = screenY - boxHeight - padding;
        }

        left = Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft));
        top = Math.min(Math.max(top, minTop), Math.max(minTop, maxTop));

        infoBox.style.left = `${left}px`;
        infoBox.style.top = `${top}px`;
        infoBox.style.opacity = '1';
        infoBox.style.transform = 'translateY(0)';
    });

    selectedObject = object;
    outlinePass.selectedObjects = [object];

    // // Move the orbit target onto the object so the user can zoom right up to it
    // const objectCenter = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
    // orbit.target.copy(objectCenter);
    // orbit.update();
}

function hideInfoBox() {
    infoBox.style.opacity = '0';
    infoBox.style.transform = 'translateY(6px)';
    infoBox.style.pointerEvents = 'none';
    setTimeout(() => {
        if (infoBox.style.opacity === '0') infoBox.style.display = 'none';
    }, 180);
    selectedObject = null;
    if (!hoveredObject) outlinePass.selectedObjects = [];

    // Restore the default room-centered target
    // orbit.target.copy(roomTarget);
    // orbit.update();
}

// --- Controls help panel ---
const controlsPanel = document.createElement('div');
controlsPanel.style.position = 'fixed';
controlsPanel.style.maxWidth = '280px';
controlsPanel.style.padding = '22px 26px';
controlsPanel.style.background = 'rgba(252, 248, 235, 0.81)';
controlsPanel.style.color = '#483408';
controlsPanel.style.fontFamily = 'sans-serif';
controlsPanel.style.fontSize = '13px';
controlsPanel.style.lineHeight = '1.6';
controlsPanel.style.borderRadius = '12px';
controlsPanel.style.boxShadow = '0 8px 28px rgba(0,0,0,0.4)';
controlsPanel.style.zIndex = 10000;
controlsPanel.style.opacity = '1';
controlsPanel.style.transition = 'opacity 0.4s ease, top 0.5s ease, left 0.5s ease, transform 0.5s ease';
controlsPanel.innerHTML = `
    <div style="font-weight:600; font-size:15px; margin-bottom:12px;">Welcome to my room!</div>
    <div style="font-weight:300; margin-bottom:8px;"><strong>This model may take a few seconds to load. In the meantime, here's how to navigate around it using your trackpad:</div>
    <div style="font-weight:500; margin-bottom:6px;"><strong>To rotate view:</strong> drag with one finger.</div>
    <div style="font-weight:500; margin-bottom:6px;"><strong>To zoom in or out:</strong> scroll with two fingers.</div>
    <div style="font-weight:500; margin-bottom:6px;"><strong>To pan horizontally/vertically: </strong> while holding shift, drag with one finger</div>
    <div><strong>Click an object</strong> to see its details!</div>
`;
document.body.appendChild(controlsPanel);

// Small toggle button, always visible, to bring the panel back
const controlsToggle = document.createElement('div');
controlsToggle.innerText = '?';
controlsToggle.title = 'Show controls';
controlsToggle.style.position = 'fixed';
controlsToggle.style.left = '16px';
controlsToggle.style.bottom = '16px';
controlsToggle.style.width = '32px';
controlsToggle.style.height = '32px';
controlsToggle.style.borderRadius = '50%';
controlsToggle.style.background = 'rgba(20,20,20,0.88)';
controlsToggle.style.color = '#fff';
controlsToggle.style.display = 'flex';
controlsToggle.style.alignItems = 'center';
controlsToggle.style.justifyContent = 'center';
controlsToggle.style.fontFamily = 'sans-serif';
controlsToggle.style.fontWeight = '600';
controlsToggle.style.fontSize = '15px';
controlsToggle.style.cursor = 'pointer';
controlsToggle.style.zIndex = 10000;
controlsToggle.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
controlsToggle.style.opacity = '0'; // hidden until model finishes loading
controlsToggle.style.pointerEvents = 'none';
document.body.appendChild(controlsToggle);

let panelVisible = true;
let hasLoadedOnce = false; // tracks whether we've transitioned out of the centered "loading" state

function setPanelToCenter() {
    controlsPanel.style.left = '50%';
    controlsPanel.style.top = '50%';
    controlsPanel.style.transform = 'translate(-50%, -50%)';
}

function setPanelToCorner() {
    controlsPanel.style.left = '16px';
    controlsPanel.style.top = '76%';
    controlsPanel.style.transform = 'translateY(-50%)';
}

function hideControlsPanel() {
    controlsPanel.style.opacity = '0';
    controlsPanel.style.pointerEvents = 'none';
    panelVisible = false;
}

function showControlsPanel() {
    // Once the user manually toggles it back on, it should always show
    // in the corner position, not center
    setPanelToCorner();
    controlsPanel.style.opacity = '1';
    controlsPanel.style.pointerEvents = 'auto';
    panelVisible = true;
}

controlsToggle.addEventListener('click', () => {
    if (panelVisible) {
        hideControlsPanel();
    } else {
        showControlsPanel();
    }
});

// Start centered, for the initial loading state
setPanelToCenter();

// Call this once your model/assets finish loading
function onModelLoadComplete() {
    if (hasLoadedOnce) return;
    hasLoadedOnce = true;

    // Reveal the toggle button now that the scene is interactive
    controlsToggle.style.opacity = '1';
    controlsToggle.style.pointerEvents = 'auto';

    // Move the panel to the corner, then fade it out after a beat
    // so the user has a moment to read it in its new spot
    setPanelToCorner();
    setTimeout(() => {
        if (panelVisible) hideControlsPanel();
    }, 3000);
}

function findPickableAncestor(object) {
    let obj = object;
    while (obj && !obj.userData.bio) {
        obj = obj.parent;
    }
    return obj;
}

function onPointerMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(pickableObjects, true);

    if (intersects.length > 0) {
        const hit = findPickableAncestor(intersects[0].object);
        if (hit) {
            hoveredObject = hit;
            renderer.domElement.style.cursor = 'pointer';
            // Only drive the outline off hover if nothing is currently selected/open
            if (!selectedObject) outlinePass.selectedObjects = [hit];
            return;
        }
    }

    hoveredObject = null;
    renderer.domElement.style.cursor = 'default';
    if (!selectedObject) outlinePass.selectedObjects = [];
}

function onCanvasClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(pickableObjects, true);

    if (intersects.length > 0) {
        const hit = findPickableAncestor(intersects[0].object);
        if (hit) {
            showInfoBox(hit, event.clientX, event.clientY);
            return;
        }
    }
    hideInfoBox();
}

renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('click', onCanvasClick);

let loadedAssetCount = 0;
const totalAssetCount = modelAssets.length;

modelAssets.forEach((asset) => {

    rgbeLoader.load(asset.texture, (hdrTexture) => {
        hdrTexture.flipY = false;
        hdrTexture.colorSpace = THREE.LinearSRGBColorSpace;
        hdrTexture.channel = asset.uvChannel;

        const bakedMaterial = new THREE.MeshBasicMaterial({ map: hdrTexture });

        assetLoader.load(asset.model, function (gltf) {
            const modelObject = gltf.scene;

            modelObject.traverse((child) => {
                if (child.isMesh) {
                    child.material = bakedMaterial;
                }
            });

            scene.add(modelObject);
            modelObject.position.set(0, 0, 0);
            modelObject.receiveShadow = true;

            modelObject.userData.name = asset.name;
            modelObject.userData.bio = asset.bio;
            if (asset.bio) {
                pickableObjects.push(modelObject);
            }

            if (asset.model === roomObject) {
                const roomBox = new THREE.Box3().setFromObject(modelObject);
                const outsidePadding = 5;
                cameraBounds.minX = roomBox.min.x - outsidePadding;
                cameraBounds.maxX = roomBox.max.x + outsidePadding;
                cameraBounds.minY = Math.max(cameraBounds.minY, roomBox.min.y + 0.5);
                cameraBounds.maxY = Math.min(cameraBounds.maxY, roomBox.max.y - 0.1);
                cameraBounds.minZ = roomBox.min.z - outsidePadding;
                cameraBounds.maxZ = roomBox.max.z + outsidePadding;

                orbit.maxDistance = 10;
                orbit.minDistance = 0.3;

                const roomCenter = roomBox.getCenter(new THREE.Vector3());
                const roomTarget = new THREE.Vector3();

                orbit.target.copy(roomCenter);
                roomTarget.copy(roomCenter);
                // axesHelper.position.copy(roomCenter);
                // gridHelper.position.set(roomCenter.x, roomCenter.y - 0.01, roomCenter.z);

                const dir = camera.position.clone().sub(orbit.target).normalize();
                const desiredDistance = 12;
                camera.position.copy(orbit.target.clone().add(dir.multiplyScalar(desiredDistance)));
                clampCameraPosition();
                orbit.update();

                const centerAzimuth = orbit.getAzimuthalAngle();
                orbit.minAzimuthAngle = centerAzimuth - AZIMUTH_RANGE;
                orbit.maxAzimuthAngle = centerAzimuth + AZIMUTH_RANGE;
                orbit.update();
            }

            loadedAssetCount++;
            if (loadedAssetCount === totalAssetCount) {
                onModelLoadComplete();
            }
        });
    });
});

function animate(time) {
    orbit.update();

    const p = camera.position;
    const t = orbit.target;
    // coordHUD.innerText = `cam: x:${p.x.toFixed(2)} y:${p.y.toFixed(2)} z:${p.z.toFixed(2)}\n` +
    //                      `target: x:${t.x.toFixed(2)} y:${t.y.toFixed(2)} z:${t.z.toFixed(2)}\n` +
    //                      `azimuth: ${orbit.getAzimuthalAngle().toFixed(3)} rad`;

    composer.render();
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    outlinePass.resolution.set(window.innerWidth, window.innerHeight);
});

// UV channels
/* bed: 1
desk: 0
*/