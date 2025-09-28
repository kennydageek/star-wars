import { useEffect, useState } from 'react';
import Table, { Column } from '../../components/common/Table';
import { getSpecies } from '../../services/species/species.services';
import { formatDate } from '../../utils/FormatDate';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface Species {
  name: string;
  classification: string;
  eye_colors: string;
  hair_colors: string;
  average_height: string;
  created: string;
  url: string;
}

const columns: Column<Species>[] = [
  { key: 'name', header: 'Name' },
  { key: 'classification', header: 'Classification' },
  { key: 'eye_colors', header: 'Eye Colors' },
  { key: 'hair_colors', header: 'Hair Colors' },
  {
    key: 'average_height',
    header: 'Average Height',
    render: (row) => (
      <span
        className="text-[#303B54] font-medium hover:underline"
        rel="noreferrer"
      >
        {row.average_height || '150'} cm
      </span>
    ),
  },
  {
    key: 'created',
    header: 'Created',
    render: (row) => (
      <span
        className="text-[#303B54] font-medium hover:underline"
        rel="noreferrer"
      >
        {formatDate(row.created)}
      </span>
    ),
  },
];

export const Species = () => {
  const [speciesData, setSpeciesData] = useState({
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

  // Fetch species with optional page URL
  const fetchSpecies = async (pageUrl: string | null = null) => {
    setLoading(true);
    try {
      const data = await getSpecies(pageUrl);
      setSpeciesData({
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: getCurrentPage(data.next, data.previous),
      });
    } catch (error) {
      console.error('Error fetching species:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, []);

  // Calculate total pages (SWAPI returns 10 items per page)
  const totalPages = Math.ceil(speciesData.count / 10);

  // Pagination handlers
  const handleNext = () => {
    if (speciesData.next) {
      fetchSpecies(speciesData.next);
    }
  };

  const handlePrevious = () => {
    if (speciesData.previous) {
      fetchSpecies(speciesData.previous);
    }
  };

  const getRowLink = (specie: Species) =>
    `/species/${getIdFromUrl(specie.url)}`;

  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">Species</p>

        <div className="mt-6 max-lg:max-w-[calc(100lvw-80px)]">
          <Table
            columns={columns}
            data={speciesData.results}
            getRowLink={getRowLink}
            loading={loading}
            loadingText="Fetching species"
            // Add pagination props
            pagination={{
              currentPage: speciesData.currentPage,
              totalPages: totalPages,
              onNext: handleNext,
              onPrevious: handlePrevious,
              hasNext: !!speciesData.next,
              hasPrevious: !!speciesData.previous,
              totalCount: speciesData.count,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Species;
