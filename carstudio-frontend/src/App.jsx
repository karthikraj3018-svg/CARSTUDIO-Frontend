import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import "./App.css";


/* ============================================================
   MAIN APP
   ============================================================ */

function App() {

  const [page, setPage] = useState(
    localStorage.getItem("carstudioAdminLoggedIn") === "true"
      ? "admin-dashboard"
      : localStorage.getItem("carstudioLoggedIn") === "true"
        ? "home"
        : "login"
  );


  useEffect(() => {
    const openAdmin = () => setPage("admin-login");
    window.addEventListener("carstudio-open-admin", openAdmin);
    return () => window.removeEventListener("carstudio-open-admin", openAdmin);
  }, []);


  if (page === "admin-login") {

    return (
      <AdminLoginPage
        onLogin={() => setPage("admin-dashboard")}
        onUserStudio={() => setPage("login")}
      />
    );

  }


  if (page === "admin-dashboard") {

    return (
      <AdminDashboard
        onLogout={() => {
          localStorage.removeItem("carstudioAdminLoggedIn");
          localStorage.removeItem("carstudioAdminUsername");
          setPage("admin-login");
        }}
        onUserStudio={() => setPage("home")}
      />
    );

  }


  /* ==========================================================
     LOGIN
     ========================================================== */

  if (page === "login") {

    return (
      <LoginPage
        onLogin={() => setPage("home")}
      />
    );

  }


  /* ==========================================================
     HOME / COLLECTION
     ========================================================== */

  if (page === "home") {

    return (
      <HomePage
        onOpenUrus={() => setPage("showroom")}
        onOpenBmw={() => setPage("showroom-bmw")}
        onLogout={() => {
          localStorage.removeItem("carstudioLoggedIn");
          localStorage.removeItem("carstudioUsername");
          setPage("login");
        }}
      />
    );

  }


  /* ==========================================================
     SHOWROOM
     ========================================================== */

  if (page === "showroom-bmw") {
    return <Showroom model="bmw-m4csl" />;
  }

  return <Showroom model="urus-se" />;

}



/* ============================================================
   LOGIN PAGE
   ============================================================ */

function LoginPage({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function login() {

    if (!username.trim() || !password.trim()) {

      alert("Please enter username and password.");

      return;

    }


    localStorage.setItem(
      "carstudioLoggedIn",
      "true"
    );

    localStorage.setItem(
      "carstudioUsername",
      username
    );


    onLogin();

  }


  return (

    <div className="login-page">

      <div className="login-background">

        <div className="login-light light-one"></div>

        <div className="login-light light-two"></div>

        <div className="login-line-grid"></div>

      </div>


      <div className="login-content">

        <div className="login-logo">
          CARSTUDIO
        </div>


        <div className="login-divider"></div>


        <div className="login-label">
          AUTOMOTIVE CONFIGURATION STUDIO
        </div>


        <h1>
          ENTER
          <br />
          <span>CARSTUDIO</span>
        </h1>


        <p className="login-description">
          EXPERIENCE THE FUTURE OF
          AUTOMOTIVE CONFIGURATION
        </p>


        <div className="login-box">

          <div className="input-group">

            <label>
              USERNAME
            </label>

            <input
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>


          <div className="input-group">

            <label>
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  login();
                }

              }}
            />

          </div>


          <button
            className="login-button"
            onClick={login}
          >

            <span>
              ENTER STUDIO
            </span>

            <strong>
              →
            </strong>

          </button>

        </div>


        <div className="login-footer">

          PRIVATE AUTOMOTIVE
          CONFIGURATION EXPERIENCE

        </div>


        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("carstudio-open-admin"))}
          style={{
            marginTop: "18px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,.18)",
            color: "rgba(255,255,255,.65)",
            padding: "10px 18px",
            letterSpacing: "2px",
            fontSize: "10px",
            cursor: "pointer"
          }}
        >
          ADMIN ACCESS
        </button>

      </div>

    </div>

  );

}



/* ============================================================
   ADMIN LOGIN
   ============================================================ */

function AdminLoginPage({ onLogin, onUserStudio }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (!username.trim() || !password.trim()) {
      alert("Enter admin username and password.");
      return;
    }

    localStorage.setItem("carstudioAdminLoggedIn", "true");
    localStorage.setItem("carstudioAdminUsername", username);
    onLogin();
  }

  return (
    <div style={{ minHeight:"100vh", background:"radial-gradient(circle at 50% 58%, #17202a 0%, #07090c 48%, #020304 100%)", color:"white", position:"relative", overflow:"hidden", fontFamily:"Arial,Helvetica,sans-serif" }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, transparent 0%, rgba(255,255,255,.025) 50%, transparent 100%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", left:"10%", right:"10%", bottom:"14%", height:2, background:"linear-gradient(90deg, transparent, rgba(180,220,255,.5), transparent)", boxShadow:"0 0 35px rgba(160,210,255,.45)" }} />
      <div style={{ position:"absolute", left:"8%", bottom:"15%", width:"28%", height:"120px", background:"radial-gradient(ellipse, rgba(220,240,255,.22), transparent 68%)", filter:"blur(8px)" }} />
      <div style={{ position:"absolute", right:"8%", bottom:"15%", width:"28%", height:"120px", background:"radial-gradient(ellipse, rgba(220,240,255,.22), transparent 68%)", filter:"blur(8px)" }} />

      <div style={{ position:"relative", zIndex:2, width:"min(460px, 90vw)", margin:"0 auto", paddingTop:"11vh" }}>
        <div style={{ textAlign:"center", letterSpacing:"7px", fontSize:"13px", opacity:.72 }}>CARSTUDIO</div>
        <div style={{ textAlign:"center", letterSpacing:"4px", fontSize:"10px", marginTop:12, color:"#9fb5c9" }}>ADMINISTRATION SYSTEM</div>

        <div style={{ marginTop:48, padding:32, background:"rgba(8,11,15,.78)", border:"1px solid rgba(190,220,245,.16)", boxShadow:"0 25px 80px rgba(0,0,0,.55), inset 0 0 45px rgba(120,180,230,.035)", backdropFilter:"blur(12px)" }}>
          <div style={{ letterSpacing:"3px", fontSize:12, color:"#b8cadb", marginBottom:25 }}>ADMIN LOGIN</div>
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="USERNAME" style={adminInputStyle} />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="PASSWORD" style={{...adminInputStyle, marginTop:12}} />
          <button onClick={login} style={adminPrimaryStyle}>ENTER ADMIN DASHBOARD <span>→</span></button>
          <button onClick={onUserStudio} style={adminSecondaryStyle}>USER STUDIO</button>
        </div>
      </div>
    </div>
  );
}

const adminInputStyle = { width:"100%", boxSizing:"border-box", padding:"15px 14px", background:"rgba(255,255,255,.035)", border:"1px solid rgba(255,255,255,.12)", color:"white", outline:"none", letterSpacing:"1.5px" };
const adminPrimaryStyle = { width:"100%", marginTop:18, padding:"15px", background:"linear-gradient(90deg,#dbe9f5,#ffffff)", color:"#080b0e", border:0, fontWeight:700, letterSpacing:"2px", cursor:"pointer" };
const adminSecondaryStyle = { width:"100%", marginTop:10, padding:"12px", background:"transparent", color:"#a9bacb", border:"1px solid rgba(255,255,255,.12)", letterSpacing:"2px", cursor:"pointer" };


/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */

