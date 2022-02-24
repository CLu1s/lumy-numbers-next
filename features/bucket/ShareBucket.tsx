import { useSelector } from "react-redux";
import Screen from "../../components/Screen";
import { getNanoID } from "./selector";
import { Text } from "@chakra-ui/react";

const ShareBucket = () => {
  const nanoID = useSelector(getNanoID);
  return (
    <Screen>
      <Text>{nanoID}</Text>
    </Screen>
  );
};

export default ShareBucket;
