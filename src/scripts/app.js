const Chart = require('chart.js');
var ctx = document.getElementById("myChart");
const Papa = require('papaparse');
const {subDays} = require('date-fns');

const result = Papa.parse('../data/data.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results, file) => {
        console.log(results);

        results.data = results.data.filter((row) => {
            const [day, month, year] = row.Date.split('/');
            return new Date(year, month, day) > subDays(new Date(), 1);
        });
        console.log(results);

        var myChart = new Chart.Chart(ctx, {
          type: "bar",
          data: {
            labels: results.data.map((row) => {
              return row.Date;
            }),
            datasets: [
              {
                label: "# of Votes",
                data: results.data.map((row) => {
                  return row.Amount;
                }),
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
    },
})