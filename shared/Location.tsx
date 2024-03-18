
import type { Location as LocationType } from '../types/Location';
import { ReactElement } from 'react';
import { FiMapPin } from '@react-icons/all-files/fi/FiMapPin';

type LocationProps = {
  location: LocationType,
};

const Location = (props: LocationProps): ReactElement => {
  const { location } = props;

  return (
    <div className="flex flex-row items-center font-light">
      <FiMapPin className="mr-1 w-4 h-4" />
      <div>{location.name}</div>
    </div>
  );
};

export default Location;
