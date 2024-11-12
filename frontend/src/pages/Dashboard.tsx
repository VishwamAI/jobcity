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
  Divider,
} from '@chakra-ui/react';
import {
  FiHome, FiMessageSquare, FiBriefcase, FiUser,
  FiCalendar, FiSettings, FiHelpCircle, FiMenu,
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
        w={{ base: 'full', md: isWide ? '280px' : '80px' }}
        h={{ base: '64px', md: '100vh' }}
        direction={{ base: 'row', md: 'column' }}
        bg="#F8FAFC"
        borderRight="1px"
        borderColor="gray.200"
        boxShadow="sm"
        p={{ base: 3, md: 5 }}
        position={{ base: 'sticky', md: 'fixed' }}
        top="0"
        zIndex="sticky"
        transition="all 0.3s ease"
      >
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          mb={8}
          justify="flex-start"
        >
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<Icon as={FiMenu} color="#6366F1" boxSize={6} />}
            onClick={toggleWidth}
            variant="ghost"
            size="lg"
            _hover={{ bg: '#EEF2FF' }}
            _active={{ bg: '#E0E7FF' }}
          />
        </Flex>

        <Flex
          flex="1"
          direction={{ base: 'row', md: 'column' }}
          justify="space-between"
          align={{ base: 'center', md: 'stretch' }}
        >
          <VStack
            spacing={{ base: 4, md: 3 }}
            align={{ base: 'center', md: 'stretch' }}
            flex="1"
            w="full"
          >
            {navItems.map((item) => (
              <Flex
                key={item.id}
                p={4}
                cursor="pointer"
                borderRadius="xl"
                bg={activeTab === item.id ? "#EEF2FF" : "transparent"}
                color={activeTab === item.id ? "#6366F1" : "gray.600"}
                onClick={() => setActiveTab(item.id)}
                _hover={{ bg: "#EEF2FF", color: "#6366F1" }}
                align="center"
                justify={isWide ? "flex-start" : "center"}
                w="full"
                role="button"
                aria-selected={activeTab === item.id}
                tabIndex={0}
                transition="all 0.2s ease"
              >
                <Icon as={item.icon} boxSize={6} aria-hidden="true" />
                {(isWide || isMobile) && (
                  <Text
                    fontSize="md"
                    fontWeight={activeTab === item.id ? "semibold" : "medium"}
                    ml={4}
                    display={{ base: 'block', md: isWide ? 'block' : 'none' }}
                  >
                    {item.label}
                  </Text>
                )}
              </Flex>
            ))}
          </VStack>

          <VStack
            spacing={3}
            mt={{ base: 0, md: 'auto' }}
            mb={{ base: 0, md: 4 }}
            display={{ base: 'none', md: 'flex' }}
            w="full"
          >
            <Divider />
            {bottomNavItems.map((item) => (
              <Flex
                key={item.id}
                p={4}
                cursor="pointer"
                borderRadius="xl"
                bg={activeTab === item.id ? "#EEF2FF" : "transparent"}
                color={activeTab === item.id ? "#6366F1" : "gray.600"}
                onClick={() => setActiveTab(item.id)}
                _hover={{ bg: "#EEF2FF", color: "#6366F1" }}
                align="center"
                justify={isWide ? "flex-start" : "center"}
                w="full"
                role="button"
                aria-selected={activeTab === item.id}
                tabIndex={0}
                transition="all 0.2s ease"
              >
                <Icon as={item.icon} boxSize={6} aria-hidden="true" />
                {isWide && (
                  <Text
                    fontSize="md"
                    fontWeight={activeTab === item.id ? "semibold" : "medium"}
                    ml={4}
                  >
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
                <Box flex="1" minW={{ base: 'full', md: '0' }} p={10} borderRadius="xl" bg="white" boxShadow="lg" border="1px" borderColor="gray.100" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <HStack spacing={8}>
                    <Icon as={FiCheckCircle} boxSize={10} color="#6366F1" aria-hidden="true" />
                    <VStack align="start" spacing={2}>
                      <Text fontSize="4xl" fontWeight="bold" color="#6366F1">28</Text>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">Auto-Applied Jobs</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box flex="1" minW={{ base: 'full', md: '0' }} p={10} borderRadius="xl" bg="white" boxShadow="lg" border="1px" borderColor="gray.100" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <HStack spacing={8}>
                    <Icon as={FiTrendingUp} boxSize={10} color="#6366F1" aria-hidden="true" />
                    <VStack align="start" spacing={2}>
                      <Text fontSize="4xl" fontWeight="bold" color="#6366F1">68%</Text>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">Success Rate</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box flex="1" minW={{ base: 'full', md: '0' }} p={10} borderRadius="xl" bg="white" boxShadow="lg" border="1px" borderColor="gray.100" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <HStack spacing={8}>
                    <Icon as={FiCalendar} boxSize={10} color="#6366F1" aria-hidden="true" />
                    <VStack align="start" spacing={2}>
                      <Text fontSize="4xl" fontWeight="bold" color="#6366F1">12</Text>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">Upcoming Interviews</Text>
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
              <VStack align="stretch" spacing={6}>
                <Box p={8} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.100" boxShadow="lg" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={4}>
                      <Text fontWeight="bold" fontSize="xl" color="gray.800">TechCorp Solutions</Text>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">Frontend Developer</Text>
                      <Badge bg="#6366F1" color="white" mt={2} borderRadius="full" px={6} py={2} fontSize="sm" fontWeight="semibold">
                        TOMORROW, 10:00 AM
                      </Badge>
                    </VStack>
                    <Icon as={FiCalendar} color="#6366F1" boxSize={8} aria-hidden="true" />
                  </HStack>
                </Box>
                <Box p={8} bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.100" boxShadow="lg" _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }} transition="all 0.2s">
                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={4}>
                      <Text fontWeight="bold" fontSize="xl" color="gray.800">DataInc Analytics</Text>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">Full Stack Developer</Text>
                      <Badge bg="#6366F1" color="white" mt={2} borderRadius="full" px={6} py={2} fontSize="sm" fontWeight="semibold">
                        FEB 15, 2:30 PM
                      </Badge>
                    </VStack>
                    <Icon as={FiCalendar} color="#6366F1" boxSize={8} aria-hidden="true" />
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
