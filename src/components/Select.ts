import jungleImage from "../pics/01/jungle.png";
import iceImage from "../pics/02/ice.png";
import snowImage from "../pics/03/snow.png";

import cicaProduct from "../pics/01/untitled.png";
import ceraProduct from "../pics/02/cera.png";
import cryoProduct from "../pics/03/cryo.png";

import cicaBackground from "../pics/cicaRef/cica_background.png";
import ceraBackground from "../pics/ceraRef/ceraBackground.png";
import cryoBackground from "../pics/cryoRef/cryoRef.png";

import cicaProductImage from "../pics/cicaRef/cicaProductImage.png";
import ceraProductImage from "../pics/ceraRef/ceraProductImage.png";
import cryoProductImage from "../pics/cryoRef/cryoProductImage.png";

const cicaModel = "/assets/hover/cicaHover.glb";
const ceraModel = "/assets/hover/ceraHover.glb";
const cryoModel = "/assets/hover/cryoHover.glb";

const cicaIng = "/assets/hover/cicaIng.glb";
const ceraIng = "/assets/hover/ceraIng.glb";
const cryoIng = "/assets/hover/cryoIng.glb";

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

    productLink: "../pics/cica/1.webp",
    productShot: cicaProduct,
    backgroundImage: jungleImage,
    picImage: cicaBackground,

    productModel: cicaModel,
    productImage: cicaProductImage,

    buttonLink: "/Specification",
    GameIngredient1: cicaIng,
    GameIngredient2: cryoIng,
    GameIngredient3: ceraIng,

    // Ing1: "Close! Try again!",
    // Ing2: "Close! Try again!",
    // Ing3: "You succesfully completed the product, you can now take a picture with it!",

    Ing1Title: "Centella Asiatica",
    Ing2Title: "Hyaluronic Acid",
    Ing3Title: "Ceramides",
  },
  {
    icon: "🧊",
    label: "Cryo Rubber",
    text: "Cryo Rubber™Moisturizing Mask",
    productLink: "../pics/cryo/1.webp",

    productShot: cryoProduct,
    backgroundImage: iceImage,
    picImage: cryoBackground,

    productModel: cryoModel,
    productImage: cryoProductImage,

    buttonLink: "/Specification",
    GameIngredient1: cryoIng,
    GameIngredient2: cicaIng,
    GameIngredient3: ceraIng,

    // Ing1: "Close! Try again!",
    // Ing2: "Close! Try again!",
    // Ing3: "You succesfully completed the product, you can now take a picture with it!",

    Ing1Title: "Hyaluronic Acid",
    Ing2Title: "Centella Asiatica",
    Ing3Title: "Ceramides",
  },
  {
    icon: "❄️",
    label: "Ceramidin",
    text: "Ceramidin™ Skin Barrier Moisturizing Cream",
    productLink: "../pics/cera/1.webp",

    productShot: ceraProduct,
    backgroundImage: snowImage,
    picImage: ceraBackground,

    productModel: ceraModel,
    productImage: ceraProductImage,

    buttonLink: "/Specification",
    GameIngredient1: ceraIng,
    GameIngredient2: cryoIng,
    GameIngredient3: cicaIng,

    // Ing1: "Close! Try again!",
    // Ing2: "Close! Try again!",
    // Ing3: "You succesfully completed the product, you can now take a picture with it!",

    Ing1Title: "Ceramides",
    Ing2Title: "Hyaluronic Acid",
    Ing3Title: "Centella Asiatica",
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
