import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import Screen from "./Screen";
import { money } from "../utils";

type FooterProps = {
  children: React.ReactNode;
};

export const HeroStatFooter = ({ children }: FooterProps) => {
  return (
    <Box mt="4">
      <Center w="100%" color="white">
        {children}
      </Center>
    </Box>
  );
};

type Props = {
  title: string;
  amount: number;
  statLabel?: string;
  helpText?: string;
  children?: React.ReactNode;
};

const HeroStatCard = ({
  title,
  statLabel,
  amount,
  helpText,
  children,
}: Props) => {
  const loading = false;
  return (
    <Screen title={title}>
      {!loading ? (
        <Stat>
          <StatLabel textTransform="capitalize">{statLabel}</StatLabel>
          <StatNumber
            fontSize={["5xl", "6xl"]}
            fontWeight="700"
            color="purple.600"
          >
            {money(amount)}
          </StatNumber>
          <StatHelpText textTransform="capitalize">{helpText}</StatHelpText>
        </Stat>
      ) : (
        <Spinner />
      )}
      {children}
    </Screen>
  );
};

export default HeroStatCard;
