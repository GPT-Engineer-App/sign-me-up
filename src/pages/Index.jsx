import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, useToast, VStack } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backengine-c6ps.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Account created.",
          description: "Your account has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Sign Up
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account? <a href="/login">Log in</a>
      </Text>
    </Box>
  );
};

export default Index;
