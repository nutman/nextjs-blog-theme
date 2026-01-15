export type Image = {
  srcPath?: string,
  caption?: string,
};

// The type that represents a fluid/responsive image
export type FluidImage = {
  base64: string | null;
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
};
