async function getDocument(url) {
    try {
        const md = await fetch(url);
        const text = await md.text();
        console.log(text);
    } catch (err) {
        console.error(err);
    }
}

getDocument('https://raw.githubusercontent.com/coopTilleuls/.github/main/profile/revenues/README.md');