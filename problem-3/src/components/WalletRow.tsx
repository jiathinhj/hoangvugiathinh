import { Avatar, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { WalletBalance } from "../pages/WalletPage";

interface WalletRowProps extends WalletBalance {
  className?: string; // Optional className prop
  key: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = (props: WalletRowProps) => {
  const {
    className,
    currency,
    key,
    usdValue,
    blockchain,
    amount,
    formattedAmount,
  } = props;
  return (
    <tr key={key}>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={
              "https://docs.material-tailwind.com/img/logos/logo-netflix.svg"
            }
            alt={key}
            size="md"
            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
          />
          <Typography variant="small" color="blue-gray" className="font-bold">
            {blockchain}
          </Typography>
        </div>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {currency}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {amount.toLocaleString()}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {formattedAmount}
        </Typography>
      </td>
      <td className="p-4">
        <div className="w-max">
          <Chip
            size="sm"
            variant="ghost"
            value={`${usdValue.toLocaleString()}$`}
            color={usdValue > 0 ? "green" : "red"}
          />
        </div>
      </td>
    </tr>
  );
};

export default WalletRow;
