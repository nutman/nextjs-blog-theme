// Type definitions for image data (stub for Next.js compatibility)
// This is a stub type definition to fix build errors for unused image hooks

export interface IGatsbyImageData {
    layout: string;
    width: number;
    height: number;
    images: {
        fallback: {
            src: string;
            srcSet: string;
            sizes: string;
        };
        sources: Array<{
            srcSet: string;
            type: string;
            sizes: string;
        }>;
    };
    placeholder?: {
        fallback: string;
    };
}
