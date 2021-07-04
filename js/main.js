const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.2, 1000);
        camera.position.z = 25;
        camera.position.y = 60;

        // Create Full Screen Renderer

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setClearColor('#DDDDDD');
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);


        // Responsiveness

        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;


            camera.updateProjectMatrix();
        })

        const light = new THREE.PointLight(0xFFFFFFF, 1.4, 1000)
        light.position.set(0, 15, 15);
        scene.add(light);

        let ourObj;

        // Create Model

        const mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('assets/tier_scooter.mtl', (materials) => {
            materials.preload();

            const objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('assets/tier_scooter.obj', (object) => {
            scene.add(object)
            ourObj = object;
            object.position.z -= 150;
            object.rotation.x = 250;
        });

        });

        const render = () => {
            requestAnimationFrame(render);
            ourObj.rotation.z -= .04;

            renderer.render(scene, camera)
        }

        render();