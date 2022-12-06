export function roundUp(numToRound, multiple) {
    return Math.ceil(numToRound / multiple) * multiple;
}
  
export function roundDown(numToRound, multiple) {
    return Math.floor(numToRound / multiple) * multiple;
}

export function convertBRLToNumber(value) {
    let converted = parseFloat(value?.replace('.','').replace(',','.').replace("R$", "")).toFixed(2);
    return converted;
}