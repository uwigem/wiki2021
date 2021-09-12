import React, { useEffect, useRef, useState } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { JsxElement } from 'typescript';

type PlantCubeType = {
    className?: string
}

const FOV = 75;
const NEAR_CLIP_PLANE = 0.1;
const FAR_CLIP_PLANE = 1000;

export default function PlantCube({ className }: PlantCubeType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const scene = new Scene();
        const width = canvasRef.current!.clientWidth;
        const height = canvasRef.current!.clientHeight;
        const camera =  new PerspectiveCamera(
            FOV,
            // @ts-ignore
            width / height,
            NEAR_CLIP_PLANE,
            FAR_CLIP_PLANE
        );

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const renderer = new WebGLRenderer({ canvas: canvasRef.current! });
        renderer.setSize(width!, height!);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }, [canvasRef]);

    return <canvas className={className} ref={canvasRef}></canvas>
}