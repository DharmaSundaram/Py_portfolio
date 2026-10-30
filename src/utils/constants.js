export const CATEGORIES = [
  {
    id: 'Problem-Solving',
    name: 'Problem-Solving',
    color: 'from-amber-500 to-yellow-600',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    description: 'Algorithmic efficiency, logic breakdown, and tackling difficult logic challenges.'
  },
  {
    id: 'Excellent Coding',
    name: 'Excellent Coding',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    description: 'Clean code practices, PEP 8 compliance, modular architecture, and readable code.'
  },
  {
    id: 'Creativity and Innovation',
    name: 'Creativity and Innovation',
    color: 'from-purple-500 to-indigo-600',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    description: 'Original project ideas, intuitive UI/UX design, or clever novel implementations.'
  },
  {
    id: 'Task Completion',
    name: 'Task Completion',
    color: 'from-blue-500 to-cyan-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    description: 'Meeting all lab requirements on time with complete test coverage.'
  },
  {
    id: 'Consistency',
    name: 'Consistency',
    color: 'from-pink-500 to-rose-600',
    border: 'border-pink-500/30',
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    description: 'Continuous weekly submission, punctual assignments, and persistent effort.'
  },
  {
    id: 'Active Participation',
    name: 'Active Participation',
    color: 'from-orange-500 to-amber-600',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    description: 'Engaging actively in class discussions, code reviews, and helping peers.'
  },
  {
    id: 'Going Beyond Requirements',
    name: 'Going Beyond Requirements',
    color: 'from-violet-500 to-fuchsia-600',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    description: 'Adding extra features, advanced edge-case handling, and thorough documentation.'
  },
  {
    id: 'Technical Understanding',
    name: 'Technical Understanding',
    color: 'from-cyan-500 to-blue-600',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    description: 'Deep grasp of Python internals, data structures, and memory management.'
  },
  {
    id: 'Other',
    name: 'Other',
    color: 'from-slate-500 to-gray-600',
    border: 'border-slate-500/30',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    description: 'Custom recognition reason specified by faculty.'
  }
];

export const DEFAULT_PROFILE = {
  name: '[YOUR NAME]',
  course: 'Python Programming',
  institution: '[YOUR COLLEGE]',
  semester: '[YOUR SEMESTER]',
  academicYear: '[YOUR ACADEMIC YEAR]',
  bio: 'A showcase of my progress, faculty recognitions, and hands-on Python projects throughout the academic semester.',
  targetStars: 15,
  learningGoal: 'Master Python core data structures, OOP principles, and build real-world automated scripts and data analytics tools.',
  strengths: 'Logical thinking, clean code organization, persistence in debugging, and quick adaptation to new Python libraries.',
  areasToImprove: 'Advanced asynchronous programming (asyncio), complex regular expressions, and writing comprehensive unit test suites.',
  futureGoals: 'Build data-driven web applications with FastAPI, automate daily workflows with Python scripts, and contribute to open-source Python repositories.'
};

