
// ES6 or Vanilla JavaScript

const healthAz = [];
const searchWrapper = document.querySelector('.nhsuk-header__search');
const reusltsWrapper = document.querySelector('.new-search-results-wrapper');
let results = document.querySelector('.new-search-results');
reusltsWrapper.style.display = "none";

fetch("/javascript/conditions.json")
    .then(response => response.json())
    .then(data => healthAz.push(...data));
    // console.log(healthAz);

    
function findMatches(searchTerm, healthAz) {
    return healthAz.filter(condition => {
        const regex = new RegExp(searchTerm, 'gi');
        return condition.title.match(regex) || condition.synonyms.match(regex) || condition.misspelling.match(regex) || condition.tag.match(regex);        
    })  
    
    // const filteredResult = healthAz.filter((item) => {
    //     return (item.synonyms.indexOf(searchTerm) >= 0);
    // });

    console.log(filteredResult);

}

function showMatches() {
    const matchArray = findMatches(this.value, healthAz);
    const checkLength = searchConditions.value;
    // matchArray.length;

    const html = matchArray.map(condition => {
        const regex = new RegExp(this.value, 'gi');
        const conditionTitle = condition.title.replace(regex, `<span class="search_highlight">${this.value}</span>`);
        // const conditionSynonyms = condition.synonyms.replace(regex, `<span class="search_highlight">${this.value}</span>`);
        // const conditionMisspelling = condition.misspelling.replace(regex, `<span class="search_highlight">${this.value}</span>`);

        return `
        ${(() => {
          if (regex.test(condition.title)) {
            return `
              <li class='nhsuk-list-panel__item'>
                  <a class="nhsuk-list-panel__link">
                    ${conditionTitle} 
                  </a>
              </li>
            `
          } else if (regex.test(condition.synonyms)) {

            // console.log(condition.synonyms);
            // let toArray = condition.synonyms.split(", ");
            // const match = toArray.find(value => regex.test(value));
            // console.log(match);

            return `
              <li class='nhsuk-list-panel__item'>
                  <a class="nhsuk-list-panel__link">
                    ${conditionTitle} 
                    - <span class="search_highlight">${this.value}</span>
                  </a>
              </li>
            `
          } 
        })()}        
    `;
    
  })
  .join("");


    // const html = matchArray.map(condition => {
    //     const regex = new RegExp(this.value, 'gi');
    //     const conditionTitle = condition.title.replace(regex, `<span class="search_highlight">${this.value}</span>`);
    //     const conditionSynonyms = condition.synonyms.replace(regex, `<span class="search_highlight">${this.value}</span>`);
    //     const conditionMisspelling = condition.misspelling.replace(regex, `<span class="search_highlight">${this.value}</span>`);
    //     return [condition.title, condition.synonyms, condition.misspelling];
    // });

    // const htmlShort = html.slice(0, 5);
    // console.log(htmlShort);

    if (checkLength.length >= 1) {
        results.innerHTML = html;
        reusltsWrapper.style.display = "block";
        results.style.display = "block";
    } else {
        reusltsWrapper.style.display = "none";
    }
    
    if ((checkLength.length >= 1) && (matchArray.length === 0)) {
        results.innerHTML = `
        <li class='nhsuk-list-panel__item'>
            <a class="nhsuk-list-panel__link">
                No matches, please or check the spelling or check the A-Z.
            </a>
        </li>
    `;
    }

}

const searchConditions = document.querySelector('.new-search__input');
searchConditions.addEventListener('change', showMatches);
searchConditions.addEventListener('keyup', showMatches);

/*
//as arrays 
"synonyms": ["Runs", "shits", "squits"],
"misspelling": ["Diarhoea", "Diarroea", "Diarrhea"]

// as strings
"synonyms": "Runs, shits, squits, runny poo, bad poo, loose poo, dodgy poo, bad guts, loose guts, dodgy guts, loose stools, runny stools, dodgy stools, loose bowels, dodgy dowels, dodgy tummy, bad tummy, dodgy stomach, bad stomach",
"misspelling": "Diarhoea, Diarroea, Diarrhea, Diarrhear, Diarhea, Diarhear, Diarhrear, Diarhearh, Diahrearh, Diarrea, Diarea, Diarear, Diarrear, Direar, Direarr, Direa, Direah, Direarh, dyo, dya, dier, diya"

*/
