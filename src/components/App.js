import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import "../styles/App.css";

//JUNGLE
import Jungle_01 from "../pics/01_Jungle_Back.png";
import Jungle_02 from "../pics/02_Jungle_Back_02.png";

const App = () => {
  const ref = useRef();
  return (
    <Parallax pages={2} ref={ref}>
      <ParallaxLayer
        offset={0}
        speed={1}
        factor={2}
        className="Jungle_01"
        style={{
          border: "none",
          backgroundImage: `url(${Jungle_01})`,
        }}
      />

      <ParallaxLayer
        offset={0}
        speed={2}
        factor={2}
        className="Jungle_02"
        style={{
          border: "none",
          backgroundImage: `url(${Jungle_02})`,
        }}
      />
      <ParallaxLayer sticky={{ start: 1, end: 2 }} />
    </Parallax>
  );
};

export default App;
