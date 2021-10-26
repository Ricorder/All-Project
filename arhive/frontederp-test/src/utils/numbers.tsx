export function formatNumber(num: any, dec?: boolean): string{
  console.log("value: " +num, "type: "+typeof(num));
  if(typeof(num) === "number"){
    return parseInt(num.toFixed()).toLocaleString("ru-Ru");
  }
  num = parseInt(num).toFixed();
  return parseInt(num).toLocaleString("ru-Ru")
}

