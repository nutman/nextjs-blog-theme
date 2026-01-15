import React from 'react';
import Image from 'next/image';
import type { Image as ImageType } from '../types/Image';
import { useFluidCover } from '../hooks/useFluidCover';

type FluidImageProps = {
  image?: ImageType | null | undefined,
  fluidImage?: ImageType | null | undefined,
  className?: string,
};

const FluidImage = (props: FluidImageProps): React.ReactElement | null => {
  const { image, fluidImage: fluidImageProvided, className = '' } = props;

  // Use provided fluidImage or fallback to regular image
  const displayImage = fluidImageProvided || image;

  if (!displayImage?.srcPath) {
    // @TODO: Consider to return an image placeholder.
    return null;
  }

  return (
    <Image
      src={displayImage.srcPath}
      width={800}
      height={600}
      alt={image?.caption || ''}
      title={image?.caption || ''}
      className={className}
      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    />
  );
};

export default FluidImage;
