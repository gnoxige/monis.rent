export const DESKS = [
  { id: "standing", name: "Halia Standing Desk", tag: "Adjustable", price: 450000, blurb: "Sit-stand, 120cm" },
  { id: "writing", name: "Ubud Writing Desk", tag: "Compact", price: 280000, blurb: "Oak, 1 drawer" },
  { id: "lshape", name: "Canggu L-Desk", tag: "Corner", price: 520000, blurb: "L-shape, 160cm" }
];

export const CHAIRS = [
  { id: "mesh", name: "Sanur Ergo Chair", tag: "Ergonomic", price: 380000, blurb: "Mesh, lumbar support" },
  { id: "lounge", name: "Bingin Lounge", tag: "Relaxed", price: 260000, blurb: "Low, padded arms" },
  { id: "stool", name: "Warung Stool", tag: "Minimal", price: 150000, blurb: "Backless, teak" }
];

export const ACCESSORIES = [
  { id: "monitor", name: '27" Monitor', tag: "Display", price: 220000, blurb: "QHD, height-adjust" },
  { id: "lamp", name: "Task Lamp", tag: "Light", price: 90000, blurb: "Warm dimmable" },
  { id: "plant", name: "Monstera", tag: "Greenery", price: 60000, blurb: "Potted, we water it" }
];

export function getCatalogItem(collection, id) {
  return collection.find((item) => item.id === id) ?? null;
}

export function buildConfiguration({ deskId = null, chairId = null, acc = {} }) {
  const desk = getCatalogItem(DESKS, deskId);
  const chair = getCatalogItem(CHAIRS, chairId);
  const accessories = ACCESSORIES.filter((item) => Boolean(acc[item.id]));
  const lines = [desk, chair, ...accessories].filter(Boolean);
  const total = lines.reduce((sum, item) => sum + item.price, 0);

  return {
    desk,
    chair,
    accessories,
    lines,
    total,
    count: lines.length,
    isEmpty: lines.length === 0
  };
}
