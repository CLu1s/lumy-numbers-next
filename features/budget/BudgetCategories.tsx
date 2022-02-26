import React, { useReducer, useState } from "react";
import {
  Wrap,
  WrapItem,
  useToast,
  useDisclosure,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, getIncome } from "./selector";
import _debounce from "lodash/debounce";
import StatCard from "../../components/StatCard";
import Screen from "../../components/Screen";
import { updateCategory } from "./budgetSlice";
import { getStatus } from "./selector";
import { Category } from "../../types";
import Loading from "../../components/Loading";
import { VscAdd } from "react-icons/vsc";
import EditCategory from "./EditCategory";
const sanitizer = (state: Category[]): Category[] => {
  return state.reduce((acc, cur) => {
    if (cur.id !== "rest") {
      return [...acc, cur];
    }
    return acc;
  }, []);
};

function reducer(state: Category[], action) {
  if (action.type !== "update") {
    return action.payload;
  }

  const { percentage, id } = action.payload;
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
        bucketID: "rest",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toDateString(),
      });
    }
  }
  return newState;
}

const BudgetCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const income = useSelector(getIncome);
  const [state, setState] = useReducer(reducer, categories);
  const [elementToEdit, setElementToEdit] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { status } = useSelector(getStatus);
  const toast = useToast();

  React.useEffect(() => {
    if (state.length === 0) {
      setState({ type: "populate", payload: categories });
    }
  }, [categories, state.length]);

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
    <>
      <EditCategory isOpen={isOpen} onClose={onClose} toEdit={elementToEdit} />

      <Screen title="Distribución del Presupuesto">
        {status !== "idle" ? (
          <Wrap>
            {state.map((item: Category) => (
              <WrapItem key={item.id} width="full" maxW="365px">
                <StatCard
                  {...item}
                  editable
                  onEdit={() => {
                    setElementToEdit(item);
                    onOpen();
                  }}
                  number={(item.percentage / 100) * income}
                  slider={item.id !== "rest"}
                  progress={item.percentage}
                  key={item.id}
                  onChange={(e) =>
                    setState({
                      type: "update",
                      payload: { percentage: e, id: item.id },
                    })
                  }
                  onChangeEnd={(e) =>
                    debounceSliderChange(e, item.id, item.percentage)
                  }
                />
              </WrapItem>
            ))}
            <WrapItem width="full" maxW="365px" minH="123px">
              <Screen>
                <Button
                  w="full"
                  h="90px"
                  color="gray.400"
                  colorScheme="whiteAlpha"
                  onClick={() => {
                    setElementToEdit(null);
                    onOpen();
                  }}
                >
                  <Flex direction="column" align="center" justify="center">
                    <VscAdd />
                    <Text>Nuevo</Text>
                  </Flex>
                </Button>
              </Screen>
            </WrapItem>
          </Wrap>
        ) : (
          <Loading />
        )}
      </Screen>
    </>
  );
};

export default BudgetCategories;
