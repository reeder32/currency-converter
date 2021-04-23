import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConverterService from "./converter-service.js";

$("#currency-selecter").ready(() => {
  let cs = new ConverterService();
  cs.currencyList.forEach((symbol) => {
    $("#currency-selecter").append(
      `<option value="${symbol}">${symbol}</option>`
    );
  });
});
$("#convert").on("click", (event) => {
  event.preventDefault();
  const amount = parseFloat($("#dollars").val());
  var currency = $("#currency-selecter option:selected").text();
  ConverterService.getConversionRateForCurrencyWithAmount(
    currency,
    amount
  ).then(function (response) {
    showConversion(response, amount);
  });
});

const showConversion = (response, amount) => {
  console.log(response.result);
  if (response.result === "success") {
    $("#amount").text(amount);
    $("#conversion-rate").text(response.conversion_rate);
    $("#value").text(response.conversion_result);
  } else {
    $(".show-errors").text(`"There was an error: ${response["error-type"]}"`);
  }
};
