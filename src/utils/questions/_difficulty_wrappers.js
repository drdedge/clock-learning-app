// Temporary file: This wraps generators that don't have native difficulty support
// This ensures backward compatibility while allowing the difficulty system to work

export const wrapGeneratorWithDifficulty = (generator) => {
  return (difficulty = 'medium') => {
    // Most generators ignore difficulty for now
    // They will be gradually updated to support it
    return generator();
  };
};
