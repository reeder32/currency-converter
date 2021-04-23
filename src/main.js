import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ConverterService from "./converter-service.js";

$("#convert").on("click", (event) => {
  event.preventDefault();
  ConverterService.getConversionRateForCurrencyWithAmount("EUR", 10.52).then(
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
