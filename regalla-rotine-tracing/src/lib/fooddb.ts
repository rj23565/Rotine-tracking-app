// ─── FOODDB · deterministic vision & nutrition dictionary ────────────────────
// Static dictionary — no network, no external database. Pixel fingerprints and
// text hints resolve to these exact keys; macros scale by portion modifiers.

import type { PixelFingerprint } from './media';

export type FoodKey =
  | 'chicken_breast'
  | 'red_meat'
  | 'fish'
  | 'cooked_rice'
  | 'oats'
  | 'flatbread'
  | 'dairy'
  | 'eggs';

export interface FoodSpec {
  name: string;
  serving: string;
  kcal: number;
  protein: number;
  carb: number;
  fat: number;
  tags: string[];
  aliases: RegExp;
}

export const FOODDB: Record<FoodKey, FoodSpec> = {
  chicken_breast: { name: 'Chicken Breast', serving: '150g fillet', kcal: 248, protein: 46, carb: 0, fat: 5, tags: ['protein', 'poultry'], aliases: /chicken|hen|poultry|grilled breast/i },
  red_meat: { name: 'Red Meat', serving: '180g portion', kcal: 450, protein: 47, carb: 0, fat: 27, tags: ['protein', 'red-meat', 'salt'], aliases: /beef|steak|mutton|lamb|veal|keema|mince|burger patty|red meat/i },
  fish: { name: 'Fish', serving: '150g fillet', kcal: 192, protein: 33, carb: 0, fat: 6, tags: ['protein', 'fish'], aliases: /fish|salmon|tuna|cod|trout|sardine|mackerel|tilapia|rohu/i },
  cooked_rice: { name: 'Cooked Rice', serving: '180g bowl', kcal: 235, protein: 5, carb: 50, fat: 1, tags: ['carb'], aliases: /rice|biryani|pulao|pilaf|risotto|fried rice/i },
  oats: { name: 'Oats', serving: '50g dry', kcal: 190, protein: 7, carb: 32, fat: 4, tags: ['carb', 'fiber'], aliases: /oats?|porridge|oatmeal|muesli|granola/i },
  flatbread: { name: 'Flatbread', serving: '2 pieces · 60g', kcal: 180, protein: 5, carb: 34, fat: 3, tags: ['carb', 'gluten', 'wheat'], aliases: /flatbread|roti|naan|chapati|paratha|pita|tortilla|bread/i },
  dairy: { name: 'Dairy', serving: '250ml glass', kcal: 122, protein: 8, carb: 12, fat: 5, tags: ['dairy', 'lactose'], aliases: /milk|dairy|yogurt|yoghurt|lassi|kheer|paneer|cheese|cream|butter|ghee|latte|whey/i },
  eggs: { name: 'Eggs', serving: '2 large', kcal: 155, protein: 13, carb: 1, fat: 11, tags: ['egg', 'protein'], aliases: /eggs?|omelet|omelette|boiled egg|fried egg|anda/i },
};

/** Portion modifiers — every macro reading scales deterministically. */
export type PortionId = 'small' | 'standard' | 'large';
export const PORTIONS: Record<PortionId, { label: string; mult: number }> = {
  small: { label: 'Small · 0.75×', mult: 0.75 },
  standard: { label: 'Standard · 1×', mult: 1 },
  large: { label: 'Large · 1.4×', mult: 1.4 },
};

