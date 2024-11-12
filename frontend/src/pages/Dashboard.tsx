import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
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
  const [isWide, setIsWide] = useState(true);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'chat', icon: FiMessageSquare, label: 'Chat' },
    { id: 'jobs', icon: FiBriefcase, label: 'Job Browser' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
    { id: 'settings', icon: FiSettings, label: 'Settings' },
    { id: 'help', icon: FiHelpCircle, label: 'Help' },
  ];

  const toggleWidth = () => {
    setIsWide(!isWide);
  };

  return (
    <Box display="flex" width="full" minHeight="100vh">
      <Flex
        as="aside"
        w={isWide ? '240px' : '80px'}
        direction="column"
        bg="white"
        p={4}
        borderRight="1px"
        borderColor="gray.200"
        transition="width 0.2s"
      >
        <Flex align="center" mb={8}>
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<Icon as={FiMenu} />}
            onClick={toggleWidth}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
        </Flex>
        <VStack spacing={2} align="stretch">
          {navItems.map((item) => (
            <Flex
              key={item.id}
              p={3}
              cursor="pointer"
              borderRadius="md"
              bg={activeTab === item.id ? "brand.50" : "transparent"}
              color={activeTab === item.id ? "brand.500" : "gray.600"}
              onClick={() => setActiveTab(item.id)}
              _hover={{ bg: activeTab === item.id ? "brand.50" : "gray.100" }}
              align="center"
            >
              <Icon as={item.icon} boxSize={6} />
              {isWide && (
                <Text ml={4} fontSize="sm" fontWeight="medium">
                  {item.label}
                </Text>
              )}
            </Flex>
          ))}
        </VStack>
        <VStack spacing={4} mt="auto" mb={8} align="stretch">
          <IconButton
            aria-label="Settings"
            icon={<Icon as={FiSettings} boxSize={6} />}
            onClick={() => setActiveTab('settings')}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
          <IconButton
            aria-label="Help"
            icon={<Icon as={FiHelpCircle} boxSize={6} />}
            onClick={() => setActiveTab('help')}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
          />
        </VStack>
      </Flex>
      <Box flex="1" p={8} bg="gray.50">
        <Box maxW="7xl" mx="auto">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Card>
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleGrid columns={1} spacing={6}>
                  <HStack spacing={4}>
                    <Icon as={FiBarChart2} boxSize={6} color="brand.500" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">28</Text>
                      <Text fontSize="sm" color="gray.600">Auto-Applied Jobs</Text>
                    </VStack>
                  </HStack>
                  <HStack spacing={4}>
                    <Icon as={FiBarChart2} boxSize={6} color="brand.500" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">68%</Text>
                      <Text fontSize="sm" color="gray.600">Success Rate</Text>
                    </VStack>
                  </HStack>
                  <HStack spacing={4}>
                    <Icon as={FiCalendar} boxSize={6} color="brand.500" />
                    <VStack align="start" spacing={1}>
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">12</Text>
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
                <VStack align="stretch" spacing={4}>
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
    </Box>
  );
};

export default Dashboard;