function AdminDashboard({ onLogout, onUserStudio }) {
  const [active, setActive] = useState("DASHBOARD");
  const items = ["DASHBOARD", "CARS", "PARTS", "CATEGORIES", "PRICES", "USERS"];

  const cards = {
    DASHBOARD: [
      ["6", "CAR MODELS"],
      ["3", "BRANDS"],
      ["0", "SAVED DESIGNS"],
      ["0", "ORDERS"]
    ],
    CARS: [["CAR MANAGEMENT", "Add, edit and deactivate car models."],["CURRENT", "Lamborghini • Porsche • BMW"]],
    PARTS: [["PART MANAGEMENT", "Manage exterior, interior, wheels and accessories."],["STATUS", "Ready for integration"]],
    CATEGORIES: [["CATEGORIES", "Exterior • Interior • Wheels • Accessories"],["STATUS", "Ready for integration"]],
    PRICES: [["PRICE MANAGEMENT", "Control base car and customization pricing."],["STATUS", "Ready for integration"]],
    USERS: [["USER MANAGEMENT", "View registered users and account roles."],["STATUS", "Ready for integration"]]
  };

  return (
    <div style={{minHeight:"100vh",background:"#06080b",color:"#f4f7fa",fontFamily:"Arial,Helvetica,sans-serif",display:"flex"}}>
      <aside style={{width:250,background:"linear-gradient(180deg,#0b0f14,#050608)",borderRight:"1px solid rgba(255,255,255,.09)",padding:"30px 18px",boxSizing:"border-box",display:"flex",flexDirection:"column"}}>
        <div style={{letterSpacing:"5px",fontSize:16,padding:"0 12px"}}>CARSTUDIO</div>
        <div style={{fontSize:9,letterSpacing:"2px",color:"#718091",padding:"8px 12px 28px"}}>ADMIN CONTROL</div>
        <div style={{display:"grid",gap:7}}>
          {items.map(item=><button key={item} onClick={()=>setActive(item)} style={{textAlign:"left",padding:"14px 13px",background:active===item?"linear-gradient(90deg,rgba(180,215,245,.16),transparent)":"transparent",border:active===item?"1px solid rgba(190,220,245,.16)":"1px solid transparent",color:active===item?"#fff":"#8793a0",letterSpacing:"2px",fontSize:10,cursor:"pointer"}}>{item}</button>)}
        </div>
        <div style={{marginTop:"auto",display:"grid",gap:8}}>
          <button onClick={onUserStudio} style={{padding:13,background:"transparent",border:"1px solid rgba(255,255,255,.12)",color:"#aebdca",letterSpacing:"1.5px",cursor:"pointer"}}>USER STUDIO</button>
          <button onClick={onLogout} style={{padding:13,background:"transparent",border:"1px solid rgba(255,255,255,.08)",color:"#6f7b87",letterSpacing:"1.5px",cursor:"pointer"}}>LOG OUT</button>
        </div>
      </aside>

      <main style={{flex:1,padding:"38px 42px",background:"radial-gradient(circle at 75% 0%,rgba(100,140,180,.10),transparent 35%)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",borderBottom:"1px solid rgba(255,255,255,.08)",paddingBottom:25}}>
          <div><div style={{fontSize:11,letterSpacing:"3px",color:"#8293a4"}}>CARSTUDIO / ADMIN</div><h1 style={{fontSize:30,letterSpacing:"4px",fontWeight:400,margin:"10px 0 0"}}>{active}</h1></div>
          <div style={{fontSize:10,letterSpacing:"2px",color:"#74818e"}}>ADMINISTRATOR</div>
        </div>

        <div style={{marginTop:30,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:15}}>
          {cards[active].map((card,i)=><div key={i} style={{minHeight:100,padding:22,boxSizing:"border-box",background:"rgba(255,255,255,.035)",border:"1px solid rgba(255,255,255,.08)",boxShadow:"inset 0 0 35px rgba(130,180,220,.025)"}}><div style={{fontSize:i===0&&active==="DASHBOARD"?32:14,fontWeight:500,letterSpacing:"2px"}}>{card[0]}</div><div style={{marginTop:12,fontSize:10,lineHeight:1.7,letterSpacing:"1px",color:"#82909e"}}>{card[1]}</div></div>)}
        </div>

        <div style={{marginTop:25,padding:25,minHeight:280,background:"linear-gradient(135deg,rgba(255,255,255,.035),rgba(255,255,255,.012))",border:"1px solid rgba(255,255,255,.08)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:"auto 0 0",height:2,background:"linear-gradient(90deg,transparent,#cfe7ff,transparent)",boxShadow:"0 0 30px #b9ddff"}} />
          <div style={{fontSize:11,letterSpacing:"3px",color:"#8d9baa"}}>SYSTEM OVERVIEW</div>
          <div style={{marginTop:20,fontSize:15,color:"#cfd8e0",maxWidth:650,lineHeight:1.8}}>Manage the CARSTUDIO catalog and customization data from one place. Cars, parts, categories, prices and users remain separated as defined by the project flow.</div>
        </div>
      </main>
    </div>
  );
}


/* ============================================================
   CARSTUDIO HOME / COLLECTION
   ============================================================ */

function HomePage({
  onOpenUrus,
  onOpenBmw,
  onLogout
}) {

  return (

    <div className="home-page">


      {/* ======================================================
         HEADER
         ====================================================== */}

      <header className="home-header">

        <div className="home-brand">

          <div className="home-logo">
            CARSTUDIO
          </div>

          <span>
            AUTOMOTIVE COLLECTION
          </span>

        </div>


        <nav className="home-nav">

          <a href="#collection">
            COLLECTION
          </a>

          <a href="#brands">
            BRANDS
          </a>

          <a href="#about">
            ABOUT
          </a>

        </nav>


        <button
          className="home-logout"
          onClick={onLogout}
        >
          LOG OUT
        </button>

      </header>



      {/* ======================================================
         HERO
         ====================================================== */}

      <section className="home-hero">

        <div className="hero-background"></div>

        <div className="hero-glow"></div>


        <div className="hero-content">

          <div className="hero-small">
            CARSTUDIO / 2026 COLLECTION
          </div>


          <h1>

            THE ART OF

            <span>
              AUTOMOTIVE
            </span>

          </h1>


          <p>
            Explore performance automobiles
            and create your own configuration.
          </p>


          <a
            href="#collection"
            className="hero-button"
          >

            DISCOVER COLLECTION

            <span>
              ↓
            </span>

          </a>

        </div>


        <div className="hero-side-text">
          CARSTUDIO
        </div>


        <div className="hero-number">
          01
        </div>

      </section>



      {/* ======================================================
         COLLECTION
         ====================================================== */}

      <main
        id="collection"
        className="collection"
      >


        <div
          id="brands"
          className="collection-intro"
        >

          <div>

            <span>
              01 — COLLECTION
            </span>

            <h2>
              DISCOVER
              <br />
              YOUR CAR
            </h2>

          </div>


          <p>
            Enter the world of CARSTUDIO.
            Explore selected performance
            automobiles and configure your
            preferred vehicle.
          </p>

        </div>



        {/* ====================================================
           LAMBORGHINI
           ==================================================== */}

        <section className="brand-section lamborghini-brand-section">

          {/* BACKGROUND IMAGE */}

          <img
            className="brand-background-image"
            src="/images/lamborghini.jpg"
            alt="Lamborghini"
          />


          {/* DARK CINEMATIC OVERLAY */}

          <div className="brand-background-overlay"></div>


          {/* CONTENT */}

          <div className="brand-info">

            <div className="brand-number">
              01
            </div>


            <div className="brand-label">
              LAMBORGHINI
            </div>


            <h2>
              LAMBORGHINI
            </h2>


            <p>
              Italian performance.
              Aggressive design.
              Uncompromising character.
            </p>


            <button
              className="discover-button"
              onClick={onOpenUrus}
            >

              <span>
                DISCOVER MORE
              </span>

              <strong>
                →
              </strong>

            </button>

          </div>



          {/* URUS CARD */}

          <div className="collection-car-card">

            <img
              src="http://localhost:8080/images/cars/urus-se/front.jpg"
              alt="Lamborghini Urus SE"
            />


            <div className="car-card-overlay"></div>


            <div className="car-card-content">

              <span>
                LAMBORGHINI
              </span>

              <h3>
                URUS SE
              </h3>

              <p>
                PERFORMANCE HYBRID
              </p>

            </div>


            <button
              className="card-open"
              onClick={onOpenUrus}
            >
              →
            </button>

          </div>

        </section>



        {/* ====================================================
           PORSCHE
           ==================================================== */}

        <section className="brand-section reverse">

          <div className="brand-info">

            <div className="brand-number">
              02
            </div>


            <div className="brand-label">
              PORSCHE
            </div>


            <h2>
              PORSCHE
            </h2>


            <p>
              Precision engineering,
              timeless design and
              performance.
            </p>


            <button className="discover-button">

              <span>
                DISCOVER MORE
              </span>

              <strong>
                →
              </strong>

            </button>

          </div>



          <div className="collection-car-card">

            <div className="brand-placeholder">

              <div className="placeholder-number">
                02
              </div>

              <div className="placeholder-brand">
                PORSCHE
              </div>

              <span>
                COLLECTION COMING NEXT
              </span>

            </div>

          </div>

        </section>



        {/* ====================================================
           BMW
           ==================================================== */}

        <section className="brand-section">

          <div className="brand-info">

            <div className="brand-number">
              03
            </div>


            <div className="brand-label">
              BMW
            </div>


            <h2>
              BMW
            </h2>


            <p>
              Dynamic proportions,
              intelligent technology
              and driving performance.
            </p>


            <button
              className="discover-button"
              onClick={onOpenBmw}
            >

              <span>
                DISCOVER MORE
              </span>

              <strong>
                →
              </strong>

            </button>

          </div>



          <div className="collection-car-card">

            <div className="brand-placeholder">

              <div className="placeholder-number">
                03
              </div>

              <div className="placeholder-brand">
                BMW M4 CSL
              </div>

              <span>
                M PERFORMANCE • CONFIGURE NOW
              </span>

            </div>

          </div>

        </section>



        {/* ====================================================
           ABOUT
           ==================================================== */}

        <section
          id="about"
          className="home-about"
        >

          <span>
            CARSTUDIO
          </span>

          <h2>
            YOUR
            <br />
            CONFIGURATION.
          </h2>

          <p>
            Select a vehicle, personalize
            its appearance and create
            your own automotive configuration.
          </p>

        </section>


      </main>



      {/* ======================================================
         FOOTER
         ====================================================== */}

      <footer className="home-footer">

        <div>
          CARSTUDIO
        </div>

        <span>
          AUTOMOTIVE CONFIGURATION STUDIO
        </span>

        <span>
          © 2026 CARSTUDIO
        </span>

      </footer>

    </div>

  );

}



/* ============================================================
   SHOWROOM
   YOUR EXISTING URUS CONFIGURATOR
   ============================================================ */

function Showroom({ model = "urus-se" }) {

  const isBMW = model === "bmw-m4csl";
  const vehicleName = isBMW ? "M4 CSL" : "URUS SE";
  const vehicleCategory = isBMW ? "M PERFORMANCE" : "PERFORMANCE";
  const basePrice = isBMW ? 16000000 : 50000000;

  const viewerRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const carRef = useRef(null);
  const frameRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  const [activeTab, setActiveTab] =
    useState("EXTERIOR");

  const [openOption, setOpenOption] =
    useState("PAINT");

  const [configCollapsed, setConfigCollapsed] = useState(false);

  const [paint, setPaint] =
    useState("#d8e01d");

  const [finish, setFinish] =
    useState("GLOSSY");

  const [brake, setBrake] =
    useState("RED");

  const [wheel, setWheel] =
    useState("STANDARD");

  const [price, setPrice] =
    useState(basePrice);


  const bodyParts = [

    "yellow_Material_0",
    "yellow_CRB_0",
    "yellow001_CRB_0",
    "yellow002_CRB_0",
    "yellow003_CRB_0",
    "yellow004_CRB_0",
    "yellow005_Material_0",

  ];

  const bmwBodyMaterials = [
    "Car_Paint",
    "Car_Paint_.001",
  ];

  /*
     URUS BODY MATERIAL MATCHER
     The GLB stores the painted body across several mesh/material names.
     Match both the original mesh names AND the original yellow material
     names so paint/finish changes continue to work even after materials
     have been cloned.
  */
  function isBodyPaintMesh(object) {
    if (!object || !object.isMesh) return false;

    if (!isBMW && bodyParts.includes(object.name)) return true;

    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];

    return materials.some((material) => {
      if (!material) return false;
      const name = String(material.name || "").trim().toLowerCase();

      if (isBMW) {
        return bmwBodyMaterials.some((item) =>
          item.toLowerCase() === name
        );
      }

      return (
        name === "yellow_material_0" ||
        name === "yellow_crb_0" ||
        name === "yellow001_crb_0" ||
        name === "yellow002_crb_0" ||
        name === "yellow003_crb_0" ||
        name === "yellow004_crb_0" ||
        name === "yellow005_material_0" ||
        name.startsWith("yellow")
      );
    });
  }



  /* ==========================================================
     THREE.JS
     ========================================================== */

  useEffect(() => {

    if (!viewerRef.current) return;

    const container =
      viewerRef.current;


    const scene =
      new THREE.Scene();

    scene.background =
      new THREE.Color(0x080b0d);

    sceneRef.current =
      scene;



    /* CAMERA */

    const camera =
      new THREE.PerspectiveCamera(

        40,

        container.clientWidth /
          container.clientHeight,

        0.1,

        1000

      );

    camera.position.set(
      5.8,
      2.5,
      7.5
    );

    cameraRef.current =
      camera;



    /* RENDERER */

    const renderer =
      new THREE.WebGLRenderer({

        antialias: true,

        powerPreference:
          "high-performance",

      });


    renderer.setPixelRatio(

      Math.min(
        window.devicePixelRatio,
        1.5
      )

    );


    renderer.setSize(

      container.clientWidth,

      container.clientHeight

    );


    renderer.shadowMap.enabled =
      true;

    renderer.shadowMap.type =
      THREE.PCFShadowMap;

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
      1.0;


    container.appendChild(
      renderer.domElement
    );

    rendererRef.current =
      renderer;



    /* SHOWROOM */

    createShowroom(scene);



    /* CONTROLS */

    const controls =
      new OrbitControls(

        camera,

        renderer.domElement

      );


    controls.enableDamping =
      true;

    controls.dampingFactor =
      0.06;

    controls.enablePan =
      false;


    controls.minDistance =
      4;

    controls.maxDistance =
      14;


    controls.minAzimuthAngle =
      -Infinity;

    controls.maxAzimuthAngle =
      Infinity;


    controls.minPolarAngle =
      0.35;

    controls.maxPolarAngle =
      2.65;


    controls.target.set(
      0,
      0.9,
      0
    );


    controlsRef.current =
      controls;



    /* ==========================================================
       GLB LOADER
       ========================================================== */

    const loader =
      new GLTFLoader();

    /* Cache-busting query forces a fresh browser request. */
    const glbUrl = isBMW
      ? "/models/bmw-m4csl/bmw_m4csl.glb?v=20261005"
      : "/models/urus-se/urus-se.glb?v=20261003";

    console.log(
      "CARSTUDIO: REQUESTING GLB:",
      glbUrl
    );

    let glbFinished = false;

    /* Prevent the loading screen from staying forever. */
    const glbTimeout =
      setTimeout(() => {

        if (!glbFinished) {

          console.error(
            "CARSTUDIO: GLB LOAD TIMEOUT AFTER 45 SECONDS"
          );

          setLoaded(true);

        }

      }, 45000);


    loader.load(

      glbUrl,

      /* ========================================================
         GLB SUCCESS
         ======================================================== */

      (gltf) => {

        glbFinished = true;

        clearTimeout(glbTimeout);

        console.log(
          `CARSTUDIO: ${vehicleName} GLB LOADED SUCCESSFULLY`
        );

        const car =
          gltf.scene;

        carRef.current =
          car;

        scene.add(car);


        /* ======================================================
           ORIGINAL MODEL POSITIONING
           ====================================================== */

        const originalBox =
          new THREE.Box3()
            .setFromObject(car);

        const originalCenter =
          originalBox.getCenter(
            new THREE.Vector3()
          );

        const originalSize =
          originalBox.getSize(
            new THREE.Vector3()
          );


        car.position.x -=
          originalCenter.x;

        car.position.z -=
          originalCenter.z;

        // BMW ONLY: the BMW GLB is modeled with its length along the X axis.
        // The Urus faces directly toward the camera along the showroom depth.
        // Rotate the BMW 90 degrees so its longitudinal body axis runs
        // front-to-back with the showroom floor lights, exactly like the Urus.
        if (isBMW) {
          car.rotation.y = -Math.PI / 2;
        }


        const maxDimension =
          Math.max(
            originalSize.x,
            originalSize.y,
            originalSize.z
          );


        const scale =
          7.2 /
          maxDimension;


        car.scale.setScalar(
          scale
        );


        const scaledBox =
          new THREE.Box3()
            .setFromObject(car);


        car.position.y -=
          scaledBox.min.y;


        /* ======================================================
           PREPARE MATERIALS AND SHADOWS
           ====================================================== */

        car.traverse(
          (object) => {

            if (!object.isMesh)
              return;


            object.castShadow =
              true;

            object.receiveShadow =
              true;


            if (
              Array.isArray(
                object.material
              )
            ) {

              object.material =
                object.material.map(
                  (material) =>
                    material
                      ? material.clone()
                      : material
                );

            }

            else if (
              object.material
            ) {

              object.material =
                object.material.clone();

            }

          }
        );


        /* ======================================================
           CAMERA
           ====================================================== */

        controls.target.set(
          0,
          1.05,
          0
        );


        camera.position.set(
          5.6,
          2.5,
          7.3
        );


        controls.update();


        /* ======================================================
           APPLY CURRENT CONFIGURATION
           ====================================================== */

        applyPaint(
          car,
          paint
        );

        applyFinish(
          car,
          finish
        );

        applyBrake(
          car,
          brake
        );


        /* ======================================================
           REMOVE LOADING SCREEN
           ====================================================== */

        setLoaded(true);

      },


      /* ========================================================
         GLB PROGRESS
         ======================================================== */

      (progress) => {

        if (progress.total > 0) {

          const percent =
            (
              progress.loaded /
              progress.total
            ) * 100;

          console.log(
            `CARSTUDIO GLB LOADING: ${percent.toFixed(1)}%`
          );

        }
        else {

          console.log(
            "CARSTUDIO GLB LOADING:",
            progress.loaded,
            "bytes"
          );

        }

      },


      /* ========================================================
         GLB ERROR
         ======================================================== */

      (error) => {

        glbFinished = true;

        clearTimeout(glbTimeout);

        console.error(
          "======================================"
        );

        console.error(
          "CARSTUDIO GLB LOAD FAILED"
        );

        console.error(
          "URL:",
          glbUrl
        );

        console.error(
          "ERROR:",
          error
        );

        console.error(
          "======================================"
        );


        /*
         * Do not leave the application permanently
         * stuck on LOADING VEHICLE.
         */
        setLoaded(true);

      }

    );



    /* ANIMATION */

    const animate = () => {

      frameRef.current =
        requestAnimationFrame(
          animate
        );


      controls.update();

      const dust = scene.userData.dustParticles;
      if (dust) {
        const positions = dust.geometry.attributes.position.array;
        const speeds = dust.userData.speeds;
        for (let i = 0; i < speeds.length; i++) {
          positions[i * 3 + 1] += speeds[i];
          positions[i * 3] += Math.sin((performance.now() * 0.00025) + i) * 0.0007;
          if (positions[i * 3 + 1] > 6.0) positions[i * 3 + 1] = 0.35;
        }
        dust.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(
        scene,
        camera
      );

    };


    animate();



    /* RESIZE */

    const resize = () => {

      const width =
        container.clientWidth;

      const height =
        container.clientHeight;


      if (
        width <= 0 ||
        height <= 0
      ) {

        return;

      }


      camera.aspect =
        width / height;


      camera.updateProjectionMatrix();


      renderer.setSize(
        width,
        height
      );

    };


    window.addEventListener(
      "resize",
      resize
    );



    /* CLEANUP */

    return () => {

      window.removeEventListener(
        "resize",
        resize
      );


      if (frameRef.current) {

        cancelAnimationFrame(
          frameRef.current
        );

      }


      controls.dispose();


      renderer.dispose();


      if (
        container.contains(
          renderer.domElement
        )
      ) {

        container.removeChild(
          renderer.domElement
        );

      }

    };

  }, []);



  /* ==========================================================
     SHOWROOM
     ========================================================== */

  function createShowroom(scene) {

    /*
      CARSTUDIO — TUNNEL SHOWROOM
      Built from the supplied reference:
      - dark square-grid ceiling
      - ash/stone side walls
      - repeated white architectural U-ribs on both upper and lower walls
      - white floor lane outlines aligned with the ribs
      - restrained ceiling spotlights
      - one central vehicle bay
      - balanced illumination: the car is clear, the architecture remains atmospheric
    */

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x5f5b57,
      roughness: 0.36,
      metalness: 0.13
    });

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x77736e,
      roughness: 0.78,
      metalness: 0.02,
      emissive: 0x3a3835,
      emissiveIntensity: 0.42
    });

    const rearMaterial = new THREE.MeshStandardMaterial({
      color: 0x292a2c,
      roughness: 0.66,
      metalness: 0.08,
      emissive: 0x0f1012,
      emissiveIntensity: 0.34
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b0d0f,
      roughness: 0.38,
      metalness: 0.42
    });

    const gridMaterial = new THREE.MeshStandardMaterial({
      color: 0x111315,
      roughness: 0.46,
      metalness: 0.30
    });

    const whiteLED = new THREE.MeshBasicMaterial({
      color: 0xf7f5ef,
      toneMapped: false
    });

    const whiteGlow = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.11,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
      blending: THREE.AdditiveBlending
    });

    /* ==========================================================
       ROOM SHELL
       ========================================================== */

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      floorMaterial
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    const leftWall = new THREE.Mesh(
      new THREE.PlaneGeometry(17.5, 8.8),
      wallMaterial
    );
    leftWall.position.set(-7.35, 4.4, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(
      new THREE.PlaneGeometry(17.5, 8.8),
      wallMaterial
    );
    rightWall.position.set(7.35, 4.4, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    const rearWall = new THREE.Mesh(
      new THREE.PlaneGeometry(14.7, 8.8),
      rearMaterial
    );
    rearWall.position.set(0, 4.4, -8.72);
    rearWall.receiveShadow = true;
    scene.add(rearWall);

    /* Dark ceiling — the reference is a deep black grid, not a bright ceiling. */
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(18.0, 17.5),
      blackMaterial
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 5.55, 0);
    scene.add(ceiling);

    /* ==========================================================
       CEILING SQUARE GRID
       ========================================================== */

    const gridY = 5.57;
    const gridSpanX = 17.7;
    const gridSpanZ = 17.1;
    const gridStepX = 0.58;
    const gridStepZ = 0.58;

    for (let x = -gridSpanX / 2; x <= gridSpanX / 2 + 0.01; x += gridStepX) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.055, gridSpanZ),
        gridMaterial
      );
      bar.position.set(x, gridY, 0);
      scene.add(bar);
    }

    for (let z = -gridSpanZ / 2; z <= gridSpanZ / 2 + 0.01; z += gridStepZ) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(gridSpanX, 0.055, 0.035),
        gridMaterial
      );
      bar.position.set(0, gridY + 0.005, z);
      scene.add(bar);
    }

    /* Slightly deeper central ceiling spine like the reference perspective. */
    const ceilingSpine = new THREE.Mesh(
      new THREE.BoxGeometry(2.25, 0.12, 17.2),
      new THREE.MeshStandardMaterial({
        color: 0x080a0c,
        roughness: 0.58,
        metalness: 0.20
      })
    );
    ceilingSpine.position.set(0, 5.48, -0.25);
    scene.add(ceilingSpine);

    /* ==========================================================
       STRUCTURAL DETAILS
       ========================================================== */

    const leftPillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 5.25, 0.78),
      blackMaterial
    );
    leftPillar.position.set(-5.95, 2.63, -2.55);
    leftPillar.castShadow = true;
    scene.add(leftPillar);

    const rightPillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 5.15, 0.64),
      blackMaterial
    );
    rightPillar.position.set(5.95, 2.58, -3.85);
    rightPillar.castShadow = true;
    scene.add(rightPillar);

    const rearInset = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 5.3, 0.18),
      new THREE.MeshStandardMaterial({
        color: 0x101214,
        roughness: 0.54,
        metalness: 0.18
      })
    );
    rearInset.position.set(0, 2.7, -8.57);
    scene.add(rearInset);

    /* ==========================================================
       ARCHITECTURAL WHITE RIBS
       The key visual language of the reference: repeated rounded
       strips running from the lower side wall, through a smooth
       corner, and onto the upper wall/ceiling edge.
       ========================================================== */

    function makeTube(points, radius = 0.035, material = whiteLED) {
      const curve = new THREE.CatmullRomCurve3(points);
      curve.curveType = "centripetal";
      curve.tension = 0.15;
      const geometry = new THREE.TubeGeometry(curve, 18, radius, 6, false);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      return mesh;
    }

    function addGlowTube(points, radius = 0.035) {
      makeTube(points, radius * 2.8, whiteGlow);
      makeTube(points, radius, whiteLED);
    }

    const ribDepths = [
      3.85, 2.70, 1.55, 0.40, -0.75, -1.90, -3.05, -4.20, -5.35
    ];

    ribDepths.forEach((z, index) => {
      /* RIGHT SIDE — lower wall → rounded shoulder → upper wall. */
      addGlowTube([
        new THREE.Vector3(6.62, 0.18, z),
        new THREE.Vector3(6.62, 1.10, z),
        new THREE.Vector3(6.62, 2.35, z),
        new THREE.Vector3(6.52, 3.42, z),
        new THREE.Vector3(6.10, 4.10, z),
        new THREE.Vector3(5.38, 4.48, z),
        new THREE.Vector3(4.35, 4.62, z),
        new THREE.Vector3(3.10, 4.62, z)
      ], 0.035);

      /* LEFT SIDE — mirror of the same architectural rib. */
      addGlowTube([
        new THREE.Vector3(-6.62, 0.18, z),
        new THREE.Vector3(-6.62, 1.10, z),
        new THREE.Vector3(-6.62, 2.35, z),
        new THREE.Vector3(-6.52, 3.42, z),
        new THREE.Vector3(-6.10, 4.10, z),
        new THREE.Vector3(-5.38, 4.48, z),
        new THREE.Vector3(-4.35, 4.62, z),
        new THREE.Vector3(-3.10, 4.62, z)
      ], 0.035);
    });

    /* ==========================================================
       FLOOR LIGHT LANES — aligned with the wall rhythm
       ========================================================== */

    const laneMaterial = new THREE.MeshBasicMaterial({
      color: 0xf5f3ed,
      toneMapped: false
    });

    const laneGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      toneMapped: false,
      blending: THREE.AdditiveBlending
    });

    function addFloorLine(x, z1, z2, width = 0.035) {
      const length = Math.abs(z2 - z1);
      const center = (z1 + z2) / 2;
      const glow = new THREE.Mesh(
        new THREE.BoxGeometry(width * 3.0, 0.018, length),
        laneGlowMaterial
      );
      glow.position.set(x, 0.035, center);
      scene.add(glow);

      const line = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.028, length),
        laneMaterial
      );
      line.position.set(x, 0.052, center);
      scene.add(line);
    }

    addFloorLine(-3.15, -7.85, 4.25, 0.042);
    addFloorLine(3.15, -7.85, 4.25, 0.042);

    /* Central split lane visible behind/beneath the car. */
    addFloorLine(-0.56, -7.85, 4.15, 0.028);
    addFloorLine(0.56, -7.85, 4.15, 0.028);

    /* Short transverse bay line near the front. */
    const bayFront = new THREE.Mesh(
      new THREE.BoxGeometry(6.35, 0.028, 0.040),
      laneMaterial
    );
    bayFront.position.set(0, 0.052, 4.12);
    scene.add(bayFront);

    /* ==========================================================
       SMALL BLACK CEILING SPOTLIGHTS
       ========================================================== */

    const track = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 0.055, 0.045),
      gridMaterial
    );
    track.position.set(0, 5.42, 2.35);
    scene.add(track);

    [-2.7, -1.35, 0, 1.35, 2.7].forEach((x) => {
      const housing = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.18, 0.30),
        new THREE.MeshStandardMaterial({
          color: 0x090b0d,
          roughness: 0.45,
          metalness: 0.34
        })
      );
      housing.position.set(x, 5.25, 2.35);
      housing.rotation.x = -0.25;
      scene.add(housing);

      const light = new THREE.SpotLight(
        0xffffff,
        4.8,
        6.8,
        Math.PI / 7,
        0.70,
        1.0
      );
      light.position.set(x, 5.06, 2.20);
      light.target.position.set(x * 0.42, 0.65, 0.65);
      scene.add(light);
      scene.add(light.target);
    });

    /* ==========================================================
       REAL ILLUMINATION
       White architecture is visible AND the car receives actual light.
       Intensities are deliberately moderate.
       ========================================================== */

    const topLight = new THREE.SpotLight(
      0xffffff,
      28,
      12,
      Math.PI / 3.2,
      0.68,
      1.0
    );
    topLight.position.set(0, 4.85, 1.0);
    topLight.target.position.set(0, 0.85, 0);
    topLight.castShadow = true;
    topLight.shadow.mapSize.set(1024, 1024);
    scene.add(topLight);
    scene.add(topLight.target);

    const frontLight = new THREE.SpotLight(
      0xffffff,
      20,
      11,
      Math.PI / 3.4,
      0.70,
      1.0
    );
    frontLight.position.set(0, 3.8, 4.5);
    frontLight.target.position.set(0, 0.9, 0.8);
    scene.add(frontLight);
    scene.add(frontLight.target);

    const rearLight = new THREE.SpotLight(
      0xffffff,
      16,
      10,
      Math.PI / 3.3,
      0.72,
      1.0
    );
    rearLight.position.set(0, 3.7, -4.5);
    rearLight.target.position.set(0, 1.0, -1.0);
    scene.add(rearLight);
    scene.add(rearLight.target);

    const leftFill = new THREE.SpotLight(
      0xffffff,
      11,
      9,
      Math.PI / 3.4,
      0.72,
      1.0
    );
    leftFill.position.set(-5.2, 3.15, 0.6);
    leftFill.target.position.set(0, 1.0, 0);
    scene.add(leftFill);
    scene.add(leftFill.target);

    const rightFill = new THREE.SpotLight(
      0xffffff,
      13,
      9,
      Math.PI / 3.4,
      0.72,
      1.0
    );
    rightFill.position.set(5.2, 3.15, 0.6);
    rightFill.target.position.set(0, 1.0, 0);
    scene.add(rightFill);
    scene.add(rightFill.target);

    /* Very soft base exposure so black car details do not disappear. */
    const ambient = new THREE.HemisphereLight(
      0xe7e3dd,
      0x25272a,
      0.68
    );
    scene.add(ambient);

    /* Gentle side-wall light — follows the white ribs but does not wash the room. */
    [-1, 1].forEach((side) => {
      const sideLight = new THREE.SpotLight(
        0xffffff,
        7,
        8,
        Math.PI / 4.2,
        0.78,
        1.0
      );
      sideLight.position.set(side * 5.9, 3.55, 0.5);
      sideLight.target.position.set(0, 1.0, 0.2);
      scene.add(sideLight);
      scene.add(sideLight.target);
    });

    /*
       WALL WASHING
       These lights are aimed at the ash walls themselves. This keeps the
       architecture visible like the reference instead of leaving the
       room walls black while only the LED tubes are visible.
    */
    const leftWallWash = new THREE.SpotLight(
      0xffffff,
      15,
      13,
      Math.PI / 2.6,
      0.82,
      1.0
    );
    leftWallWash.position.set(-3.2, 3.2, 1.8);
    leftWallWash.target.position.set(-6.7, 2.7, -0.8);
    scene.add(leftWallWash);
    scene.add(leftWallWash.target);

    const rightWallWash = new THREE.SpotLight(
      0xffffff,
      15,
      13,
      Math.PI / 2.6,
      0.82,
      1.0
    );
    rightWallWash.position.set(3.2, 3.2, 1.8);
    rightWallWash.target.position.set(6.7, 2.7, -0.8);
    scene.add(rightWallWash);
    scene.add(rightWallWash.target);

    const rearWallWash = new THREE.SpotLight(
      0xffffff,
      9,
      12,
      Math.PI / 2.8,
      0.85,
      1.0
    );
    rearWallWash.position.set(0, 3.4, -4.0);
    rearWallWash.target.position.set(0, 2.7, -8.3);
    scene.add(rearWallWash);
    scene.add(rearWallWash.target);

    /* ==========================================================
       REAR SHOWROOM PANELS / POSTER-LIKE DETAILS
       ========================================================== */

    const posterMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2d30,
      roughness: 0.72,
      metalness: 0.05
    });

    [-2.8, 0, 2.8].forEach((x, i) => {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(1.55, 2.15, 0.06),
        posterMaterial
      );
      panel.position.set(x, 2.65, -8.48);
      scene.add(panel);

      const inner = new THREE.Mesh(
        new THREE.BoxGeometry(1.30, 1.82, 0.025),
        new THREE.MeshBasicMaterial({
          color: i === 1 ? 0x363a3e : 0x222528
        })
      );
      inner.position.set(x, 2.65, -8.43);
      scene.add(inner);
    });

    /* CARSTUDIO brand on the rear wall. */
    const brandCanvas = document.createElement("canvas");
    brandCanvas.width = 1400;
    brandCanvas.height = 300;
    const brandContext = brandCanvas.getContext("2d");
    brandContext.clearRect(0, 0, brandCanvas.width, brandCanvas.height);
    brandContext.textAlign = "center";
    brandContext.textBaseline = "middle";
    brandContext.font = "700 94px Arial, Helvetica, sans-serif";
    brandContext.fillStyle = "rgba(245,245,245,0.92)";
    brandContext.fillText("CARSTUDIO", brandCanvas.width / 2, brandCanvas.height / 2);

    const brandTexture = new THREE.CanvasTexture(brandCanvas);
    brandTexture.colorSpace = THREE.SRGBColorSpace;

    const brandMaterial = new THREE.MeshBasicMaterial({
      map: brandTexture,
      transparent: true,
      toneMapped: false
    });

    const brandSign = new THREE.Mesh(
      new THREE.PlaneGeometry(3.35, 0.72),
      brandMaterial
    );
    brandSign.position.set(0, 4.70, -8.43);
    scene.add(brandSign);

    /* ==========================================================
       DUST / ATMOSPHERE
       ========================================================== */

    const dustCount = 95;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 11.5;
      dustPositions[i * 3 + 1] = 0.45 + Math.random() * 4.45;
      dustPositions[i * 3 + 2] = -6.9 + Math.random() * 10.0;
      dustSpeeds[i] = 0.00025 + Math.random() * 0.00075;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: 0xe7e4df,
      size: 0.028,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    dustParticles.userData.speeds = dustSpeeds;
    scene.add(dustParticles);
    scene.userData.dustParticles = dustParticles;
  }

  /* ==========================================================
     PAINT
     ========================================================== */

  function applyPaint(
    car,
    color
  ) {

    if (!car) return;


    car.traverse((object) => {

      if (!object.isMesh)
        return;


      if (!isBodyPaintMesh(object)) {
        return;
      }


      const materials =
        Array.isArray(
          object.material
        )
          ? object.material
          : [object.material];


      const newMaterials =
        materials.map(
          (material) => {

            if (!material)
              return material;


            const newMaterial =
              material.clone();


            /* Remove the original yellow texture so the selected
               paint color is actually visible on the body. */
            newMaterial.map = null;

            if (newMaterial.color) {
              newMaterial.color.set(color);
            }

            newMaterial.metalness = 0.82;
            newMaterial.roughness =
              finish === "MATTE"
                ? 0.68
                : finish === "SATIN"
                  ? 0.40
                  : 0.20;

            if ("envMapIntensity" in newMaterial) {
              newMaterial.envMapIntensity =
                finish === "MATTE"
                  ? 0.55
                  : finish === "SATIN"
                    ? 0.85
                    : 1.15;
            }


            if (
              finish ===
              "MATTE"
            ) {

              newMaterial.roughness =
                0.68;

            }

            else if (
              finish ===
              "SATIN"
            ) {

              newMaterial.roughness =
                0.4;

            }

            else {

              newMaterial.roughness =
                0.2;

            }


            if (
              "clearcoat" in
              newMaterial
            ) {

              newMaterial.clearcoat =

                finish ===
                "MATTE"

                  ? 0.05

                  : finish ===
                    "SATIN"

                  ? 0.25

                  : 0.55;


              newMaterial.clearcoatRoughness =
                0.18;

            }


            newMaterial.needsUpdate =
              true;


            return newMaterial;

          }
        );


      object.material =
        Array.isArray(
          object.material
        )
          ? newMaterials
          : newMaterials[0];

    });

  }



  /* ==========================================================
     FINISH
     ========================================================== */

  function applyFinish(
    car,
    type
  ) {

    if (!car) return;


    car.traverse((object) => {

      if (!object.isMesh)
        return;


      if (!isBodyPaintMesh(object)) {
        return;
      }


      const materials =
        Array.isArray(
          object.material
        )
          ? object.material
          : [object.material];


      materials.forEach(
        (material) => {

          if (!material)
            return;


          if (
            type ===
            "GLOSSY"
          ) {

            material.roughness =
              0.2;

            material.metalness =
              0.82;

          }


          if (
            type ===
            "MATTE"
          ) {

            material.roughness =
              0.68;

            material.metalness =
              0.55;

          }


          if (
            type ===
            "SATIN"
          ) {

            material.roughness =
              0.4;

            material.metalness =
              0.7;

          }


          material.needsUpdate =
            true;

        }
      );

    });

  }



  /* ==========================================================
     BRAKES
     ========================================================== */

  function applyBrake(
    car,
    colorName
  ) {

    if (!car) return;


    let color =
      "#c91520";


    if (
      colorName ===
      "BLACK"
    ) {

      color =
        "#050505";

    }


    if (
      colorName ===
      "YELLOW"
    ) {

      color =
        "#e6d500";

    }


    car.traverse((object) => {

      if (!object.isMesh)
        return;


      const materials =
        Array.isArray(
          object.material
        )
          ? object.material
          : [object.material];


      materials.forEach(
        (material) => {

          if (!material)
            return;


          const materialName = String(material.name || "").trim();

          const isBrakeMaterial = isBMW
            ? materialName === "Material_1112"
            : materialName === "BreaksRedPaint";

          if (isBrakeMaterial) {

            material.map =
              null;


            if (
              material.color
            ) {

              material.color.set(
                color
              );

            }


            material.needsUpdate =
              true;

          }

        }
      );

    });

  }



  /* ==========================================================
     PAINT HANDLER
     ========================================================== */

  function changePaint(
    color
  ) {

    setPaint(color);


    applyPaint(
      carRef.current,
      color
    );

  }



  /* ==========================================================
     FINISH HANDLER
     ========================================================== */

  function changeFinish(
    type
  ) {

    setFinish(type);


    applyFinish(
      carRef.current,
      type
    );

  }



  /* ==========================================================
     BRAKE HANDLER
     ========================================================== */

  function changeBrake(
    color
  ) {

    setBrake(color);


    applyBrake(
      carRef.current,
      color
    );

  }



  /* ==========================================================
     WHEEL HANDLER
     ========================================================== */

  function changeWheel(
    option
  ) {

    setWheel(option);


    let extra = 0;


    if (
      option ===
      "SPORT"
    ) {

      extra =
        350000;

    }


    if (
      option ===
      "PERFORMANCE"
    ) {

      extra =
        550000;

    }


    if (
      option ===
      "FORGED"
    ) {

      extra =
        800000;

    }


    setPrice(
      basePrice +
      extra
    );

  }



  /* ==========================================================
     ORDER
     ========================================================== */

  function placeOrder() {

    localStorage.setItem(
      "carstudioOrder",
      vehicleName
    );


    localStorage.setItem(
      "carstudioOrderPrice",
      price
    );


    // Open the order page using its clean URL (Vite maps /order to order.html).
    window.location.assign("/order");

  }



  /* ==========================================================
     PRICE
     ========================================================== */

  const formattedPrice =
    new Intl.NumberFormat(
      "en-IN"
    ).format(price);



  /* ==========================================================
     SHOWROOM UI
     ========================================================== */

  return (

    <div className={configCollapsed ? "studio config-collapsed" : "studio"}>


      {/* ====================================================
         HEADER
         ==================================================== */}

      <header className="studio-header">

        <div className="header-left">

          <div className="brand">
            CARSTUDIO
          </div>


          <div className="vehicle-info">

            <strong>
              {vehicleName}
            </strong>

            <span>
              {vehicleCategory}
            </span>

          </div>


          <div className="mini-menu">

            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>Q</span>

          </div>


          <button className="menu-button">
            ☰
          </button>

        </div>


        <button className="your-car">
          YOUR CAR
        </button>


        <div className="header-right">

          <button>
            ↶
          </button>

          <button>
            ↷
          </button>


          <button className="reset">
            RESET ALL
          </button>


          <button>
            ☼
          </button>

          <button>
            ▣
          </button>

          <button>
            ⛶
          </button>

        </div>

      </header>



      {/* ====================================================
         3D VIEW
         ==================================================== */}

      <style>{`
        .studio.config-collapsed { grid-template-columns: minmax(0, 1fr) !important; }
        .studio.config-collapsed .config {
          width: 0 !important; min-width: 0 !important; max-width: 0 !important;
          padding: 0 !important; border: 0 !important; overflow: hidden !important;
          opacity: 0 !important; pointer-events: none !important;
        }
        .studio.config-collapsed .viewer { width: 100% !important; }
        .config-collapse-button, .config-reopen-button {
          position: absolute; right: 0; top: 92px; z-index: 90;
          width: 36px; height: 58px; border: 1px solid rgba(255,255,255,.20);
          border-right: 0; background: rgba(8,10,12,.94); color: #fff;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 27px; line-height: 1; padding: 0;
          transition: width 160ms ease, background 160ms ease;
        }
        .config-collapse-button:hover, .config-reopen-button:hover {
          width: 42px; background: rgba(24,27,30,.98);
        }
      `}</style>

      <style>{`
        /* CARSTUDIO REFERENCE CONFIGURATION PANEL */
        .studio:not(.config-collapsed) .config {
          background:
            linear-gradient(180deg, rgba(20,22,24,.96), rgba(12,14,16,.97));
          border-left: 1px solid rgba(255,255,255,.13);
          box-shadow: -18px 0 50px rgba(0,0,0,.38);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow-y: auto;
          scrollbar-width: thin;
        }

        .studio:not(.config-collapsed) .config-title {
          font-size: 18px;
          letter-spacing: 5px;
          padding-top: 4px;
        }

        .studio:not(.config-collapsed) .tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-bottom: 1px solid rgba(255,255,255,.13);
          margin-bottom: 18px;
        }

        .studio:not(.config-collapsed) .tabs button {
          min-height: 56px;
          color: rgba(255,255,255,.58);
          letter-spacing: .4px;
        }

        .studio:not(.config-collapsed) .tabs button.active {
          color: #fff;
          border-bottom: 2px solid #fff;
        }

        .studio:not(.config-collapsed) .config-card {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.12);
          margin-bottom: 10px;
        }

        .studio:not(.config-collapsed) .config-card.open {
          background: rgba(255,255,255,.045);
          border-color: rgba(255,255,255,.20);
        }

        .studio:not(.config-collapsed) .card-header {
          min-height: 76px;
          padding: 17px 18px;
        }

        .studio:not(.config-collapsed) .card-header strong {
          letter-spacing: 1.2px;
          font-size: 15px;
        }

        .studio:not(.config-collapsed) .card-header span {
          color: rgba(255,255,255,.55);
          margin-top: 6px;
        }

        .studio:not(.config-collapsed) .card-content {
          padding: 0 18px 18px;
        }

        .config-collapse-button,
        .config-reopen-button {
          box-shadow: 0 5px 22px rgba(0,0,0,.35);
        }

        .config-reopen-button {
          right: 0;
        }

        @media (max-width: 900px) {
          .studio:not(.config-collapsed) .config {
            width: min(390px, 88vw);
          }
        }
      `}</style>

      <section
        ref={viewerRef}
        className="viewer"
      >

        {!loaded && (

          <div className="loading">

            <div className="loader"></div>

            <span>
              CARSTUDIO
            </span>

            <small>
              LOADING VEHICLE
            </small>

          </div>

        )}


        <div className="showroom-logo">

          CARSTUDIO

          <span></span>

        </div>


        <div className="rotate-text">
          DRAG TO ROTATE 360°
        </div>



        {/* BOTTOM CONTROLS */}

        <div className="viewer-controls">

          <button>
            <strong>
              360°
            </strong>
          </button>


          <button>
            ⛶
          </button>


          <button>
            ▦
          </button>


          <button>
            ▣
          </button>


          <div className="control-divider"></div>


          <button>
            ←
          </button>


          <button>
            →
          </button>


          <div className="control-divider"></div>


          <button>
            🔍
          </button>


          <button>
            🔎
          </button>

        </div>

      </section>
      {configCollapsed && (
        <button
          type="button"
          className="config-reopen-button"
          aria-label="Show configuration"
          title="Show configuration"
          onClick={() => setConfigCollapsed(false)}
        >
          ‹
        </button>
      )}





      {/* ====================================================
         CONFIGURATION
         ==================================================== */}

      <aside className="config">
        <button
          type="button"
          className="config-collapse-button"
          aria-label="Hide configuration"
          title="Hide configuration"
          onClick={() => setConfigCollapsed(true)}
        >
          ›
        </button>



        <div className="config-title">
          CONFIGURATION
        </div>



        {/* TABS */}

        <div className="tabs">

          {[
            "EXTERIOR",
            "INTERIOR",
            "EQUIPMENT",
          ].map(
            (tab) => (

              <button
                key={tab}
                className={
                  activeTab === tab
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setActiveTab(tab)
                }
              >

                {tab}

              </button>

            )
          )}

        </div>



        <div className="config-start">
          Your configuration starts here
        </div>



        {/* ==================================================
           EXTERIOR
           ================================================== */}

        {activeTab ===
          "EXTERIOR" && (

          <>


            {/* PAINT */}

            <ConfigCard
              title="PAINT"
              subtitle="Choose the exterior color"
              active={
                openOption === "PAINT"
              }
              onClick={() =>
                setOpenOption(
                  openOption === "PAINT"
                    ? ""
                    : "PAINT"
                )
              }
            >

              <div className="paint-options">

                {[

                  "#d8e01d",
                  "#ffffff",
                  "#111111",
                  "#8b8b8b",
                  "#c91520",
                  "#173b63",
                  "#1b4d3e",
                  "#d4af37",

                ].map(
                  (color) => (

                    <button
                      key={color}
                      className={
                        paint === color
                          ? "paint active"
                          : "paint"
                      }
                      style={{
                        background:
                          color,
                      }}
                      onClick={() =>
                        changePaint(
                          color
                        )
                      }
                    />

                  )
                )}

              </div>


              <div className="finish-row">

                {[

                  "GLOSSY",
                  "SATIN",
                  "MATTE",

                ].map(
                  (type) => (

                    <button
                      className={
                        finish === type
                          ? "small-option active"
                          : "small-option"
                      }
                      key={type}
                      onClick={() =>
                        changeFinish(
                          type
                        )
                      }
                    >

                      {type}

                    </button>

                  )
                )}

              </div>

            </ConfigCard>



            {/* WHEELS */}

            <ConfigCard
              title="WHEELS"
              subtitle="Configure rims and calipers"
              active={
                openOption ===
                "WHEELS"
              }
              onClick={() =>
                setOpenOption(
                  openOption ===
                    "WHEELS"
                    ? ""
                    : "WHEELS"
                )
              }
            >

              <div className="choice-grid">

                {[

                  "STANDARD",
                  "SPORT",
                  "PERFORMANCE",
                  "FORGED",

                ].map(
                  (option) => (

                    <button
                      key={option}
                      className={
                        wheel === option
                          ? "choice active"
                          : "choice"
                      }
                      onClick={() =>
                        changeWheel(
                          option
                        )
                      }
                    >

                      {option}

                    </button>

                  )
                )}

              </div>

            </ConfigCard>



            {/* BRAKES */}

            <ConfigCard
              title="BRAKE CALIPERS"
              subtitle="Personalize the brake color"
              active={
                openOption ===
                "BRAKES"
              }
              onClick={() =>
                setOpenOption(
                  openOption ===
                    "BRAKES"
                    ? ""
                    : "BRAKES"
                )
              }
            >

              <div className="choice-grid">

                {[

                  "RED",
                  "BLACK",
                  "YELLOW",

                ].map(
                  (option) => (

                    <button
                      key={option}
                      className={
                        brake === option
                          ? "choice active"
                          : "choice"
                      }
                      onClick={() =>
                        changeBrake(
                          option
                        )
                      }
                    >

                      {option}

                    </button>

                  )
                )}

              </div>

            </ConfigCard>



            {/* CARBON */}

            <ConfigCard
              title="CARBON"
              subtitle="Details which make the difference"
              active={
                openOption ===
                "CARBON"
              }
              onClick={() =>
                setOpenOption(
                  openOption ===
                    "CARBON"
                    ? ""
                    : "CARBON"
                )
              }
            >

              <div className="coming">

                CARBON DETAILS

                <span>
                  CONFIGURATION
                </span>

              </div>

            </ConfigCard>



            {/* LIVERY */}

            <ConfigCard
              title="LIVERY AND STICKERS"
              subtitle="Personalize with color accents or liveries"
              active={
                openOption ===
                "LIVERY"
              }
              onClick={() =>
                setOpenOption(
                  openOption ===
                    "LIVERY"
                    ? ""
                    : "LIVERY"
                )
              }
            >

              <div className="coming">

                CUSTOM LIVERY

                <span>
                  COMING NEXT
                </span>

              </div>

            </ConfigCard>



            {/* DETAILS */}

            <ConfigCard
              title="DETAILS"
              subtitle="Add exterior details"
              active={
                openOption ===
                "DETAILS"
              }
              onClick={() =>
                setOpenOption(
                  openOption ===
                    "DETAILS"
                    ? ""
                    : "DETAILS"
                )
              }
            >

              <div className="coming">

                EXTERIOR DETAILS

                <span>
                  COMING NEXT
                </span>

              </div>

            </ConfigCard>

          </>

        )}



        {/* ==================================================
           INTERIOR
           ================================================== */}

        {activeTab ===
          "INTERIOR" && (

          <div className="tab-message">

            <div>
              INTERIOR
            </div>

            <span>
              Seats, dashboard, steering,
              trim and stitching will be
              configured here.
            </span>

          </div>

        )}



        {/* ==================================================
           EQUIPMENT
           ================================================== */}

        {activeTab ===
          "EQUIPMENT" && (

          <div className="tab-message">

            <div>
              EQUIPMENT
            </div>

            <span>
              Accessories and additional
              equipment will be configured here.
            </span>

          </div>

        )}



        {/* ==================================================
           PRICE
           ================================================== */}

        <div className="price-footer">

          <div>

            <span>
              ESTIMATED PRICE
            </span>

            <strong>
              ₹{formattedPrice}
            </strong>

          </div>


          <button
            onClick={placeOrder}
          >

            SAVE & PLACE ORDER

            <span>
              →
            </span>

          </button>

        </div>

      </aside>

    </div>

  );

}



/* ============================================================
   CONFIG CARD
   ============================================================ */

function ConfigCard({
  title,
  subtitle,
  active,
  onClick,
  children,
}) {

  return (

    <div
      className={
        active
          ? "config-card open"
          : "config-card"
      }
    >

      <button
        className="card-header"
        onClick={onClick}
      >

        <div>

          <strong>
            {title}
          </strong>

          <span>
            {subtitle}
          </span>

        </div>


        <b>

          {active
            ? "⌃"
            : "›"}

        </b>

      </button>


      {active && (

        <div className="card-content">

          {children}

        </div>

      )}

    </div>

  );

}


export default App;
