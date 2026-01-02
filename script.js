document.getElementById("calculate-btn").addEventListener("click", function() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // clear previous results

  const table = document.getElementById("bill-table").getElementsByTagName("tbody")[0];
  const totals = {};

  // Loop through each row of the table
  for (let row of table.rows) {
    const item = row.cells[0].innerText;
    const price = parseFloat(row.cells[1].innerText);
    const participants = row.cells[2].innerText.split(",").map(p => p.trim());

    const splitAmount = price / participants.length;

    // Add splitAmount to each participant
    for (let p of participants) {
      if (!totals[p]) totals[p] = 0;
      totals[p] += splitAmount;
    }
  }

  // Display results
  for (let [participant, amount] of Object.entries(totals)) {
    resultsDiv.innerHTML += `<p>${participant}: $${amount.toFixed(2)}</p>`;
  }
});
