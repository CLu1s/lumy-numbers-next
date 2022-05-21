import { useSelector } from "react-redux";
import { getCategoryID, getStatus } from "./selector";
import Screen from "../../components/Screen";
import SaveCategoryID from "./SaveCategoryID";
import DisplayData from "./DisplayData";
import useGetFixedCosts from "../../hooks/useGetFixedCosts";
import Loading from "../../components/Loading";
import { LoadingStates } from "../../types";

const Container = () => {
  useGetFixedCosts();
  const categoryID = useSelector(getCategoryID);
  const status = useSelector(getStatus);
  if (status !== LoadingStates.SUCCEEDED) {
    return <Loading />;
  }
  return (
    <Screen
      title="Mis Gastos"
      description="Lista de los gastos recurrentes que haces mes con mes"
    >
      {categoryID ? <DisplayData /> : <SaveCategoryID />}
    </Screen>
  );
};

export default Container;
