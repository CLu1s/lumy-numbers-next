import React, { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import {
  Box,
  Stack,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addMovement, updateMovement } from "./projectsSlice";
import { addNewTransaction } from "../wallet/walletSlice";
import parseISO from "date-fns/parseISO";
import { Movement } from "../../types";
import { date as dateFormat } from "../../utils/";
import { getBucketID } from "../bucket/selector";
import { getCategoryID } from "./selector";
type Props = {
  isOpen: boolean;
  projectID: string;
  onClose: () => void;
  toEdit?: Movement;
  monthlyPayment?: number;
  projectName?: string;
};

const NewMovement = ({
  isOpen,
  onClose,
  toEdit,
  projectID,
  monthlyPayment,
  projectName,
}: Props) => {
  const dispatch = useDispatch();
  const [type, setType] = useState<string>("ingress");
  const [date, setDate] = useState<Date | null>(
    toEdit ? new Date(parseISO(toEdit.date)) : new Date()
  );
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (toEdit) {
      setType(toEdit.type);
      setDate(new Date(parseISO(toEdit.date)));
    } else {
      setDate(new Date());
    }
    reset();
  }, [reset, toEdit, monthlyPayment]);

  useEffect(() => {
    reset();
  }, [reset, type]);

  const handleClose = () => {
    setType("ingress");
    reset();
    onClose();
  };

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (!toEdit) {
      dispatch(
        addMovement({
          ...data,
          amount: Number(data.amount),
          projectID,
          type,
        })
      );
      const { ...trans } = data;
      if (type === "ingress") {
        dispatch(
          addNewTransaction({
            ...trans,
            description: `${projectName}: ${trans.description}`,
            bucketID,
            categoryID,
            amount: Number(data.amount),
            date: new Date().toISOString(),
          })
        );
      }
    } else {
      dispatch(
        updateMovement({
          ...toEdit,
          ...data,
          amount: Number(data.amount),
          date: date?.toISOString(),
          type,
        })
      );
    }
    handleClose();
  };
  const config = {
    isOpen,
    title: toEdit ? "Actualizar Movimiento" : "Nuevo Movimiento",
    onClose: handleClose,
    cancelButtonText: "Cancel",
    onSubmit: handleSubmit(onSubmit),
  };

  return (
    <Modal {...config}>
      <VStack spacing={4} alignItems="flex-start">
        <Text>Selecciona el tipo de movimiento</Text>
        <RadioGroup onChange={setType} value={type}>
          <Stack direction="row">
            <Radio value="ingress">Ahorro</Radio>
            <Radio value="egress">Gasto</Radio>
          </Stack>
        </RadioGroup>
        {toEdit ? (
          <Text>
            Si modificas el monto de ingreso recuerdo actualizarlo tambien en la
            tabla de transacciones
          </Text>
        ) : (
          <Text>Ingresa el monto y la descripción del moviemiento</Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Box width="100%">
            <VStack spacing={4} w="full">
              <Input
                defaultValue={
                  toEdit?.description ||
                  `Mensualidad de ${dateFormat(new Date(), "MMMM")}`
                }
                placeholder="Descripción"
                {...register("description", { required: true })}
              />
              {errors.amount && <span>Este Campo es Requerido</span>}
              <NumberInput
                defaultValue={
                  toEdit?.amount || Number(monthlyPayment.toFixed(2))
                }
                w="full"
              >
                <NumberInputField
                  placeholder="Cuanto es?"
                  {...register("amount", { required: true })}
                />
              </NumberInput>
              {errors.amount && <span>Este Campo es Requerido</span>}
            </VStack>
          </Box>
        </form>
      </VStack>
    </Modal>
  );
};

export default NewMovement;
