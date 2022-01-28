import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import formatISO from "date-fns/formatISO";
import Modal from "../../components/Modal";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { SingleTransaction } from "../../types";
import Select from "../../components/Select";
import esLocale from "date-fns/locale/es";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../budget/selector";
import { addTransaction } from "./walletSlice";

registerLocale("es", esLocale);

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: SingleTransaction;
};

const RecordExpense = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [selected, setSelected] = useState<any>();
  const [date, setDate] = useState<Date | null>(new Date());
  const categories = useSelector(getCategories);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    dispatch(
      addTransaction({
        ...data,
        categoryID: selected,
      })
    );
    toast({
      title: "Gasto Registrado.",
      description: "Se ha registrado tu gasto :D",
      status: "success",
      isClosable: true,
    });
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
      <VStack spacing={4}>
        <p className="text-sm text-gray-500">
          Ingresa el monto y la descripción del gasto
        </p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <Input
                placeholder="Cantidad"
                {...register("amount", { required: true })}
              />
              {errors.description && <span>Este Campo es Requerido</span>}
              {/* include validation with required or other standard HTML validation rules */}
              <Input
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              {/* errors will return when field validation fails  */}

              {/* errors will return when field validation fails  */}

              <Select
                label="Categoría"
                selected={selected}
                setSelected={setSelected}
                options={categories}
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
      </VStack>
    </Modal>
  );
};

export default RecordExpense;
