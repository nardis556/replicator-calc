import { Box, Center, Text } from '@chakra-ui/react';

const Disclaimer = () => {
  return (
    <Box>
      <Text mb={2}>This tool offers a rough estimate of potential IDEX replicator staking rewards based on current data.</Text>
      <Text mb={2}>The calculation considers the 24-hour trading volume, your staked tokens, and the chosen volume ratio.</Text>
      <Text mb={2}>Here is a simplified breakdown of the calculation:</Text>
      <Text as="ul" pl={5} mb={2}>
        <Text as="li">The 24-hour trading volume is multiplied by the volume ratio to determine the pool volume and limit type trades volume.</Text>
        <Text as="li">Fees are calculated separately for the limit volume and pool volume, then added together.</Text>
        <Text as="li">Your share of the fees is calculated based on the fraction of total staked IDEX tokens you own.</Text>
        <Text as="li">This share is then converted into USD, and projected for one year to provide an estimated annual reward.</Text>
        <Text as="li">The APR (Annual Percentage Rate) is calculated by comparing your potential annual reward to the amount of staked tokens.</Text>
      </Text>
      <Text>Note: Actual rewards may differ due to changes in trading volumes, token prices, and other factors. Please perform your own due diligence before making decisions.</Text>
      <Text mb={2} fontSize={12} align={'center'}> Click X or anywhere outside the disclaimer box to close.</Text>
    </Box>
  );
}

export default Disclaimer;
