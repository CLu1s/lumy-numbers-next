import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import icons, { iconKeys } from "../../utils/icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  toEdit?: Category;
};

const availableColors = [
  "red.500",
  "orange.500",
  "yellow.500",
  "green.500",
  "teal.500",
  "blue.500",
  "indigo.500",
  "purple.500",
  "pink.500",
  "gray.500",
];

const EditCategory = ({ isOpen, onClose, toEdit }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
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
    // TOO: add handling of errors
    toast({
      title: "Gasto Registrado.",
      description: "Se ha registrado tu gasto :D",
      status: "success",
      isClosable: true,
    });
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
    <MenuItemOption key={key} value={key} fontSize="">
      {icons(key)}
    </MenuItemOption>
  ));

  return (
    <Modal {...config}>
      <Box direction="column">
        <p className="text-sm text-gray-500">
          Ingresa el monto y la descripción del Ingreso
        </p>

        <Box width="100%">
          <Box spacing={4} w="full">
            <Input
              placeholder="Nombre de la Categoría"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Menu>
              <MenuButton as={Button}>{icons(icon as string)}</MenuButton>
              <MenuList minWidth="240px">
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
            <Menu>
              <MenuButton as={Button} backgroundColor={color} color="white">
                Color
              </MenuButton>
              <MenuList minWidth="240px">
                <MenuOptionGroup
                  defaultValue="asc"
                  title="Color"
                  type="radio"
                  onChange={(e) => setColor(e as string)}
                >
                  {availableColors.map((color) => (
                    <MenuItemOption key={color} value={color}>
                      <Box width="full" height="18px" backgroundColor={color} />
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCategory;
