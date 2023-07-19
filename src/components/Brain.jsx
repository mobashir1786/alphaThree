// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { gsap } from 'gsap';
// import brainleft from '../assets/brainleft.gltf';
// import brainright from '../assets/brainright.gltf';

// function Brain() {

//     const canvasRef = useRef(null);

//     useEffect(() => {
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(
//             75,
//             window.innerWidth / window.innerHeight,
//             0.1,
//             100
//         );
//         camera.position.z = 10;

//         const renderer = new THREE.WebGLRenderer({ antialias: true });
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         const canvas = canvasRef.current;
//         canvas.appendChild(renderer.domElement);

//         let model1;
//         let model2;
//         const loader = new GLTFLoader();
//         loader.load(
//             brainleft,
//             (gltf) => {
//                 model1 = gltf.scene;
//                 model1.visible = true; // Ensure model1 visibility is set to true
//                 scene.add(model1);

//                 // Adjust model1 position, scale, and rotation if needed
//                 model1.position.set(0, 0, 0);
//                 model1.scale.set(1, 1, 1);
//                 model1.rotation.set(
//                     THREE.MathUtils.degToRad(180),
//                     THREE.MathUtils.degToRad(0),
//                     THREE.MathUtils.degToRad(180)
//                 );

//                 // Animation using gsap
//                 gsap.to(model1.rotation, {
//                     y: Math.PI * 2,
//                     duration: 3,
//                     repeat: -1,
//                     ease: 'power0.ease',
//                 });
//             },
//             (progress) => {
//                 console.log(`Loading: ${Math.floor((progress.loaded / progress.total) * 100)}%`);
//             },
//             (error) => {
//                 console.error('Error loading model1:', error);
//             }
//         );

//         const light = new THREE.DirectionalLight(0xffffff, 1); // Add a directional light
//         light.position.set(0, 1, 1);
//         scene.add(light);

//         const animate = () => {
//             renderer.render(scene, camera);
//             requestAnimationFrame(animate);
//         };

//         animate();
//     }, []);

//     return (
//         <div>
//             <div className='refele' ref={canvasRef} />
//             <div className='landingComponent'>
//                 <div className='ltopLine'>ATTAIN</div>
//                 <div className='bottomLine'>DIGITAL NIVARAN</div>
//             </div>
//         </div>
//     );
// }


// export default Brain




import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

import brainleft from '../assets/brainleft.gltf';
import brainright from '../assets/brainright.gltf';

function Brain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = canvasRef.current;
        canvas.appendChild(renderer.domElement);

        let leftBrain;
        let rightBrain;
        const loader = new GLTFLoader();
        loader.load(
            brainleft,
            (gltf) => {
                leftBrain = gltf.scene;
                leftBrain.visible = true;
                leftBrain.position.set(-3, 0, 0); // Position of the left brain object
                leftBrain.scale.set(0.8, 0.8, 0.8); // Scale of the left brain object
                scene.add(leftBrain);

                gsap.from(leftBrain.position, {
                    x: -10, // Initial position for animation
                    duration: 2,
                    ease: 'power2.out', // Zoom in smoothly
                });
            },
            (progress) => {
                console.log(`Loading: ${Math.floor((progress.loaded / progress.total) * 100)}%`);
            },
            (error) => {
                console.error('Error loading left brain model:', error);
            }
        );

        loader.load(
            brainright,
            (gltf) => {
                rightBrain = gltf.scene;
                rightBrain.visible = true;
                rightBrain.position.set(3, 0, 0); // Position of the right brain object
                rightBrain.scale.set(0.8, 0.8, 0.8); // Scale of the right brain object
                scene.add(rightBrain);

                gsap.from(rightBrain.position, {
                    x: 10, // Initial position for animation
                    duration: 2,
                    ease: 'power2.out', // Zoom in smoothly
                });
            },
            (progress) => {
                console.log(`Loading: ${Math.floor((progress.loaded / progress.total) * 100)}%`);
            },
            (error) => {
                console.error('Error loading right brain model:', error);
            }
        );

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1);
        scene.add(light);

        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div>
            <div className='refele' ref={canvasRef} />
            <div className='contentTop'>
                <div className='smallText'></div>
                <div className='largeText'></div>
            </div>
            <div className='contentBottom'>
                <div className='largeText'></div>
                <div className='smallText'></div>
            </div>
        </div>
    );
}

export default Brain;
