import jungleImage from "../pics/01/jungle.png";
import iceImage from "../pics/02/ice.png";
import snowImage from "../pics/03/snow.png";

import cicaProduct from "../pics/01/untitled.png";
import ceraProduct from "../pics/02/cera.png";
import cryoProduct from "../pics/03/cryo.png";

import cicaBackground from "../pics/cicaRef/cica_background.png";
import ceraBackground from "../pics/ceraRef/ceraBackground.png";
import cryoBackground from "../pics/cryoRef/cryoRef.png";

const cicaImage = `${(process.env.PUBLIC, URL)}/assets/cica/image1.webp`;

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
    productLink: cicaImage,
    productShot: cicaProduct,
    backgroundImage: jungleImage,
    picImage: cicaBackground,
    buttonLink: "/Specification",
    details: "Cicapair is a soothing treatment...",
    products: ["Centella Asiatica", "Niacinamide", "Glycerin"],
    usage: "Apply to clean skin, day and night.",
    GameIngredient: "../pics/product1.glb",
  },
  {
    icon: "🧊",
    label: "Ceramidin",
    text: "Ceramidin™ Skin Barrier Moisturizing Cream",
    productLink: "/assets/cera/",
    productShot: ceraProduct,
    backgroundImage: iceImage,
    picImage: ceraBackground,
    buttonLink: "/Specification",
    details: "Ceramidin is a moisture barrier strengthening cream...",
    products: ["Ceramides", "Panthenol", "Shea Butter"],
    usage: "Apply evenly to face and neck.",
    GameIngredient: "../pics/product1.glb",
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
    GameIngredient: "../pics/product1.glb",
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
