let items = [];
let taxAmount = 0;

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = parseFloat(document.getElementById("itemPrice").value);
  const participants = document
    .getElementById("itemParticipants")
    .value.split(",")
    .map(p => p.trim())
    .filter(p => p);

  if (!name || isNaN(price) || participants.length === 0) {
    alert("Please fill all item fields correctly.");
    return;
  }

  items.push({ name, price, participants });
  clearItemInputs();
  render();
}

function clearItemInputs() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemParticipants").value = "";
}

function render() {
  readTaxInput();
  renderTable();
  renderResults();
  renderTotal();
}

function readTaxInput() {
  const taxInput = document.getElementById("taxAmountInput").value;
  taxAmount = taxInput ? parseFloat(taxInput) : 0;
}

function renderTable() {
  const tbody = document.getElementById("itemsTableBody");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.participants.join(", ")}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editItem(index) {
  const item = items[index];

  const newName = prompt("Edit item name:", item.name);
  const newPrice = parseFloat(prompt("Edit price:", item.price));
  const newParticipants = prompt(
    "Edit participants (comma-separated):",
    item.participants.join(", ")
  );

  if (!newName || isNaN(newPrice) || !newParticipants) return;

  items[index] = {
    name: newName,
    price: newPrice,
    participants: newParticipants.split(",").map(p => p.trim())
  };

  render();
}

function deleteItem(index) {
  items.splice(index, 1);
  render();
}

function renderResults() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const subtotals = {};
  let totalBeforeTax = 0;

  items.forEach(item => {
    const split = item.price / item.participants.length;
    item.participants.forEach(person => {
      subtotals[person] = (subtotals[person] || 0) + split;
      totalBeforeTax += split;
    });
  });

  Object.keys(subtotals).forEach(person => {
    const share = subtotals[person];
    const taxShare =
      totalBeforeTax > 0 ? taxAmount * (share / totalBeforeTax) : 0;
    const totalOwed = share + taxShare;

    const p = document.createElement("p");
    p.textContent =
      `${person}: ` +
      `Items $${share.toFixed(2)} + ` +
      `Tax $${taxShare.toFixed(2)} = ` +
      `$${totalOwed.toFixed(2)}`;

    resultsDiv.appendChild(p);
  });
}

function renderTotal() {
  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("totalAmount").textContent =
    `$${(itemsTotal + taxAmount).toFixed(2)}`;
}
