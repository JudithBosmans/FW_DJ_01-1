import jungleImage from "../pics/01/jungle.png";
import iceImage from "../pics/02/ice.png";
import snowImage from "../pics/03/snow.png";

import cicaProduct from "../pics/01/untitled.png";
import ceraProduct from "../pics/02/cera.png";
import cryoProduct from "../pics/03/cryo.png";

import cicaBackground from "../pics/01/01_Jungle_Back.png";
import ceraBackground from "../pics/02/Ice_background.png";
import cryoBackground from "../pics/03/03_Snow_Background.png";

export interface Ingredient {
  icon: string;
  label: string;
  text: string;
  backgroundImage: string;
}

export const allProducts = [
  {
    icon: "🐯",
    label: "Cicapair",
    text: "Cicapair™ Tiger Grass Color Correcting Treatment",
    productShot: cicaProduct,
    backgroundImage: jungleImage,
    picImage: cicaBackground,
    buttonLink: "/Specification",
    details: "Cicapair is a soothing treatment...",
    products: ["Centella Asiatica", "Niacinamide", "Glycerin"],
    usage: "Apply to clean skin, day and night.",
  },
  {
    icon: "🧊",
    label: "Ceramidin",
    text: "Ceramidin™ Skin Barrier Moisturizing Cream",
    productShot: ceraProduct,
    backgroundImage: iceImage,
    picImage: ceraBackground,
    buttonLink: "/Specification",
    details: "Ceramidin is a moisture barrier strengthening cream...",
    products: ["Ceramides", "Panthenol", "Shea Butter"],
    usage: "Apply evenly to face and neck.",
  },
  {
    icon: "❄️",
    label: "Cryo Rubber",
    text: "Cryo Rubber™Moisturizing Mask",
    productShot: cryoProduct,
    backgroundImage: snowImage,
    picImage: cryoBackground,
    buttonLink: "/Specification",
    details: "Cryo Rubber is a cooling mask...",
    products: ["Algae Extract", "Allantoin", "Collagen"],
    usage: "Apply after cleansing, leave on for 15-20 minutes.",
  },
];

const [Cicapair, Ceramidin, CryoRubber] = allProducts;
export const initialTabs = [Cicapair, Ceramidin, CryoRubber];

export function getNextIngredient(
  products: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(products);
  return allProducts.find((ingredient) => !existing.has(ingredient));
}

export const specificationData = [
  {
    name: "CicapairPage",
    label: "Cicapair",
    details: "Cicapair is a soothing treatment...",
    products: ["Centella Asiatica", "Niacinamide", "Glycerin"],
    usage: "Apply to clean skin, day and night.",
  },
  {
    name: "CeramidinPage",
    label: "Ceramidin",
    details: "Ceramidin is a moisture barrier strengthening cream...",
    products: ["Ceramides", "Panthenol", "Shea Butter"],
    usage: "Apply evenly to face and neck.",
  },
  {
    name: "CryoRubberPage",
    label: "Cryo Rubber",
    details: "Cryo Rubber is a cooling mask...",
    products: ["Algae Extract", "Allantoin", "Collagen"],
    usage: "Apply after cleansing, leave on for 15-20 minutes.",
  },
];

// export const dynoGameData = [
//   {
//     icon: "🐯",
//     label: "Cicapair",
//     title: "Cicapair™ Tiger Grass Color Correcting Treatment",
//     background: cicaBackground,
//     ingredient1: "Centella Asiatica Leaf Water",
//     ingredient2: "Hyaluronic Acid",
//     ingredient3: "Ceramide Np",
//     ingredient1Explanation: "Ingredient 1 does not belong for this reason",
//     ingredient2Explanation: "Ingredient 2 does not belong for this reason",
//     ingredient3Explanation:
//       "Congrats, ingredient 3 is the main ingredient in this product because of its x properties",
//   },
//   {
//     icon: "🧊",
//     label: "Ceramidin",
//     text: "Ceramidin™ Skin Barrier Moisturizing Cream",
//     background: ceraBackground,
//     ingredient1: "Centella Asiatica Leaf Water",
//     ingredient2: "Hyaluronic Acid",
//     ingredient3: "Ceramide Np",
//     ingredient1Explanation: "Ingredient 1 does not belong for this reason",
//     ingredient2Explanation: "Ingredient 2 does not belong for this reason",
//     ingredient3Explanation:
//       "Congrats, ingredient 3 is the main ingredient in this product because of its x properties",
//   },
//   {
//     icon: "❄️",
//     label: "Cryo Rubber",
//     text: "Cryo Rubber™Moisturizing Mask",
//     background: cryoBackground,
//     ingredient1: "Centella Asiatica Leaf Water",
//     ingredient2: "Hyaluronic Acid",
//     ingredient3: "Ceramide Np",
//     ingredient1Explanation: "Ingredient 1 does not belong for this reason",
//     ingredient2Explanation: "Ingredient 2 does not belong for this reason",
//     ingredient3Explanation:
//       "Congrats, ingredient 3 is the main ingredient in this product because of its x properties",
//   },
// ];
