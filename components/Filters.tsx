import {
  Tag,
  Stack,
  Checkbox,
  CheckboxGroup,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  filter: string[];
  setFilter: (filter: string[]) => void;
};

const Filters = ({ categories, filter, setFilter }: Props) => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Filtrar por Categoría
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <CheckboxGroup
            colorScheme="blue"
            defaultValue={filter}
            onChange={(value: string[]) => {
              setFilter(value);
            }}
          >
            <Stack spacing={1} direction={"column"}>
              {categories.map((category) => (
                <Checkbox key={category.id} value={category.id}>
                  {category.name}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
export default Filters;
