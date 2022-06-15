import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  HStack,
  Text,
  chakra,
  Skeleton,
} from "@chakra-ui/react";
import { money } from "../utils";

type Props = {
  name: string;
  amount: number;
  helpText?: string;
  labelStyles?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  compareAmount?: number;
  loading?: boolean;
};

const Stats = ({
  name,
  amount,
  helpText,
  labelStyles,
  size,
  icon,
  compareAmount,
  loading,
}: Props) => {
  const color = useColorModeValue("gray.900", "gray.200");

  return (
    <Stat>
      <StatLabel fontSize={size} style={labelStyles} color="gray.500">
        <HStack spacing={2}>
          {icon}
          <Text>{name}</Text>
        </HStack>
      </StatLabel>

      {loading ? (
        <Skeleton height="36px" />
      ) : (
        <StatNumber fontSize={size} color={`${amount < 0 ? "red.600" : color}`}>
          {compareAmount ? (
            <HStack spacing={0}>
              <Text>{money(amount)}</Text>
              <chakra.span fontSize="sm" color="gray">
                /
              </chakra.span>
              <Text fontSize="sm" color="gray">
                {money(compareAmount)}
              </Text>
            </HStack>
          ) : (
            money(amount)
          )}
        </StatNumber>
      )}
      {helpText && <StatHelpText fontSize={size}>{helpText}</StatHelpText>}
    </Stat>
  );
};
export default Stats;
