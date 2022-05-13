import { Select, Stack } from "@chakra-ui/react";
enum Order {
  ASC = "asc",
  DESC = "desc",
}
type Props = {
  onChangeSort: (sort: string) => void;
  onChangeOrder: (order: string) => void;
};

const Sorters = ({ onChangeSort, onChangeOrder }: Props) => {
  return (
    <Stack
      direction="row"
      spacing={4}
      display={{ base: "flex", lg: "none" }}
      w="100%"
    >
      <Select onChange={(e) => onChangeSort(e.target.value)}>
        <option value="date">Fecha</option>
        {/* <option value="categoryName">Categoría</option> */}

        <option value="description">Descripcion</option>
        <option value="amount">Monto</option>
      </Select>
      <Select onChange={(e) => onChangeOrder(e.target.value as Order)}>
        <option value={Order.DESC}>Descendente</option>
        <option value={Order.ASC}>Ascendente</option>
      </Select>
    </Stack>
  );
};

export default Sorters;
