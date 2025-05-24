/**
 * Calculates a "love percentage" between two names.
 * This function uses a simple hash algorithm to generate a consistent
 * but seemingly random percentage for the same name pairs.
 */
export function calculateLovePercentage(name1: string, name2: string): number {
  // Normalize the names: lowercase and remove spaces
  const normalizedName1 = name1.toLowerCase().replace(/\s+/g, '');
  const normalizedName2 = name2.toLowerCase().replace(/\s+/g, '');
  
  // Combine the names
  const combinedNames = normalizedName1 + normalizedName2;
  
  // Simple hash function to generate a consistent number
  let hash = 0;
  for (let i = 0; i < combinedNames.length; i++) {
    hash = combinedNames.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert hash to a percentage between 1 and 100
  // Adding some bias toward higher numbers to make results more positive
  const percentage = Math.abs(hash % 75) + 25;
  
  // Further adjustments for special cases (perfect matches for identical names)
  if (normalizedName1 === normalizedName2 && normalizedName1.length > 0) {
    return Math.min(100, percentage + 20);
  }
  
  return percentage;
}

/**
 * Generates a love-themed message based on the percentage
 * (This function is not used in the current implementation but 
 * could be used for additional features)
 */
export function getLoveMessage(percentage: number): string {
  if (percentage >= 90) {
    return "A match made in heaven! Your stars have perfectly aligned!";
  } else if (percentage >= 80) {
    return "Amazing chemistry! This could be a soul-mate connection!";
  } else if (percentage >= 70) {
    return "Great compatibility! You have a strong foundation for love.";
  } else if (percentage >= 60) {
    return "Good potential! With some effort, your relationship can thrive.";
  } else if (percentage >= 50) {
    return "Average compatibility. Compromise will be needed for success.";
  } else if (percentage >= 40) {
    return "Some challenges ahead, but don't give up if you truly care.";
  } else if (percentage >= 30) {
    return "This match may require extra work to overcome differences.";
  } else if (percentage >= 20) {
    return "The stars aren't aligned for this match, but nothing is impossible.";
  } else {
    return "Perhaps better as friends? The romantic outlook is challenging.";
  }
}