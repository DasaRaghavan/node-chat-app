const axios = require('axios');
const now = require('performance-now');

// const getExchangeRate = (from, to) => {
//   return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response)=> {
//     return response.data.rates[to];
//   }).catch((e) => {
//     return e;
//   });
// };

// with async-await and error handling
const getExchangeRate = async (from, to) => {

  try {

    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }

  }

  catch (e) {
    throw new Error(`Unable to convert currency from ${from} to ${to}`);
  }
};



// const getCountriesAccepted = (currCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currCode}`).then((response)=> {
//     return response.data.map((arrayItem) => arrayItem.name).join();
//   }).catch((e)=>{
//     return e;
//   });
// };

// with async-await and error handling
const getCountriesAccepted = async (currCode) => {

  try {

    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currCode}`);
    return response.data.map((arrayItem) => arrayItem.name).join();

  } catch (e) {

    throw new Error(`Unable to fetch countries list for currency code ${currCode}`);
  }

};

const getExchangeRateCountriesAccepted = async (from, to) => {
  // var t0 = now();
  // // const rate = await getExchangeRate(from, to);
  // // const countriesList = await getCountriesAccepted(to);
  // const [ rate, countriesList ]  = await Promise.all([ getExchangeRate(from, to), getCountriesAccepted(to) ]);
  // var t1 = now();
  // var respTime = t1 - t0;
  // return `1 ${from} converts to ${rate} ${to}. ${to} is accepted in ${countriesList}. Response Time: ${respTime} micorseconds `;

  try {
    var t0 = now();
    // const rate = await getExchangeRate(from, to);
    // const countriesList = await getCountriesAccepted(to);
    const [ rate, countriesList ]  = await Promise.all([ getExchangeRate(from, to), getCountriesAccepted(to) ]);
    var t1 = now();
    var respTime = t1 - t0;
    return `1 ${from} converts to ${rate} ${to}. ${to} is accepted in ${countriesList}. Response Time: ${respTime} micorseconds `;

  } catch(e) {
      throw new Error(`Unable to get rate and countries list for ${from} and ${to}`)
  }

};
//
// getExchangeRate('USD','CAD').then((rate) => {
//   console.log(rate);
// }).catch((e)=>{
//   console.log(e);
// });
//
// getCountriesAccepted('USD').then((resp) => {
//   console.log(resp);
// }).catch((e)=> {
//   console.log(e);
// })

var overheadt0 = now();
var overheadt1 = now();
overhead = overheadt1 - overheadt0
console.log(`overhead is ${overhead}`);

getExchangeRateCountriesAccepted('USD', 'CAD').then((resp)=>{
  console.log(resp);
}).catch((e)=> {
  console.log(e);
});
