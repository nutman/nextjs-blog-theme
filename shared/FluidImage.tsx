
import { Image } from '../types/Image';
import { useFluidCover } from '../hooks/useFluidCover';

type FluidImageProps = {
  image?: Image | null | undefined,
  fluidImage?: Image | null | undefined,
  className?: string,
};

const FluidImage = (props: FluidImageProps): React.ReactElement | null => {
  const { image, fluidImage: fluidImageProvided, className = '' } = props;

  const fluidImageFetched = useFluidCover({ imagePath: image?.srcPath });
  const fluidImage = fluidImageProvided || fluidImageFetched;

  if (!fluidImage) {
    // @TODO: Consider to return an image placeholder.
    return null;
  }

  return (
    <Image
      image={fluidImage}
      style={{ height: '100%' }}
      alt={image?.caption || ''}
      title={image?.caption || ''}
      className={className}
    />
  );
};

export default FluidImage;
