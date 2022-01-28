import { useMemo } from "react";
import Screen from "../../components/Screen";
import {
  Stack,
  HStack,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  CircularProgress,
  CircularProgressLabel,
  Square,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import { BiHappyBeaming } from "react-icons/bi";
import { AiOutlineStock } from "react-icons/ai";
import money from "../../utils/money";
import { useSelector } from "react-redux";
import { getBalanceByCategories } from "../../features/wallet/selector";

const Categories = () => {
  const items = useSelector(getBalanceByCategories);
  const icons = useMemo(() => {
    return {
      HiOutlineHome: <HiOutlineHome />,
      BiHappyBeaming: <BiHappyBeaming />,
      AiOutlineStock: <AiOutlineStock />,
    };
  }, []);


  return (
    <Stack spacing={4}>
      <Heading as="h2" size="md" fontWeight="600">
        Categorías
      </Heading>
      <Wrap>
        {items.map((item) => (
          <WrapItem minW="xs" width={["full", "xs"]} key={item.id}>
            <Screen>
              <HStack spacing={4}>
                <Square
                  size="48px"
                  bg={item.color}
                  color="white"
                  borderRadius="md"
                  fontSize="2rem"
                >
                  {icons[item.icon]}
                </Square>
                <Stat>
                  <StatLabel>{item.name}</StatLabel>
                  <StatNumber>{money(item.balance)}</StatNumber>
                </Stat>
                <CircularProgress value={item.progress} color={item.color}>
                  <CircularProgressLabel>
                    {item.progress}%
                  </CircularProgressLabel>
                </CircularProgress>
              </HStack>
            </Screen>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  );
};

export default Categories;
