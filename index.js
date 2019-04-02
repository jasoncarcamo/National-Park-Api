'use strict';

const apiKey = '9uf2xNuOOkDpDb7do1fA7VQNQBeghhbwt3BcfrOu';
const url = 'https://developer.nps.gov/api/v1/parks?';


function formatQueryParams(param){
    const queryItems = Object.keys(param)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`)
    return queryItems.join('&');
}


function getNews(input){
     input = $('#userinput').val();
     let inputArray = input.trim().split(' ').join('');
     console.log(inputArray);
     
     if(inputArray.indexOf(' ') !== -1){
        inputArray.replace(/ /g, "");
     }
    
    const param = {
        
        api_key: apiKey
    }

    const queryString = formatQueryParams(param);
    let newUrl = `${url}stateCode=${inputArray}&${queryString}`;
    
    console.log(newUrl);
    fetch(newUrl)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson, input))
    .catch((error)=> alert(error));
}

function displayResults(responseJson, input){
    $('#container').empty();

        const maxResults = 10;
    for( let i = 0; i < maxResults; i++){
        console.log(responseJson.data[i].name);
        $('#container').append(`<li>
            <a href="${responseJson.data[i].url}"><h2>${responseJson.data[i].name}</h2></a>
            <h3>A.K.A: ${responseJson.data[i].designation}</h3>
            <h3>location: ${input.toUpperCase()}</h3>
            <h4>${responseJson.data[i].latLong}</h4>
            <p>${responseJson.data[i].description}</p>
            <h3> Direction Info</h3>
            <p>${responseJson.data[i].directionsInfo}</p>

        </li>`
        )
    }
}


$('form').submit(function(e){
    e.preventDefault();
    getNews();
})