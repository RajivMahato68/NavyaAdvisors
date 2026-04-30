export type HeaderProps = {
    title?: string;
    showBack?: boolean;
    showSearch?: boolean;
    showMenu?: boolean;
    showLogo?: boolean;
};

export type Stock = {
  symbol: string;
  price: number[];
  volume: number[];
  change?: number;
  turnover?: number;
};