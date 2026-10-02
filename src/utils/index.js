export const getPrefix = (userType, gender) => {
  if (userType)
    if (gender == "1") return "Mr. ";
    else return "Miss. ";

  return "";
};

export const numberToString =(number) =>{
  if (number >= 10000000) {
    const crores = (number / 10000000).toFixed(1) + ' Cr';
    return crores;
  } else if (number >= 100000) {
    const lakhs = (number / 100000).toFixed(1) + ' L';
    return lakhs;
  } else if (number >= 1000) {
    const thousands = (number / 1000).toFixed(1) + ' K';
    return thousands;
  } else {
    return number?.toString();
  }
}

