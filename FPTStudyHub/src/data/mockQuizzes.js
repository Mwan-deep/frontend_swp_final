// mockQuizzes.js
// Mock data for FPT Study Hub Knowledge Check Quizzes with Access Modes, Questions, and Management Stats

export const INITIAL_QUIZZES = [
  {
    id: 'QZ001',
    code: 'CSD201',
    subject: 'Computer Science',
    difficulty: 'INTERMEDIATE',
    title: 'CSD201 - Quiz 1: Algorithms',
    source: 'CS201 Lecture Notes - Week 5',
    questionsCount: 25,
    attempts: 128,
    averageScore: 8.2,
    mostWrongQuestion: 'Q14',
    topPerformer: 'An (9.5)',
    publishStatus: 'ready',
    createdDate: '12/10/2023',
    duration: 10,
    status: 'completed',
    score: 92,
    accessMode: 'public',
    questions: [
      {
        id: 1,
        text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        hint: "Think about how the search space is divided in half at each step."
      },
      {
        id: 2,
        text: "Which of the following data structures works on the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correct: 1,
        hint: "Think about piling plates on top of each other."
      },
      {
        id: 3,
        text: "What is the worst-case time complexity of the Quick Sort algorithm?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correct: 2,
        hint: "This happens when the pivot chosen is consistently the smallest or largest element."
      },
      {
        id: 4,
        text: "Which data structure uses a hash function to map keys to values?",
        options: ["Hash Map", "Heap", "Linked List", "Trie"],
        correct: 0,
        hint: "It provides O(1) average time complexity for insertions and lookups."
      },
      {
        id: 5,
        text: "What is the primary benefit of a doubly linked list over a singly linked list?",
        options: ["Uses less memory", "Allows traversal in both directions", "Has O(1) random access time", "Easier to implement"],
        correct: 1,
        hint: "Each node in a doubly linked list contains two pointers instead of one."
      }
    ]
  },
  {
    id: 'QZ002',
    code: 'DBI202',
    subject: 'Software Engineering',
    difficulty: 'BEGINNER',
    title: 'DBI202 - SQL Mastery',
    source: 'Intro to Scripting Docs',
    questionsCount: 40,
    attempts: 56,
    averageScore: 7.5,
    mostWrongQuestion: 'Q05',
    topPerformer: 'Binh (10)',
    publishStatus: 'ready',
    createdDate: '08/10/2023',
    duration: 8,
    status: 'in-progress',
    completedQuestions: 3,
    accessMode: 'public',
    questions: [
      {
        id: 1,
        text: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        correct: 2,
        hint: "It is a three-letter abbreviation."
      },
      {
        id: 2,
        text: "What is the correct way to output text to the console in Python?",
        options: ["console.log('hello')", "print('hello')", "System.out.println('hello')", "echo 'hello'"],
        correct: 1,
        hint: "It is a built-in Python function that outputs data."
      },
      {
        id: 3,
        text: "How do you start a comment in Python?",
        options: ["// this is a comment", "/* this is a comment */", "# this is a comment", "<!-- this is a comment -->"],
        correct: 2,
        hint: "It is also known as the hash or pound symbol."
      },
      {
        id: 4,
        text: "Which data type is mutable in Python?",
        options: ["List", "Tuple", "String", "Integer"],
        correct: 0,
        hint: "You can append, pop, and modify elements inside this data type."
      },
      {
        id: 5,
        text: "What is the output of 3 * 2 ** 3 in Python?",
        options: ["18", "24", "216", "36"],
        correct: 1,
        hint: "Remember the order of operations: exponentiation (**) is evaluated before multiplication (*)."
      }
    ]
  },
  {
    id: 'QZ003',
    code: 'MAI201',
    subject: 'Economics',
    difficulty: 'ADVANCED',
    title: 'MAI201 - Linear Algebra Final',
    source: 'Market Theory Module',
    questionsCount: 30,
    attempts: 342,
    averageScore: 6.8,
    mostWrongQuestion: 'Q28',
    topPerformer: 'Final Report',
    publishStatus: 'expired',
    createdDate: '14/10/2023',
    duration: 15,
    status: 'not-started',
    score: null,
    accessMode: 'public',
    questions: [
      {
        id: 1,
        text: "What does the Law of Demand state?",
        options: [
          "As price increases, quantity demanded increases",
          "As price increases, quantity demanded decreases",
          "As income increases, demand decreases",
          "As supply increases, price increases"
        ],
        correct: 1,
        hint: "Think about the inverse relationship between price and consumers' purchasing decisions."
      },
      {
        id: 2,
        text: "Which market structure is characterized by a single seller and no close substitutes?",
        options: ["Perfect Competition", "Oligopoly", "Monopolistic Competition", "Monopoly"],
        correct: 3,
        hint: "The word comes from Greek meaning 'single seller'."
      },
      {
        id: 3,
        text: "What is opportunity cost?",
        options: [
          "The monetary cost of an item",
          "The value of the next best alternative foregone",
          "The cost of production inputs",
          "Sunk cost that cannot be recovered"
        ],
        correct: 1,
        hint: "It represents what you give up to get something else."
      },
      {
        id: 4,
        text: "Which of the following is an example of a public good?",
        options: ["National Defense", "A slice of pizza", "A private college education", "A cell phone"],
        correct: 0,
        hint: "Public goods are non-excludable and non-rivalrous."
      },
      {
        id: 5,
        text: "What is inflation?",
        options: [
          "An increase in the purchasing power of money",
          "A general increase in prices and fall in purchasing value of money",
          "A temporary drop in economic productivity",
          "A decrease in the unemployment rate"
        ],
        correct: 1,
        hint: "It happens when too much money chases too few goods, making your dollar worth less."
      }
    ]
  },
  {
    id: 'QZ004',
    code: 'OSG202',
    subject: 'Computer Science',
    difficulty: 'INTERMEDIATE',
    title: 'OSG202 - Operating Systems Quiz 2',
    source: 'OS302 Textbook Chapters 1-4',
    questionsCount: 25,
    attempts: 95,
    averageScore: 7.8,
    mostWrongQuestion: 'Q17',
    topPerformer: 'Hoang (10)',
    publishStatus: 'ready',
    createdDate: '11/10/2023',
    duration: 10,
    status: 'not-started',
    score: null,
    accessMode: 'public',
    questions: [
      {
        id: 1,
        text: "What is a process in an operating system?",
        options: [
          "A program in execution",
          "A storage location on the hard drive",
          "A hardware component",
          "A text file editor"
        ],
        correct: 0,
        hint: "It represents an active instance of a running program containing instructions and state."
      },
      {
        id: 2,
        text: "What is deadlocking in operating systems?",
        options: [
          "When a process finishes execution successfully",
          "When two or more processes are blocked, each waiting for a resource held by another",
          "When the computer runs out of random access memory",
          "When a hard drive is corrupted"
        ],
        correct: 1,
        hint: "It is a circular wait condition where no process can proceed."
      },
      {
        id: 3,
        text: "Which scheduling algorithm is non-preemptive?",
        options: [
          "Round Robin",
          "First-Come, First-Served (FCFS)",
          "Shortest Remaining Time First",
          "Priority Scheduling (Preemptive)"
        ],
        correct: 1,
        hint: "Once a process gets the CPU in this algorithm, it holds it until it voluntary releases it."
      },
      {
        id: 4,
        text: "What is virtual memory?",
        options: [
          "Extra physical RAM chips added to the board",
          "Storage space on the hard drive used to extend physical RAM",
          "Memory used only by virtual machine software",
          "Read-Only Memory chips"
        ],
        correct: 1,
        hint: "It allows processes to execute even if their total size exceeds the available physical memory."
      },
      {
        id: 5,
        text: "What is paging?",
        options: [
          "Printing document pages",
          "A memory management scheme that eliminates external fragmentation",
          "A method of formatting hard drives",
          "Sending notification alerts to users"
        ],
        correct: 1,
        hint: "It divides memory into fixed-sized blocks called pages and frames."
      }
    ]
  },
  {
    id: 'QZ005',
    code: 'MAD101',
    subject: 'Computer Science',
    difficulty: 'ADVANCED',
    title: 'MAD101 - Discrete Mathematics Quiz',
    source: 'CS401 Special Topics',
    questionsCount: 20,
    attempts: 210,
    averageScore: 6.5,
    mostWrongQuestion: 'Q08',
    topPerformer: 'Hai (9.0)',
    publishStatus: 'ready',
    createdDate: '05/10/2023',
    duration: 12,
    status: 'not-started',
    score: null,
    accessMode: 'private',
    password: 'fpt',
    questions: [
      {
        id: 1,
        text: "What is the optimal substructure property in Dynamic Programming?",
        options: [
          "An optimal solution to a problem contains optimal solutions to subproblems",
          "The algorithm runs in linear time",
          "The program uses recursive call stacks",
          "The data fits in a single array block"
        ],
        correct: 0,
        hint: "It means you can construct the overall optimal solution from the optimal solutions of smaller parts."
      },
      {
        id: 2,
        text: "Which algorithm solves the Single-Source Shortest Path problem for graphs with negative edge weights?",
        options: [
          "Dijkstra's Algorithm",
          "Kruskal's Algorithm",
          "Bellman-Ford Algorithm",
          "Prim's Algorithm"
        ],
        correct: 2,
        hint: "Unlike Dijkstra, it can handle negative weights and detect negative cycles."
      },
      {
        id: 3,
        text: "What does NP-complete mean in computational complexity?",
        options: [
          "A problem that can be solved in polynomial time",
          "A problem in NP that is at least as hard as any other problem in NP",
          "A problem that cannot be solved at all",
          "A problem that requires exponential space"
        ],
        correct: 1,
        hint: "These are the hardest problems in NP, and if any one of them is solved in P, then P = NP."
      },
      {
        id: 4,
        text: "Which algorithm finds the maximum flow in a flow network?",
        options: ["Ford-Fulkerson Algorithm", "Dijkstra's Algorithm", "A* Search", "Floyd-Warshall Algorithm"],
        correct: 0,
        hint: "It uses augmenting paths in a residual graph to increase flow iteratively."
      },
      {
        id: 5,
        text: "What is the time complexity of the Floyd-Warshall all-pairs shortest path algorithm?",
        options: ["O(V)", "O(V log V)", "O(V²)", "O(V³)"],
        correct: 3,
        hint: "It uses three nested loops running over all vertices in the graph."
      }
    ]
  },
  {
    id: 'QZ006',
    code: 'PRO192',
    subject: 'Software Engineering',
    difficulty: 'INTERMEDIATE',
    title: 'PRO192 - Java OOP Programming Final',
    source: 'SE302 Exam Prep',
    questionsCount: 30,
    attempts: 280,
    averageScore: 7.0,
    mostWrongQuestion: 'Q21',
    topPerformer: 'Final Report',
    publishStatus: 'expired',
    createdDate: '12/09/2023',
    duration: 10,
    status: 'not-started',
    score: null,
    accessMode: 'private',
    password: '123',
    questions: [
      {
        id: 1,
        text: "What is the primary benefit of the Model-View-Controller (MVC) architectural pattern?",
        options: [
          "Makes the code run faster",
          "Separates presentation logic from business logic",
          "Reduces the size of compiled assets",
          "Eliminates database storage requirements"
        ],
        correct: 1,
        hint: "It decouples data model management, UI rendering, and user input handling."
      },
      {
        id: 2,
        text: "Which design pattern is best suited for implementing a notification system where subscribers react to state changes?",
        options: ["Observer Pattern", "Singleton Pattern", "Factory Pattern", "Strategy Pattern"],
        correct: 0,
        hint: "It establishes a one-to-many relationship where changes trigger updates automatically."
      },
      {
        id: 3,
        text: "What is microservices architecture?",
        options: [
          "Running the app on very small hardware servers",
          "Decomposing an application into a collection of loosely-coupled, highly-cohesive services",
          "Writing all code in a single file",
          "Using only microcontrollers for deployment"
        ],
        correct: 1,
        hint: "Each service does one thing well, communicates via API, and can be developed independently."
      },
      {
        id: 4,
        text: "What does the 'S' in SOLID principles stand for?",
        options: [
          "Single Responsibility Principle",
          "System Security Principle",
          "State Serialization Principle",
          "Software Scalability Principle"
        ],
        correct: 0,
        hint: "A class should have one, and only one, reason to change."
      },
      {
        id: 5,
        text: "What is dependency injection?",
        options: [
          "Injecting viruses into application dependencies",
          "Passing required dependencies to an object rather than creating them internally",
          "Adding new libraries to package.json",
          "Updating database connections dynamically"
        ],
        correct: 1,
        hint: "It decouples the creation of dependency instances from their usage, making code testable."
      }
    ]
  }
];

export const MOCK_QUIZ_DATA = INITIAL_QUIZZES;

export const MOCK_STATS_DATA = {
  totalQuizzes: INITIAL_QUIZZES?.length || 0,
  activeQuizzes: INITIAL_QUIZZES?.filter(q => q.publishStatus === 'ready' || q.status === 'ready' || q.status === 'active' || q.status === 'running').length || 0,
  totalAttempts: "142"
};
export const MOCK_DOCUMENTS = [
  {
    id: "doc1",
    name: "Macroeconomics - Chapter 1.pdf",
    major: "Business Administration",
    course: "ECO111",
    uploadDate: "15/10/2023"
  },
  {
    id: "doc2",
    name: "Data Structures & Algorithms.pdf",
    major: "Information Technology",
    course: "CSD201",
    uploadDate: "12/10/2023"
  },
  {
    id: "doc3",
    name: "Business English - Unit 5.docx",
    major: "Foreign Languages",
    course: "ENW201",
    uploadDate: "10/10/2023"
  },
  {
    id: "doc4",
    name: "Probability & Statistics.pdf",
    major: "Mathematics",
    course: "MAI201",
    uploadDate: "08/10/2023"
  }
];
