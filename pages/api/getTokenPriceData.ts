import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  price: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await axios.get('https://api-matic.idex.io/v1/orderbook?level=1&market=IDEX-USDC');
    const { bids, asks } = response.data;

    const bidPrice = parseFloat(bids[0][0]);
    const askPrice = parseFloat(asks[0][0]);

    const tokenPrice = ((bidPrice + askPrice) / 2).toFixed(4);

    console.log(tokenPrice)

    res.status(200).json({ price: tokenPrice });
  } catch (error) {
    res.status(500).json({ error: error, message: "Something went wrong" });
  }
}
