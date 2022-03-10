import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { money } from "../utils";

type Props = {
  name: string;
  amount: number;
  helpText?: string;
};

const Stats = ({ name, amount, helpText }: Props) => {
  return (
    <Stat>
      <StatLabel>{name}</StatLabel>
      <StatNumber
        style={{ width: "100%", minWidth: "130px" }}
        color={`${amount < 0 ? "red.600" : "black"}`}
      >
        {money(amount)}
      </StatNumber>
      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  );
};
export default Stats;
