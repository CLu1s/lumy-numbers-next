import React, { useState, useEffect, forwardRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { Text, Box, Button, Input, VStack, Stack } from "@chakra-ui/react";
import { Transaction } from "../../types";
import Select from "../../components/Select";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../budget/selector";
import { addNewTransaction, updateTransaction } from "./walletSlice";
import { getBucketID } from "../bucket/selector";
import parseISO from "date-fns/parseISO";
import NumberInput from "../../components/NumberInput";
registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Transaction;
};

const RecordExpense = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<any>();
  const [quantity, setQuantity] = useState<number>(null);
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.date)) : new Date()
  );
  const categories = useSelector(getCategories);
  const bucketID = useSelector(getBucketID);

  const categoriesOption = useMemo(() => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (toEdit) {
      setDate(new Date(parseISO(toEdit.date)));
      setSelected(toEdit.categoryID);
      setQuantity(toEdit.amount);
    } else {
      setDate(new Date());
    }
    reset();
  }, [reset, toEdit]);

  const handleClose = () => {
    reset();
    setQuantity(null);
    onClose();
  };
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (toEdit) {
      dispatch(
        updateTransaction({
          ...toEdit,
          ...data,
          categoryID: selected,
          date: date?.toISOString(),
        })
      );
    } else {
      dispatch(
        addNewTransaction({
          ...data,
          bucketID,
          categoryID: selected,
          date: date,
        })
      );
    }
    handleClose();
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Gasto" : "Ingresar Nuevo Gasto",
    onClose: handleClose,
    cancelButtonText: "Cancel",
    onSubmit: handleSubmit(onSubmit),
  };
  const ExampleCustomInput = forwardRef(
    ({ value, onClick }: { value?: any; onClick?: () => void }, ref: any) => (
      <Button onClick={onClick} ref={ref} width="full">
        {value}
      </Button>
    )
  );
  ExampleCustomInput.displayName = "ExampleCustomInput";
  return (
    <Modal {...config}>
      <Stack spacing={4}>
        <Text>Introduce la cantidad y la descripción del gasto.</Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <NumberInput amount={toEdit?.amount} register={register} />
              {errors.description && <span>Este Campo es Requerido</span>}
              <Input
                defaultValue={toEdit ? toEdit.description : ""}
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <Select
                label="Categoría"
                setSelected={setSelected}
                options={categoriesOption}
                defaultValue={toEdit ? toEdit.categoryID : ""}
              />

              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
                locale="es"
                customInput={<ExampleCustomInput />}
              />
            </VStack>
          </Box>
        </form>
      </Stack>
    </Modal>
  );
};

export default RecordExpense;
