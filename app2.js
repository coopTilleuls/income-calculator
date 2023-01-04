(async function() {
    try {
        const md = new markdownit();
        const parser = new DOMParser();
        const mdFile = (await (await fetch('https://raw.githubusercontent.com/coopTilleuls/.github/main/profile/revenues/README.md')).text());
        const documentParsed = parser.parseFromString(md.render(mdFile), 'text/html');
        
        const table1Selector = 'table:nth-of-type(1) tbody tr';
        const table2Selector = 'table:nth-of-type(2) tbody tr';
        
        function convertTableToObject(document, tableSelector, propertyNames) {
            const rows = document.querySelectorAll(tableSelector);
            const rowsArr = Array.from(rows);
            return rowsArr.map((row) => {
                const firstProperty = row.querySelector('td:nth-child(1)').textContent;
                const secondProperty = row.querySelector('td:nth-child(2)').textContent;
                const obj = {
                    [propertyNames[0]]: firstProperty,
                    [propertyNames[1]]: secondProperty,
                };
                return obj; 
            })
        }

        const salaries = convertTableToObject(documentParsed, table1Selector, ['title', 'salary']);
        const bonuses = convertTableToObject(documentParsed, table2Selector, ['year', 'amount']);

        console.log(salaries);
        console.log(bonuses);
    } catch(e) {
        console.error(e);
    }
})();