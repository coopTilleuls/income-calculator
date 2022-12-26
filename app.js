async function getDocument(url) {
    try {
        return (await fetch(url)).text();
    } catch (err) {
        console.error(err);
    }
}

function PropertyException(message) {
  this.message = message;
  this.name = 'PropertyException: ';
}

function convertTableToObject(tablePosition, propertyNames) {
  const CSSselector = `table:nth-of-type(${tablePosition.toString()}) tbody tr`;
  const rows = document.querySelectorAll(CSSselector);
  const data = [];
  rows.forEach(function(row) {
    const cellNumber = row.querySelectorAll('td').length;
    if (cellNumber !== propertyNames.length) {
      throw new PropertyException('Number of properties\' name does not match with number of cells in a table\' row');
    }
    const obj = {};
    for (let i = 1; i <= propertyNames.length; i++) {
      let cell = row.querySelector(`td:nth-child(${i.toString()})`);
      if (cell) obj[propertyNames[i - 1]] = cell.textContent;
    }
    data.push(obj);
  })
  return data === [] ? 'erreur' : data;
}

getDocument('https://raw.githubusercontent.com/coopTilleuls/.github/main/profile/revenues/README.md')
.then(function (mdFile) {
    const md = new markdownit();
    const html = md.render(mdFile);
    document.body.insertAdjacentHTML('afterbegin', html);
    
    /*
    const firstRank = document.querySelector('tbody tr:nth-child(1) td:nth-child(1)').textContent;
    const rank1Wage = document.querySelector('tbody tr:nth-child(1) td:nth-child(2)').textContent;
    const secondRank = document.querySelector('tbody tr:nth-child(2) td:nth-child(1)').textContent;
    const rank2Wage = document.querySelector('tbody tr:nth-child(2) td:nth-child(2)').textContent;
    const thirdRank = document.querySelector('tbody tr:nth-child(3) td:nth-child(1)').textContent;
    const rank3Wage = document.querySelector('tbody tr:nth-child(3) td:nth-child(2)').textContent;
    const fourthRank = document.querySelector('tbody tr:nth-child(4) td:nth-child(1)').textContent;
    const rank4Wage = document.querySelector('tbody tr:nth-child(4) td:nth-child(2)').textContent;
    const fifthRank = document.querySelector('tbody tr:nth-child(5) td:nth-child(1)').textContent;
    const rank5Wage = document.querySelector('tbody tr:nth-child(5) td:nth-child(2)').textContent;
    const sixthRank = document.querySelector('tbody tr:nth-child(6) td:nth-child(1)').textContent;
    const rank6Wage = document.querySelector('tbody tr:nth-child(6) td:nth-child(2)').textContent;

    const ranksWages = new Map;
    ranksWages.set(firstRank, rank1Wage)
      .set(secondRank, rank2Wage)
      .set(thirdRank, rank3Wage)
      .set(fourthRank, rank4Wage)
      .set(fifthRank, rank5Wage)
      .set(sixthRank, rank6Wage);

    console.log(ranksWages);
  */
  /* CHAT GPT SOLUTION
  const table = document.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];
  for (const row of rows) {
    const cells = row.querySelectorAll('td');
    const rowData = {};
    for (const cell of cells) {
      const key = cell.parentNode.firstElementChild.textContent;
      
      const value = cell.textContent;
      rowData[key] = value;
    }
    data.push(rowData);
  }
  data.map((curr) => console.log(curr));
  

  const salaryRows = document.querySelectorAll('table:nth-of-type(1) tr');
  const salaryData = [];
  salaryRows.forEach(function(row) {
    const titleCell = row.querySelector('td:nth-child(1)');
    const salaryCell = row.querySelector('td:nth-child(2)');
    if (titleCell && salaryCell) {
      const obj = {
        title: titleCell.textContent,
        salary: salaryCell.textContent,
      }
      salaryData.push(obj);
    }
  })
  */
  

  /*
  const bonusByYear = document.querySelectorAll('table:nth-of-type(2) tr');
  const bonusData = [];
  bonusByYear.forEach(function (row) {
    const yearCell = row.querySelector('td:nth-child(1)');
    const amountCell = row.querySelector('td:nth-child(2)');
    if (yearCell && amountCell) {
      const obj = {
        year: yearCell.textContent,
        amount: amountCell.textContent,
      }
      bonusData.push(obj);
    }
  })
  */
  try {
      salaryData = convertTableToObject(1, ['title', 'salary']);
    } catch(e) {
      console.error(e.name, e.message);
    }
  bonusData = convertTableToObject(2, ['year', 'amount']);

  console.log(salaryData);
  console.log(bonusData);
});





