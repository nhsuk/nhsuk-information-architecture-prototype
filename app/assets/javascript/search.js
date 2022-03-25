const healthAz = [];
const searchWrapper = document.querySelector('.nhsuk-header__search');
const reusltsWrapper = document.querySelector('.new-search-results-wrapper');
let results = document.querySelector('.new-search-results');
reusltsWrapper.style.display = "none";

fetch("/javascript/conditions.json")
  .then(response => response.json())
  .then(data => healthAz.push(...data));

function searchTerm(searchTerm, healthAz) {
  return healthAz.filter(condition => {
    const regex = new RegExp(searchTerm, 'gi');
    return condition.title.match(regex) || condition.synonyms.match(regex) || condition.misspelling.match(regex) || condition.tag.match(regex);
  })
}

function showSearchResults() {
  const matchArray = searchTerm(this.value, healthAz);
  const checkLength = searchConditions.value;  

  const html = matchArray.map(condition => {
    const regex = new RegExp(this.value, 'gi');
    const conditionTitle = condition.title.replace(regex, `<span class="">${this.value}</span>`);

    return `
        ${(() => {
        if (regex.test(condition.synonyms)) {
          return `
              <li class='nhsuk-list-panel__item'>
                  <a class="nhsuk-list-panel__link" href="${condition.link}">
                  <svg class="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path></svg>
                    ${conditionTitle} 
                    
                  </a>
              </li>
            `
        } else {
          return `
              <li class='nhsuk-list-panel__item'>
                <a class="nhsuk-list-panel__link" href="${condition.link}">
                <svg class="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path></svg>
                    ${conditionTitle} 
                  </a>
              </li>
            `
        }
      })()}        
    `;

  }).join("");


  if (checkLength.length >= 2) {
    results.innerHTML = html;
    reusltsWrapper.style.display = "block";
    results.style.display = "block";
  } else {
    reusltsWrapper.style.display = "none";
  }

  if ((checkLength.length >= 1) && (matchArray.length === 0)) {
    return;
    // results.innerHTML = `
    //     <li class='nhsuk-list-panel__item'>
    //         <a class="nhsuk-list-panel__link">
    //             No matches. Please check the spelling or try the A-Z.
    //         </a>
    //     </li>
    // `;
  }

}

const searchConditions = document.querySelector('.new-search__input');
searchConditions.addEventListener('change', showSearchResults);
searchConditions.addEventListener('keyup', showSearchResults);
searchConditions.addEventListener('search', function () {
  reusltsWrapper.style.display = "none";
});