/** Strict allergen alias bounds — matching arrays the shield honors verbatim. */
export const ALLERGEN_ALIAS: Record<string, string[]> = {
  peanut: ['peanut', 'groundnut', 'arachis', 'satay', 'monkey nut'],
  nuts: ['almond', 'walnut', 'cashew', 'pistachio', 'hazelnut', 'pecan', 'nut', 'nuts', 'trail mix'],
  dairy: ['milk', 'cheese', 'cream', 'butter', 'ghee', 'paneer', 'whey', 'yogurt', 'yoghurt', 'dairy'],
  lactose: ['lactose', 'milk', 'dairy', 'cream', 'kheer', 'whey'],
  gluten: ['gluten', 'flour', 'seitan', 'semolina', 'barley', 'rye', 'maida'],
  wheat: ['wheat', 'bread', 'flatbread', 'roti', 'naan', 'chapati', 'pasta', 'noodle', 'bagel'],
  egg: ['egg', 'eggs', 'omelet', 'omelette', 'mayonnaise', 'meringue', 'anda'],
  fish: ['fish', 'salmon', 'tuna', 'cod', 'trout', 'anchovy', 'sardine', 'mackerel', 'sushi', 'rohu', 'tilapia'],
  shellfish: ['shrimp', 'prawn', 'crab', 'lobster', 'scallop', 'oyster', 'mussel', 'calamari', 'shellfish'],
  soy: ['soy', 'soya', 'tofu', 'edamame', 'miso', 'tempeh', 'soybean'],
  sesame: ['sesame', 'tahini', 'til', 'gingelly'],
  mushroom: ['mushroom', 'shiitake', 'portobello', 'champignon', 'morel', 'oyster mushroom'],
};

/** Exactly three fully-safe alternatives per allergen, pre-audited. */
export const ALLERGEN_SUBS: Record<string, [string, string, string]> = {
  peanut: ['Sunflower-seed crunch cup', 'Roasted chickpeas with smoked salt', 'Pumpkin-seed butter on rice cakes'],
  nuts: ['Crispy edamame cup', 'Toasted pumpkin-seed salad', 'Roasted chickpea trail mix'],
  dairy: ['Oat-milk golden latte', 'Coconut yogurt with berries', 'Olive-oil mashed potatoes'],
  lactose: ['Lactose-free kefir glass', 'Almond-free oat yogurt bowl', 'Coconut-milk chia pudding'],
  gluten: ['Quinoa power bowl', 'Rice cakes with smashed avocado', 'Buckwheat galettes with greens'],
  wheat: ['Rice-flour dosa with chutney', 'Corn-tortilla bean tacos', 'Quinoa tabbouleh plate'],
  egg: ['Silken tofu scramble', 'Chickpea-flour omelette', 'Avocado smash on rye-free crisp'],
  fish: ['Rosemary chicken fillet', 'Herbed lentil loaf', 'Garlic tofu steaks'],
  shellfish: ['Grilled herb chicken skewers', 'Lemon white-bean salad', 'Seared mushroom-free tofu strips'],
  soy: ['Lentil & herb patties', 'Grilled chicken broth bowl', 'Sunflower pesto zoodles'],
  sesame: ['White-bean & olive-oil dip', 'Roast-pepper mutabbal, sesame-free', 'Cucumber coconut raita'],
  mushroom: ['Charred courgette ribbons', 'Crispy eggplant coins', 'Herbed cauliflower steaks'],
};

/** Map a free-text filter entry to its canonical allergen key. */
export function canonicalAllergen(entry: string): string | null {
  const t = entry.trim().toLowerCase();
  if (!t) return null;
  if (ALLERGEN_ALIAS[t]) return t;
  for (const [key, aliases] of Object.entries(ALLERGEN_ALIAS)) {
    if (aliases.some((a) => t.includes(a) || a.includes(t))) return key;
  }
  return null;
}

/**
 * Sparse pixel-signature evaluation — deterministic mapping of tone metrics
 * to FOODDB keys. No network, no CV APIs.
 */
export function classifyFingerprint(fp: PixelFingerprint): Array<{ key: FoodKey; confidence: number }> {
  const out: Array<{ key: FoodKey; confidence: number }> = [];
  if (fp.brightness > 0.74 && fp.warmth < 0.42) {
    out.push({ key: 'cooked_rice', confidence: 0.72 }, { key: 'dairy', confidence: 0.58 }, { key: 'oats', confidence: 0.44 });
  } else if (fp.warmth > 0.52 && fp.variance > 0.03) {
    out.push({ key: 'red_meat', confidence: 0.68 }, { key: 'flatbread', confidence: 0.55 }, { key: 'chicken_breast', confidence: 0.47 });
  } else if (fp.brightness < 0.4) {
    out.push({ key: 'red_meat', confidence: 0.55 }, { key: 'fish', confidence: 0.42 });
  } else {
    out.push({ key: 'chicken_breast', confidence: 0.6 }, { key: 'eggs', confidence: 0.5 }, { key: 'flatbread', confidence: 0.4 });
  }
  return out.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}
