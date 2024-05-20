import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSpring, animated } from "react-spring";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Typewriter from "typewriter-effect";
import "../styles/App.css";

///////////////
// IMPPORTS //
/////////////

//GENERAL
import logo from "../pics/Dr.Jart+_white_logo.png";

//01 JUNGLE
import Jungle_00 from "../pics/01/03_Background.png";
import Jungle_01 from "../pics/01/01_Jungle_Back.png";
import Jungle_02 from "../pics/01/02_Jungle_Back_02.png";
import Jungle_03 from "../pics/01/04_tiger.png";

//02 ICE
import Ice_00 from "../pics/02/Ice_background.png";
import Ice_01 from "../pics/02/Ice_blocks_01.png";
import Ice_02 from "../pics/02/Ice_blocks_02.png";
import Ice_03 from "../pics/02/Ice_blocks_03.png";
import Ice_04 from "../pics/02/Ice_crystals_04.png";

//03 SNOW
import Snow_01 from "../pics/03/03_Snow_Background.png";
import Snow_02 from "../pics/03/03_Trees_01.png";

const App = () => {
  const alignCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Parallax pages={2} className="parallax_container">
      {/************* 
    ***************
      01 JUNGLE 
    ***************
    *************/}
      <ParallaxLayer
        // sticky={{ start: 0, end: 4 }}
        offset={0}
        speed={2}
        factor={2}
        className="logo"
        style={{
          ...alignCenter,
          zIndex: 10,
        }}
      >
        <animated.img src={logo} alt="Logo" />
      </ParallaxLayer>
      <ParallaxLayer
        offset={0}
        speed={2}
        factor={1}
        className="text"
        style={{
          ...alignCenter,
          zIndex: 11,
        }}
      >
        <Typewriter
          options={{
            strings: ["Skin.", "Science.", "Art."],
            autoStart: true,
            loop: true,
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="Jungle_text"
        style={{
          ...alignCenter,
          backgroundRepeat: `no-repeat`,
          zIndex: 10,
        }}
      >
        <h1>A WORLD WHERE IRRITATED SKIN DOESN’T EXIST</h1>
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="Jungle_background"
        style={{
          border: "none",
          backgroundImage: `url(${Jungle_00})`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          zIndex: 0,
        }}
      />
      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="Jungle_Forrest"
        style={{
          border: "none",
          backgroundImage: `url(${Jungle_01})`,
          backgroundSize: `cover`,
          zIndex: 1,
        }}
      />
      <ParallaxLayer
        offset={0}
        speed={3}
        factor={1}
        className="Jungle_Forrest"
        style={{
          ...alignCenter,
          zIndex: 7,
        }}
      >
        <img src={Jungle_01} alt="Jungle_background" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={2}
        factor={2}
        className="Jungle_temple"
        style={{
          border: "none",
          zIndex: 8,
        }}
      >
        <img src={Jungle_02} alt="Tiger" />
      </ParallaxLayer>
      <ParallaxLayer
        offset={0}
        speed={3}
        factor={2}
        className="Jungle_tiger"
        style={{
          ...alignCenter,
          zIndex: 8,
        }}
      >
        <img src={Jungle_03} alt="Tiger" />
      </ParallaxLayer>
      {/************* 
    ***************
        02 ICE
    ***************
    *************/}
      <ParallaxLayer
        offset={0.9}
        speed={1}
        factor={1.5}
        className="Ice_background"
        style={{
          border: "none",
          backgroundImage: `url(${Ice_00})`,
          backgroundSize: `cover`,
          zIndex: 1,
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="Ice_text"
        style={{
          ...alignCenter,
          backgroundRepeat: `no-repeat`,
          zIndex: 10,
        }}
      >
        <h1>A WORLD FILLED WITH THE NEWEST TECHNOLOGIES</h1>
      </ParallaxLayer>

      <ParallaxLayer
        offset={0.9}
        speed={2}
        factor={1}
        className="Ice_Crystals"
        style={{
          border: "none",
          backgroundImage: `url(${Ice_04})`,
          backgroundSize: `cover`,
          zIndex: 1,
        }}
      />
      <ParallaxLayer
        offset={0.9}
        speed={3}
        factor={2}
        className="Ice_cubes_01"
        style={{
          ...alignCenter,
          zIndex: 10,
        }}
      >
        <img src={Ice_01} alt="Cubes_01" />
      </ParallaxLayer>
      <ParallaxLayer
        offset={0.9}
        speed={3}
        factor={2}
        className="Ice_cubes_02"
        style={{
          ...alignCenter,
          zIndex: 10,
        }}
      >
        <img src={Ice_02} alt="Cubes_02" />
      </ParallaxLayer>
      <ParallaxLayer
        offset={0.9}
        speed={3}
        factor={2}
        className="Ice_cubes_03"
        style={{
          ...alignCenter,
          zIndex: 10,
        }}
      >
        <img src={Ice_03} alt="Cubes_03" />
      </ParallaxLayer>
      {/************* 
    ***************
        03 SNOW 
    ***************
    *************/}

      <ParallaxLayer
        offset={0}
        speed={1}
        factor={1}
        className="Snow_text"
        style={{
          ...alignCenter,
          backgroundRepeat: `no-repeat`,
          zIndex: 10,
        }}
      >
        <h1>A WORLD OF HYDRATED & PROTECTED SKIN</h1>
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={1}
        factor={1}
        className="Snow_background_02"
        style={{
          border: "none",
          backgroundImage: `url(${Snow_01})`,
          backgroundSize: `cover`,
          zIndex: 0,
        }}
      />

      <ParallaxLayer
        offset={1}
        speed={2}
        factor={2}
        className="Snow_tree"
        style={{
          ...alignCenter,
          zIndex: 8,
        }}
      >
        <img src={Snow_02} alt="Snow_tree" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={3}
        factor={2}
        className="Snow_tree_02"
        style={{
          ...alignCenter,
          zIndex: 8,
        }}
      >
        <img src={Snow_02} alt="Snow_tree_02" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={1}
        speed={3}
        factor={2}
        style={{ zIndex: 10, ...alignCenter }}
      >
        <Link to="/Avatar">
          <div className="Snow_button">
            <p>Avatar</p>
          </div>
        </Link>
      </ParallaxLayer>
      {/* <ParallaxLayer sticky={{ start: 1, end: 2 }} /> */}
    </Parallax>
  );
};

export default App;
