import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import InputWrapper from "./InputWrapper";
import { DropdownWrapper } from "./DropdownWrapper";
import { Form, Formik } from "formik";
import axios from "axios";

const Converter = () => {
  const [result, setResult] = useState({
    sendingAmount: 1,
    sendingCurrency: {},
    receivingCurrency: {},
  });

  const [currencies, setCurrencies] = useState([]);

  const getPrices = async () => {
    await axios
      .get("https://interview.switcheo.com/prices.json")
      .then((res) => {
        setCurrencies(res.data);
      });
  };

  const onSubmit = (value) => {
    setResult(value);
  };

  const onSwap = () => {
    const { sendingAmount, sendingCurrency, receivingCurrency } = result;
    setResult({
      sendingAmount,
      sendingCurrency: receivingCurrency,
      receivingCurrency: sendingCurrency,
    });
    console.log(result);
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <div className="w-full pt-20">
      <Formik
        enableReinitialize
        initialValues={{
          sendingAmount: 1,
          sendingCurrency: {},
          receivingCurrency: {},
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <Card className="w-[700px] mx-auto bg-background">
            <CardBody>
              <Typography variant="h2" className="text-blue-500 py-4">
                Currency converter
              </Typography>
              <Typography className="bg-primary-200 text-green-700 text-lg py-3 rounded-lg font-bold">
                {result &&
                result.sendingCurrency?.currency &&
                result.receivingCurrency?.currency
                  ? `${result.sendingAmount} ${
                      result.sendingCurrency.currency
                    } = ${
                      (result.sendingCurrency.price /
                        result.receivingCurrency.price) *
                      result.sendingAmount
                    } ${result.receivingCurrency.currency}`
                  : "Please currency and amount below"}
              </Typography>
              <InputWrapper name={"sendingAmount"} label={"Amount to send"} />
              <div className="flex gap-5">
                <DropdownWrapper
                  name={"sendingCurrency"}
                  currencies={currencies}
                  label={"Sending Currency"}
                  // value={initialValuesRef.current.sendingCurrency.currency}
                />
                <Button
                  className="flex gap-3 m-auto flex-auto"
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
                <DropdownWrapper
                  name={"receivingCurrency"}
                  currencies={currencies}
                  label={"Receiving Currency"}
                  // value={initialValuesRef.current.receivingCurrency.currency}
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
