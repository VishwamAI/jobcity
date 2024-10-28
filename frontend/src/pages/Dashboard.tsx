import React, { useState } from 'react';
import {
  Box, Checkbox, Flex, Heading, HStack, Icon,
  SimpleGrid, Text, VStack, IconButton, useMediaQuery,
  Spacer
} from '@chakra-ui/react';
import { FiHome, FiMessageSquare, FiBriefcase, FiUser, FiMoon, FiLogOut, FiBarChart2, FiCalendar, FiSettings, FiHelpCircle, FiEdit, FiZap } from 'react-icons/fi';

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

const initialTodos: Todo[] = [
  { id: 1, text: 'Update resume', completed: false },
  { id: 2, text: 'Prepare for TechCorp interview', completed: false },
  { id: 3, text: 'Follow up on DataInc application', completed: false },
  { id: 4, text: 'Research WebSolutions company culture', completed: false },
];

const Dashboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard' },
    { id: 'chat', icon: FiMessageSquare, label: 'Chat' },
    { id: 'jobs', icon: FiBriefcase, label: 'Job Browser' },
    { id: 'profile', icon: FiUser, label: 'Profile' },
    { id: 'settings', icon: FiSettings, label: 'Settings' },
    { id: 'help', icon: FiHelpCircle, label: 'Help' },
  ];

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  return (
    <Flex direction="column" h="100vh">
      <Flex as="nav" bg="gray.800" py={3} px={6} alignItems="center" pl={6}>
        {navItems.map((item) => (
          <Flex
            key={item.id}
            alignItems="center"
            px={4}
            py={2}
            cursor="pointer"
            bg={item.id === 'dashboard' ? "blue.600" : "transparent"}
            color={item.id === 'dashboard' ? "white" : "gray.300"}
            onClick={() => setActiveTab(item.id)}
            _hover={item.id !== 'dashboard' ? { bg: "gray.700" } : {}}
            mr={5}
          >
            <Icon as={item.icon} boxSize={6} mr={3} />
            <Text fontWeight={item.id === 'dashboard' ? "semibold" : "normal"} fontSize="14px">{item.label}</Text>
          </Flex>
        ))}
        <Spacer />
        <IconButton
          aria-label="Toggle Dark Mode"
          icon={<Icon as={FiMoon} boxSize={6} />}
          onClick={() => {/* Implement dark mode toggle */}}
          variant="ghost"
          color="gray.300"
          _hover={{ bg: "gray.700" }}
          mr={3}
        />
        <IconButton
          aria-label="Logout"
          icon={<Icon as={FiLogOut} boxSize={6} />}
          onClick={() => {/* Implement logout */}}
          variant="ghost"
          color="gray.300"
          _hover={{ bg: "gray.700" }}
        />
      </Flex>
      <Box flex="1" p={8} bg="gray.50" overflowY="auto">
        <SimpleGrid columns={isMobile ? 1 : 2} spacing={8} mb={8}>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md" _hover={{ boxShadow: "lg" }}>
            <Heading as="h3" size="md" mb={6} color="purple.500">Application Statistics</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
              <VStack align="start" spacing={2}>
                <HStack spacing={3}>
                  <Icon as={FiZap} boxSize={6} color="purple.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">28</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">Auto-Applied Jobs</Text>
              </VStack>
              <VStack align="start" spacing={2}>
                <HStack spacing={3}>
                  <Icon as={FiBarChart2} boxSize={6} color="purple.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">68%</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">Success Rate</Text>
              </VStack>
              <VStack align="start" spacing={2}>
                <HStack spacing={3}>
                  <Icon as={FiCalendar} boxSize={6} color="purple.500" />
                  <Text fontSize="2xl" fontWeight="bold" color="purple.500">3</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">Upcoming Interviews</Text>
              </VStack>
            </SimpleGrid>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="md" _hover={{ boxShadow: "lg" }}>
            <Heading as="h3" size="md" mb={4} color="purple.500">Upcoming Interviews</Heading>
            <VStack align="stretch" spacing={4}>
              {[
                { company: 'TechCorp', date: '15/06/2023, 14:00:00' },
                { company: 'InnoSoft', date: '17/06/2023, 10:30:00' },
                { company: 'DataDynamics', date: '20/06/2023, 15:45:00' },
              ].map((interview, index) => (
                <HStack key={index} justify="space-between" p={2} _hover={{ bg: "purple.50" }}>
                  <Text fontWeight="bold">{interview.company}</Text>
                  <Text fontSize="sm" color="gray.500">{interview.date}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" _hover={{ boxShadow: "lg" }}>
          <Heading as="h3" size="md" mb={4} color="purple.500">Todo List</Heading>
          <VStack align="stretch" spacing={2}>
            {todos.map((todo) => (
              <HStack key={todo.id} justify="space-between" p={2} _hover={{ bg: "purple.50" }}>
                <Checkbox
                  isChecked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  colorScheme="purple"
                >
                  <Text as={todo.completed ? "s" : "span"}>{todo.text}</Text>
                </Checkbox>
                <IconButton
                  aria-label="Edit todo"
                  icon={<Icon as={FiEdit} />}
                  size="sm"
                  variant="ghost"
                  _hover={{ color: "purple.500" }}
                />
              </HStack>
            ))}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;
