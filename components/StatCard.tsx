import {
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Square,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Stack,
  Box,
} from "@chakra-ui/react";
import Screen from "./Screen";
import { icons } from "../utils";
import { FiEdit } from "react-icons/fi";
import { HiOutlineAdjustments } from "react-icons/hi";
import Stats from "./Stats";

type Props = {
  color: string;
  icon: string;
  number: number;
  progress: number;
  name: string;
  onChange?: (e: number) => void;
  onChangeEnd?: (e: number) => void;
  onEdit?: (e: any) => void;
  onAdjust?: (e: any) => void;
  slider?: boolean;
  editable?: boolean;
  showProgress?: boolean;
  helpText?: string;
  loading?: boolean;
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
  onAdjust,
  showProgress,
  helpText,
  loading,
}: Props) => {
  return (
    <Screen withShadow={false}>
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
        <Stats
          name={name}
          amount={number}
          helpText={helpText}
          loading={loading}
        />

        {showProgress && (
          <CircularProgress value={progress > 0 ? progress : 0} color={color}>
            <CircularProgressLabel>
              {progress > 0 ? progress : 0}%
            </CircularProgressLabel>
          </CircularProgress>
        )}
        {editable && (
          <Stack spacing={2} direction={["column", "row"]}>
            <Button float="right" padding="0" onClick={onEdit}>
              <FiEdit />
            </Button>

            {number > 0 && (
              <Button float="right" padding="0" onClick={onAdjust}>
                <HiOutlineAdjustments />
              </Button>
            )}
          </Stack>
        )}
      </HStack>
      {slider && (
        <Box w="75%">
          <Slider
            marginTop={6}
            aria-label="slider-ex-2"
            colorScheme={color.split(".")[0]}
            value={progress}
            onChange={(e) => onChange(e)}
            onChangeEnd={(e) => onChangeEnd(e)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>
      )}
    </Screen>
  );
};

export default StatCard;
