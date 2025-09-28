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

// const data: Starship[] = [
//   {
//     name: 'Death Star',
//     model: 'T-65 X WIng',
//     class: 'Starfighter',
//     passenger: 200,
//     length: '500 meters',
//     character: 'https://swapi.dev/api/people',
//   },
//   {
//     name: 'Death Star',
//     model: 'T-65 X WIng',
//     class: 'Starfighter',
//     passenger: 200,
//     length: '500 meters',
//     character: 'https://swapi.dev/api/people',
//   },
// ];

export const Starship = () => {
  const [data, setStarshipData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStarships = async () => {
    setLoading(true);
    const data = await getStarships();
    setStarshipData(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchStarships();
  }, []);

  const handleSelectionChange = (selectedRows: Starship[]) => {
    console.log(selectedRows);
  };
  const getRowLink = (starship: Starship) =>
    `/starships/${getIdFromUrl(starship.url)}`;

  return (
    <>
      <div className="">
        <p className="text-[#A4A7B7]">Starships</p>

        <div className="mt-6">
          <Table
            columns={columns}
            data={data}
            loading={loading}
            loadingText="Loading starships..."
            onSelectionChange={handleSelectionChange}
            getRowLink={getRowLink}
          />
        </div>
      </div>
    </>
  );
};

export default Starship;
