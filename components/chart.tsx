import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
  BarController,
  BarElement,
} from 'chart.js'
import { DataChart } from '../interfaces/interface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
)

interface Props {
  dataChartParents: DataChart
}

const Chart:React.FC<Props> = ({ dataChartParents }) => {

  const [dataChart, setDataChart] = useState<DataChart>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'],
    datasets: [{
      label: 'Spent $',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(237, 255, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(237, 255, 64, 1)',
      ],
      borderWidth: 1
    }]
  })

  useEffect(() => {
    if(dataChartParents) {
      setDataChart(dataChartParents)
    }
  }, [dataChartParents])

  return (
    <div>
      <Bar
        data={dataChart}
        options={{
          responsive: true,
          maintainAspectRatio: true
        }}
      />
    </div>
  )
}

export default Chart
