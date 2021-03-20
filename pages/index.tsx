import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { useLayoutEffect, useState } from "react";
import MotionBox from "../components/MotionBox";

interface IProps {
  randomJoke: string;
}

const HomePage: NextPage<IProps> = ({ randomJoke }) => {
  const [joke, setJoke] = useState<string>(randomJoke);
  const [isTextChanged, setIsTextChanged] = useState<boolean>(false);

  useLayoutEffect(() => {
    return () => {
      setIsTextChanged(true);
      setTimeout(() => {
        setIsTextChanged(false);
      }, 300);
    };
  }, [joke]);

  const nextJoke = async () => {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data: any = await res.json();
    setJoke(data?.joke);
  };

  return (
    <Flex minH="100vh" p="4" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        w="3xl"
        h="3xs"
        rounded="3xl"
        p="4"
        shadow="lg"
      >
        <Flex alignItems="flex-start" justifyContent="flex-start" w="100%">
          <MotionBox animate={{ opacity: [0, 1] }}>
            <Heading fontSize="3xl" fontWeight="semibold" w="full">
              Don't Laugh Challange
            </Heading>
          </MotionBox>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          w="100%"
          h="100%"
        >
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: isTextChanged ? [0, 1] : 1 }}
          >
            <Text w="full">{joke}</Text>
          </MotionBox>
        </Flex>

        <Flex w="100%">
          <Spacer />
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              rounded="xl"
              onClick={nextJoke}
              textColor="white"
              shadow="lg"
              bg="blue.400"
              _hover={{ bg: "blue.500", transform: "translateY(-3px)" }}
            >
              Next
            </Button>
          </MotionBox>
        </Flex>
      </Box>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();

  return {
    props: {
      randomJoke: data?.joke,
    },
  };
};

export default HomePage;
