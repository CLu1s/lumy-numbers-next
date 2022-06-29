import { useMediaQuery } from "@chakra-ui/react";

const useIsTablet = () => {
  const [isTablet] = useMediaQuery(["(min-width: 744px)"]);

  return isTablet;
};

export default useIsTablet;
