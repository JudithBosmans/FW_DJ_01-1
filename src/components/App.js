import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const App = () => {
  const ref = useRef();
  return (
    <Parallax pages={2} ref={ref}>
      <ParallaxLayer offset={0} speed={2.5}>
        <p>Layers can contain anything</p>
      </ParallaxLayer>

      <ParallaxLayer sticky={{ start: 1, end: 2 }} />

      <ParallaxLayer offset={2} speed={1}>
        <button onClick={() => ref.current.scrollTo(0)}>Scroll to top</button>
      </ParallaxLayer>
    </Parallax>
  );
};

export default App;
