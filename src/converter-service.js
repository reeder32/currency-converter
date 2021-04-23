export default class ConverterService {
  static getConversionRateForCurrency(currency, amount) {
    fetch`https://v6.exchangerate-api.com/v6/42372097ffb9a66ad8e19fb8/pair/USD/${currency}/${amount}`
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}
