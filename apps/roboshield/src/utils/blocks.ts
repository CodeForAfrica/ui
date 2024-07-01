// Utility type to extract block type
export type ExtractBlockType<T, U> = T extends { blockType: U } ? T : never;
