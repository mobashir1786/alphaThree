import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import halfmoon from '../assets/halfmoon.gltf';

function Halfmoon() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = canvasRef.current;
        canvas.appendChild(renderer.domElement);

        let model;
        const loader = new GLTFLoader();
        loader.load(
            halfmoon,
            (gltf) => {
                model = gltf.scene;
                model.visible = true; // Ensure model visibility is set to true
                scene.add(model);

                // Adjust model position, scale, and rotation if needed
                model.position.set(0, 0, 0);
                model.scale.set(1, 1, 1);
                model.rotation.set(
                    THREE.MathUtils.degToRad(180),
                    THREE.MathUtils.degToRad(0),
                    THREE.MathUtils.degToRad(180)
                );

                // Animation using gsap
                gsap.to(model.rotation, {
                    y: Math.PI * 2,
                    duration: 5,
                    repeat: -1,
                    ease: 'power0.ease',
                });
            },
            (progress) => {
                console.log(`Loading: ${Math.floor((progress.loaded / progress.total) * 100)}%`);
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        const light = new THREE.DirectionalLight(0xffffff, 1); // Add a directional light
        light.position.set(0, 1, 1);
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
        </div>
    );
}

export default Halfmoon;
