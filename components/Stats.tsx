import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from "@chakra-ui/react";
import { money } from "../utils";

type Props = {
  name: string;
  amount: number;
  helpText?: string;
  labelStyles?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Stats = ({ name, amount, helpText, labelStyles, size }: Props) => {
  const color = useColorModeValue("gray.900", "gray.200");

  return (
    <Stat>
      <StatLabel fontSize={size} style={labelStyles}>
        {name}
      </StatLabel>
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
