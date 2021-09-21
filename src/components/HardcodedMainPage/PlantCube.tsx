import React, { useEffect, useRef } from 'react';
import { Euler, Vector3, WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, DirectionalLight, Object3D, AxesHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type PlantCubeType = {
    className?: string
    rotation?: Euler // use default rotation order only (XYZ)
}

const ZERO: Euler = new Euler(0, 0, 0, 'XYZ');

const FOV = 75;
const NEAR_CLIP_PLANE = 0.1;
const FAR_CLIP_PLANE = 1000;
const moveScale = 0.0025;
const moveScaleX = 1;
const moveScaleY = 0.5;
const moveScaleZ = 1;

export default function PlantCube({ className, rotation=ZERO }: PlantCubeType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log('plantcube setup useEffect');

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
        camera.position.y = 3;
        camera.rotateX(-0.25);

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);



        let cube: Object3D;

        const loader = new GLTFLoader();
        loader.load("grassCube.gltf", function (gltf) {
            const scale = 1.25;
            console.log(gltf.scene.children);
            cube = gltf.scene.children[0]
            cube.scale.set(scale, scale, scale);
            cube.rotateY(0.5);
            cube.position.y += 0.5
            scene.add(cube);
        }) ;

        const light1 = new DirectionalLight( 0xefefff, 1.5 );
        light1.position.set( 1, 1, 1 ).normalize();
        scene.add( light1 );

        camera.position.z = 5;

        const renderer = new WebGLRenderer({ canvas: canvasRef.current!, alpha: true });
        renderer.setSize(width!, height!);
        const orbitControls = new OrbitControls(camera, canvasRef.current!);

        const animate = (value: number) => {
            if (value > Math.PI * 2) {
                value = 0;
            }
            const requestId = requestAnimationFrame(() => animate(value + 0.01));
            if (cube) {
                cube.position.y += moveScaleX * moveScale * Math.cos(value);
                cube.position.x += moveScaleY * moveScale * Math.sin(value);
                cube.position.z += moveScaleZ * moveScale * Math.sin(value);
                renderer.render(scene, camera);
            }
            return requestId;
        }
        const requestId = animate(0);
        return () => { cancelAnimationFrame(requestId) };
    }, [canvasRef]);

    return <canvas className={className} ref={canvasRef}></canvas>
}


const TEMP_ROTATION_SPEED = 0.01
function getDeltaVector(current: Euler, goal: Euler): Euler {
    goal = goal.clone();
    current = current.clone();
    const diff = goal
            .toVector3()
            .sub(modVector3(current.toVector3(), Math.PI * 2))
            .normalize();
    // console.log('deltavector', current, goal, diff);
    console.log('deltaVector', diff);

    diff.x = 0
    diff.z = 0
    if (diff.length() === 0) {
        return ZERO;
    }
    return current.setFromVector3(zeroOut(diff.multiplyScalar(TEMP_ROTATION_SPEED), 0.001), 'XYZ');
}

function modVector3(vector: Vector3, modValue: number): Vector3 {
    vector = vector.clone()
    vector.setX(vector.x % modValue);
    vector.setY(vector.y % modValue);
    vector.setZ(vector.z % modValue);
    return vector;
}

function zeroOut(vector: Vector3, minValue: number) {
    vector = vector.clone()
    if (Math.abs(vector.x) < minValue) {
        vector.setX(0);
    }
    if (Math.abs(vector.y) < minValue) {
        vector.setY(0);
    }
    if (Math.abs(vector.z) < minValue) {
        vector.setZ(0);
    }
    console.log(vector);

    return vector;
}