export const DEFAULT_TOPICS = [
  {
    id: 'topic-1',
    name: 'Python Fundamentals',
    description: 'Python syntax, comments, indentation, interactive shell, and running scripts.',
    status: 'In Progress',
    relatedTask: 'Setup development environment and Hello World scripts',
    codeSnippet: '# Basic Python Output\nprint("Welcome to Python Programming!")\nname = input("Enter your name: ")\nprint(f"Hello, {name}!")',
    notes: 'Understood Python execution model and interpreter vs compiled language differences.'
  },
  {
    id: 'topic-2',
    name: 'Variables and Data Types',
    description: 'Integers, floats, strings, booleans, type casting, and dynamic typing.',
    status: 'In Progress',
    relatedTask: 'Temperature Converter & Currency Exchange Calculator',
    codeSnippet: '# Type conversion and formatted strings\ncelsius = 25.5\nfahrenheit = (celsius * 9/5) + 32\nprint(f"{celsius}°C is equal to {fahrenheit:.2f}°F")',
    notes: 'Practiced precision formatting with f-strings and type casting with int(), float(), str().'
  },
  {
    id: 'topic-3',
    name: 'Conditional Statements',
    description: 'if, elif, else branches, logical operators (and, or, not), and nested conditions.',
    status: 'Not Started',
    relatedTask: 'Student Grade Evaluator and Tax Bracket Calculator',
    codeSnippet: 'score = 88\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"\nprint(f"Final Grade: {grade}")',
    notes: 'Focused on avoiding nested conditionals by using clean guard clauses.'
  },
  {
    id: 'topic-4',
    name: 'Loops',
    description: 'for loops, while loops, range(), break, continue, and loop-else blocks.',
    status: 'Not Started',
    relatedTask: 'Prime Number Generator and Fibonacci Sequence Generator',
    codeSnippet: '# Prime number search using loop else\nfor n in range(2, 20):\n    for x in range(2, n):\n        if n % x == 0:\n            break\n    else:\n        print(f"{n} is prime")',
    notes: 'Explored loop performance and range iterator mechanics.'
  },
  {
    id: 'topic-5',
    name: 'Functions',
    description: 'def, parameters, *args, **kwargs, return values, docstrings, and lambda expressions.',
    status: 'Not Started',
    relatedTask: 'Modular Math Utility Library & String Formatter',
    codeSnippet: 'def calculate_stats(*numbers):\n    """Return min, max, and average of numbers."""\n    if not numbers:\n        return 0, 0, 0\n    return min(numbers), max(numbers), sum(numbers) / len(numbers)',
    notes: 'Learned the importance of pure functions, side effects, and clear docstrings.'
  },
  {
    id: 'topic-6',
    name: 'Lists, Tuples, Sets, and Dictionaries',
    description: 'Data collections, indexing, slicing, comprehensions, dict operations, and set operations.',
    status: 'Not Started',
    relatedTask: 'Inventory Management System & Word Frequency Counter',
    codeSnippet: '# Dictionary comprehension for word counts\nwords = ["python", "code", "python", "star", "code", "python"]\nfreq = {word: words.count(word) for word in set(words)}\nprint(freq)  # {\'python\': 3, \'code\': 2, \'star\': 1}',
    notes: 'List comprehensions make code expressive and fast; sets allow O(1) membership testing.'
  },
  {
    id: 'topic-7',
    name: 'File Handling',
    description: 'Reading, writing, appending files, with statement (context managers), and CSV/JSON parsing.',
    status: 'Not Started',
    relatedTask: 'Student Record Logger & CSV Report Generator',
    codeSnippet: 'import json\n\ndata = {"stars": 5, "subject": "Python"}\nwith open("progress.json", "w", encoding="utf-8") as f:\n    json.dump(data, f, indent=2)',
    notes: 'Always use with open() context manager to ensure safe closing of file descriptors.'
  },
  {
    id: 'topic-8',
    name: 'Exception Handling',
    description: 'try, except, else, finally blocks, raising custom exceptions, and error recovery.',
    status: 'Not Started',
    relatedTask: 'Safe Input Validation & Robust File Reader',
    codeSnippet: 'try:\n    val = int(input("Enter integer: "))\n    res = 100 / val\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")\nexcept ValueError:\n    print("Invalid numeric format!")\nelse:\n    print(f"Result: {res}")',
    notes: 'Catch specific exceptions rather than bare except: clauses.'
  },
  {
    id: 'topic-9',
    name: 'Object-Oriented Programming',
    description: 'Classes, objects, __init__, self, inheritance, polymorphism, encapsulation, and magic methods.',
    status: 'Not Started',
    relatedTask: 'Banking Account Simulation & Vehicle Fleet Management System',
    codeSnippet: 'class StudentAchievement:\n    def __init__(self, title, stars):\n        self.title = title\n        self.stars = stars\n    \n    def __repr__(self):\n        return f"Achievement({self.title}, ⭐x{self.stars})"',
    notes: 'Mastered class design, property decorators, and inheritance hierarchies.'
  },
  {
    id: 'topic-10',
    name: 'Regular Expressions',
    description: 're module, pattern matching, searching, groups, validation of emails, URLs, and phone numbers.',
    status: 'Not Started',
    relatedTask: 'Email and URL Sanitizer & Log File Parser',
    codeSnippet: 'import re\npattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"\nis_valid = bool(re.match(pattern, "student@college.edu"))',
    notes: 'Regex is powerful for text pattern extraction and input sanitization.'
  },
  {
    id: 'topic-11',
    name: 'Data Analysis',
    description: 'Descriptive statistics, data cleaning, filtering, sorting, and exploratory data analysis.',
    status: 'Not Started',
    relatedTask: 'Classroom Exam Score Statistical Analyzer',
    codeSnippet: 'scores = [78, 85, 92, 88, 76, 95, 89]\nmean = sum(scores) / len(scores)\nvariance = sum((x - mean) ** 2 for x in scores) / len(scores)\nprint(f"Mean: {mean:.1f}, Variance: {variance:.1f}")',
    notes: 'Grasped essential statistics before moving to specialized data libraries.'
  },
  {
    id: 'topic-12',
    name: 'NumPy and Pandas',
    description: 'Ndarrays, vectorized math, Pandas Series & DataFrames, grouping, pivoting, and merging datasets.',
    status: 'Not Started',
    relatedTask: 'Semester Gradebook DataFrame & Performance Analysis',
    codeSnippet: 'import pandas as pd\ndf = pd.DataFrame({\n    "Topic": ["Loops", "Functions", "OOP"],\n    "Confidence": [9, 8, 7]\n})\nprint(df.describe())',
    notes: 'Vectorization drastically reduces runtime compared to native Python nested loops.'
  },
  {
    id: 'topic-13',
    name: 'Data Visualization',
    description: 'Matplotlib and Seaborn, line plots, bar charts, histograms, heatmaps, and styling.',
    status: 'Not Started',
    relatedTask: 'Star Awards Trend Line & Category Pie Chart Generator',
    codeSnippet: 'import matplotlib.pyplot as plt\ncategories = ["Coding", "Problem-Solving", "Innovation"]\ncounts = [4, 6, 3]\nplt.bar(categories, counts, color="gold")\nplt.title("Faculty Star Distribution")\nplt.show()',
    notes: 'Visualizing data communicates insights far more effectively than raw tables.'
  },
  {
    id: 'topic-14',
    name: 'Machine Learning',
    description: 'Introduction to Scikit-Learn, train-test split, linear regression, and decision trees.',
    status: 'Not Started',
    relatedTask: 'Predictive Study Hours vs Exam Score Model',
    codeSnippet: '# Simple Linear Regression demo\nfrom sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\n# X_train, y_train fitting...',
    notes: 'Understood model evaluation metrics like MSE and R-squared.'
  }
];
