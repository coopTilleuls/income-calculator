async function getDocument(url) {
    try {
        return (await fetch(url)).text();
    } catch (err) {
        console.error(err);
    }
}

class PropertyException extends Error {
  constructor() {
    super('Number of properties\' name does not match with number of cells in a row');
  }
}

function convertTableToObject(tablePosition, propertyNames) {
  const CSSselector = `table:nth-of-type(${tablePosition.toString()}) tbody tr`;
  const rows = document.querySelectorAll(CSSselector);
  const data = [];
  rows.forEach(function(row) {
    const cellNumber = row.querySelectorAll('td').length;
    if (cellNumber !== propertyNames.length) {
      throw new PropertyException('Number of properties\' name does not match with number of cells in a row');
    }
    const obj = {};
    for (let i = 1; i <= propertyNames.length; i++) {
      let cell = row.querySelector(`td:nth-child(${i.toString()})`);
      if (cell) obj[propertyNames[i - 1]] = cell.textContent;
    }
    data.push(obj);
  })
  return data;
}

getDocument('https://raw.githubusercontent.com/coopTilleuls/.github/main/profile/revenues/README.md')
.then(function (mdFile) {
    const md = new markdownit();
    const html = md.render(mdFile);
    console.log(html);
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(mdFile, 'text/html');
    console.log(parsedHTML);
    document.body.insertAdjacentHTML('afterbegin', html);
    try {
        salaryData = convertTableToObject(1, ['title', 'salary']);
      } catch(e) {
        console.error(e.name, e.message);
      }
    bonusData = convertTableToObject(2, ['year', 'amount']);

    console.log(salaryData);
    console.log(bonusData);
});





