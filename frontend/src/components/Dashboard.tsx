import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Briefcase, User, BarChart2, Activity } from 'lucide-react';
import { Box, Flex, IconButton, Tooltip, useMediaQuery, Heading, Text, SimpleGrid, Progress } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'jobs', icon: Briefcase, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Box>
            <Heading as="h1" size="xl" mb={6}>Welcome back, User!</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={4}>Job Application Stats</Heading>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text>Applications Sent</Text>
                  <Text fontWeight="bold">28</Text>
                </Flex>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text>Interviews Scheduled</Text>
                  <Text fontWeight="bold">3</Text>
                </Flex>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text>Success Rate</Text>
                  <Text fontWeight="bold">68%</Text>
                </Flex>
                <Progress value={68} colorScheme="green" />
              </Box>
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={4}>Recent Activity</Heading>
                {['Applied to TechCorp', 'Interview scheduled with InnoSoft', 'Updated resume'].map((activity, index) => (
                  <Flex key={index} align="center" mb={3}>
                    <Activity size={16} style={{ marginRight: '8px' }} />
                    <Text>{activity}</Text>
                  </Flex>
                ))}
              </Box>
            </SimpleGrid>
          </Box>
        );
      case 'chat':
        return <Box>Chat Content</Box>;
      case 'jobs':
        return <Box>Job Browser Content</Box>;
      case 'profile':
        return <Box>Profile Content</Box>;
      default:
        return null;
    }
  };

  return (
    <Flex direction={isMobile ? 'column' : 'row'} h="100vh" bg="gray.50">
      <Flex
        as="nav"
        direction={isMobile ? 'row' : 'column'}
        bg="white"
        p={4}
        justifyContent="space-around"
        alignItems="center"
        width={isMobile ? '100%' : '80px'}
        boxShadow="md"
      >
        {navItems.map((item) => (
          <Tooltip key={item.id} label={item.label} placement={isMobile ? 'bottom' : 'right'}>
            <IconButton
              aria-label={item.label}
              icon={<item.icon />}
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? 'solid' : 'ghost'}
              colorScheme={activeTab === item.id ? 'blue' : 'gray'}
              size="lg"
              mb={isMobile ? 0 : 4}
            />
          </Tooltip>
        ))}
      </Flex>
      <Box flex={1} p={8} overflowY="auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </Box>
    </Flex>
  );
};

export default Dashboard;
