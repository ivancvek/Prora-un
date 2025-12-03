let budgetData = [
    { id: 1, category: 'Hotel', estimated: 125, spent: 0, notes: 'Najem/hotel' },
    { id: 2, category: 'Oblačila', estimated: 0, spent: 0, notes: '' },
    { id: 3, category: 'Hrana', estimated: 200, spent: 23, notes: '' },
    { id: 4, category: 'Bencin', estimated: 100, spent: 0, notes: '' },
    { id: 5, category: 'Frizer', estimated: 20, spent: 0, notes: '' },
    { id: 6, category: 'Zdravje', estimated: 30, spent: 0, notes: '' },
    { id: 7, category: 'Darila', estimated: 350, spent: 0, notes: '' },
    { id: 8, category: 'Lahkotni Denar', estimated: 217, spent: 0, notes: '' },
    { id: 9, category: 'Kontingenca', estimated: 100, spent: 0, notes: '' },
    { id: 10, category: 'Rojstni dnevi', estimated: 80, spent: 0, notes: '' },
];
const tbody = document.getElementById('budget-body');
const totalEstimatedEl = document.getElementById('total-estimated');
const totalSpentEl = document.getElementById('total-spent');
const totalDifferenceEl = document.getElementById('total-difference');
function formatCurrency(amount) {
    return new Intl.NumberFormat('sl-SI', { style: 'currency', currency: 'EUR' }).format(amount);
}
function updateTotals() {
    let totalEstimated = 0;
    let totalSpent = 0;
    budgetData.forEach(item => {
        totalEstimated += Number(item.estimated);
        totalSpent += Number(item.spent);
    });
    const totalDiff = totalSpent - totalEstimated;
    totalEstimatedEl.textContent = formatCurrency(totalEstimated);
    totalSpentEl.textContent = formatCurrency(totalSpent);
    totalDifferenceEl.textContent = formatCurrency(totalDiff);
    if (totalDiff <= 0) {
        totalDifferenceEl.classList.add('positive');
        totalDifferenceEl.classList.remove('negative');
    } else {
        totalDifferenceEl.classList.add('negative');
        totalDifferenceEl.classList.remove('positive');
    }
}
function renderTable() {
    tbody.innerHTML = '';
    budgetData.forEach((item, index) => {
        const diffVal = item.spent - item.estimated;
        let diffClass = diffVal <= 0 ? 'positive' : 'negative';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${item.category}" onchange="updateItem(${index}, 'category', this.value)" placeholder="Kategorija"></td>
            <td><input type="number" value="${item.estimated}" onchange="updateItem(${index}, 'estimated', this.value)" placeholder="0"></td>
            <td><input type="number" value="${item.spent}" onchange="updateItem(${index}, 'spent', this.value)" placeholder="0"></td>
            <td class="text-right ${diffClass}" id="diff-${index}">${formatCurrency(diffVal)}</td>
            <td><input type="text" value="${item.notes}" onchange="updateItem(${index}, 'notes', this.value)" placeholder="Opombe"></td>
            <td>
                <button class="btn-icon" onclick="deleteEntry(${index})" title="Izbriši">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    updateTotals();
}
function updateItem(index, field, value) {
    if (field === 'estimated' || field === 'spent') {
        budgetData[index][field] = Number(value);
        // Update the difference cell immediately
        const diffVal = budgetData[index].spent - budgetData[index].estimated;
        const diffCell = document.getElementById(`diff-${index}`);
        diffCell.textContent = formatCurrency(diffVal);
        diffCell.className = `text-right ${diffVal <= 0 ? 'positive' : 'negative'}`;
    } else {
        budgetData[index][field] = value;
    }
    updateTotals();
}
function addEntry() {
    budgetData.push({
        id: Date.now(),
        category: '',
        estimated: 0,
        spent: 0,
        notes: ''
    });
    renderTable();
}
function deleteEntry(index) {
    if (confirm('Ali ste prepričani, da želite izbrisati ta vnos?')) {
        budgetData.splice(index, 1);
        renderTable();
    }
}
// Initial render
renderTable();
