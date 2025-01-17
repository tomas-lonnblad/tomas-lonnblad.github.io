import * as THREE from "three"

export default function getBgSphere({ hue = 0.565, sat = 1.0 } = {}) {
    const bgSphereGeo = new THREE.IcosahedronGeometry(4, 3);
    const bgSphereMat = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        vertexColors: true,
        fog: false
    });
    // create an array of colors per vertex
    const bgSphereColors = [];
    const len = bgSphereGeo.attributes.position.count;
    for (let i = 0; i < len; i++) {
        const z = -bgSphereGeo.attributes.position.getZ(i);
        const { r, g, b } = new THREE.Color().setHSL(hue, sat, z * 0.015);
        bgSphereColors.push(r, g, b);
    }
    bgSphereGeo.setAttribute('color', new THREE.Float32BufferAttribute(bgSphereColors, 3));
    const bgSphere = new THREE.Mesh(bgSphereGeo, bgSphereMat);

    return bgSphere;
}
