import { useState } from "react";
import { FormatMoney } from "format-money-js";
import Typography, { Types } from "./Typography";
import Screen from "./Screen";
import RecordExpense from "./RecordExpense";
import Button from "./Button";
import Loading from "./Loading";

const fm = new FormatMoney({
  decimals: 2,
});

const BudgetCard = () => {
  const income = 500;
  const spent = 300;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <RecordExpense isOpen={open} onClose={setOpen} />
      <Screen>
        <Typography type={Types.H6} className="m-auto text-center">
          Disponible
        </Typography>
        <div className="flex flex-col justify-center text-center font-headline text-purple-700 text-5xl font-semibold mt-3.5">
          {!loading ? (
            fm.from(income - spent, {
              symbol: "$",
            })
          ) : (
            <Loading />
          )}
        </div>
        <p className="text-gray-500 text-center mt-3.5">
          Presupuestado:{" "}
          {fm.from(income, {
            symbol: "$",
          })}
        </p>
        <div className="flex w-full mt-10">
          <Button onClick={() => setOpen(true)}>Registrar Gasto</Button>
        </div>
      </Screen>
    </>
  );
};

export default BudgetCard;
