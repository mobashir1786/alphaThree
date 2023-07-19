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

                gsap.to(leftBrain.scale, {
                    x: 1, // Original x scale
                    y: 1, // Original y scale
                    z: 1, // Original z scale
                    duration: 2, // Zoom in duration
                    ease: 'power2.inOut', // Easing function for zoom in
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

                gsap.to(rightBrain.scale, {
                    x: 1, // Original x scale
                    y: 1, // Original y scale
                    z: 1, // Original z scale
                    duration: 2, // Zoom in duration
                    ease: 'power2.inOut', // Easing function for zoom in
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
            // Animate the camera position to zoom in
            gsap.to(camera.position, {
                z: 1, // New position closer to the object
                duration: 3, // Zoom in duration
                ease: 'power2.inOut', // Easing function for zoom in
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div>
            <div className='refele applyfilter' ref={canvasRef} />
            <div className='contentTop'>
                <div className='smallText'>We are try to mix Right Brain - Left brain</div>
                <div className='largeText'>SOLUTIONS</div>
            </div>
            <div className='contentBottom'>
                <div className='smallText'>who revel in problem and challenges</div>
                <div className='smallText'>as there lies the way to no nivarana for our soul</div>
            </div>
        </div>
    );
}

export default Brain;
