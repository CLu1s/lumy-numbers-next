import React, { useState, useEffect, useCallback } from "react";
import Modal from "../../components/Modal";
import { Box, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { Category } from "../../types";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRest, getIncome } from "./selector";
import { Text, Stack } from "@chakra-ui/react";
import NumberInput from "../../components/NumberInput";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Category;
  updateElement: (e: number, id: string) => void;
};

const AdjustCategory = ({ isOpen, onClose, toEdit, updateElement }: Props) => {
  const rest = useSelector(getRest);
  const income = useSelector(getIncome);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (rest === 1) {
      setValue("reduce");
    } else {
      setValue("add");
    }
  }, [rest]);

  const handleClose = useCallback(() => {
    setAmount(0);
    onClose();
  }, [onClose]);

  const onSubmit = () => {
    const { percentage } = toEdit;
    const maxReduce = percentage * income;
    if (value === "reduce" && amount > maxReduce) {
      toast("No puedes reducir más de lo que tienes en tu cuenta.");
      return;
    }
    const amountToPercentage =
      (amount * percentage) / (maxReduce > 0 ? maxReduce : 1);
    const newPercentage =
      value === "reduce"
        ? percentage - amountToPercentage
        : percentage + amountToPercentage;
    updateElement(newPercentage, toEdit.id);
    handleClose();
  };

  const config = {
    isOpen,
    title: "Ajustat Categoría",
    onClose: handleClose,
    cancelButtonText: "Cancel",
    onSubmit: onSubmit,
  };

  return (
    <Modal {...config}>
      <Stack direction="column" spacing={4}>
        <Text>
          Elige si quieres aumentar o reducir en una cantidad exacta lo planeado
          para esta categoría
        </Text>
        <HStack>
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="reduce">Reducir</Radio>
              <Radio isDisabled={rest === 1} value="add">
                Aumentar
              </Radio>
            </Stack>
          </RadioGroup>
        </HStack>

        <Box width="100%">
          <Box spacing={4} w="full">
            <NumberInput
              placeholder="Cantidad"
              amount={amount}
              onChange={(value) => setAmount(value)}
            />
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
};

export default AdjustCategory;
