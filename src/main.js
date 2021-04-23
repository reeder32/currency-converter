import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConverterService from "./converter-service.js";

$("#currencySelecter").ready(() => {
  let cs = new ConverterService();
  cs.currencyList.forEach((symbol) => {
    $("#currencySelecter").append(
      `<option value="${symbol}">${symbol}</option>`
    );
  });
});
$("#convert").on("click", (event) => {
  event.preventDefault();
  const amount = parseFloat($("#dollars").val());
  var currency = $("#currencySelecter option:selected").text();
  ConverterService.getConversionRateForCurrencyWithAmount(
    currency,
    amount
  ).then(function (response) {
    showConversion(response, amount);
  });
});

const showConversion = (response, amount) => {
  if (response) {
    $("#amount").text(amount);
    $("#conversion-rate").text(response.conversion_rate);
    $("#value").text(response.conversion_result);
  } else {
    console.log("There was an error: ", response.message);
  }
};
