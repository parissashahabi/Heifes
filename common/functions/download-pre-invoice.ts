import { baseUrl } from "@/services/interceptor";
import { CreateOrderCustomerRequestDto } from "@/services/global";
import * as html2pdf from "html2pdf.js";

const DownloadPdf = ({
  path,
  customerData,
}: {
  path?: string;
  customerData?: CreateOrderCustomerRequestDto;
}) => {
  console.log(path);
  const url = new URL(baseUrl);
  let requestOptions;

  if (path) {
    url.pathname = path;
  } else {
    url.pathname = "orders/quote";
  }
  if (path === "orders/quote") {
    requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      body: JSON.stringify({
        buyerDetail_Name: customerData?.buyerDetail_Name,
        buyerDetail_NationalId: customerData?.buyerDetail_NationalId,
        buyerDetail_Address: customerData?.buyerDetail_Address,
        buyerDetail_PhoneNumber: customerData?.buyerDetail_PhoneNumber,
      }),
    };
  } else {
    requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
    };
  }
  fetch(url.href, requestOptions)
    .then((response) => response.text())
    .then((html) => {
      const element = document.createElement("html");
      element.style.margin = "0";
      element.style.padding = "0";
      element.lang = "fa";
      element.innerHTML = html || "";

      const opt = {
        filename: "test.pdf",
        jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
        html2canvas: { scale: 2 },
        pagebreak: { before: ".break" },
      };

      const texts = element.querySelectorAll("p, h1, h4, td, #text p");
      texts.forEach((text) => {
        text.innerHTML = (text as HTMLParagraphElement).innerText.replace(
          /\s/g,
          "\u00a0",
        );
      });

      html2pdf().from(element).set(opt).save();
    });
};
export default DownloadPdf;
