import Cards from '../../components/overview/Cards';

import Table, { Column } from '../../components/common/Table';
import { getFilms } from '../../services/films/films.services';
import { useEffect, useState } from 'react';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface Film {
  title: string;
  release_date: string;
  director: string;
  producer: string;
  episode_id: number;
  characters: string;
  url: string;
}

const columns: Column<Film>[] = [
  { key: 'title', header: 'Film Title' },
  { key: 'release_date', header: 'Release Date' },
  { key: 'director', header: 'Director' },
  { key: 'producer', header: 'Producer' },
  { key: 'episode_id', header: 'Episode ID' },
  {
    key: 'character',
    header: 'Character',
    render: (row) => (
      <span
        className="text-[#303B54] font-medium hover:underline"
        rel="noreferrer"
      >
        {row.characters[0]}
      </span>
    ),
  },
];

export const Overview = () => {
  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFilms = async () => {
    setLoading(true);
    const data = await getFilms();
    setLoading(false);
    setFilmData(data.results);
    console.log('Fetched data:', data); // Log the freshly fetched data
  };

  useEffect(() => {
    fetchFilms();
  }, []); // Empty dependency array to run only once

  const cardItems = [
    {
      title: 'Films',
      iconColor: '#A9FFE0',
      figure: 200,
      details: '20 More than than yesterday',
    },
    {
      title: 'Starship',
      iconColor: '#A9C1FF',
      figure: 200,
      details: '20 More than than yesterday',
    },
    {
      title: 'People',
      iconColor: '#FFA9EC',
      figure: 200,
      details: '20 More than than yesterday',
    },
    {
      title: 'Species',
      iconColor: '#FDFFA9',
      figure: 200,
      details: '20 More than than yesterday',
    },
  ];

  const getRowLink = (film: Film) => `/overview/${getIdFromUrl(film.url)}`;
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-12">
        {cardItems.map((item) => (
          <Cards key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-[75px]">
        <p className="text-[#A4A7B7]">Films</p>

        <div className="mt-6 max-lg:w-[300px]">
          <Table
            columns={columns}
            data={filmData}
            getRowLink={getRowLink}
            loading={loading}
            loadingText="Loading films..."
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
