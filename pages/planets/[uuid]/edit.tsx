import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';

const EditPlanet: NextPage = () => {
  const router = useRouter();
  const planetUuuid = router.query.uuid;

  return <div className="text-white">Edit Planet {planetUuuid}</div>;
};

export default EditPlanet;
