import { useParams } from 'react-router-dom';
import Cover from '@/assets/img/cover-1.png';
import DetailsPage from '../../components/common/DetailsPage';
import { getFilmsById } from '../../services/films/films.services';
import { useEffect, useState } from 'react';
import { formatDateLong } from '../../utils/FormatDateLong';

interface Data {
  title: string;
  director: string;
  producer: string;
  release_date: string;
}
const OverviewDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data | null>(null);

  const fetchFilmsById = async (id: string) => {
    const data = await getFilmsById(id);
    setData(data);
  };

  useEffect(() => {
    fetchFilmsById(id!);
  }, [id]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <DetailsPage title={data.title} image={Cover}>
      <div className="text-[#434854] font-medium flex flex-col gap-1">
        <p>Director: {data.director}</p>
        <p>Producer: {data.producer}</p>
        <p>Release Date: {formatDateLong(data?.release_date)}</p>
      </div>
    </DetailsPage>
  );
};

export default OverviewDetails;
