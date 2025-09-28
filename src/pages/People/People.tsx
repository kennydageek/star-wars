import { useEffect, useState } from 'react';
import Table, { Column } from '../../components/common/Table';
import { getPeople } from '../../services/people/people.services';
import { formatDate } from '../../utils/FormatDate';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface People {
  name: string;
  birth_year: string;
  gender: string;
  hair_color: string;
  height: string;
  created: string;
  url: string;
}

const columns: Column<People>[] = [
  { key: 'name', header: 'Name' },
  { key: 'birth_year', header: 'Birth year' },
  { key: 'gender', header: 'Gender' },
  { key: 'hair_color', header: 'Hair color' },
  { key: 'height', header: 'Height' },
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

export const People = () => {
  const [peopleData, setPeopleData] = useState({
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

  // Fetch people with optional page URL
  const fetchPeople = async (pageUrl: string | null = null) => {
    setLoading(true);
    try {
      const data = await getPeople(pageUrl);
      setPeopleData({
        results: data.results,
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: getCurrentPage(data.next, data.previous),
      });
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // Calculate total pages (SWAPI returns 10 items per page)
  const totalPages = Math.ceil(peopleData.count / 10);

  // Pagination handlers
  const handleNext = () => {
    if (peopleData.next) {
      fetchPeople(peopleData.next);
    }
  };

  const handlePrevious = () => {
    if (peopleData.previous) {
      fetchPeople(peopleData.previous);
    }
  };

  const getRowLink = (people: People) => `/people/${getIdFromUrl(people.url)}`;

  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">People</p>

        <div className="mt-6 max-lg:max-w-[calc(100lvw-80px)]">
          <Table
            columns={columns}
            data={peopleData.results}
            loading={loading}
            loadingText="Loading people..."
            getRowLink={getRowLink}
            // Add pagination props
            pagination={{
              currentPage: peopleData.currentPage,
              totalPages: totalPages,
              onNext: handleNext,
              onPrevious: handlePrevious,
              hasNext: !!peopleData.next,
              hasPrevious: !!peopleData.previous,
              totalCount: peopleData.count,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default People;
