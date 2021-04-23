import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConverterService from "./converter-service.js";

$("#convert").on("click", (event) => {
  event.preventDefault();
  const amount = parseFloat($("#dollars").val());
  //const currency = $("").val();

  ConverterService.getConversionRateForCurrencyWithAmount("EUR", amount).then(
    function (response) {
      showConversion(response);
    }
  );
});

const showConversion = (response) => {
  if (response) {
    console.log(response);
  } else {
    console.log("There was an error: ", response.message);
  }
};
