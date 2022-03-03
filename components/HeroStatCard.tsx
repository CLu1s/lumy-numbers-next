import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
} from "@chakra-ui/react";
import Screen from "./Screen";
import Loading from "./Loading";
import { money } from "../utils";

type FooterProps = {
  children: React.ReactNode;
};

export const HeroStatFooter = ({ children }: FooterProps) => {
  return <Box mt="4">{children}</Box>;
};
export const HeroStatBody = ({ children }: FooterProps) => {
  return <Box mt="2">{children}</Box>;
};

type Props = {
  title: string;
  amount: number;
  statLabel?: string;
  helpText?: string;
  loading?: boolean;
  children?: React.ReactNode;
  description?: string;
};

const HeroStatCard = ({
  title,
  statLabel,
  amount,
  helpText,
  children,
  loading,
  description,
}: Props) => {
  return (
    <Screen title={title} description={description}>
      {!loading ? (
        <Stat>
          <StatLabel textTransform="capitalize">{statLabel}</StatLabel>
          <StatNumber
            fontSize={["5xl", "6xl"]}
            fontWeight="700"
            color={`${amount < 1 ? "red" : "purple"}.600`}
          >
            {money(amount)}
          </StatNumber>
          {helpText && (
            <StatHelpText textTransform="capitalize">{helpText}</StatHelpText>
          )}
        </Stat>
      ) : (
        <Loading />
      )}
      {children}
    </Screen>
  );
};

export default HeroStatCard;
