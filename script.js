document.getElementById('searchDescriptionBtn').addEventListener('click', () => {
  const keyword = document.getElementById('searchInput').value;
  fetch('/search-description', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keyword })
  })
  .then(response => response.json())
  .then(data => displayResults(data))
  .catch(error => console.error('Error:', error));
});

document.getElementById('searchReferenceBtn').addEventListener('click', () => {
  const reference = document.getElementById('searchInput').value;
  fetch('/search-reference', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reference })
  })
  .then(response => response.json())
  .then(data => displayResults(data))
  .catch(error => console.error('Error:', error));
});

function displayResults(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  if (data.length === 0) {
    resultsDiv.textContent = 'No se encontraron resultados.';
  } else {
    data.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.innerHTML = `
        <p><strong>No. De Referencia:</strong> ${item["No. De Referencia"]}</p>
        <p><strong>Descripción:</strong> ${item.Descripción}</p>
        <p><strong>Caracteristicas:</strong> ${item.Caracteristicas}</p>
        <p><strong>Rango:</strong> ${item.Rango}</p>
        <p><strong>Precio referencia antes de IVA:</strong> ${item["Precio referencia antes de IVA"]}</p>
      `;
      resultsDiv.appendChild(resultItem);
    });
  }
}
