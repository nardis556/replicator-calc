import { useEffect, useState } from "react";
import axios from "axios";
import {
  VStack,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Table,
  Tbody,
  Tr,
  Td,
  IconButton,
  Link,
  Tooltip,
  HStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Calculator = () => {
  const [exchangeData, setExchangeData] = useState(null);
  const [stakingData, setStakingData] = useState(null);
  const [tokenPriceData, setTokenPriceData] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(10000);
  const [inputAmount, setInputAmount] = useState("");
  const [APR, setAPR] = useState(0);
  const [projectedAnnualReward, setProjectedAnnualReward] = useState(0);
  const [liquidityRatio, setLiquidityRatio] = useState(0.5);
  const [idexLeftRemaining, setIdexLeftRemaining] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [referralPercentage, setReferralPercentage] = useState(0);

  useEffect(() => {
    if (!fetched) {
      try {
        const fetchData = async () => {
          const exchangeResponse = await axios.get("/api/getExchangeData");
          const stakingResponse = await axios.get("/api/getStakingData");
          const tokenPriceResponse = await axios.get("/api/getTokenPriceData");
          setExchangeData(exchangeResponse.data);
          setStakingData(stakingResponse.data);
          setTokenPriceData({
            price: parseFloat(tokenPriceResponse.data.price),
          });
          setFetched(true);
        };

        fetchData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [fetched]);

  useEffect(() => {
    if (fetched) {
      calculateRewards();
    }
  }, [fetched, tokenAmount, liquidityRatio, referralPercentage]);

  const calculateRewards = () => {
    const volume24hUsd = parseFloat(exchangeData.volume24hUsd);
    const totalStakedIdex = parseFloat(stakingData.totalStakedIdex);
    const tokenPriceUsd = tokenPriceData.price;
    const idexLeft = 1e9 - totalStakedIdex;

    setIdexLeftRemaining(idexLeft);

    const poolVolume = volume24hUsd * liquidityRatio;
    const limitVolume = volume24hUsd - poolVolume;

    const limitFees = limitVolume * 0.0025;
    const poolFees = poolVolume * 0.00025;

    const totalFees = limitFees + poolFees;
    const userStakeFraction = parseFloat(tokenAmount) / totalStakedIdex;

    const referralReduction = referralPercentage / 100;

    const userRewardUSD =
      totalFees * userStakeFraction * 0.5 * 365 * (1 - referralReduction);
    let userRewardIDEX = 0;
    let APR = 0;

    if (!isNaN(tokenPriceUsd) && tokenPriceUsd > 0) {
      userRewardIDEX = userRewardUSD / tokenPriceUsd;

      APR =
        (userRewardIDEX / parseFloat(tokenAmount)) *
        100 *
        (1 - referralReduction);
    }

    setProjectedAnnualReward(userRewardUSD);
    setAPR(APR);
  };

  const handleTokenAmountChange = (event) => {
    setInputAmount(event.target.value);
  };

  const handleSubmit = () => {
    if (parseFloat(inputAmount) > idexLeftRemaining) {
      alert(`Maximum stakable amount is ${idexLeftRemaining}`);
      return;
    }

    setTokenAmount(parseFloat(inputAmount));
  };

  const handleRatioChange = (value) => {
    setLiquidityRatio(value / 100);
  };

  const handleReferralChange = (value) => {
    setReferralPercentage(value);
    calculateRewards(); // recalculate rewards when the referral percentage changes
  };

  return (
    <VStack
      spacing={8}
      padding={8}
      boxShadow="2xl"
      bg="gray.700"
      borderRadius="lg"
      border="1px"
      borderColor="gray.600"
      opacity="0.9"
      width="85%"
      maxWidth={600}
    >
      <HStack spacing={2}>
        <Heading color="purple.300">Replicator APR</Heading>
        <Link href="https://github.com/nardis556/replicator-calc" isExternal>
          <IconButton
            as={FaGithub}
            colorScheme="purple"
            variant="ghost"
            aria-label="Source code on GitHub"
            icon={<FaGithub />}
            size="md"
          />
        </Link>
      </HStack>

      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>24h Volume $USD:</Td>
            <Td isNumeric>{exchangeData?.volume24hUsd || "Loading..."}</Td>
          </Tr>
          <Tr>
            <Td>IDEX $USD price:</Td>
            <Td isNumeric>{tokenPriceData?.price || "Loading..."}</Td>
          </Tr>
          <Tr>
            <Td>IDEX $USD market cap:</Td>
            <Td isNumeric>{exchangeData?.idexMarketCapUsd || "Loading..."}</Td>
          </Tr>
          <Tr>
            <Td>Total $IDEX staked:</Td>
            <Td isNumeric>
              {stakingData
                ? parseFloat(stakingData.totalStakedIdex).toFixed(2)
                : "Loading..."}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Box color="white">
        <Text>Staking APR: {APR.toFixed(2)}%</Text>
        <Text display="inline-flex" alignItems="center">
          <Tooltip
            label="This is a rough estimate of the annual USD reward, based on the current 24-hour trading volume and the current volume ratio. Please note that actual rewards may vary due to changes in trading volumes and other factors."
            aria-label="A tooltip"
          >
            <Text as="span" textDecoration="underline">
              Projected annual reward
            </Text>
          </Tooltip>{" "}
          {":$USD "}
          {projectedAnnualReward.toFixed(2)}
        </Text>
      </Box>

      <Box color="white" width="80%">
        <Text display="inline-flex" alignItems="center">
          <Tooltip
            label="Defaults to 10,000 IDEX staked."
            aria-label="A tooltip"
          >
            <Text as="span" textDecoration="underline">
              Enter the amount of IDEX tokens:
            </Text>
          </Tooltip>
        </Text>
        <Input
          value={inputAmount}
          onChange={handleTokenAmountChange}
          placeholder="Enter amount"
          max={idexLeftRemaining}
          backgroundColor="white"
          borderRadius="md"
          color="black"
          mt={2}
          mb={4}
        />
        <Button colorScheme="purple" onClick={handleSubmit} borderRadius="md">
          Submit
        </Button>
      </Box>
      <Box color="white" width="80%">
        <Text>
          Referral percentage:{" "}
          {String(Number(referralPercentage.toFixed(0))).padStart(3, " ")}%
        </Text>
        <Box width="100%">
          <Slider
            colorScheme="purple"
            value={referralPercentage}
            onChange={handleReferralChange}
            min={0}
            max={100}
            step={5}
            mt={2}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>
      </Box>
      <Box color="white" width="80%">
        <Text>
          Volume ratio (Pool / Total):{" "}
          {String(Number((liquidityRatio * 100).toFixed(0))).padStart(3, " ")}%
        </Text>
        <Box width="100%">
          <Slider
            colorScheme="purple"
            value={liquidityRatio * 100}
            onChange={handleRatioChange}
            min={0}
            max={100}
            step={5}
            mt={2}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>
      </Box>
    </VStack>
  );
};

export default Calculator;
