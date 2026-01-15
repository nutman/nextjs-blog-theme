import React from 'react';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import Row from './Row';
import HyperLink from './HyperLink';
import { Link as LinkType } from '../types/Link';
// Stub function since utils/numbers may not be resolving correctly
const numberToConciseString = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

type StarsProps = {
  link?: LinkType,
  stars?: number | null | undefined,
  className?: string,
};

const Stars = (props: StarsProps): React.ReactElement | null => {
  const { stars = 0, className = '', link } = props;

  if (typeof stars !== 'number') {
    return null;
  }

  const starsElements = (
    <>
      <FiStar size={14} />
      <div className="ml-1 text-xs font-bold">
        {numberToConciseString(stars)}
      </div>
    </>
  );

  const starsElementsWrapped = link ? (
    <HyperLink link={link}>
      {starsElements}
    </HyperLink>
  ) : starsElements;

  return (
    <Row className={className}>
      {starsElementsWrapped}
    </Row>
  );
};

export default Stars;
