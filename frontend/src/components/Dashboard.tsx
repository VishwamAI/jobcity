import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageSquare, Briefcase, User, BarChart2, Activity, Calendar, CheckCircle } from 'lucide-react';
import {
  Box, Flex, IconButton, Tooltip, useMediaQuery, Heading, Text, SimpleGrid, Progress,
  List, ListItem, ListIcon, Button, Input, Checkbox, CheckboxProps, TooltipProps
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
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {/* Job Application Stats */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={4}>Job Application Stats</Heading>
                <List spacing={3}>
                  <ListItem>
                    <Flex justify="space-between">
                      <Text>Applications Sent</Text>
                      <Text fontWeight="bold">28</Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex justify="space-between">
                      <Text>Interviews Scheduled</Text>
                      <Text fontWeight="bold">3</Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex justify="space-between">
                      <Text>Offers Received</Text>
                      <Text fontWeight="bold">1</Text>
                    </Flex>
                  </ListItem>
                </List>
                <Text mt={4} mb={2}>Application Success Rate</Text>
                <Progress value={68} colorScheme="green" borderRadius="full" />
                <Text mt={2} textAlign="right" fontWeight="bold" color="green.500">68%</Text>
              </Box>
              {/* Upcoming Interviews */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={4}>Upcoming Interviews</Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={Calendar} color="green.500" />
                    <Text as="span" fontWeight="bold">TechCorp</Text> - Software Engineer (May 15, 2023)
                  </ListItem>
                  <ListItem>
                    <ListIcon as={Calendar} color="green.500" />
                    <Text as="span" fontWeight="bold">InnoSoft</Text> - Full Stack Developer (May 18, 2023)
                  </ListItem>
                  <ListItem>
                    <ListIcon as={Calendar} color="green.500" />
                    <Text as="span" fontWeight="bold">DataDynamics</Text> - Data Scientist (May 22, 2023)
                  </ListItem>
                </List>
              </Box>
              {/* Todo List */}
              <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="md" mb={4}>Todo List</Heading>
                <List spacing={3}>
                  {todos.map((todo: Todo) => (
                    <ListItem key={todo.id}>
                      <Checkbox
                        isChecked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        colorScheme="green"
                      >
                        <Text as={todo.completed ? 's' : 'span'}>{todo.text}</Text>
                      </Checkbox>
                    </ListItem>
                  ))}
                </List>
                <Button mt={4} colorScheme="blue" size="sm">Add Todo</Button>
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
          <Tooltip key={item.id} label={item.label} placement={isMobile ? 'bottom' : 'right'} hasArrow>
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
