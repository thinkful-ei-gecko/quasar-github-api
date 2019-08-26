'use strict';

const store = {
  searchURL: 'https://api.github.com/users/',
  searchTerm: '',
  maxResults: 10
};



const displayResults = function(results) {
  $('.search-results').empty();
  for (let i = 0; i < results.length; i++)
  {
    console.log(`${results[i].name}`);
    $('.search-results').append(
      `<li>
        <h2>${results[i].name}</h2>
        <h3>${results[i].html_url}</h3>
      </li>`
    );
  }
};

const getUser = function() {
  const url = `${store.searchURL}${store.searchTerm}/repos`;
  console.log(`url: ${url}`);
  fetch (url)
    .then(response => {
      if (response.ok) {
        console.log(`response: ${response}`);
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(Json => {
      displayResults(Json);
      console.log(`results received: ${Json}`);
    })
    .catch(e => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

};

const handleFormSubmission = function() {
  $('#js-form-target').on('submit', e => {
    e.preventDefault();
    store.searchTerm = $('#search-entry').val();
    $('#search-entry').val('');
    console.log(store.searchTerm);
    console.log('form submitted');
    getUser();
  });
};

function main() {
  handleFormSubmission();
}

$(main);