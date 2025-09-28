import { useParams } from 'react-router-dom';
import Cover from '@/assets/img/cover-4.png';
import DetailsPage from '../../components/common/DetailsPage';
import { useEffect, useState } from 'react';
import { getSpeciesById } from '../../services/species/species.services';

interface Data {
  name: string;
  designation: string;
  language: string;
  eye_colors: string;
  average_lifespan: string;
}
const SpeciesDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data>();

  const fetchSpeciesById = async (id: string) => {
    const data = await getSpeciesById(id);
    setData(data);
  };

  useEffect(() => {
    fetchSpeciesById(id!);
  }, [id]);

  return (
    <DetailsPage title={data?.name} image={Cover}>
      <div className="text-[#434854] font-medium flex flex-col gap-1">
        <p className="capitalize">Designation: {data?.designation}</p>
        <p>Language: {data?.language}</p>
        <p className="capitalize">Eye colors: {data?.eye_colors}</p>
        <p>Average Lifespan: {data?.average_lifespan}</p>
      </div>
    </DetailsPage>
  );
};

export default SpeciesDetails;
