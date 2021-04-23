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
  console.log(currency);
  if (!Number.isNaN(amount) && currency !== "Country Currency Code") {
    ConverterService.getConversionRateForCurrencyWithAmount(
      currency,
      amount
    ).then(function (response) {
      showConversion(response, amount, currency);
    });
  } else {
    showConversion(null, amount, currency);
  }
});
$("#reset").on("click", () => {
  location.reload();
});

$("#form").on("change", () => {
  resetForm();
});
$("#dollars").on("input", () => {
  resetForm();
});

const resetForm = () => {
  $("#result").fadeOut();
  $("#reset").fadeOut();
  $("#convert").fadeIn();
};

const updateForm = () => {
  $("#result").fadeIn();
  $("#reset").fadeIn();
  $("#convert").fadeOut();
};

const showElements = (error) => {
  updateForm();
  if (error) {
    $("h3").hide();
    $("h4").hide();
    $(".show-errors").fadeIn();
  } else {
    $("h2").hide();
    $("h3").fadeIn();
    $("h4").fadeIn();
  }
};

const showConversion = (response, amount, currency) => {
  if (!response) {
    $(".show-errors").text("Input entered in wrong format");
    showElements(true);
  } else if (response.result === "success") {
    $("#amount").text(amount);
    $("#conversion-rate").text(response.conversion_rate);
    $("#value").text(`${response.conversion_result} in ${currency}`);
    showElements(false);
  } else {
    $(".show-errors").text(`There was an error: ${response["error-type"]}`);
    showElements(true);
  }
};
