import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Briefcase, User } from 'lucide-react';
import { Box, Flex, IconButton, Tooltip, useMediaQuery } from '@chakra-ui/react';

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
        return <Box>Dashboard Content</Box>;
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
    <Flex direction={isMobile ? 'column' : 'row'} h="100vh">
      <Flex
        as="nav"
        direction={isMobile ? 'row' : 'column'}
        bg="gray.100"
        p={4}
        justifyContent="space-around"
        alignItems="center"
        width={isMobile ? '100%' : '80px'}
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
