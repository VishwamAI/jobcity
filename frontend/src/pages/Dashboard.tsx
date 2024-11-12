import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  IconButton,
  useMediaQuery,
  Spacer
} from '@chakra-ui/react';
import {
  FiHome, FiMessageSquare, FiBriefcase, FiUser, FiMoon, FiLogOut,
  FiBarChart2, FiCalendar, FiSettings, FiHelpCircle, FiEdit, FiZap, FiMenu
} from 'react-icons/fi';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';

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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isWide, setIsWide] = useState(true);

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

  const toggleWidth = () => {
    setIsWide(!isWide);
  };

  return (
    <div className='flex w-full min-h-screen'>
      <Flex
        as="nav"
        direction="column"
        bg="white"
        py={4}
        px={2}
        h="100vh"
        position="sticky"
        top={0}
        className={`${isWide ? 'w-64' : 'w-20'} shadow-lg transition-all duration-300 ease-in-out`}
      >
        <IconButton
          aria-label="Toggle Sidebar"
          icon={<Icon as={FiMenu} boxSize={6} />}
          onClick={toggleWidth}
          variant="ghost"
          color="gray.600"
          alignSelf={isWide ? "flex-end" : "center"}
          mb={6}
          _hover={{ bg: "gray.100" }}
        />
        <VStack spacing={4} align="stretch">
          {navItems.map((item) => (
            <Flex
              key={item.id}
              alignItems="center"
              p={3}
              cursor="pointer"
              borderRadius="md"
              bg={activeTab === item.id ? "brand.50" : "transparent"}
              color={activeTab === item.id ? "brand.500" : "gray.600"}
              _hover={{ bg: "gray.100", color: "brand.500" }}
              onClick={() => setActiveTab(item.id)}
              transition="all 0.2s"
            >
              <Icon as={item.icon} boxSize={6} />
              {isWide && (
                <Text ml={4} fontWeight="medium">
                  {item.label}
                </Text>
              )}
            </Flex>
          ))}
        </VStack>
        <Spacer />
        <VStack spacing={4} mt={8} align="stretch">
          <IconButton
            aria-label="Toggle Dark Mode"
            icon={<Icon as={FiMoon} boxSize={6} />}
            onClick={() => {}}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: "gray.100", color: "brand.500" }}
            alignSelf={isWide ? "flex-start" : "center"}
          />
          <IconButton
            aria-label="Logout"
            icon={<Icon as={FiLogOut} boxSize={6} />}
            onClick={() => {}}
            variant="ghost"
            color="gray.600"
            _hover={{ bg: "gray.100", color: "brand.500" }}
            alignSelf={isWide ? "flex-start" : "center"}
          />
        </VStack>
      </Flex>
      <Box flex="1">
        <Box p={8} bg="gray.50" minH="100vh">
          <SimpleGrid columns={isMobile ? 1 : 2} spacing={8} mb={8}>
            <Card>
              <CardHeader>
                <CardTitle>Application Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleGrid columns={1} spacing={6}>
                  <HStack spacing={4}>
                    <Icon as={FiZap} boxSize={6} color="brand.500" />
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
                      <Text fontSize="2xl" fontWeight="bold" color="brand.500">3</Text>
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
                  {[
                    { company: 'TechCorp', date: '15/06/2023, 14:00:00' },
                    { company: 'InnoSoft', date: '17/06/2023, 10:30:00' },
                    { company: 'DataDynamics', date: '20/06/2023, 15:45:00' },
                  ].map((interview, index) => (
                    <HStack
                      key={index}
                      justify="space-between"
                      p={3}
                      borderRadius="md"
                      _hover={{ bg: "gray.50" }}
                      transition="background 0.2s"
                    >
                      <Text fontWeight="semibold">{interview.company}</Text>
                      <Text fontSize="sm" color="gray.500">{interview.date}</Text>
                    </HStack>
                  ))}
                </VStack>
              </CardContent>
            </Card>
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
      </Box>
    </div>
  );
};

export default Dashboard;
