import jungleImage from "../pics/01/jungle.png";
import iceImage from "../pics/02/ice.png";
import snowImage from "../pics/03/snow.png";

import cicaProduct from "../pics/01/untitled.png";

export interface Ingredient {
  icon: string;
  label: string;
  text: string;
  backgroundImage: string;
}

export const allIngredients = [
  {
    icon: "🐯",
    label: "Cicapair",
    text: "Cicapair Tiger Grass Color Correcting Treatment",
    productShot: cicaProduct,
    backgroundImage: jungleImage,
    buttonLink: "./game/Cicapair.js",
  },
  {
    icon: "🧊",
    label: "Ceramidin",
    text: "Ceramidin Cream",
    backgroundImage: iceImage,
  },
  {
    icon: "❄️",
    label: "Cryo Rubber",
    text: "Cryo Rubber Mask",
    backgroundImage: snowImage,
  },
];

const [Cicapair, Ceramidin, CryoRubber] = allIngredients;
export const initialTabs = [Cicapair, Ceramidin, CryoRubber];

export function getNextIngredient(
  ingredients: Ingredient[]
): Ingredient | undefined {
  const existing = new Set(ingredients);
  return allIngredients.find((ingredient) => !existing.has(ingredient));
}

export const specificationData = [
  {
    name: "CicapairPage",
    details: "Cicapair is a soothing treatment...",
    ingredients: ["Centella Asiatica", "Niacinamide", "Glycerin"],
    usage: "Apply to clean skin, day and night.",
  },
  {
    name: "CeramidinPage",
    details: "Ceramidin is a moisture barrier strengthening cream...",
    ingredients: ["Ceramides", "Panthenol", "Shea Butter"],
    usage: "Apply evenly to face and neck.",
  },
  {
    name: "CryoRubberPage",
    details: "Cryo Rubber is a cooling mask...",
    ingredients: ["Algae Extract", "Allantoin", "Collagen"],
    usage: "Apply after cleansing, leave on for 15-20 minutes.",
  },
];
