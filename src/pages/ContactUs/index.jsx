// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// function App() {
//   const mountRef = useRef(null);
//   const isDragging = useRef(false); // Track whether the mouse is being dragged

//   useEffect(() => {
//     // Create Scene, Camera, and Renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create a Cube
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshStandardMaterial({ color: 'red' , side: THREE.DoubleSide});
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     // Add edges to the cube
//     const edgesGeometry = new THREE.EdgesGeometry(geometry);
//     const edgesMaterial = new THREE.LineBasicMaterial({ color: 'black' });
//     const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
//     scene.add(edges);

//     camera.position.z = 5;

//     // Track mouse movement
//     const onMouseMove = (event) => {
//       if (isDragging.current) {
//         const { clientX, clientY } = event;
//         const rect = renderer.domElement.getBoundingClientRect();

//         // Normalize mouse position to world space
//         const x = ((clientX - rect.left) / rect.width) * 2 - 1;
//         const y = -((clientY - rect.top) / rect.height) * 2 + 1;

//         // Update cube's position
//         cube.position.x = x * 5; // Scale to world space
//         cube.position.y = y * 5; // Scale to world space
//         edges.position.copy(cube.position); // Move edges along with the cube
//       }
//     };

//     // Track mouse down and up
//     const onMouseDown = (event) => {
//       if (event.button === 0) {
//         isDragging.current = true; // Left click pressed
//       }
//     };

//     const onMouseUp = () => {
//       isDragging.current = false; // Left click released
//     };

//     // Add event listeners
//     renderer.domElement.addEventListener('mousemove', onMouseMove);
//     renderer.domElement.addEventListener('mousedown', onMouseDown);
//     renderer.domElement.addEventListener('mouseup', onMouseUp);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Cleanup
//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//       renderer.domElement.removeEventListener('mousemove', onMouseMove);
//       renderer.domElement.removeEventListener('mousedown', onMouseDown);
//       renderer.domElement.removeEventListener('mouseup', onMouseUp);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// }

// export default App;


// import React from 'react';
// import { QRCodeSVG } from 'qrcode.react';

// function UpiQRCode({ amount, upiId, payeeName }) {
//   const upiUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR`;

//   return (
//     <div>
//       <h3>Scan to Pay</h3>
//       <QRCodeSVG value={upiUrl} size={200} ></QRCodeSVG>
//       <p>Payee Name: {payeeName}</p>
//       <p>Amount: ₹{amount}</p>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div>
//       <h1>Confirm Order</h1>
//       <UpiQRCode amount="500" upiId="mohdquresh@ybl" payeeName="Uzair" />
//     </div>
//   );
// }

import { useState } from 'react';
import styles from "./index.module.scss"; // Import SCSS module
import { Helmet } from 'react-helmet';
const Door = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDoor = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
       <Helmet>
                <title>Contact us | India Doors</title>
       </Helmet>
    <div className={styles.doorContainer}>
       
      <div className={`${styles.door} ${isOpen ? styles.open : ''}`}></div>
      <button className={styles.button} onClick={toggleDoor}>
        Open/Close Door
      </button>
    </div>
    </>
  );
};

export default Door;


