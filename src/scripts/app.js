const Chart = require('chart.js');
var ctx = document.getElementById("myChart");
const Papa = require('papaparse');
const {subDays} = require('date-fns');
const Currency = require('currency.js');
const Zoom = require('chartjs-plugin-zoom');
const chartOptions = require('./components/chart-options');

const result = Papa.parse('../data/data.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results, file) => {
      // combine days
      data = results.data.reduce((carry, row) => {
        const [day, month, year] = row.Date.split('/');
        row.Date = `${year}-${month}-${day}`;
        let dayTransaction = carry.get(row.Date);
        if (!dayTransaction) {
          // Date not yet inserted
          dayTransaction = {
            Date: row.Date,
            Amount: Currency(row.Amount).toString()
          };
        } else {
          // Date already exists in carry
          dayTransaction.Amount = Currency(dayTransaction.Amount).add(row.Amount).toString();
        }

        carry.set(row.Date, dayTransaction);
        return carry;
      }, new Map());

      // Convert to array and remove key
      data = [...data].map((row) => {return row[1]});

      let totalBalance = 0;

      // Set line graph
      let myChart = new Chart.Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((row) => {
            return row.Date;
          }),
          datasets: [
            {
              label: "Balance",
              data: data.map((row) => {
                console.log(totalBalance);
                totalBalance = Currency(row.Amount).add(totalBalance).toString();
                return totalBalance;
              }),
              borderWidth: 1,
            },
          ],
        },
        options: chartOptions,
      });
    },
})