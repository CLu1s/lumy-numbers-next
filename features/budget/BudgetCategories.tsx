import React, { useReducer } from "react";
import { Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getIncome } from "./selector";
import _debounce from "lodash/debounce";
import StatCard from "../../components/StatCard";
import Screen from "../../components/Screen";
import { updateCategory } from "./budgetSlice";
import { Category } from "../../types";

const BudgetCategories = () => {
  const categories = useSelector(getCategories);
  const income = useSelector(getIncome);
  const dispatch = useDispatch();
  const toast = useToast();
  const [state, setState] = useReducer(reducer, categories);
  const manageSliderChange = (e: number, id: string) => {
    const category = categories.find((c) => c.id === id);
    dispatch(updateCategory({ ...category, percentage: e }));
    toast({
      title: "Guardado.",
      description: "Tu cambio ha sido guardado.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const debounceSliderChange = _debounce((e: number, id: string) => {
    const filterState = state.reduce((acc, cur) => {
      if (cur.id !== "rest") {
        return [...acc, cur];
      }
      return acc;
    }, []);
    const rest = filterState.reduce((acc, item) => acc + item.percentage, 0);

    if (rest === 100) {
      manageSliderChange(e, id);
    } else {
      console.log("nope");
    }
  }, 1000);
  function reducer(state: Category[], action) {
    const { percentage, id } = action;
    const filterState = state.reduce((acc, cur) => {
      if (cur.id !== "rest") {
        return [...acc, cur];
      }
      return acc;
    }, []);
    const newState = filterState.map((item) => {
      if (item.id === id) {
        return { ...item, percentage };
      }
      return item;
    });
    const rest = newState.reduce((acc, item) => acc + item.percentage, 0);
    if (rest > 100) {
      return state;
    }
    if (rest < 100) {
      console.log(rest);

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
              onChangeEnd={(e) => debounceSliderChange(e, item.id)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Screen>
  );
};

export default BudgetCategories;
