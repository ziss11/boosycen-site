/**
 * Pastel gradient classes available in the design system
 * These match the Tailwind config pastel colors
 */
const PASTEL_GRADIENTS = [
  'from-pastel-lavender to-pastel-pink',
  'from-pastel-mint to-pastel-sky',
  'from-pastel-peach to-pastel-cream',
  'from-pastel-sky to-pastel-lavender',
  'from-pastel-pink to-pastel-peach',
  'from-pastel-cream to-pastel-mint',
  'from-pastel-lavender to-pastel-sky',
  'from-pastel-mint to-pastel-peach',
];

/**
 * Generates a deterministic color gradient from a seed string
 * @param seed - The string to generate the gradient from (typically project slug or title)
 * @returns A Tailwind gradient class string
 */
export function generateColorGradient(seed: string): string {
  // Create a simple hash from the seed string
  const hash = seed.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  // Use modulo to select a gradient from the palette
  const index = hash % PASTEL_GRADIENTS.length;
  return PASTEL_GRADIENTS[index];
}
