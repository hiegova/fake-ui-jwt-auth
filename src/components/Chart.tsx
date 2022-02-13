import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export interface RawData {
  month: number;
  value: number;
}

export interface Props {
  rawData: RawData[] | null;
}

export interface SummaryData {
  [month: string]: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options: ChartOptions = {
  responsive: true,
};

function getSummaryData(rawData: RawData[]): SummaryData {
  const result = rawData.reduce((map: SummaryData, curr) => {
    if (!map[curr.month]) {
      map[curr.month] = 0;
    }
    map[curr.month] = map[curr.month] + curr.value;

    return map;
  }, {});

  return result;
}

function getMonthName(month: number | string): string {
  return Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(month));
}

const defaultLabels = [
  'January',
  'March',
  'May',
  'July',
  'September',
  'November',
];

export default function Chart(props: Props) {
  const { rawData } = props;
  const summaryData = useMemo(() => getSummaryData(rawData || []), [rawData]);
  const months = Object.keys(summaryData);
  const labels = useMemo(() => months.map((m) => getMonthName(m)), [months]);
  const data = months.map((m) => summaryData[m] || 0);

  const chartSettings = {
    labels: labels.length ? labels : defaultLabels,
    datasets: [
      {
        label: 'Dataset',
        data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={chartSettings} />;
}
