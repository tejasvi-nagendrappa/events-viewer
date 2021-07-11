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

export { formatDateTime };
