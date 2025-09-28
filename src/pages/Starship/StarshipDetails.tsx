import { useParams } from 'react-router-dom';
import Cover from '@/assets/img/cover-2.png';
import DetailsPage from '../../components/common/DetailsPage';
import { getStarshipsById } from '../../services/starships/starships.services';
import { useEffect, useState } from 'react';

interface Data {
  name: string;
  model: string;
  passengers: string;
  pilots: [];
}

const StarshipDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data | null>(null);

  const fetchStarshipsById = async (id: string) => {
    const data = await getStarshipsById(id);
    setData(data);
  };

  useEffect(() => {
    fetchStarshipsById(id!);
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <DetailsPage title={data.name} image={Cover}>
      <div className="text-[#434854] font-medium flex flex-col gap-1">
        <p>Model: {data.model}</p>
        <p>Passengers: {data.passengers}</p>
        {data?.pilots?.length !== 0 ? (
          <p>Pilots: {data?.pilots?.map((pilot) => pilot)}</p>
        ) : null}
      </div>
    </DetailsPage>
  );
};

export default StarshipDetails;
