// import { userData } from "./authHelper";
// import { formatNumber } from "./formatNumbers";

// const userBalance = localStorage.getItem("token") && userData().wallet;
// const nairaBal = userBalance
//   ? formatNumber(parseInt(userBalance.split(".")[0]))
//   : 0;
// const koboBal = userBalance ? userBalance.split(".")[1].slice(0, 2) : "00";

// export const stashBalance = nairaBal + "." + koboBal;

export const cardChecker = (cardData: any, paymentId: any) => {
  const cardDetails: any = [];
  cardData?.data?.forEach((card: any) => {
    card.id === paymentId && cardDetails.push(card.last4, card.card_type);
  });
  return cardDetails;
};

// const indAmt = finalAmt && finalAmt.reduce((prev: number, curr: number) => prev + curr);
// export const indAmtNaira = indAmt ? formatNumber(parseInt(indAmt.toFixed(2).split(".")[0])) : 0;
// export const indAmtKobo = indAmt ? indAmt.toFixed(2).split(".")[1] : "00";

// to return a list of cards
export const cardList = (data: any) => {
  let arr: any = [];
  data?.data.forEach((card: any) => {
    arr.push({
      name: `****${card.last4}`,
      value: `${card.id}`,
    });
  });
  return arr;
};

// to return a list of payout orders
export const payoutOrderList = (data: any) => {
  let arr: any = [];
  data.forEach((payoutNo: number) => {
    arr.push({
      name: `${payoutNo}`,
      value: payoutNo,
    });
  });
  return arr;
};

// a function to get all parameters in the url
export const getParams = (url = window.location) => {
  let allPaths: string[] = [`?redirect=${url.pathname}`];
  let params = new URLSearchParams(url.search);
  params.forEach(function (value, key) {
    allPaths.push(`?${key}=${value}`);
  });
  return allPaths.join('');
};

export const getParamsNoRedirect = (url = window.location) => {
  let allPaths: string[] = [];
  let params = new URLSearchParams(url.search);
  params.forEach(function (value, key) {
    if (key === 'redirect') {
      allPaths.push(value);
    } else {
      allPaths.push(`%3F${key}=${value}`);
      // how to prevent url encoding in this app
    }
  });
  return allPaths.join('');
};

export const getAllParams = (url = window.location) => {
  let allPaths: any[] = [];
  let params = new URLSearchParams(url.search);
  params.forEach(function (value, key) {
    allPaths.push({ key: value });
  });
  return allPaths;
};

export const getQueryStringParams = (query: any) => {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        // .split("&")
        .split('?')
        .reduce((params: any, param: string) => {
          let [key, value] = param.split('=');
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, ' '))
            : '';
          return params;
        }, {})
    : {};
};

// export const HOUR_OF_DAY_OPTIONS = new Array(24).fill(null).map((_, index) => ({
//   name: `${index}:00`,
//   value: index,
// }));
export const HOUR_OF_DAY_OPTIONS = new Array(23).fill(null).map((_, index) => ({
  name: `${index + 1}:00`,
  value: index + 1,
}));

export const DAYS_OF_WEEK_OPTIONS = [
  { name: 'Sunday', value: 1 },
  { name: 'Monday', value: 2 },
  { name: 'Tuesday', value: 3 },
  { name: 'Wednesday', value: 4 },
  { name: 'Thursday', value: 5 },
  { name: 'Friday', value: 6 },
  { name: 'Saturday', value: 7 },
];

export const DAYS_OF_MONTH = new Array(28).fill(null).map((_, index) => ({
  name: `${index + 1}`,
  value: index + 1,
}));

export const formatString = (str: string) => {
  return str
    .slice()
    .split('_')
    .map(x => x.replace(/\b\w/g, c => c.toUpperCase()))
    .join(' ');
};
