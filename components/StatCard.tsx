import {
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Square,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import Screen from "./Screen";
import { money, icons } from "../utils";

type Props = {
  color: string;
  icon: string;
  number: number;
  progress: number;
  name: string;
  onChange?: (e: number) => void;
  onChangeEnd?: (e: number) => void;
  slider?: boolean;
};

const StatCard = ({
  color,
  icon,
  name,
  number,
  progress,
  slider,
  onChange,
  onChangeEnd
}: Props) => {
  const loading = false;
  return (
    <Screen>
      <HStack spacing={4}>
        <Square
          size="48px"
          bg={color}
          color="white"
          borderRadius="md"
          fontSize="2rem"
        >
          {icons(icon)}
        </Square>
        <Stat>
          <StatLabel>{name}</StatLabel>
          <StatNumber style={{width:"135px"}}>{money(number)}</StatNumber>
        </Stat>
        <CircularProgress value={progress} color={color}>
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
      {slider && (
        <Slider
          aria-label="slider-ex-2"
          colorScheme={color.split(".")[0]}
          defaultValue={progress}
          onChange={(e) => onChange(e)}
          onChangeEnd={(e) => onChangeEnd(e)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}
    </Screen>
  );
};

export default StatCard;
