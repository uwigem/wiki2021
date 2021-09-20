import { render } from 'enzyme';
import React, { useEffect, useRef, useState } from 'react';
import { Euler, Vector3, WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export type PlantCubeType = {
    className?: string
    rotations?: Euler // use default rotation order only (XYZ)
}

const ZERO: Euler = new Euler(0, 0, 0, 'XYZ');

const FOV = 75;
const NEAR_CLIP_PLANE = 0.1;
const FAR_CLIP_PLANE = 1000;

export default function PlantCube({ className, rotations=ZERO }: PlantCubeType) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currRotations, setCurrRotations] = useState<Euler>(rotations);
    const [cube, setCube] = useState<Mesh | undefined>(undefined);
    const [renderer, setRenderer] = useState<WebGLRenderer| undefined>(undefined);
    const [scene, setScene] = useState<Scene | undefined>(undefined);
    const [camera, setCamera] = useState<PerspectiveCamera | undefined>(undefined);
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

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        const cube = new Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const renderer = new WebGLRenderer({ canvas: canvasRef.current! });
        renderer.setSize(width!, height!);
        cube.rotation.x = currRotations.x;
        cube.rotation.y = currRotations.y;
        cube.rotation.z = currRotations.z;
        cube.geometry.scale(2, 2, 2);
        setCube(cube);
        setRenderer(renderer);
        setScene(scene);
        setCamera(camera);
    }, [canvasRef]);

    useEffect(() => {
        console.log('plantcube update useEffect');

        if (cube && renderer && scene && camera) {
            const animate = () => {
                const requestId = requestAnimationFrame(() => animate());
                let rotY = cube.rotation.y;
                console.log(rotY, rotations.y);

                if (Math.abs(rotY - rotations.y) < 0.005) {
                    // do nothing
                } else if (rotY < rotations.y) {
                    rotY += 0.003;
                } else if (rotY > rotations.y) {
                    rotY -= 0.003;
                }
                setCurrRotations(new Euler(
                    cube.rotation.x,
                    rotY,
                    cube.rotation.z,
                    'XYZ'
                ));
                cube.rotation.y = rotY;
                renderer.render(scene, camera);
                return requestId;
            }
            const requestId = animate();
            return () => { cancelAnimationFrame(requestId) };
        }
    }, [rotations, cube, scene, camera])

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