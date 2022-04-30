import {
  ListItem,
  Link,
  OrderedList,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const UnorderedListCustom = ({ node, ...props }) => {
  return <UnorderedList {...props} paddingLeft={5} />;
};
const OrderedListCustom = ({ node, ...props }) => {
  return <OrderedList {...props} paddingLeft={5} />;
};
const LinkCustom = ({ node, ...props }) => {
  return <Link color="teal.500" {...props} isExternal />;
};

const TableCustom = ({ node, ...props }) => {
  return <Table {...props} variant="striped" />;
};

const ThCustom = ({ node, ...props }) => {
  return <Th {...props} />;
};
const TdCustom = ({ node, ...props }) => {
  return <Td {...props} />;
};

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        ol: OrderedListCustom,
        ul: UnorderedListCustom,
        li: ListItem,
        a: LinkCustom,
        table: TableCustom,
        thead: Thead,
        tbody: Tbody,
        tfoot: Tfoot,
        tr: Tr,
        th: ThCustom,
        td: TdCustom,
        p: Text,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
export default Markdown;
