import React, { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useMediaQuery,
  VStack,
  Badge,
} from '@chakra-ui/react';
import {
  FiHome, FiMessageSquare, FiBriefcase, FiUser,
  FiBarChart2, FiCalendar, FiSettings, FiHelpCircle, FiMenu,
  FiCheckCircle, FiTrendingUp
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
      {/* Sidebar */}
      <Flex
        as="aside"
        w={{ base: 'full', md: isWide ? '240px' : '70px' }}
        h={{ base: '64px', md: '100vh' }}
        direction={{ base: 'row', md: 'column' }}
        bg="white"
        borderRight="1px"
        borderColor="gray.200"
        p={{ base: 2, md: 4 }}
        position={{ base: 'sticky', md: 'fixed' }}
        top="0"
        zIndex="sticky"
      >
        {/* Toggle Button */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          mb={6}
          justify="flex-start"
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<Icon as={FiMenu} color="gray.600" />}
            onClick={toggleWidth}
            variant="ghost"
            _hover={{ bg: 'gray.100' }}
          />
        </Flex>

        {/* Navigation Items */}
        <Flex
          flex="1"
          direction={{ base: 'row', md: 'column' }}
          justify="space-between"
          align={{ base: 'center', md: 'stretch' }}
        >
          <VStack
            spacing={{ base: 4, md: 2 }}
            align={{ base: 'center', md: 'stretch' }}
            flex="1"
            w="full"
          >
            {navItems.map((item) => (
              <Flex
                key={item.id}
                p={3}
                cursor="pointer"
                borderRadius="md"
                bg={activeTab === item.id ? "brand.50" : "transparent"}
                color={activeTab === item.id ? "brand.500" : "gray.600"}
                onClick={() => setActiveTab(item.id)}
                _hover={{ bg: "brand.50", color: "brand.500" }}
                align="center"
                justify={isWide ? "flex-start" : "center"}
                w="full"
                role="button"
                aria-selected={activeTab === item.id}
                tabIndex={0}
              >
                <Icon as={item.icon} boxSize={5} aria-hidden="true" />
                {(isWide || isMobile) && (
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    ml={3}
                    display={{ base: 'block', md: isWide ? 'block' : 'none' }}
                  >
                    {item.label}
                  </Text>
                )}
              </Flex>
            ))}
          </VStack>

          {/* Bottom Navigation Items */}
          <VStack
            spacing={2}
            mt={{ base: 0, md: 'auto' }}
            mb={{ base: 0, md: 4 }}
            display={{ base: 'none', md: 'flex' }}
            w="full"
          >
            {bottomNavItems.map((item) => (
              <Flex
                key={item.id}
                p={3}
                cursor="pointer"
                borderRadius="md"
                color="gray.600"
                onClick={() => setActiveTab(item.id)}
                _hover={{ bg: "brand.50", color: "brand.500" }}
                align="center"
                justify={isWide ? "flex-start" : "center"}
                w="full"
                role="button"
                aria-selected={activeTab === item.id}
                tabIndex={0}
              >
                <Icon as={item.icon} boxSize={5} aria-hidden="true" />
                {isWide && (
                  <Text fontSize="sm" fontWeight="medium" ml={3}>
                    {item.label}
                  </Text>
                )}
              </Flex>
            ))}
          </VStack>
        </Flex>
      </Flex>

      {/* Main Content */}
      <Box
        flex="1"
        ml={{ base: 0, md: isWide ? '240px' : '70px' }}
        p={{ base: 4, md: 6 }}
        bg="gray.50"
        minH="100vh"
      >
        <VStack spacing={6} align="stretch" maxW="1200px" mx="auto">
          {/* Application Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Application Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <HStack spacing={8} align="stretch" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                <Box flex="1" minW={{ base: 'full', md: '0' }}>
                  <HStack spacing={4}>
                    <Icon as={FiCheckCircle} boxSize={6} color="brand.500" aria-hidden="true" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">28</Text>
                      <Text fontSize="sm" color="gray.600">Auto-Applied Jobs</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box flex="1" minW={{ base: 'full', md: '0' }}>
                  <HStack spacing={4}>
                    <Icon as={FiTrendingUp} boxSize={6} color="brand.500" aria-hidden="true" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">68%</Text>
                      <Text fontSize="sm" color="gray.600">Success Rate</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box flex="1" minW={{ base: 'full', md: '0' }}>
                  <HStack spacing={4}>
                    <Icon as={FiCalendar} boxSize={6} color="brand.500" aria-hidden="true" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">12</Text>
                      <Text fontSize="sm" color="gray.600">Upcoming Interviews</Text>
                    </VStack>
                  </HStack>
                </Box>
              </HStack>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              <VStack align="stretch" spacing={4}>
                <Box p={4} bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" color="gray.800">TechCorp Solutions</Text>
                      <Text fontSize="sm" color="gray.600">Frontend Developer</Text>
                      <Badge colorScheme="brand" mt={1}>Tomorrow, 10:00 AM</Badge>
                    </VStack>
                    <Icon as={FiCalendar} color="brand.500" boxSize={5} aria-hidden="true" />
                  </HStack>
                </Box>
                <Box p={4} bg="white" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold" color="gray.800">DataInc Analytics</Text>
                      <Text fontSize="sm" color="gray.600">Full Stack Developer</Text>
                      <Badge colorScheme="brand" mt={1}>Feb 15, 2:30 PM</Badge>
                    </VStack>
                    <Icon as={FiCalendar} color="brand.500" boxSize={5} aria-hidden="true" />
                  </HStack>
                </Box>
              </VStack>
            </CardContent>
          </Card>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
