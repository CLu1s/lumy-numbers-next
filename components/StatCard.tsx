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
  Button,
} from "@chakra-ui/react";
import Screen from "./Screen";
import { money, icons } from "../utils";
import { FiEdit } from "react-icons/fi";

type Props = {
  color: string;
  icon: string;
  number: number;
  progress: number;
  name: string;
  onChange?: (e: number) => void;
  onChangeEnd?: (e: number) => void;
  onEdit?: (e: any) => void;
  slider?: boolean;
  editable?: boolean;
};

const StatCard = ({
  color,
  icon,
  name,
  number,
  progress,
  slider,
  editable,
  onChange,
  onChangeEnd,
  onEdit,
}: Props) => {
  const loading = false;
  return (
    <Screen>
      
      <HStack spacing={2}>
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
          <StatNumber
            style={{ width: "100%", minWidth: "130px" }}
            color={`${number < 1 ? "red.600" : "black"}`}
          >
            {money(number)}
          </StatNumber>
        </Stat>
        
        <CircularProgress value={progress > 0 ? progress : 0} color={color}>
          <CircularProgressLabel>
            {progress > 0 ? progress : 0}%
          </CircularProgressLabel>
        </CircularProgress>
        {editable && (
          <Button
            float="right"
            padding="0"
            // marginRight="4"
            bg="white"
            onClick={onEdit}
          >
            <FiEdit />
          </Button>
        )}
      </HStack>
      {slider && (
        <Slider
        marginTop={4}
          aria-label="slider-ex-2"
          colorScheme={color.split(".")[0]}
          defaultValue={progress}
          onChange={(e) => onChange(e)}
          onChangeEnd={(e) => onChangeEnd(e)}
        >
          <SliderTrack >
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb  boxSize={6} />
        </Slider>
      )}
    </Screen>
  );
};

export default StatCard;
