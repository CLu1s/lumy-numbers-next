import React, { useState } from "react";
import {
  Wrap,
  WrapItem,
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
import toast, { Toaster } from "react-hot-toast";
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
      toast("Tu cambio ha sido guardado");
    } else {
      dispatch(updateCategory({ ...category, percentage: 100 - rest }));
      toast("Tu cambio ha sido guardado con el maxímo permitido.");
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
              El porcentaje que no asignes se reflejara en una categoría
              especial llamada Resto. Esta solo indica la cantidad que te hace
              falta por asignar y no podras asignarle transacciones
            </Text>
            <Text>
              La suma del total no puede ser mayor al 100%. Los porcentajes se
              actualizan con el maximo disponible
            </Text>
          </>
        }
      >
        {status !== "idle" ? (
          <Wrap spacing={{base:2, xl:4}}>
            {state.map((item: Category) => (
              <WrapItem key={item.id} width="full" maxW={{ base:"100%", md:"47%", xl:"48%"}}>
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
                  showProgress
                />
              </WrapItem>
            ))}
            <WrapItem width="full"  maxW={{ base:"100%", md:"47%", xl:"48%"}} minH="123px">
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
