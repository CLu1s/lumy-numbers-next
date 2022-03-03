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
import { updateCategory, updateCategoryTemp } from "./budgetSlice";
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

const BudgetCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const income = useSelector(getIncome);
  const [state, setState] = useState(categories);
  const [elementToEdit, setElementToEdit] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { status } = useSelector(getStatus);
  const toast = useToast();

  React.useEffect(() => {
    setState(categories);
  }, [categories]);

  const manageSliderChange = (
    newPercentage: number,
    id: string,
    percentage: number
  ) => {
    const category = categories.find((c) => c.id === id);
    const filterState = sanitizer(categories);
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

      <Screen
        title="Distribución del Presupuesto"
        description={
          <>
            <Text>
              El porcentage que no asignes se reflejara en una categoría
              especial llamada Resto. Esta solo indica la cantidad que te hace
              falta por asignar y no podras asignarle transacciones
            </Text>
            <Text>
              La suma del total no puede ser mayor al 100%. Los porcentages se
              actualizan con el maximo disponible
            </Text>
          </>
        }
      >
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
                  onChange={(e) => {
                    const index = categories.findIndex((c) => c.id === item.id);
                    const newState = [...categories];
                    newState[index] = { ...item, percentage: e };
                    setState(newState);
                    dispatch(updateCategoryTemp(newState[index]));
                  }}
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
