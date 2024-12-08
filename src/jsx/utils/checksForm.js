export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidCellPhone(phone) {
  const numericPhone = phone.replace(/[^\d]/g, "");

  if (numericPhone.length !== 11) {
    return false;
  }

  const firstDigit = numericPhone.substring(2, 3);
  if (firstDigit !== "9") {
    return false;
  }

  return true;
}

export function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const calcCheckDigit = (cnpj, weights) => {
    return (
      cnpj
        .slice(0, weights.length)
        .split("")
        .reduce((acc, num, i) => acc + num * weights[i], 0) % 11
    );
  };

  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstCheck = calcCheckDigit(cnpj, firstWeights);
  if (parseInt(cnpj[12]) !== (firstCheck < 2 ? 0 : 11 - firstCheck)) {
    return false;
  }

  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondCheck = calcCheckDigit(cnpj, secondWeights);
  if (parseInt(cnpj[13]) !== (secondCheck < 2 ? 0 : 11 - secondCheck)) {
    return false;
  }

  return true;
}
