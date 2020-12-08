
function newSearch(){

  // fetch()
  //   .then(response => response.json())
  //   .then(data => healthAz.push(...data));
  //   console.log("dkhjskh" + healthAz);


  // fetch('https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1')
  // .then(function(response) {
  //     console.log(response.text());
  // })
  // console.log("kdj")

  const myRequest = "https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1";

//   fetch(myRequest)
//   .then(response => console.log(response.headers.get('content-type')))
//   .then(handleResponse)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// function handleResponse (response) {
//   let contentType = response.headers.get('content-type');
//   if (contentType.includes('application/json')) {
//     console.log("kasj")

//     // return handleJSONResponse(response)
//   } else if (contentType.includes('text/html')) {
//     return handleTextResponse(response)
//   } else {
//     // Other response types as necessary. I haven't found a need for them yet though.
//     throw new Error(`Sorry, content-type ${contentType} not supported`)
//   }
// }

// function handleJSONResponse (response) {
//   return response.json()
//     .then(json => {
//       if (response.ok) {
//         return json
//       } else {
//         return Promise.reject(Object.assign({}, json, {
//           status: response.status,
//           statusText: response.statusText
//         }))
//       }
//     })
// }
// function handleTextResponse (response) {
//   return response.text()
//     .then(text => {
//       if (response.ok) {
//         return text
//       } else {
//         return Promise.reject({
//           status: response.status,
//           statusText: response.statusText,
//           err: text
//         })
//       }
//     })
// }



// const test = 'https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1'
// async function fetchSuggestions(query) {
//   const res = await fetch(test);
//   const data = await res.json();
//   console.log(data);
// }

// fetchSuggestions();

  // fetch(myRequest)
  // .then(response => console.log(response.headers))
  // .then(data => {
  //   console.log(data)
  // });

  // fetch(myRequest)

  // .then(response => console.log(response))
  // .then(data => console.log('data is', data))
  // .catch(error => console.log('error is', error));


  // fetch(myRequest)
  // .then(response => {
  //    const contentType = response.headers.get('content-type');
  //    if (!contentType || !contentType.includes('application/json')) {
  //      throw new TypeError("Oops, we haven't got JSON!");
  //    }
  //    return response.json();
  // })
  // .then(data => {
  //     /* process your data further */
  // })
  // .catch(error => console.error(error));



    fetch("https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1")
    .then(function(response) {
      console.log(response.type);
      console.log(response.url);
      console.log(response.useFinalURL);
      console.log(response.status);
      console.log(response.ok);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.json());
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      // return response.blob();
    })

    let url = 'https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1';
    // // obj = await (await fetch(url)).json();
    // console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    });



    // fetch(url)
    // .then(res => res.json())
    // .then((out) => {
    //   console.log('Checkout this JSON! ', out);
    // })
    // .catch(err => { throw err });


// fetch('https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete?q=poo&api-version=1')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     console.log(response.blob());
//     return response.blob();
//   })
//   .catch(error => {
//     console.error('There has been a problem with your fetch operation:', error);
//   });


  const searchConditions = document.querySelector('.new-search__input');

  if(!searchConditions) {
    return;
  }

  const healthAz = [];
  const searchWrapper = document.querySelector('.nhsuk-header__search');
  const reusltsWrapper = document.querySelector('.new-search-results-wrapper');
  let results = document.querySelector('.new-search-results');
  reusltsWrapper.style.display = "none";



  fetch("/javascript/conditions.json")
    .then(response => response.json())
    .then(data => healthAz.push(...data));





  function findMatches(searchTerm, healthAz) {
    return healthAz.filter(condition => {
      const regex = new RegExp(searchTerm, 'gi');
      return condition.title.match(regex) || condition.synonyms.match(regex) || condition.misspelling.match(regex) || condition.tag.match(regex);
    })
  }

  function showMatches() {
    const matchArray = findMatches(this.value, healthAz);
    const checkLength = searchConditions.value;
    const html = matchArray.map(condition => {
    const regex = new RegExp(this.value, 'gi');
    const conditionTitle = condition.title.replace(regex, `<span class="search_highlight">${this.value}</span>`);

      return `
          ${(() => {
          if (regex.test(condition.synonyms)) {
            return `
                <li class='nhsuk-list-panel__item'>
                    <a class="nhsuk-list-panel__link" href="${condition.link}">
                      ${conditionTitle}
                      - <span class="search_highlight">${this.value}</span>
                    </a>
                </li>
              `
          } else {

            // console.log(condition.synonyms);
            // let toArray = condition.synonyms.split(", ");
            // const match = toArray.find(value => regex.test(value));
            // console.log(match);

            return `
                <li class='nhsuk-list-panel__item'>
                  <a class="nhsuk-list-panel__link" href="${condition.link}">
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
      results.innerHTML = `
          <li class='nhsuk-list-panel__item'>
              <a class="nhsuk-list-panel__link">
                  No matches. Please check the spelling or try the A-Z.
              </a>
          </li>
      `;
    }

  }

  searchConditions.addEventListener('change', showMatches);
  searchConditions.addEventListener('keyup', showMatches);
  searchConditions.addEventListener('search', function () {
    reusltsWrapper.style.display = "none";
  });

}

newSearch();
