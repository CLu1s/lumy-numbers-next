import React, { useState, useEffect, useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import Modal from "../../components/Modal";
import { Box, Button, Input } from "@chakra-ui/react";
import { Category } from "../../types";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, updateCategory } from "./budgetSlice";
import { getBucketID } from "../bucket/selector";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import icons, { iconKeys } from "../../utils/icons";
import { availableColors } from "../../config/colors";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Category;
};

const EditCategory = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState<string>(toEdit?.icon || "Select A Icon");
  const [color, setColor] = useState<string>(toEdit?.color ?? "MenuItem");
  const [name, setName] = useState<string>(toEdit?.name ?? "");
  const bucketID = useSelector(getBucketID);

  useEffect(() => {
    if (toEdit) {
      setIcon(toEdit.icon);
      setColor(toEdit.color);
      setName(toEdit.name);
    } else {
      setIcon(null);
      setColor(null);
      setName(null);
    }
  }, [toEdit]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onSubmit = () => {
    if (!toEdit) {
      dispatch(
        createCategory({
          id: null,
          name,
          color,
          icon,
          percentage: 0,
          bucketID,
        })
      );
    } else {
      dispatch(
        updateCategory({
          ...toEdit,
          icon,
          color,
          bucketID,
          name,
        })
      );
    }
    handleClose();
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Categoría" : "Nueva Categoría",
    onClose: handleClose,
    cancelButtonText: "Cancel",
    onSubmit: onSubmit,
  };

  const iconOptions = iconKeys.map((key) => (
    <MenuItemOption key={key} value={key} fontSize="2xl">
      {icons(key)}
    </MenuItemOption>
  ));

  return (
    <Modal {...config}>
      <Stack direction="column">
        <Text>Ingresa la descripción de la categoría</Text>

        <Box width="100%">
          <Box spacing={4} w="full">
            <Input
              placeholder="Nombre de la Categoría"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Flex marginTop="4">
              <Menu>
                <MenuButton fontSize="4xl" as={Button}>
                  {icons(icon as string)}
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    defaultValue={toEdit?.icon}
                    title="Icono"
                    type="radio"
                    onChange={(e) => setIcon(e as string)}
                  >
                    {iconOptions}
                  </MenuOptionGroup>
                  <MenuDivider />
                </MenuList>
              </Menu>
              <Spacer />
              <Menu>
                <MenuButton
                  w="50%"
                  as={Button}
                  backgroundColor={color}
                  color="white"
                >
                  Color
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    defaultValue="asc"
                    title="Color"
                    type="radio"
                    onChange={(e) => setColor(e as string)}
                  >
                    {availableColors.map((color) => (
                      <MenuItemOption key={color} value={color}>
                        <Box
                          width="full"
                          height="18px"
                          backgroundColor={color}
                        />
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                  <MenuDivider />
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EditCategory;
