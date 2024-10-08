import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Briefcase, User, BarChart2, Activity, Calendar, CheckCircle, Zap } from 'lucide-react';
import {
  Box, Flex, IconButton, Tooltip, useMediaQuery, Heading, Text, SimpleGrid, Progress,
  List, ListItem, ListIcon, Button, Input, Checkbox, CheckboxProps, TooltipProps,
  VStack, HStack, Icon, Grid
} from '@chakra-ui/react';

// Add Todo and NavItem interfaces
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
    { id: 2, text: 'Research company X', completed: true },
    { id: 3, text: 'Prepare for technical interview', completed: false },
  ]);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'jobs', icon: Briefcase, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Box>
            <Heading as="h1" size="xl" mb={6}>Welcome back, User!</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={8} mb={8}>
              {/* Application Statistics */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={6} color="purple.500">Application Statistics</Heading>
                <SimpleGrid columns={3} spacing={6}>
                  <VStack align="start" spacing={2}>
                    <Icon as={Zap} color="purple.500" boxSize={10} />
                    <Text fontSize="sm" color="gray.500">Auto-Applied Jobs</Text>
                    <Text fontSize="4xl" fontWeight="bold" color="purple.500">28</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Icon as={BarChart2} color="purple.500" boxSize={10} />
                    <Text fontSize="sm" color="gray.500">Success Rate</Text>
                    <Text fontSize="4xl" fontWeight="bold" color="purple.500">68%</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Icon as={Calendar} color="purple.500" boxSize={10} />
                    <Text fontSize="sm" color="gray.500">Upcoming Interviews</Text>
                    <Text fontSize="4xl" fontWeight="bold" color="purple.500">3</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
              {/* Upcoming Interviews */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={6} color="purple.500">Upcoming Interviews</Heading>
                <VStack align="stretch" spacing={4}>
                  {[
                    { company: 'TechCorp', date: '15/06/2023', time: '14:00:00' },
                    { company: 'InnoSoft', date: '17/06/2023', time: '10:30:00' },
                    { company: 'DataDynamics', date: '20/06/2023', time: '15:45:00' },
                  ].map((interview, index) => (
                    <Box key={index} bg="white" p={4} borderRadius="md" boxShadow="sm">
                      <Text fontWeight="bold" fontSize="lg">{interview.company}</Text>
                      <Text fontSize="sm" color="gray.500">{`${interview.date}, ${interview.time}`}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Grid>
            {/* Todo List */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
              <Heading as="h2" size="md" mb={6} color="purple.500">Todo List</Heading>
              <VStack align="stretch" spacing={3}>
                {todos.map((todo: Todo) => (
                  <HStack key={todo.id} spacing={4}>
                    <Checkbox
                      isChecked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      colorScheme="purple"
                      size="lg"
                    >
                      <Text as={todo.completed ? 's' : 'span'} fontSize="md">{todo.text}</Text>
                    </Checkbox>
                  </HStack>
                ))}
              </VStack>
              <Button mt={6} colorScheme="purple" size="sm">Add Todo</Button>
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
    <Flex direction={isMobile ? 'column' : 'row'} h="100vh" bg="gray.100">
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
          <Tooltip key={item.id} label={item.label} placement={isMobile ? 'bottom' : 'right'} hasArrow>
            <IconButton
              aria-label={item.label}
              icon={<item.icon />}
              onClick={() => setActiveTab(item.id)}
              variant={activeTab === item.id ? 'solid' : 'ghost'}
              colorScheme={activeTab === item.id ? 'purple' : 'gray'}
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
