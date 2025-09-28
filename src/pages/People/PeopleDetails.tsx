import { useParams } from 'react-router-dom';
import Cover from '@/assets/img/cover-3.png';
import DetailsPage from '../../components/common/DetailsPage';
import { useEffect, useState } from 'react';
import { getPeopleById } from '../../services/people/people.services';

interface Data {
  name: string;
  gender: string;
  birth_year: string;
  skin_color: string;
  height: string;
}

const PeopleDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data | null>();
  console.log(id);

  const fetchPeopleById = async (id: string) => {
    const data = await getPeopleById(id);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchPeopleById(id!);
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <DetailsPage title={data.name} image={Cover}>
      <div className="text-[#434854] font-medium flex flex-col gap-1">
        <p className="capitalize">Gender: {data.gender}</p>
        <p>Year of birth: {data.birth_year}</p>
        <p className="capitalize">Skin Color: {data.skin_color}</p>

        <p>Height: {data.height} CM</p>
      </div>
    </DetailsPage>
  );
};

export default PeopleDetails;
