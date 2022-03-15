import { Stat, StatLabel, StatNumber, StatHelpText } from "@chakra-ui/react";
import { money } from "../utils";

type Props = {
  name: string;
  amount: number;
  helpText?: string;
  labelStyles?: any;
};

const Stats = ({ name, amount, helpText, labelStyles }: Props) => {
  return (
    <Stat>
      <StatLabel style={labelStyles}>{name}</StatLabel>
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
