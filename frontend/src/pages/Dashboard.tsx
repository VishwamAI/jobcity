import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import {
  FiHome, FiMessageSquare, FiBriefcase, FiUser,
  FiBarChart2, FiCalendar, FiSettings, FiHelpCircle, FiMenu
} from 'react-icons/fi';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isWide, setIsWide] = useState(!isMobile);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'chat', icon: FiMessageSquare, label: 'Chat' },
    { id: 'jobs', icon: FiBriefcase, label: 'Job Browser' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
  ];

  const bottomNavItems: NavItem[] = [
    { id: 'settings', icon: FiSettings, label: 'Settings' },
    { id: 'help', icon: FiHelpCircle, label: 'Help' },
  ];

  const toggleWidth = () => {
    if (!isMobile) {
      setIsWide(!isWide);
    }
  };

  return (
    <Box display="flex" width="full" minHeight="100vh" flexDir={{ base: 'column', md: 'row' }}>
      <Flex
        as="aside"
        w={{ base: 'full', md: isWide ? '240px' : '80px' }}
        h={{ base: '64px', md: '100vh' }}
        direction={{ base: 'row', md: 'column' }}
        bg="white"
        p={{ base: 2, md: 4 }}
        borderRight={{ base: 'none', md: '1px' }}
        borderBottom={{ base: '1px', md: 'none' }}
        borderColor="gray.200"
        transition="all 0.2s"
        position={{ base: 'sticky', md: 'fixed' }}
        top="0"
        zIndex="sticky"
      >
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          mb={8}
          justify="flex-start"
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<Icon as={FiMenu} />}
            onClick={toggleWidth}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
        </Flex>

        <Flex
          flex="1"
          direction={{ base: 'row', md: 'column' }}
          justify="space-between"
          align={{ base: 'center', md: 'stretch' }}
        >
          <HStack
            spacing={{ base: 4, md: 2 }}
            align={{ base: 'center', md: 'stretch' }}
            flex="1"
          >
            {navItems.map((item) => (
              <Flex
                key={item.id}
                p={{ base: 2, md: 3 }}
                cursor="pointer"
                borderRadius="md"
                bg={activeTab === item.id ? "brand.50" : "transparent"}
                color={activeTab === item.id ? "brand.500" : "gray.600"}
                onClick={() => setActiveTab(item.id)}
                _hover={{ bg: activeTab === item.id ? "brand.50" : "gray.100" }}
                align="center"
                direction={{ base: 'column', md: 'row' }}
                flex={{ base: '1', md: 'initial' }}
              >
                <Icon as={item.icon} boxSize={{ base: 5, md: 6 }} />
                {(isWide || isMobile) && (
                  <Text
                    fontSize="xs"
                    mt={{ base: 1, md: 0 }}
                    ml={{ base: 0, md: 3 }}
                    display={{ base: 'block', md: isWide ? 'block' : 'none' }}
                  >
                    {item.label}
                  </Text>
                )}
              </Flex>
            ))}
          </HStack>

          <VStack
            spacing={2}
            mt={{ base: 0, md: 'auto' }}
            mb={{ base: 0, md: 8 }}
            display={{ base: 'none', md: 'flex' }}
          >
            {bottomNavItems.map((item) => (
              <IconButton
                key={item.id}
                aria-label={item.label}
                icon={<Icon as={item.icon} boxSize={6} />}
                onClick={() => setActiveTab(item.id)}
                variant="ghost"
                color="gray.600"
                _hover={{ bg: 'gray.100' }}
                w="full"
              />
            ))}
          </VStack>
        </Flex>
      </Flex>

      <Box
        flex="1"
        ml={{ base: 0, md: isWide ? '240px' : '80px' }}
        p={{ base: 4, md: 8 }}
        bg="gray.50"
        minH="100vh"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 4, md: 6 }}
          mb={{ base: 4, md: 6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Application Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleGrid columns={1} spacing={{ base: 4, md: 6 }}>
                <HStack spacing={4}>
                  <Icon as={FiBarChart2} boxSize={{ base: 5, md: 6 }} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="brand.500">28</Text>
                    <Text fontSize="sm" color="gray.600">Auto-Applied Jobs</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={FiBarChart2} boxSize={{ base: 5, md: 6 }} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="brand.500">68%</Text>
                    <Text fontSize="sm" color="gray.600">Success Rate</Text>
                  </VStack>
                </HStack>
                <HStack spacing={4}>
                  <Icon as={FiCalendar} boxSize={{ base: 5, md: 6 }} color="brand.500" />
                  <VStack align="start" spacing={1}>
                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="brand.500">12</Text>
                    <Text fontSize="sm" color="gray.600">Upcoming Interviews</Text>
                  </VStack>
                </HStack>
              </SimpleGrid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <VStack align="stretch" spacing={{ base: 3, md: 4 }}>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold">TechCorp Solutions</Text>
                    <Text fontSize="sm" color="gray.600">Frontend Developer</Text>
                  </VStack>
                  <Text fontSize="sm" color="gray.600">Tomorrow, 10:00 AM</Text>
                </HStack>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="semibold">DataInc Analytics</Text>
                    <Text fontSize="sm" color="gray.600">Full Stack Developer</Text>
                  </VStack>
                  <Text fontSize="sm" color="gray.600">Feb 15, 2:30 PM</Text>
                </HStack>
              </VStack>
            </CardContent>
          </Card>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Dashboard;
