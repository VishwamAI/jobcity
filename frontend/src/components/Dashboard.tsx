import React, { useState } from 'react';
import {
  Box, Button, Checkbox, Flex, Grid, Heading, HStack, Icon,
  SimpleGrid, Text, useMediaQuery, VStack, IconButton, Tooltip
} from '@chakra-ui/react';
import { FiHome, FiMessageSquare, FiBriefcase, FiUser, FiMoon, FiLogOut } from 'react-icons/fi';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Update resume', completed: false },
    { id: 2, text: 'Prepare for TechCorp interview', completed: false },
    { id: 3, text: 'Follow up on DataInc application', completed: false },
    { id: 4, text: 'Research WebSolutions company culture', completed: false },
  ]);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'chat', icon: FiMessageSquare, label: 'Chat' },
    { id: 'jobs', icon: FiBriefcase, label: 'Job Browser' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
  ];

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Box>
            <SimpleGrid columns={2} spacing={8} mb={8}>
              {/* Application Statistics */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h3" size="md" mb={6} color="purple.500">Application Statistics</Heading>
                <SimpleGrid columns={3} spacing={4}>
                  <VStack align="start">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.500">28</Text>
                    <Text fontSize="sm" color="gray.500">Auto-Applied Jobs</Text>
                  </VStack>
                  <VStack align="start">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.500">68%</Text>
                    <Text fontSize="sm" color="gray.500">Success Rate</Text>
                  </VStack>
                  <VStack align="start">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.500">3</Text>
                    <Text fontSize="sm" color="gray.500">Upcoming Interviews</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
              {/* Upcoming Interviews */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={6} color="purple.500">Upcoming Interviews</Heading>
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">TechCorp</Text>
                    <Text>15/06/2023, 14:00:00</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">InnoSoft</Text>
                    <Text>17/06/2023, 10:30:00</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="bold">DataDynamics</Text>
                    <Text>20/06/2023, 15:45:00</Text>
                  </HStack>
                </VStack>
              </Box>
            </SimpleGrid>

            {/* Todo List */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width="100%">
              <Heading as="h2" size="md" mb={6} color="purple.500">Todo List</Heading>
              <VStack align="stretch" spacing={3}>
                {todos.map((todo: Todo) => (
                  <HStack key={todo.id}>
                    <Checkbox
                      isChecked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      size="lg"
                      colorScheme="purple"
                    />
                    <Text>{todo.text}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
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
    <Flex direction={isMobile ? "column" : "row"}>
      <Box as="nav" width={isMobile ? "100%" : "80px"} bg="white" p={4} boxShadow="md">
        <VStack spacing={8} align="center" h="100%" justify="space-between">
          <VStack spacing={8}>
            <Box as="img" src="/logo.png" alt="JobCity Logo" w="50px" h="50px" />
            {navItems.map((item) => (
              <Tooltip key={item.id} label={item.label} placement="right" hasArrow>
                <IconButton
                  aria-label={item.label}
                  icon={<Icon as={item.icon} boxSize={6} />}
                  onClick={() => setActiveTab(item.id)}
                  variant={activeTab === item.id ? "solid" : "ghost"}
                  colorScheme={activeTab === item.id ? "purple" : "gray"}
                  isRound
                  size="lg"
                />
              </Tooltip>
            ))}
          </VStack>
          <VStack spacing={4}>
            <IconButton
              aria-label="Toggle Dark Mode"
              icon={<FiMoon size={24} />}
              onClick={() => {/* Implement dark mode toggle */}}
              variant="ghost"
              colorScheme="gray"
              isRound
              size="lg"
            />
            <IconButton
              aria-label="Logout"
              icon={<FiLogOut size={24} />}
              onClick={() => {/* Implement logout */}}
              variant="ghost"
              colorScheme="gray"
              isRound
              size="lg"
            />
          </VStack>
        </VStack>
      </Box>
      <Box flex={1} p={8} bg="gray.50">
        {renderContent()}
      </Box>
    </Flex>
  );
};

export default Dashboard;
