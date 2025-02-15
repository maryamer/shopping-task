import Chart from "react-apexcharts";

const AreaChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "area",
      height: 250,
      toolbar: {
        show: false, // Disable toolbar in area chart
      },
    },
    xaxis: {
      categories: data.records.map((record) => record.id),
      title: {
        text: "ID",
      },
      // labels: {
      //   show: false, // Hide x-axis numbers
      // },
    },
    yaxis: {
      title: {
        text: "Price",
      },
      // labels: {
      //   show: false, // Hide y-axis numbers
      // },
    },
    markers: {
      size: 8, // Adjust size of the circles
      // colors: ["#0000FF"],
      // strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 10, // Make circles bigger on hover
      },
    },
    fill: {
      opacity: 0, // Remove the area fill, leaving just the circles
    },
    stroke: {
      show: false, // Hide the line connecting the dots
    },
    grid: {
      show: false, // Hide the grid
    },
    dataLabels: {
      enabled: false, // Disable the numbers on circles
    },
  };

  const chartSeries = [
    {
      name: "Price",
      data: data.records.map((record) => record.price),
    },
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </div>
  );
};

export default AreaChart;
