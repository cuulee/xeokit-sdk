/*
 * A minimal app that views an OBJ file.
 */
import {Viewer} from "../../../src/viewer/Viewer.js";
import {OBJModelsPlugin} from "../../../src/viewer/plugins/OBJModelsPlugin/OBJModelsPlugin.js";
import {AxisGizmoPlugin} from "../../../src/viewer/plugins/AxisGizmoPlugin/AxisGizmoPlugin.js";

export default class GLTFViewerApp {

    constructor(cfg) {
        this.src = "./../../models/obj/sportsCar/sportsCar.obj";
    }

    start() {

        const viewer = new Viewer({
            canvasId: "glcanvas"
        });

        new OBJModelsPlugin(viewer, {id: "gltf"});
        new AxisGizmoPlugin(viewer, {id: "axis", size: [250, 250]});

        const model = viewer.plugins.gltf.load({
            id: "foo",
            src: this.src,
            edges: true
        });

        const scene = viewer.scene;
        const camera = scene.camera;

        camera.orbitPitch(20);

        model.on("loaded", () => {
            viewer.cameraFlight.flyTo(model);
            scene.on("tick", () => {
                camera.orbitYaw(0.4);
            })
        });
    }
}

new GLTFViewerApp().start();