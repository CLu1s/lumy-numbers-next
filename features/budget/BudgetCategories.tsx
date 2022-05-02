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
import { getStatus, getRest } from "./selector";
import { Category } from "../../types";
import Loading from "../../components/Loading";
import { VscAdd } from "react-icons/vsc";
import toast from "react-hot-toast";
import EditCategory from "./EditCategory";
import AdjustCategory from "./AdjustCategory";

const BudgetCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const rest = useSelector(getRest);
  const income = useSelector(getIncome);
  const [state, setState] = useState(categories);
  const [elementToEdit, setElementToEdit] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: adjustIsOpen,
    onOpen: adjustOnOpen,
    onClose: adjustOnClose,
  } = useDisclosure();

  const { status } = useSelector(getStatus);
  React.useEffect(() => {
    setState(categories);
  }, [categories]);

  const manageSliderChange = (newPercentage: number, id: string) => {
    const category = categories.find((c) => c.id === id);
    const restLocal = rest - category.percentage;

    if (newPercentage + restLocal <= 1) {
      dispatch(updateCategory({ ...category, percentage: newPercentage }));
    } else {
      dispatch(updateCategory({ ...category, percentage: 1 - restLocal }));
      toast("Tu cambio ha sido guardado con el maxímo permitido.");
    }
  };
  const debounceSliderChange = _debounce((e: number, id: string) => {
    manageSliderChange(e, id);
  }, 1000);

  return (
    <>
      <EditCategory isOpen={isOpen} onClose={onClose} toEdit={elementToEdit} />
      <AdjustCategory
        isOpen={adjustIsOpen}
        onClose={adjustOnClose}
        toEdit={elementToEdit}
        updateElement={debounceSliderChange}
      />
      <Screen
        title="Catetegorías"
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
          <Wrap spacing={{ base: 2, xl: 4 }}>
            {state.map((item: Category) => (
              <WrapItem
                key={item.id}
                width="full"
                maxW={{ base: "100%", md: "47%", xl: "48%" }}
              >
                <StatCard
                  {...item}
                  editable={item.id !== "rest"}
                  onEdit={() => {
                    setElementToEdit(item);
                    onOpen();
                  }}
                  number={item.percentage * income}
                  onAdjust={() => {
                    setElementToEdit(item);
                    adjustOnOpen();
                  }}
                  slider={item.id !== "rest"}
                  progress={Math.round(item.percentage * 100)}
                  key={item.id}
                  onChange={(e) => {
                    const index = categories.findIndex((c) => c.id === item.id);
                    const newState = [...categories];
                    newState[index] = { ...item, percentage: e / 100 };
                    setState(newState);
                    dispatch(updateCategoryTemp(newState[index]));
                  }}
                  onChangeEnd={(e) => {
                    debounceSliderChange(e / 100, item.id);
                  }}
                  showProgress
                />
              </WrapItem>
            ))}
            <WrapItem
              width="full"
              maxW={{ base: "100%", md: "47%", xl: "48%" }}
              minH="123px"
            >
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
