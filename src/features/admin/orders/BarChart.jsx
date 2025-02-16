import ApexCharts from "react-apexcharts";

const BarChart = ({ data, type = "bar" }) => {
  const barChartData = {
    series: [
      {
        name: "Products Count",
        data: data?.records?.map((record) => record.products_count),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false, // Disable toolbar in area chart
        },
      },

      plotOptions: {
        bar: {
          horizontal: false, // عمودی بودن ستون‌ها
          borderRadius: 2, // اضافه کردن border-radius به ستون‌ها
          columnWidth: "40%", // عرض نازک‌تر ستون‌ها
        },
      },
       dataLabels: {
      enabled: false, // Disable the numbers on circles
    },
      xaxis: {
        categories: data.records.map((record) => ` ${record.id}`),
      },
      title: {
        text: "Order Products Count",
      },
    },
  };
  return (
    <>
      <ApexCharts
        options={barChartData.options}
        series={barChartData.series}
        type={type}
        height={350}
      />
    </>
  );
};

export default BarChart;
