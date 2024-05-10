import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Typewriter from "typewriter-effect";

import "../styles/App.css";

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
  const ref = useRef();
  return (
    <Parallax pages={2} ref={ref} className="parallax_container">
      {/************* 
    ***************
      01 JUNGLE 
    ***************
    *************/}

      <ParallaxLayer
        offset={0}
        speed={2}
        factor={2}
        className="logo"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <img src={logo} alt="Logo" />
      </ParallaxLayer>

      <ParallaxLayer
        offset={0}
        speed={2}
        factor={2}
        className="text"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          backgroundImage: `url(${Jungle_02})`,
          zIndex: 7,
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={3}
        factor={2}
        className="Jungle_tiger"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        factor={1}
        className="Ice_background"
        style={{
          border: "none",
          backgroundImage: `url(${Ice_00})`,
          backgroundSize: `cover`,
          zIndex: 1,
        }}
      />

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        offset={1}
        speed={1}
        factor={1}
        className="Snow_background"
        style={{
          border: "none",
          backgroundImage: `url(${Snow_01})`,
          backgroundSize: `cover`,
          zIndex: 0,
        }}
      />

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 8,
        }}
      >
        <img src={Snow_02} alt="Snow_tree_02" />
      </ParallaxLayer>

      {/* <ParallaxLayer sticky={{ start: 1, end: 2 }} /> */}
    </Parallax>
  );
};

export default App;
