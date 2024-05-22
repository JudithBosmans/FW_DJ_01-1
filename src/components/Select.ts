import jungleImage from "../pics/01/jungle.png";
import iceImage from "../pics/02/ice.png";
import snowImage from "../pics/03/snow.png";

import cicaProduct from "../pics/01/untitled.png";
import ceraProduct from "../pics/02/cera.png";
import cryoProduct from "../pics/03/cryo.png";

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
    buttonLink: "/Specification",
  },
  {
    icon: "🧊",
    label: "Ceramidin",
    text: "Ceramidin™ Skin Barrier Moisturizing Cream",
    productShot: ceraProduct,
    backgroundImage: iceImage,
    buttonLink: "/Specification",
  },
  {
    icon: "❄️",
    label: "Cryo Rubber",
    text: "Cryo Rubber™Moisturizing Mask",
    productShot: cryoProduct,
    backgroundImage: snowImage,
    buttonLink: "/Specification",
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
    details: "Cicapair is a soothing treatment...",
    products: ["Centella Asiatica", "Niacinamide", "Glycerin"],
    usage: "Apply to clean skin, day and night.",
  },
  {
    name: "CeramidinPage",
    details: "Ceramidin is a moisture barrier strengthening cream...",
    products: ["Ceramides", "Panthenol", "Shea Butter"],
    usage: "Apply evenly to face and neck.",
  },
  {
    name: "CryoRubberPage",
    details: "Cryo Rubber is a cooling mask...",
    products: ["Algae Extract", "Allantoin", "Collagen"],
    usage: "Apply after cleansing, leave on for 15-20 minutes.",
  },
];
