import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import formatISO from "date-fns/formatISO";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import Modal from "./Modal";
import Input from "./Input";
import { SingleTransaction } from "../types";
import Select from "./Select";

type Props = {
  isOpen: boolean;
  onClose: (val: boolean) => void;
  toEdit?: SingleTransaction;
};

const RecordExpense = ({ isOpen, onClose, toEdit }: Props) => {
  const [selected, setSelected] = useState<any>();
  const [date, setDate] = useState<Date | null>(new Date());
  const categories = ["Food", "Transport", "Entertainment"];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    toast.success("Successfully toasted!");
    console.log(data);
  };

  const setDateValue = (dateValue: Date | null) => {
    setDate(dateValue);
  };

  const config = {
    isOpen,
    title: toEdit ? "Actualizar Gasto" : "Ingresar Nuevo Gasto",
    onClose,
    cancelButtonText: "Cancel",
  };

  const montoProps = {
    label: "Monto",
    prefix: "$",
    type: "number",
    step: "0.01",
    placeholder: "0.00",
    min: 0,
    ...register("amount", { required: true }),
    defaultValue: toEdit?.amount,
  };

  const descriptionProps = {
    label: "Descripción",
    defaultValue: toEdit?.description,
    ...register("description", { required: true }),
  };
  return (
    <Modal {...config}>
      <p className="text-sm text-gray-500">
        Ingresa el monto y la descripción del gasto
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* register your input into the hook by invoking the "register" function */}

        {errors.description && <span>Este Campo es Requerido</span>}
        <Input {...montoProps} />
        {errors.amount && <span>Este Campo es Requerido</span>}
        {/* include validation with required or other standard HTML validation rules */}
        <Input {...descriptionProps} />
        {/* errors will return when field validation fails  */}

        {/* errors will return when field validation fails  */}
        {selected && (
          <Select
            label="Categoría"
            selected={selected}
            setSelected={setSelected}
            options={categories}
          />
        )}
        <StaticDatePicker
          label="Selecciona tu fecha"
          value={(toEdit?.date && new Date(toEdit?.date)) || date}
          onChange={setDateValue}
          renderInput={(params) => <TextField {...params} />}
        />
        <div className=" my-3 sm:flex sm:flex-row-reverse lg:flex-row justify-between">
        <input
            className={`w-full mb-4 lg:mb-0 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm`}
            type="submit"
            value={toEdit ? "Actualizar" : "Guardar"}
          />
          <button
            type="button"
            className={`w-full  inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={() => onClose(false)}
          >
            Cancelar
          </button>
          
        </div>
      </form>
    </Modal>
  );
};

export default RecordExpense;
