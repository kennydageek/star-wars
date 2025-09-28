import { useEffect, useState } from 'react';
import Table, { Column } from '../../components/common/Table';
import { getSpecies } from '../../services/species/species.services';
import { formatDate } from '../../utils/FormatDate';
import { getIdFromUrl } from '../../utils/getIdFromUrl';

interface Species {
  name: string;
  classification: string;
  eyeColors: string;
  hairColor: string;
  height: string;
  created: string;
  url: string;
}

const columns: Column<Species>[] = [
  { key: 'name', header: 'Name' },
  { key: 'classification', header: 'Classification' },
  { key: 'eye_colors', header: 'Eye colors' },
  { key: 'hair_colors', header: 'Hair color' },
  {
    key: 'height',
    header: 'Height',
    render: (row) => (
      <span
        className="text-[#303B54] font-medium hover:underline"
        rel="noreferrer"
      >
        {row.height || '150 CM'}
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

// const data: Species[] = [
//   {
//     name: 'Shank Comics',
//     classification: 'Mammal',
//     eyeColors: 'blue,green,yellow',
//     hairColor: 'Blond',
//     height: '150 CM',
//     created: 'https://swapi.dev/api/people',
//   },
//   {
//     name: 'Shank Comics',
//     classification: 'Mammal',
//     eyeColors: 'blue,green,yellow',
//     hairColor: 'Blond',
//     height: '150 CM',
//     created: 'https://swapi.dev/api/people',
//   },
// ];

export const Species = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSpecies = async () => {
    setLoading(true);
    const data = await getSpecies();
    setData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchSpecies();
  }, []);
  const handleSelectionChange = (e: Species[]) => {
    console.log(e);
  };

  const getRowLink = (specie: Species) =>
    `/species/${getIdFromUrl(specie.url)}`;
  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">Species</p>

        <div className="mt-6 max-lg:w-[300px]">
          <Table
            columns={columns}
            data={data}
            onSelectionChange={handleSelectionChange}
            getRowLink={getRowLink}
            loading={loading}
            loadingText="Fetching species"
          />
        </div>
      </div>
    </>
  );
};

export default Species;
