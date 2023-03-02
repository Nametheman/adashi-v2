// function getRandomHexColour() {
//   let letters = "0123456789ABCDEF";
//   let colour = "#";
//   for (let i = 0; i < 6; i++) {
//     colour += letters[Math.floor(Math.random() * 16)];
//   }
//   return colour;
// }

import { userData } from "./authHelper";

// to get shades of a particular colour i.e. green
function getRandomGreenColour() {
  let max = 255;
  let min = 100;
  let green = Math.floor(Math.random() * (max - min + 1)) + min;
  return "rgb(0, " + green + ",0 )";
}

function getRandomBrownColour() {
  let maxR = 250;
  let minR = 230;
  let maxG = 228;
  let minG = 161;
  let maxB = 141;
  let minB = 15;
  let red = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
  let green = Math.floor(Math.random() * (maxG - minG + 1)) + minG;
  let blue = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
  return "rgb(" + red + "," + green + "," + blue + ")";

  // rgb(235, 161, 15)
  // rgb(244, 202, 141)
  // rgb(250, 228, 136)
}

export const indChartData = (allSavings: any) => {
  let finalAmt: number[] = [];
  let planNames: string[] = [];
  let planColour: string[] = [];

  for (let saving of allSavings) {
    // for each saving history, I want to add the amount
    // let amt: number[] = [0];
    // if (saving.saving_cycle_histories.length > 0) {
    //   saving?.saving_cycle_histories.forEach((element: any) => {
    //     amt.push(parseFloat(element?.amount));
    //   });

    //   const reducer = (prev: number, curr: number) => prev + curr;
    //   const totalAmt = amt.reduce(reducer);

    if (saving?.balance) {
      finalAmt.push(parseFloat(saving.balance));
      // this settles the final amount for each plan, saves it into an array that I'll loop through to pass into the data
    } else {
      finalAmt.push(0);
    }

    planNames.push(saving.name);
  }

  planNames.forEach((element: string) => {
    let planCol = getRandomGreenColour();
    planColour.push(planCol);
  });

  return { finalAmt, planNames, planColour };
};

export const tarGrpChartData = (allSavings: any) => {
  let finalAmt: number[] = [];
  let planNames: string[] = [];
  let planColour: string[] = [];

  for (let saving of allSavings) {
    for (let participant of saving.target_group_saving
      .target_group_saving_participants) {
      if (participant?.balance && participant?.user_id === userData().id) {
        finalAmt.push(parseFloat(participant.balance));
        // this settles the final amount for each plan, saves it into an array that I'll loop through to pass into the data
      } else {
        finalAmt.push(0);
      }
    }

    planNames.push(saving.target_group_saving.name);
  }

  planNames.forEach((element: string) => {
    let planCol = getRandomBrownColour();
    planColour.push(planCol);
  });

  return { finalAmt, planNames, planColour };
};

export const grpChartData = (grpData: any) => {
  let memberNo = grpData.group_saving_participants.length;
  let collected = 0;
  let pending = 0;

  for (let participant of grpData.group_saving_participants) {
    participant?.payout === 1 ? collected++ : pending++;
  }
  // console.log(memberNo, collected, pending);

  return { memberNo, collected, pending };
};
