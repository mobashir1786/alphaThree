import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap, Linear } from 'gsap';
import moon from '../assets/moon.gltf'

function Landing() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        const canvas = canvasRef.current;
        canvas.appendChild(renderer.domElement);


        const loader = new GLTFLoader();
        loader.load(
            moon,
            (gltf) => {
                const model = gltf.scene;
                model.visible = true; // Ensure model visibility is set to true
                scene.add(model);

                // Adjust model position, scale, and rotation if needed
                model.position.set(0, -5.2, -2);
                model.scale.set(1, 1, 1);
                model.rotation.set(
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(45),
                    THREE.MathUtils.degToRad(45)
                );

                // Animation using gsap
                gsap.to(model.rotation, {
                    x: Math.PI * 2,
                    duration: 50,
                    repeat: -1,
                    ease: Linear.easeNone,
                });
            },
            (progress) => {
                console.log(`Loading: ${Math.floor((progress.loaded / progress.total) * 100)}%`);
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        const light = new THREE.PointLight(0xffffff, 1, 100); // Add a directional light
        light.position.set(1, 20, 1);
        scene.add(light);

        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <div className='contentheight'>
            <div className='refele' ref={canvasRef} />
            <div className='landingComponent'>THE ALPHA AGENCY</div>
        </div>
    );
}

export default Landing;
