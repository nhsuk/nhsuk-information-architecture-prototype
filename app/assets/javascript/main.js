function newSearch() {
  const searchConditions = document.querySelector(".ia-nhsuk-search__input");
  const searchConditionsInput = document.querySelector(".ia-search-results__input");

  if (!searchConditions) {
    return;
  }

  const searchClose = document.querySelector(".nhsuk-close");
  const reusltsWrapper = document.querySelector(".ia-search-results-wrapper");
  const endpoint = `https://nhsuk-apim-stag-uks.azure-api.net/site-search/Autocomplete`
  const resultsWrapper = document.querySelector('.ia-results ul');
  const suggestionsWrapper = document.querySelector('.ia-suggestions');
  reusltsWrapper.style.display = "none";
  let isModalOpen = false;

  async function fetchSuggestions(query) {
    const res = await fetch(`${endpoint}?q=${query}&api-version=1`);
    const data = await res.json();
    return data;
  }

  function displayResults(matchResults) {
    suggestionsWrapper.style.display = 'none';
    const html = matchResults.map(result => {
        return `<li>
          <a class="app-search-results-item" href="">
            ${result.query}
          </a> 
        </li>`
    }).join('');
    console.log(html.length);
    if(html.length === 0) {
      resultsWrapper.innerHTML = `
        <h2>No pulse! 🩺</h2>
        <p>
          Sorry, nothing matches your query – try again or look on <a href="">health a-z</a>
        </p>
      `
    } else {
      resultsWrapper.innerHTML = html;
    }
  }

  async function showMatches() {
    searchConditionsInput.focus();
    const matchArray = await fetchSuggestions(this.value);
    displayResults(matchArray);
    
    if(searchConditionsInput.value.length === 0){
      suggestionsWrapper.style.display = 'block';
      resultsWrapper.style.display = 'none';
    } else {
      suggestionsWrapper.style.display = 'none';
      resultsWrapper.style.display = 'block';
    }
  }

  function openModal() {
    reusltsWrapper.style.display = "block";
    searchConditionsInput.focus();
    isModalOpen = true;
  }

  function closeModal(e) {
    e.preventDefault();
    isModalOpen = false;
    reusltsWrapper.style.display = "none";
    suggestionsWrapper.style.display = 'block';
    resultsWrapper.style.display = 'none';

  }

  searchConditionsInput.addEventListener("keyup", showMatches);
  searchClose.addEventListener("click", closeModal);
  searchConditions.addEventListener("focus", openModal);

  document.addEventListener("keydown", e => {
    console.log(e.key);
    if (e.key === "Escape") {
      closeModal(e);
    }
  });


}

newSearch();
