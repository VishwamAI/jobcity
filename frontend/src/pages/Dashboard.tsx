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
  FiBarChart2, FiCalendar, FiSettings, FiHelpCircle, FiEdit, FiZap
} from 'react-icons/fi';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';

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






    <div className='flex  w-full min-h-screen '>
      <Flex as="nav" py={2} alignItems="center" className={`${isWide ? 'w-64' : 'w-20'} flex flex-col w-20 shadow-2xl border-r-2 `}>
      <button
                onClick={toggleWidth}
                className={` text-black rounded transition-all duration-600`}
            >

            </button>
        {navItems.map((item) => (
          <Flex
            key={item.id}
            alignItems="center"
            onClick={() => setActiveTab(item.id)}
            _hover={item.id !== 'dashboard' ? { bg: "gray.700", } : {bg:"gray.700"}}
            className=' hover:rounded-md hover:text-white mt-3'
            cursor={"pointer"}

          >
               
            <div className='flex justify-between m-2  items-center  '>

        
            <div>  <Icon as={item.icon} boxSize={6}  /></div>
              {/* <p className={``}>{item.label}</p> */}
            </div>
          </Flex>
        ))}

        <IconButton
          aria-label="Toggle Dark Mode"
          icon={<Icon as={FiMoon} boxSize={6} />}
          onClick={() => { }}
          variant="ghost"
          color="gray.800"
          _hover={{ bg: "gray.700" }}
          className='mt-2 hover:text-white'

        />



        <IconButton
          aria-label="Logout"
          icon={<Icon as={FiLogOut} boxSize={6} />}
          onClick={() => { }}
          variant="ghost"
          color="gray.800"
          _hover={{ bg: "gray.700" }}
          className='mt-2 hover:text-white'
        />
        <Spacer />

      </Flex>
      <div className='flex  flex-col w-full min-h-screen bg-yellow-600 '>
        <Box flex="1" p={8} bg="gray.50" overflowY="auto">
          <SimpleGrid columns={isMobile ? 1 : 3} spacing={6} mb={8}>
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
      </div>

    </div>


  );
};

export default Dashboard;
