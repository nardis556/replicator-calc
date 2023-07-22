import { Box, Center, Text, Checkbox, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';


const Disclaimer = () => {
  return (
    <Box>
      <Text mb={2}>This tool offers a rough estimate of potential IDEX replicator staking rewards based on current data.</Text>
      <Text mb={2}>The calculation considers the 24-hour trading volume, your staked tokens, the chosen volume ratio, and the referral rate.</Text>
      <Text mb={2}>Here is a simplified breakdown of the calculation:</Text>
      <Text as="ul" pl={5} mb={2}>
        <Text as="li">The 24-hour trading volume (V) is multiplied by the volume ratio (r) to determine the pool volume (P) and limit type trades volume (L): P = V * r, L = V * (1-r).</Text>
        <Text as="li">Fees are calculated separately for the limit volume and pool volume, *protocol fees: (f = L * 0.0025 + P * 0.00025), then added together to form total fees (f).</Text>
        <Text as="li">Your share of the fees (F) is calculated based on the fraction (Frac) of total staked IDEX tokens you own: F = f * Frac.</Text>
        <Text as="li">This share is then converted into USD, and projected for one year to provide an estimated annual reward (R = F * 365).</Text>
        <Text as="li">The APR (A) is calculated by comparing your potential annual reward to the amount of staked tokens (T): A = (R / T) * 100%.</Text>
        <Text as="li">The Referral Rate slider allows you to simulate the impact of referral earnings on your rewards. A percentage (Ref) of the estimated rewards is deducted according to the set referral rate: Final Reward = R * (1 - Ref).</Text>
      </Text>
      <Text>Note: Actual rewards may differ due to changes in trading volumes, token prices, and other factors. Please perform your own due diligence before making decisions.</Text>
      {/* <Text mb={2} fontSize={12} align={'center'}> Click X or anywhere outside the disclaimer box to close.</Text> */}
    </Box>
  );
}

export default Disclaimer;
