function newSearch() {
  const searchConditions = document.querySelector(".ia-nhsuk-search__input");

  if (!searchConditions) {
    return;
  }

  const searchClose = document.querySelector(".nhsuk-close");

  // const healthAz = [];
  // const searchWrapper = document.querySelector(".nhsuk-header__search");
  const reusltsWrapper = document.querySelector(".ia-search-results-wrapper");
  // let results = document.querySelector(".new-search-results");
  reusltsWrapper.style.display = "none";

  // const query = "poo";
  const endpoint = `https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete`


  // function fetchSuggestions(query) {
  //   const res = fetch(`${endpoint}?q=${query}&api-version=1`);
  //   const data = res.json();
  //   console.log(data);
  // }

  
  function fetchSuggestions(query) {
    fetch(`${endpoint}?q=${query}&api-version=1`)
    .then(blob => blob.json())
    .then(data => console.log(data));
  }
  
  fetchSuggestions("health");

function findMatches(searchTerm) {
  console.log(searchTerm);
}



function showMatches() {
  const matchArray = fetchSuggestions(this.value);
}



  // fetch("/javascript/conditions.json")
  //   .then((response) => response.json())
  //   .then((data) => healthAz.push(...data));

  // function findMatches(searchTerm, healthAz) {
  //   return healthAz.filter((condition) => {
  //     const regex = new RegExp(searchTerm, "gi");
  //     return (
  //       condition.title.match(regex) ||
  //       condition.synonyms.match(regex) ||
  //       condition.misspelling.match(regex) ||
  //       condition.tag.match(regex)
  //     );
  //   });
  // }

  // function showMatches() {
  //   const matchArray = findMatches(this.value, healthAz);
  //   const checkLength = searchConditions.value;
  //   const html = matchArray
  //     .map((condition) => {
  //       const regex = new RegExp(this.value, "gi");
  //       const conditionTitle = condition.title.replace(
  //         regex,
  //         `<span class="search_highlight">${this.value}</span>`
  //       );

  //       return `
  //         ${(() => {
  //           if (regex.test(condition.synonyms)) {
  //             return `
  //               <li class='nhsuk-list-panel__item'>
  //                   <a class="nhsuk-list-panel__link" href="${condition.link}">
  //                     ${conditionTitle}
  //                     - <span class="search_highlight">${this.value}</span>
  //                   </a>
  //               </li>
  //             `;
  //           } else {
  //             // console.log(condition.synonyms);
  //             // let toArray = condition.synonyms.split(", ");
  //             // const match = toArray.find(value => regex.test(value));
  //             // console.log(match);

  //             return `
  //               <li class='nhsuk-list-panel__item'>
  //                 <a class="nhsuk-list-panel__link" href="${condition.link}">
  //                     ${conditionTitle}
  //                   </a>
  //               </li>
  //             `;
  //           }
  //         })()}
  //     `;
  //     })
  //     .join("");

  //   if (checkLength.length >= 2) {
  //     results.innerHTML = html;
  //     reusltsWrapper.style.display = "block";
  //     results.style.display = "block";
  //   } else {
  //     reusltsWrapper.style.display = "none";
  //   }

  //   if (checkLength.length >= 1 && matchArray.length === 0) {
  //     results.innerHTML = `
  //         <li class='nhsuk-list-panel__item'>
  //             <a class="nhsuk-list-panel__link">
  //                 No matches. Please check the spelling or try the A-Z.
  //             </a>
  //         </li>
  //     `;
  //   }
  // }

    function openModal() {
      reusltsWrapper.style.display = "block";
    }

    function closeModal(e) {
      e.preventDefault();
      reusltsWrapper.style.display = "none";
    }

  // searchConditions.addEventListener("change", showMatches);
  searchConditions.addEventListener("keyup", showMatches);
  searchClose.addEventListener("click", closeModal);
  // searchConditions.addEventListener("focus", openModal);

  

}

newSearch();
