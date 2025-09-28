import { useEffect, useState } from 'react';
import Table, { Column } from '../../components/common/Table';
import { getStarships } from '../../services/starships/starships.services';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface Starship {
  name: string;
  model: string;
  class: string;
  passenger: number;
  length: string;
  character: string;
  url: string;
}

const columns: Column<Starship>[] = [
  { key: 'name', header: 'Name' },
  { key: 'model', header: 'Model' },
  { key: 'starship_class', header: 'Class' },
  { key: 'passengers', header: 'Passenger' },
  { key: 'length', header: 'Length' },
  {
    key: 'character',
    header: 'Character',
    render: (row) => (
      <a
        href={row.character}
        className="text-[#303B54] font-medium hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {row.character || 'https://swapi.dev/api/people/1/'}
      </a>
    ),
  },
];

export const Starship = () => {
  const [starshipData, setStarshipData] = useState({
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

  // Fetch starships with optional page URL
  const fetchStarships = async (pageUrl: string | null = null) => {
    setLoading(true);
    try {
      const data = await getStarships(pageUrl);
      setStarshipData({
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: getCurrentPage(data.next, data.previous),
      });
    } catch (error) {
      console.error('Error fetching starships:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarships();
  }, []);

  // Calculate total pages (SWAPI returns 10 items per page)
  const totalPages = Math.ceil(starshipData.count / 10);

  // Pagination handlers
  const handleNext = () => {
    if (starshipData.next) {
      fetchStarships(starshipData.next);
    }
  };

  const handlePrevious = () => {
    if (starshipData.previous) {
      fetchStarships(starshipData.previous);
    }
  };

  const getRowLink = (starship: Starship) =>
    `/starships/${getIdFromUrl(starship.url)}`;

  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">Starships</p>

        <div className="mt-6 max-lg:max-w-[calc(100lvw-80px)]">
          <Table
            columns={columns}
            data={starshipData.results}
            loading={loading}
            loadingText="Loading starships..."
            getRowLink={getRowLink}
            // Add pagination props
            pagination={{
              currentPage: starshipData.currentPage,
              totalPages: totalPages,
              onNext: handleNext,
              onPrevious: handlePrevious,
              hasNext: !!starshipData.next,
              hasPrevious: !!starshipData.previous,
              totalCount: starshipData.count,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Starship;
