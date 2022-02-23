import { Select } from "@chakra-ui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type OptionsType = {
  id: string;
  name: any;
  label?: string;
  avatarColor?: string;
};

type SelectProps = {
  defaultValue: any;
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
    <Select placeholder="Select option" onChange={(e)=> setSelected(e.target.value)} defaultValue={defaultValue}>
      {options.map((option: any) => (
        <option key={option.id} value={option.id}>
          {option.label || option.name}
        </option>
      ))}
    </Select>
  );
}
