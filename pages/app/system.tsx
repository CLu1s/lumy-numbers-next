import { useMediaQuery } from "@chakra-ui/react";
const SystemInfo = () => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <h1>System Info</h1>
      <p>Is larger than 768px: {isLargerThan1280 ? "true" : "false"}</p>
    </>
  );
};
export default SystemInfo;
