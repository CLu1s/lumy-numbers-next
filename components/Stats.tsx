import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { money } from "../utils";

type Props = {
  name: string;
  amount: number;
  helpText?: string;
  labelStyles?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
};

const Stats = ({ name, amount, helpText, labelStyles, size, icon }: Props) => {
  const color = useColorModeValue("gray.900", "gray.200");

  return (
    <Stat>
      <HStack spacing={2}>
        {icon}
        <StatLabel fontSize={size} style={labelStyles} color="gray.500">
          {name}
        </StatLabel>
      </HStack>
      <StatNumber
        fontSize={size}
        style={{ width: "100%", minWidth: "130px" }}
        color={`${amount < 0 ? "red.600" : color}`}
      >
        {money(amount)}
      </StatNumber>
      {helpText && <StatHelpText fontSize={size}>{helpText}</StatHelpText>}
    </Stat>
  );
};
export default Stats;
