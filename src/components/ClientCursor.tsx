'use client';

import React, { useEffect } from 'react';

export default function ClientCursor() {
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const coordinates = document.querySelector('.coordinates');
    const magneticTargets = document.querySelectorAll('.magnetic-target, a, button');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update coordinates display
      if (coordinates) {
        coordinates.textContent = `${Math.round(mouseX)}, ${Math.round(mouseY)}`;
      }
    });

    // Animation loop for smooth 60fps
    function animate() {
      // Smooth cursor movement
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      if (cursorDot) {
        cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    }
    animate();

    // Magnetic effect for interactive elements
    magneticTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        if (cursorDot) {
          cursorDot.classList.add('hover');
        }
        target.classList.add('magnetic-target');
      });

      target.addEventListener('mouseleave', () => {
        if (cursorDot) {
          cursorDot.classList.remove('hover');
        }
        target.classList.remove('magnetic-target');
        target.style.transform = '';
      });

      target.addEventListener('mousemove', (e) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;

        target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    });

    // Initialize cursor position
    if (cursorDot) {
      cursorDot.style.transform = 'translate(-50%, -50%)';
    }
  }, []);

  return (
    <>
      <div className="cursor-dot" />
      <div className="coordinates" />
    </>
  );
}