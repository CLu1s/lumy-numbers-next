import { Box } from "@chakra-ui/react";
import Select from "react-select";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type OptionsType = {
  value: string;
  label: string;
};

type SelectProps = {
  defaultValue?: any;
  setSelected: (val: any) => void;
  options: OptionsType[] | string[];
  label?: string;
};

export default function SelectContainer({
  options,
  defaultValue,
  setSelected,
  label,
}: SelectProps) {
  return (
    <Box w="full">
      <Select
        defaultValue={defaultValue}
        onChange={(obj)=>setSelected(obj.value)}
        options={options}
        isSearchable={false}
      />
    </Box>
  );
}
