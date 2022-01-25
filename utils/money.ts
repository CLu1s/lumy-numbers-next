import { FormatMoney } from "format-money-js";

const fm = new FormatMoney({
  decimals: 2,
});
const money = ( amount:number ) =>
  fm.from(amount, {
    symbol: "$",
  });

export default money;
