import HeroStatCard from "../../components/HeroStatCard";
import { date } from "../../utils";
import { useSelector } from "react-redux";
import { getIncome } from "./selector";

const IncomeCard = () => {
  const income = useSelector(getIncome);

  return (
    <HeroStatCard
      title=" Ingresos del Mes"
      statLabel={date(new Date(), "LLLL-YYY")}
      amount={income}
    />
  );
};

export default IncomeCard;
