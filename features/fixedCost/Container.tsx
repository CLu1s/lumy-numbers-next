import { useSelector } from "react-redux";
import { getCategoryID } from "./selector";
import Screen from "../../components/Screen";
import SaveCategoryID from "./SaveCategoryID";
import DisplayData from "./DisplayData";

const Container = () => {
  const categoryID = useSelector(getCategoryID);
  return (
    <Screen
      title="Tabla"
      description="Lista de los gastos recurrentes que haces mes con mes"
    >
      {categoryID ? <DisplayData /> : <SaveCategoryID />}
    </Screen>
  );
};

export default Container;
