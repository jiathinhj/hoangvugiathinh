import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input,
} from "@material-tailwind/react";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

export function CurrencySelection({ name, label, currencies, value }) {
  const [open, setOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [menuLabel, setMenuLabel] = useState(value);

  const { setFieldValue } = useFormikContext();

  const onSelect = (data) => {
    setOpen(false);
    setMenuLabel(data.currency);
    setFieldValue(name, data);
  };

  useEffect(() => {
    setMenuLabel(value);
  }, [value]);

  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
      open={open}
      handler={() => setOpen(!open)}
    >
      <MenuHandler>
        <Button className="bg-transparent border b-gray-700 normal-case min-w-[230px]">
          {menuLabel ? <SubMenuItem value={menuLabel} /> : label}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-80 bg-background border-none">
        <Input
          label="Search"
          containerProps={{
            className: "mb-4",
          }}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        {currencies && inputVal
          ? currencies
              .filter((e) => e.currency.toLowerCase().includes(inputVal))
              .map((data, i) => (
                <CustomMenuItem
                  key={`${data.currency}-${i}`}
                  value={data.currency}
                  onClick={() => onSelect(data)}
                />
              ))
          : currencies.map((data, i) => (
              <CustomMenuItem
                key={`${data.currency}-${i}`}
                value={data.currency}
                onClick={() => onSelect(data)}
              />
            ))}
      </MenuList>
    </Menu>
  );
}

const CustomMenuItem = ({ key, value, onClick }) => {
  return (
    <MenuItem key={key} onClick={onClick}>
      <SubMenuItem value={value} />
    </MenuItem>
  );
};

const SubMenuItem = ({ value }) => {
  return (
    <div className="flex gap-3 items-center">
      <img
        src={`https://raw.githubusercontent.com/jiathinhj/token-icons/d5e14bba248508d0ed5f9f2741df256de63747ca/tokens/${value}.svg`}
        alt="currency-icon"
        className="h-6 w-6"
      />
      {value}
    </div>
  );
};
