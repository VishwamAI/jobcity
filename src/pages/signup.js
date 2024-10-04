import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg="gray.50" py={12} px={4}>
        <Head>
          <title>Sign Up - Job-City</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <VStack spacing={8} mx="auto" maxW="lg" minW="sm">
          <Heading as="h1" size="xl">
            Create your account
          </Heading>

          <Box bg="white" p={8} rounded="md" w="full">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>

                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                {error && (
                  <Text color="red.500" fontSize="sm">
                    {error}
                  </Text>
                )}

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  mt={4}
                >
                  Sign Up
                </Button>
              </VStack>
            </form>

            <Text mt={4} textAlign="center">
              Already have an account?{' '}
              <Link color="blue.500" href="/login">
                Log in
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
