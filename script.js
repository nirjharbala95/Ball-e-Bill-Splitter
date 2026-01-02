const tableBody = document.querySelector("#bill-table tbody");
const resultsDiv = document.getElementById("results");

// ---------- ADD ROW ----------
function addRow(item, price, participants) {
  const row = tableBody.insertRow();

  const itemCell = row.insertCell(0);
  const priceCell = row.insertCell(1);
  const participantsCell = row.insertCell(2);
  const actionsCell = row.insertCell(3);

  itemCell.innerText = item;
  priceCell.innerText = price.toFixed(2);
  participantsCell.innerText = participants;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  editBtn.onclick = () => {
    const newItem = prompt("Item name:", itemCell.innerText);
    const newPrice = prompt("Price:", priceCell.innerText);
    const newParticipants = prompt("Participants:", participantsCell.innerText);

    if (newItem && !isNaN(newPrice) && newParticipants) {
      itemCell.innerText = newItem;
      priceCell.innerText = parseFloat(newPrice).toFixed(2);
      participantsCell.innerText = newParticipants;
    }
  };

  actionsCell.appendChild(editBtn);
}

// ---------- ADD ITEM BUTTON ----------
document.getElementById("add-item-btn").onclick = () => {
  const item = document.getElementById("item-name").value.trim();
  const price = parseFloat(document.getElementById("item-price").value);
  const participants = document.getElementById("item-participants").value.trim();

  if (!item || isNaN(price) || !participants) {
    alert("Please fill all fields");
    return;
  }

  addRow(item, price, participants);

  document.getElementById("item-name").value = "";
  document.getElementById("item-price").value = "";
  document.getElementById("item-participants").value = "";
};

// ---------- CALCULATE TOTALS ----------
document.getElementById("calculate-btn").onclick = () => {
  resultsDiv.innerHTML = "";
  const totals = {};

  for (const row of tableBody.rows) {
    const price = parseFloat(row.cells[1].innerText);
    const participants = row.cells[2].innerText
      .split(",")
      .map(p => p.trim());

    const split = price / participants.length;

    participants.forEach(p => {
      totals[p] = (totals[p] || 0) + split;
    });
  }

  for (const person in totals) {
    resultsDiv.innerHTML += `<p>${person}: $${totals[person].toFixed(2)}</p>`;
  }
};
