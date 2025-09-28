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
  const [filmData, setFilmData] = useState({
    results: [],
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);

  // Helper function to determine current page from SWAPI URLs
  const getCurrentPage = (
    next: string | null,
    previous: string | null
  ): number => {
    if (previous) {
      const urlParams = new URLSearchParams(previous.split('?')[1]);
      return parseInt(urlParams.get('page') || '1') + 1;
    }
    return 1;
  };

  // Fetch films with optional page URL
  const fetchFilms = async (pageUrl: string | null = null) => {
    setLoading(true);
    try {
      const data = await getFilms(pageUrl);
      setFilmData({
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: getCurrentPage(data.next, data.previous),
      });
    } catch (error) {
      console.error('Error fetching films:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  // Calculate total pages (SWAPI returns 10 items per page)
  const totalPages = Math.ceil(filmData.count / 10);

  // Pagination handlers
  const handleNext = () => {
    if (filmData.next) {
      fetchFilms(filmData.next);
    }
  };

  const handlePrevious = () => {
    if (filmData.previous) {
      fetchFilms(filmData.previous);
    }
  };

  const cardItems = [
    {
      title: 'Films',
      iconColor: '#A9FFE0',
      figure: filmData.count, // Use actual count from API
      details: `${filmData.count} films in total`,
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
            data={filmData.results}
            getRowLink={getRowLink}
            loading={loading}
            loadingText="Loading films..."
            // Add pagination props
            pagination={{
              currentPage: filmData.currentPage,
              totalPages: totalPages,
              onNext: handleNext,
              onPrevious: handlePrevious,
              hasNext: !!filmData.next,
              hasPrevious: !!filmData.previous,
              totalCount: filmData.count,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
