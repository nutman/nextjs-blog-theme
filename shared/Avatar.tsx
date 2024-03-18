import Image from "next/image";
import {Image as ImageType} from 'types/Image'

type AvatarProps = {
  avatar: ImageType,
  className?: string | null | undefined,
};

const Avatar = (props: AvatarProps): React.ReactElement => {
  const { avatar, className } = props;

  /**
   * ToDo: add Fluid image functionality
   * <FluidImage image={avatar} />
   */
  return (
    <div className={className || ''}>
      <Image src={avatar.srcPath}
             width={300}
             height={300}
             alt={avatar.caption}
             className="w-12 h-12 rounded-full block mx-auto mb-4 bg-gradient-conic from-gradient-3 to-gradient-4"/>

    </div>
  );
};

export default Avatar;
