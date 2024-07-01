import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AvatarLoad from "./AvatarLoad.js";

import { initialTabs as tabs } from "./Select.ts";
import { motion, AnimatePresence } from "framer-motion";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../styles/Overview.css";

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

const Overview = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const mountRef = useRef(null);

  const alignCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  console.log("Selected Tab:", selectedTab);
  const handleTabClick = (item) => {
    setSelectedTab(item);
    localStorage.setItem("selectedProductLabel", item.label);
  };

  return (
    <div>
      <Parallax pages={2.5} className="parallax_container">
        {/************* 
    ***************
      01 JUNGLE 
    ***************
    *************/}

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          style={{ ...alignCenter }}
          className="logo-layer"
        >
          <img src={logo} alt="Logo" className="logo-img" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          className="avatar01_text"
          style={{
            ...alignCenter,
            zIndex: 11,
          }}
        >
          <h1>Legend goes tigers rolled in Tiger Grass when wounded.</h1>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={1}
          className="avatar_01"
          style={{
            ...alignCenter,
            backgroundRepeat: `no-repeat`,
            zIndex: 10,
          }}
        >
          <AvatarLoad />
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
          factor={1.3}
          className="avatar02_text"
          style={{
            ...alignCenter,
            zIndex: 99,
          }}
        >
          <h1>Or have you heard yet of Cryo-Rubber technology?</h1>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.9}
          speed={1}
          factor={1.3}
          className="avatar_02"
          style={{
            ...alignCenter,
            backgroundRepeat: `no-repeat`,
            zIndex: 98,
          }}
        >
          <AvatarLoad />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.9}
          speed={1}
          factor={1.3}
          className=""
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
          offset={1.3}
          speed={1}
          factor={1}
          className="avatar03_text"
          style={{
            ...alignCenter,
            zIndex: 11,
          }}
        >
          <h1>
            Or are you passionate about the protecting properties of ceramides?
          </h1>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.3}
          speed={1}
          factor={1}
          className="avatar_03"
          style={{
            ...alignCenter,
            backgroundRepeat: `no-repeat`,
            zIndex: 10,
          }}
        >
          <AvatarLoad />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.6}
          speed={1}
          factor={1}
          className="Snow_background_02"
          style={{
            border: "none",
            backgroundImage: `url(${Snow_01})`,
            backgroundSize: `cover`,
            zIndex: 3,
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

        {/************* 
    ***************
        04 SELECT WINDOW 
    ***************
    *************/}

        <ParallaxLayer
          offset={1.5}
          speed={1}
          factor={3}
          className="dynamic_background"
          style={{
            zIndex: 8,
          }}
        >
          <img src={selectedTab.backgroundImage} alt="Dynamic Background" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.5}
          speed={2}
          factor={2}
          className="Select_Container"
          style={{
            zIndex: 1000,
          }}
        >
          <div className="app-background">
            <div className="window">
              <nav>
                <ul>
                  {tabs.map((item) => (
                    <li
                      key={item.label}
                      className={item === selectedTab ? "selected" : ""}
                      onClick={() => handleTabClick(item)}
                    >
                      {`${item.icon} ${item.label}`}
                      {item === selectedTab ? <motion.div /> : null}
                    </li>
                  ))}
                </ul>
              </nav>
              <main>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTab ? selectedTab.icon : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="selected-content"
                  >
                    <img
                      className="productImg"
                      src={selectedTab.productShot}
                      alt="Dynamic-Background"
                    />
                    <div className="info-section">
                      {selectedTab ? selectedTab.text : "Text"}

                      <Link to="/specification" className="link_button">
                        <div className="Select_button">
                          <p className="button_text">CHOOSE</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Overview;
