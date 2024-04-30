import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import InputWrapper from "./InputWrapper";
import { Form, Formik } from "formik";
import axios from "axios";
import { CurrencySelection } from "./CurrencySelection";

const Converter = () => {
  const initialValues = {
    sendingAmount: 1,
    sendingCurrency: {},
    receivingCurrency: {},
  };
  const [values, setValues] = useState(initialValues);
  const [currencies, setCurrencies] = useState([]);

  const getPrices = async () => {
    await axios
      .get("https://interview.switcheo.com/prices.json")
      .then((res) => {
        setCurrencies(res.data);
      });
  };

  const onSubmit = (submittedData) => {
    setValues(submittedData);
  };

  const onSwap = () => {
    const { sendingAmount, sendingCurrency, receivingCurrency } = values;
    setValues({
      sendingAmount,
      sendingCurrency: receivingCurrency,
      receivingCurrency: sendingCurrency,
    });
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div className="w-full pt-20">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Form>
          <Card className="w-[700px] mx-auto bg-background">
            <CardBody>
              <Typography variant="h2" className="text-blue-500 py-4">
                Currency converter
              </Typography>
              <Typography className="bg-primary-200 text-green-700 text-lg py-3 rounded-lg font-bold">
                {values &&
                values.sendingCurrency?.currency &&
                values.receivingCurrency?.currency
                  ? `${values.sendingAmount} ${
                      values.sendingCurrency.currency
                    } = ${
                      (values.sendingCurrency.price /
                        values.receivingCurrency.price) *
                      values.sendingAmount
                    } ${values.receivingCurrency.currency}`
                  : "Please currency and amount below"}
              </Typography>
              <InputWrapper name={"sendingAmount"} label={"Amount to send"} />
              <div className="flex gap-5">
                <CurrencySelection
                  currencies={currencies}
                  label={"Select sending Currency"}
                  name={"sendingCurrency"}
                  value={values.sendingCurrency.currency}
                />

                <Button
                  className="flex gap-3 m-auto flex-auto justify-center"
                  onClick={onSwap}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  Swap
                </Button>
                <CurrencySelection
                  currencies={currencies}
                  label={"Select receiving Currency"}
                  name={"receivingCurrency"}
                  value={values.receivingCurrency.currency}
                />
              </div>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                fullWidth
                className="bg-primary !shadow-secondary/5"
              >
                G0!
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </Formik>
    </div>
  );
};

export default Converter;
