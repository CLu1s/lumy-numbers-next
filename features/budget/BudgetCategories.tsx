import React, { useReducer } from "react";
import { Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getIncome } from "./selector";
import _debounce from "lodash/debounce";
import StatCard from "../../components/StatCard";
import Screen from "../../components/Screen";
import { updateCategory } from "./budgetSlice";
import { Category } from "../../types";

const sanitizer = (state: Category[]): Category[] => {
  return state.reduce((acc, cur) => {
    if (cur.id !== "rest") {
      return [...acc, cur];
    }
    return acc;
  }, []);
};

function reducer(state: Category[], action) {
  const { percentage, id } = action;
  const filterState = sanitizer(state);
  const newState = filterState.map((item) =>
    item.id === id ? { ...item, percentage } : item
  );
  const rest = newState.reduce((acc, item) => acc + item.percentage, 0);
  if (rest > 100) {
    return state;
  }
  if (rest < 100) {
    const index = newState.findIndex((item) => item.id === "rest");

    if (index !== -1) {
      newState[index].percentage = 100 - rest;
    } else {
      newState.push({
        id: "rest",
        name: "Resto",
        percentage: 100 - rest,
        color: "yellow.500",
        icon: "AiOutlineWarning",
      });
    }
  }
  return newState;
}

const BudgetCategories = () => {
  const categories = useSelector(getCategories);
  const income = useSelector(getIncome);
  const dispatch = useDispatch();
  const toast = useToast();
  const [state, setState] = useReducer(reducer, categories);

  React.useEffect(() => {
    
  }, []);

  const manageSliderChange = (
    newPercentage: number,
    id: string,
    percentage: number
  ) => {
    const category = categories.find((c) => c.id === id);
    const filterState = sanitizer(state);
    const rest = filterState.reduce((acc, item) => {
      if (item.id !== id) {
        return acc + item.percentage;
      }
      return acc;
    }, 0);

    if (newPercentage + rest <= 100) {
      dispatch(updateCategory({ ...category, percentage: newPercentage }));
      toast({
        title: "Guardado.",
        description: "Tu cambio ha sido guardado.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      dispatch(updateCategory({ ...category, percentage: 100 - rest }));
      toast({
        title: "Guardado.",
        description: "Tu cambio ha sido guardado con el maxímo permitido.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const debounceSliderChange = _debounce(
    (e: number, id: string, percentage: number) => {
      manageSliderChange(e, id, percentage);
    },
    1000
  );

  return (
    <Screen title="Distribución del Presupuesto">
      <Wrap>
        {state.map((item) => (
          <WrapItem key={item.id}>
            <StatCard
              {...item}
              number={(item.percentage / 100) * income}
              slider={item.id !== "rest"}
              progress={item.percentage}
              key={item.id}
              onChange={(e) => setState({ percentage: e, id: item.id })}
              onChangeEnd={(e) =>
                debounceSliderChange(e, item.id, item.percentage)
              }
            />
          </WrapItem>
        ))}
      </Wrap>
    </Screen>
  );
};

export default BudgetCategories;
