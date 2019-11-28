
// ES6 or Vanilla JavaScript

const healthAz = [];
let results = document.querySelector('.new-search-results');
const reusltsWrapper = document.querySelector('.new-search-results-wrapper');
reusltsWrapper.style.display = "none";
// let filteredTotal = document.querySelector('.filtered-total');



fetch("/javascript/conditions.json")
    .then(response => response.json())
    .then(data => healthAz.push(...data));
    // console.log(healthAz);
    
function findMatches(searchTerm, healthAz) {
    return healthAz.filter(condition => {
        const regex = new RegExp(searchTerm, 'gi');
        // console.log(regex);
        return condition.title.match(regex) || condition.synonyms.match(regex) || condition.misspelling.match(regex) || condition.tag.match(regex);
        // return condition.synonyms.match(regex);
    })    
}

function showMatches() {
    const matchArray = findMatches(this.value, healthAz);
    // console.log(matchArray);
    const checkLength = searchConditions.value;
    matchArray.length;

    const html = matchArray.map(condition => {
        const regex = new RegExp(this.value, 'gi');
        const conditionTitle = condition.title.replace(regex, `<span class="search_highlight">${this.value}</span>`);
        const conditionSynonyms = condition.synonyms.replace(regex, `<span class="search_highlight">${this.value}</span>`);
        const conditionMisspelling = condition.misspelling.replace(regex, `<span class="search_highlight">${this.value}</span>`);
        
        return `
            <li class='nhsuk-list-panel__item'>
                <a class="nhsuk-list-panel__link">
                    ${conditionTitle} 
                    <em>${conditionSynonyms ? `${conditionSynonyms}` : ``} </em>
                    <em>${conditionMisspelling ? `${conditionMisspelling}` : ``}</em>
                </a>
            </li>            
        `;
    }).join('');

    if (checkLength.length >= 1) {
        results.innerHTML = html;
        reusltsWrapper.style.display = "block";
        // filteredTotal.style.display = "inlineBlock";
        // searchClear.style.display = "block";
        // filteredTotal.innerHTML = `
        //     <strong><span style="color: #000;">${matchArray.length}</span></strong> matches
        // `;     
        results.style.display = "block";
    } else {
        reusltsWrapper.style.display = "none";
        // filteredTotal.innerHTML = " ";
    }
    
    if ((checkLength.length >= 1) && (matchArray.length === 0)) {
        results.innerHTML = `
        <li class='nhsuk-list-panel__item'>
            <a class="nhsuk-list-panel__link">
                No matches, please try filtering or check the spelling.
            </a>
        </li>
    `;
    }

}

const searchConditions = document.querySelector('.new-search__input');
searchConditions.addEventListener('change', showMatches);
searchConditions.addEventListener('keyup', showMatches);


// if(condition.misspelling) {
//     <em>${condition.misspelling}</em>
// }



// const topSearches = document.querySelector('.top-searches');
// const navAtoZ = document.querySelector('.nhsuk-nav-a-z');
// const filterAtoZ = document.querySelector('.nhsuk-a-z-filter');
// const showFiltersButton = document.querySelector('.show-hidden-filters');

// // Search the terms
// let allConditions = document.querySelector('.nhsuk-list--full');
// let allConditionsPanel = document.querySelector('.nhsuk-list-panel__list');
// let allConditionLinks = Array.from(allConditions.querySelectorAll('.nhsuk-list-panel__link'));

// let results = document.querySelector('.nhsuk-list-panel__list--results');

// const reusltsWrapper = document.querySelector('.nhsuk-list-panel__list--wrapper');
// reusltsWrapper.style.display = "none";

// function findMatches(searchTerm, healthAz) {

//     const allOtherConditions = [];
//     return healthAz.filter(condition => {
//         const regex = new RegExp(searchTerm, 'gi');
//         return condition.innerHTML.match(regex);
//     })

// }

// function showMatches() {

//     const matchArray = findMatches(this.value, allConditionLinks);
//     const checkLength = searchConditions.value;
//     matchArray.length;

//     const html = matchArray.map(condition => {
//         const regex = new RegExp(this.value, 'gi');
//         const conditionName = condition.innerHTML.replace(regex, `<span class="search_highlight">${this.value}</span>`);
//         return `
//             <li class='nhsuk-list-panel__item'>
//                 <a class="nhsuk-list-panel__link">
//                     ${conditionName}
//                 </a>
//             </li>
//         `;
//     }).join('');
    
//     if (checkLength.length >= 1) {
//         results.innerHTML = html;
//         reusltsWrapper.style.display = "block";
//         filteredTotal.innerHTML = `
//             <strong><span style="color: #000;">${matchArray.length}</span></strong> matches
//         `;     
//         results.style.display = "block";
//     } else {
//         reusltsWrapper.style.display = "none";
//         filteredTotal.innerHTML = " ";
//     }
    
//     if ((checkLength.length >= 1) && (matchArray.length === 0)) {
//         results.innerHTML = `
//         <li class='nhsuk-list-panel__item'>
//             <a class="nhsuk-list-panel__link">
//                 No matches, please try filtering or check the spelling.
//             </a>
//         </li>
//     `;
//     }


// }

// searchConditions.addEventListener('change', showMatches);
// searchConditions.addEventListener('keyup', showMatches);





// // Temp code to make a proof of concept 
// const sexualHealth = document.querySelector('.sexual-health');
// let isActive = false;
// let sexualHealthConditions = ['Balanitis', 'Chlamydia', 'Gonorrhoea', 'HIV', 'Sexually transmitted infections (STIs)', 'Thrush', 'Vaginal discharge'];

// sexualHealth.addEventListener('click', function(e) {    
//     this.classList.toggle('sexual-health--active');

//     const sexualHealthList = document.querySelector('.sexual-health-list');
//     sexualHealthList.classList.toggle('sexual-health-list--active');
//     sexualHealthList.querySelector('.nhsuk-list-panel__list--results');
   
//     const fullList = document.querySelector('.full-list');
//     fullList.classList.toggle('full-list--hidden');
   
//     results.style.display = "block";

// })
