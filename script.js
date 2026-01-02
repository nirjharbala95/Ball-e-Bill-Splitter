// MVP Calculate share from static bill
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

// Add item button functionality
document.getElementById("add-item-btn").addEventListener("click", function() {
  const itemName = document.getElementById("item-name").value.trim();
  const itemPrice = parseFloat(document.getElementById("item-price").value);
  const participants = document.getElementById("item-participants").value.trim();

  if (!itemName || isNaN(itemPrice) || !participants) {
    alert("Please fill in all fields");
    return;
  }

  const table = document.getElementById("bill-table").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.innerText = itemName;
  cell2.innerText = itemPrice.toFixed(2);
  cell3.innerText = participants;

  // Clear input fields
  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-participants").value = "";
});
