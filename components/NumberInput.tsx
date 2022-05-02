import React, { useState, useEffect } from "react";
import {
  NumberInput as NumberInputBase,
  NumberInputField,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

type Props = {
  amount?: number | string;
  register?: any;
  name?: string;
  defaultValue?: number;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: number) => void;
};

const NumberInput = ({
  amount,
  register,
  name = "amount",
  defaultValue,
  required,
  placeholder = "Ingrese un monto",
  onChange,
}: Props) => {
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

  const [value, setValue] = useState(amount || defaultValue || "");

  useEffect(() => {
    setValue(amount || defaultValue || "");
  }, [amount, defaultValue]);
  useEffect(() => {
    onChange && onChange(value as number);
  }, [value, onChange]);

  return (
    <InputGroup>
      <InputLeftAddon>$</InputLeftAddon>
      <NumberInputBase
        value={value}
        onChange={(valueString) => setValue(parse(valueString))}
        w="full"
      >
        {register ? (
          <NumberInputField
            placeholder={placeholder}
            {...register(name, { required })}
          />
        ) : (
          <NumberInputField placeholder={placeholder} />
        )}
      </NumberInputBase>
    </InputGroup>
  );
};

export default NumberInput;

{
  /* <NumberInput
defaultValue={toEdit ? toEdit.amount : null}
placeholder="Cantidad"
w="full"
>
<NumberInputField
  placeholder="Cantidad"
  {...register("amount", { required: true })}
/>
</NumberInput> */
}
