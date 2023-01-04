(async function() {
    try {
        const md = new markdownit();
        const parser = new DOMParser();
        const response = await fetch('https://raw.githubusercontent.com/coopTilleuls/.github/main/profile/revenues/README.md');
        const mdFile = await response.text();
        const documentParsed = parser.parseFromString(md.render(mdFile), 'text/html');

        const extractDataFromMarkdownTable = n => {
            const $td = documentParsed.querySelectorAll(`table:nth-of-type(${n}) td`);
            const data = {};

            for (let i = 0; i < $td.length; i++) {
                if (i%2 === 1) {
                    data[$td[i-1].textContent] = $td[i].textContent;
                }
            }

            return data;
        };

        const salaries = extractDataFromMarkdownTable(1);
        const bonuses = extractDataFromMarkdownTable(2);
        const seniorityBonus = extractDataFromMarkdownTable(3);

    } catch(e) {
        console.error(e);
    }
})();