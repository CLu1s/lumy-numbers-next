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
  VStack,
} from "@chakra-ui/react";
import { Category } from "../types";

type Props = {
  categories: Category[];
  filter: string[];
  setFilter: (filter: string[]) => void;
};

const Filters = ({ categories, filter, setFilter }: Props) => {
  const checkboxGroup = (
    <CheckboxGroup
      colorScheme="blue"
      defaultValue={filter}
      onChange={(value: string[]) => {
        setFilter(value);
      }}
    >
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {categories.map((category) => (
          <Checkbox key={category.id} value={category.id}>
            {category.name}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
  return (
    <Box>
      <VStack align="flex-start">
        <Box display={{ base: "none", lg: "block" }} flex="1" textAlign="left">
          Filtrar por Categoría
        </Box>
        <Box display={{ base: "none", lg: "block" }} width="full">
          {checkboxGroup}
        </Box>
      </VStack>
      <Box display={{ base: "block", lg: "none" }}>
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
            <AccordionPanel pb={4}>{checkboxGroup}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};
export default Filters;
