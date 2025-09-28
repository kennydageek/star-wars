import { useEffect, useState } from 'react';
import Table, { Column } from '../../components/common/Table';
import { getPeople } from '../../services/people/people.services';
import { formatDate } from '../../utils/FormatDate';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface People {
  name: string;
  birthYear: string;
  gender: string;
  hairColor: string;
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async () => {
    setLoading(true);
    const data = await getPeople();
    setData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSelectionChange = (e: People[]) => {
    console.log(e);
  };

  const getRowLink = (people: People) => `/people/${getIdFromUrl(people.url)}`;

  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">People</p>

        <div className="mt-6 max-lg:w-[300px]">
          <Table
            columns={columns}
            data={data}
            onSelectionChange={handleSelectionChange}
            loading={loading}
            loadingText="Loading people..."
            getRowLink={getRowLink}
          />
        </div>
      </div>
    </>
  );
};

export default People;
