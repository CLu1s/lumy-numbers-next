import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Input, Stack, HStack, Text } from "@chakra-ui/react";
import Select from "../../components/Select";
import { getCategories } from "../budget/selector";
import { getBucketID } from "../bucket/selector";
import { addCategoryID } from "./projectsSlice";
const SaveCategoryID = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const bucketID = useSelector(getBucketID);
  const [selected, setSelected] = useState<any>();

  const onSave = () => {
    if (selected) {
      dispatch(addCategoryID({ projectsCategoryID: selected, id: bucketID }));
    }
  };

  return (
    <Stack>
      <Text>
        Hemos detectado que no haz elegido a que categoria corresponderan tus
        gastos fijos.
      </Text>
      <Text> Porfavor selecciona una categoria para continuar.</Text>
      <HStack>
        <Select
          label="Categoría"
          setSelected={setSelected}
          options={categories}
        />
        <Button colorScheme="blue" onClick={onSave}>
          Seleccionar
        </Button>
      </HStack>
    </Stack>
  );
};

export default SaveCategoryID;
