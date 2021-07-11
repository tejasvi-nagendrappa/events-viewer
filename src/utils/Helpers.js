import { ERROR_CODES_TEXT } from "./AppConstants";

const padDigit = num => (num < 10 ? `0${num}` : num);

const formatDateTime = isoDate => {
  const currentDate = new Date(isoDate);

  const year = currentDate.getFullYear();
  const month = padDigit(currentDate.getMonth() + 1);
  const day = padDigit(currentDate.getDate());

  const hours = currentDate.getHours();
  const minutes = padDigit(currentDate.getMinutes());

  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = padDigit(hours > 12 ? hours - 12 : hours);

  return `${day}/${month}/${year} , ${formattedHour}:${minutes} ${amPm}`;
};

const getFormattedErrorMessage = (statusCode) => {
  const statusCodeReasons = ERROR_CODES_TEXT[statusCode] || [];
  const genericErrorMsg = statusCodeReasons.length === 0
    ? 'Error occured while connecting to server.'
    : 'Error occured. This might be because of ';
  const reason = statusCodeReasons.join(" ");
  return `${genericErrorMsg} ${reason}`;
};

export {
  formatDateTime,
  getFormattedErrorMessage
};
