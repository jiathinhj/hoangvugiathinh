import { ReactNode, useMemo } from "react";
import WalletRow from "../components/WalletRow";
import { Card, CardBody, Typography } from "@material-tailwind/react";

export interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // new
}
export interface FormattedWalletBalance extends WalletBalance {
  // currency: string;
  // amount: number;
  formatted: string;
} // extends from WalletBalance to remove boilerplate

interface Styles {
  row: string; // Assuming row is a class name string
}

interface BoxProps {
  //haven't been defined yet
  classes?: Styles; // Assuming row is a class name string
}

interface Props extends BoxProps {
  //more properties here
}

interface Prices {
  [currency: string]: number;
} //declare the Prices type

const useWalletBalances = () => {
  //haven't been defined yet
  // logic here and return an example balances array as below
  return [
    { currency: "USD", amount: 23_000, blockchain: "Osmosis" },
    { currency: "EUR", amount: -50_000, blockchain: "Ethereum" },
    { currency: "VND", amount: -90_000, blockchain: "Zilliqa" },
    { currency: "JPY", amount: -20_000, blockchain: "Arbitrum" },
    { currency: "SGD", amount: 10_000, blockchain: "Neo" },
    { currency: "AUD", amount: -70_000, blockchain: "Other" },
  ];
};
const usePrices = (): Prices => {
  //haven't been defined yet
  // logic here and return an example prices object as below
  return {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    VND: 0.33,
    AUD: 0.5,
    SGD: 0.4,
    JPY: 0.6,
  };
};

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { classes, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain);
          /*
          if (balancePriority > -99) {
            //lhsPriority -> balancePriority
            if (balance.amount <= 0) {
              return true;
            }
          }
          return false;
          */

          // remove above if conditions

          return balancePriority > -99 && balance.amount <= 0;
        })

        // get balences which is named and amount <= 0
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
          const leftPriority = getPriority(lhs.blockchain);
          const rightPriority = getPriority(rhs.blockchain);
          return rightPriority - leftPriority;

          /* 
          if (leftPriority > rightPriority) {
            return -1;
          } else if (rightPriority > leftPriority) {
            return 1;
          } 
          */

          // unnecessarily use this block of code
        })
    );
  }, [balances]); //remove prices from dependencies as its change does not affect

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount
        .toFixed()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
    };
  }); // hasn't been used

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes?.row} // lack of className type declaration
          key={`${balance.amount}-${index}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
          currency={balance.currency}
          blockchain={balance.blockchain}
        />
      );
    }
  );

  const TABLE_HEAD = [
    "Blockchain",
    "Currency",
    "Amount",
    "Formatted Amount",
    "Value (USD)",
  ];
  return (
    <div {...rest} className="m-4 ">
      <Card className="h-full w-full border-2 border-gray-400">
        <CardBody
          className="overflow-scroll px-0 
        "
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};
