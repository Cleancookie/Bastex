const Chart = require('chart.js');
var ctx = document.getElementById("myChart");
const Papa = require('papaparse');
const {subDays} = require('date-fns');
const Currency = require('currency.js');

const result = Papa.parse('../data/data.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results, file) => {
      // combine days
      data = results.data.reduce((carry, row) => {
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

      console.log(data);

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