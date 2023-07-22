import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get('https://api-matic.idex.io/v1/internal/staking/replicator/stats');
    console.log(response.data)
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
