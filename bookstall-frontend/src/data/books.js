const books = [

{
  id: 1,
  title : "The Alchemist",
  author: "Paulo Coelho",
  category: "Fiction",
  price: 499,
  rating: 4.8,
  language: "English",
  pages: 208,
  publisher: "HarperOne",
  published: "1988",
  isbn: "9780062315007",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",

  summary:
    "The Alchemist is one of the most inspiring novels ever written, telling the story of Santiago, a young shepherd who dreams of discovering a hidden treasure near the Egyptian pyramids. Guided by mysterious encounters and wise mentors, he embarks on a journey that transforms his understanding of life, destiny, and happiness. Paulo Coelho beautifully combines adventure, philosophy, and spirituality, encouraging readers to follow their dreams and trust their hearts. The novel reminds us that every challenge has a purpose and that true treasure often lies within ourselves rather than material wealth.",

  reviews: [
    "An unforgettable story that motivates you to pursue your dreams with confidence.",
    "Beautifully written with meaningful life lessons on every page.",
    "A timeless classic that inspires readers of every generation.",
    "Simple language, powerful message, and deeply emotional storytelling."
  ]
},

{
  id: 2,
  title: "Atomic Habits",
  author: "James Clear",
  category: "Self Help",
  price: 699,
  rating: 4.9,
  language: "English",
  pages: 320,
  publisher: "Penguin Random House",
  published: "2018",
  isbn: "9780735211292",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",

  summary:
    "Atomic Habits is an internationally bestselling self-improvement book that explains how tiny daily improvements can produce remarkable long-term success. James Clear introduces practical strategies for building positive habits, eliminating negative ones, and creating systems that make success inevitable. Supported by psychology, neuroscience, and real-world examples, the book demonstrates that lasting change comes from consistent actions rather than dramatic transformations. Whether you are a student, entrepreneur, or working professional, Atomic Habits provides simple yet effective techniques to improve productivity, health, relationships, and personal growth.",

  reviews: [
    "One of the most practical self-help books I have ever read.",
    "Easy to understand and filled with actionable advice.",
    "Completely changed the way I build habits and stay disciplined.",
    "A must-read for anyone serious about personal development."
  ]
},

{
  id: 3,
  title: "Rich Dad Poor Dad",
  author: "Robert T. Kiyosaki",
  category: "Business",
  price: 550,
  rating: 4.8,
  language: "English",
  pages: 336,
  publisher: "Plata Publishing",
  published: "1997",
  isbn: "9781612680194",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",

  summary:
    "Rich Dad Poor Dad challenges traditional beliefs about money, education, and financial success by comparing the lessons learned from the author's two father figures. Robert Kiyosaki explains why financial intelligence is more valuable than simply earning a high salary. Through relatable stories and practical advice, readers learn about investing, building assets, managing risks, and achieving financial independence. The book encourages people to think differently about wealth creation and inspires them to take control of their financial future instead of relying solely on traditional employment.",

  reviews: [
    "A life-changing book for anyone interested in financial freedom.",
    "Easy to read and full of valuable financial lessons.",
    "Completely changed my perspective on money and investing.",
    "An excellent starting point for learning personal finance."
  ]
},

{
  id: 4,
  title: "Think and Grow Rich",
  author: "Napoleon Hill",
  category: "Business",
  price: 450,
  rating: 4.7,
  language: "English",
  pages: 320,
  publisher: "The Ralston Society",
  published: "1937",
  isbn: "9781585424337",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",

  summary:
    "Think and Grow Rich is considered one of the greatest personal success books ever written. Based on years of research involving some of the world's most successful individuals, Napoleon Hill explains the principles of achievement, including desire, persistence, faith, self-confidence, and organized planning. Rather than focusing only on financial wealth, the book emphasizes developing the right mindset to achieve success in every area of life. Its timeless lessons continue to inspire entrepreneurs, students, and professionals across the world.",

  reviews: [
    "A timeless masterpiece on success and positive thinking.",
    "Filled with practical wisdom that remains relevant today.",
    "Highly motivating and easy to apply in everyday life.",
    "An essential read for entrepreneurs and ambitious individuals."
  ]
},

{
  id: 5,
  title: "Ikigai",
  author: "Héctor García & Francesc Miralles",
  category: "Self Help",
  price: 399,
  rating: 4.7,
  language: "English",
  pages: 208,
  publisher: "Penguin Life",
  published: "2016",
  isbn: "9780143130727",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",

  summary:
    "Ikigai explores the Japanese philosophy of finding purpose, happiness, and balance in everyday life. Inspired by the lifestyle of Okinawa, one of the world's longest-living communities, the authors explain how meaningful work, healthy habits, strong relationships, and a positive outlook contribute to a fulfilling life. Combining scientific research with inspiring stories and practical advice, the book encourages readers to discover their own 'Ikigai'—their reason for waking up each morning. It is a thoughtful guide for anyone seeking inner peace, motivation, and long-term happiness.",

  reviews: [
    "A calm, inspiring, and beautifully written book.",
    "Helped me discover a better perspective on life and purpose.",
    "Simple ideas that can truly improve everyday living.",
    "A wonderful combination of philosophy, science, and practical advice."
  ]
},

{
  id: 6,
  title: "Deep Work",
  author: "Cal Newport",
  category: "Self Help",
  price: 599,
  rating: 4.8,
  language: "English",
  pages: 304,
  publisher: "Grand Central Publishing",
  published: "2016",
  isbn: "9781455586691",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",

  summary:
    "Deep Work is a practical guide to achieving extraordinary productivity in an increasingly distracted world. Cal Newport explains the importance of uninterrupted concentration and how the ability to focus deeply has become one of the most valuable skills in today's competitive environment. Through scientific research, real-life examples, and practical techniques, the book teaches readers how to eliminate distractions, improve efficiency, and produce high-quality work. Whether you are a student, software developer, researcher, or entrepreneur, this book provides proven methods to maximize performance and accomplish meaningful goals.",

  reviews: [
    "A fantastic book for improving focus and productivity.",
    "Practical advice that helped me reduce distractions.",
    "Highly recommended for students and working professionals.",
    "One of the best books on time management and concentration."
  ]
},

{
  id: 7,
  title: "The Psychology of Money",
  author: "Morgan Housel",
  category: "Business",
  price: 650,
  rating: 4.9,
  language: "English",
  pages: 256,
  publisher: "Harriman House",
  published: "2020",
  isbn: "9780857197689",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",

  summary:
    "The Psychology of Money explores how emotions, habits, and personal behavior influence financial success more than intelligence or technical knowledge. Morgan Housel shares engaging stories that explain why people make different financial decisions even under similar circumstances. The book emphasizes patience, long-term thinking, and disciplined investing rather than chasing quick profits. Written in simple language, it helps readers understand wealth creation, risk management, and financial independence, making it an excellent resource for beginners as well as experienced investors.",

  reviews: [
    "One of the best books on personal finance.",
    "Easy to read with valuable real-world lessons.",
    "Completely changed the way I think about money.",
    "Highly recommended for every investor."
  ]
},

{
  id: 8,
  title: "The Power of Now",
  author: "Eckhart Tolle",
  category: "Self Help",
  price: 499,
  rating: 4.8,
  language: "English",
  pages: 236,
  publisher: "New World Library",
  published: "1997",
  isbn: "9781577314806",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",

  summary:
    "The Power of Now is a transformative spiritual guide that teaches readers the importance of living fully in the present moment. Eckhart Tolle explains how overthinking, attachment to the past, and anxiety about the future prevent people from experiencing true happiness. Through practical insights and philosophical discussions, he encourages mindfulness, self-awareness, and inner peace. The book offers timeless wisdom that helps readers overcome stress, improve emotional well-being, and develop a deeper understanding of themselves and the world around them.",

  reviews: [
    "A deeply inspiring and life-changing book.",
    "Helped me reduce stress and anxiety.",
    "Beautifully written with timeless spiritual wisdom.",
    "A must-read for anyone seeking inner peace."
  ]
},

{
  id: 9,
  title: "The 7 Habits of Highly Effective People",
  author: "Stephen R. Covey",
  category: "Self Help",
  price: 649,
  rating: 4.9,
  language: "English",
  pages: 432,
  publisher: "Free Press",
  published: "1989",
  isbn: "9781982137274",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781982137274-L.jpg",

  summary:
    "The 7 Habits of Highly Effective People is one of the most influential personal development books ever written. Stephen R. Covey presents seven powerful habits that help individuals become more effective in both personal and professional life. The book focuses on responsibility, leadership, communication, teamwork, and continuous self-improvement. Through practical examples and timeless principles, readers learn how to build strong character, make better decisions, and achieve lasting success while maintaining meaningful relationships.",

  reviews: [
    "An outstanding leadership and self-improvement book.",
    "The principles are practical and easy to apply.",
    "Helped me become more organized and confident.",
    "A timeless classic that everyone should read."
  ]
},

{
  id: 10,
  title: "The Subtle Art of Not Giving a F*ck",
  author: "Mark Manson",
  category: "Self Help",
  price: 599,
  rating: 4.7,
  language: "English",
  pages: 224,
  publisher: "HarperOne",
  published: "2016",
  isbn: "9780062457714",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",

  summary:
    "The Subtle Art of Not Giving a F*ck offers a refreshing perspective on personal growth by challenging the idea of constant positivity. Mark Manson argues that true happiness comes from accepting life's struggles and focusing only on what genuinely matters. Using humor, real-life stories, and practical advice, the book encourages readers to embrace failures, set meaningful priorities, and develop resilience. Its honest and straightforward approach makes it an engaging guide for anyone seeking a more balanced and purposeful life.",

  reviews: [
    "Funny, honest, and surprisingly motivational.",
    "A refreshing alternative to traditional self-help books.",
    "Easy to read and full of practical life lessons.",
    "One of the most relatable books I've ever read."
  ]
},

{
  id: 11,
  title: "Harry Potter and the Philosopher's Stone",
  author: "J. K. Rowling",
  category: "Fantasy",
  price: 799,
  rating: 4.9,
  language: "English",
  pages: 352,
  publisher: "Bloomsbury",
  published: "1997",
  isbn: "9780747532699",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",

  summary:
    "Harry Potter and the Philosopher's Stone introduces readers to Harry Potter, an ordinary boy who discovers on his eleventh birthday that he is actually a wizard. Invited to study at Hogwarts School of Witchcraft and Wizardry, Harry enters a magical world filled with friendship, adventure, and mystery. Alongside his friends Ron Weasley and Hermione Granger, he uncovers secrets surrounding the Philosopher's Stone and confronts the dark legacy of Lord Voldemort. J. K. Rowling masterfully combines imagination, humor, and suspense, creating one of the most beloved fantasy novels of all time.",

  reviews: [
    "A magical adventure that captivates readers of every age.",
    "The perfect beginning to an unforgettable series.",
    "Filled with imagination, friendship, and excitement.",
    "A timeless fantasy masterpiece."
  ]
},

{
  id: 12,
  title: "The Hobbit",
  author: "J. R. R. Tolkien",
  category: "Fantasy",
  price: 699,
  rating: 4.8,
  language: "English",
  pages: 310,
  publisher: "HarperCollins",
  published: "1937",
  isbn: "9780261102217",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780261102217-L.jpg",

  summary:
    "The Hobbit follows Bilbo Baggins, a peaceful hobbit whose quiet life changes when the wizard Gandalf recruits him for a dangerous quest. Joined by thirteen dwarves, Bilbo journeys across enchanted forests, mysterious mountains, and dragon-guarded treasures. Along the way he discovers courage, intelligence, and inner strength he never knew he possessed. Packed with mythical creatures, thrilling adventures, and unforgettable characters, Tolkien's classic novel lays the foundation for the legendary world of Middle-earth and remains one of the greatest fantasy books ever written.",

  reviews: [
    "An exciting adventure from beginning to end.",
    "Beautiful storytelling and unforgettable characters.",
    "A fantasy classic everyone should experience.",
    "Bilbo's journey is inspiring and entertaining."
  ]
},

{
  id: 13,
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  category: "Classic",
  price: 499,
  rating: 4.8,
  language: "English",
  pages: 336,
  publisher: "J. B. Lippincott & Co.",
  published: "1960",
  isbn: "9780061120084",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",

  summary:
    "To Kill a Mockingbird is a Pulitzer Prize-winning novel that explores themes of justice, prejudice, compassion, and morality through the eyes of young Scout Finch. Set in a small Southern American town during the Great Depression, the story follows Scout's father, lawyer Atticus Finch, as he courageously defends an innocent Black man accused of a crime he did not commit. Harper Lee delivers a powerful message about empathy, equality, and standing up for what is right, making this novel one of the most influential classics in modern literature.",

  reviews: [
    "An emotional and thought-provoking masterpiece.",
    "Powerful lessons about justice and humanity.",
    "Beautifully written with unforgettable characters.",
    "A classic that everyone should read at least once."
  ]
},

{
  id: 14,
  title: "1984",
  author: "George Orwell",
  category: "Classic",
  price: 450,
  rating: 4.7,
  language: "English",
  pages: 328,
  publisher: "Secker & Warburg",
  published: "1949",
  isbn: "9780451524935",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",

  summary:
    "1984 is George Orwell's groundbreaking dystopian novel that portrays a society ruled by constant surveillance, censorship, and authoritarian control. The story follows Winston Smith, who secretly questions the oppressive government led by the mysterious Big Brother. As Winston searches for truth and freedom, he discovers the devastating consequences of resisting totalitarian power. Orwell's powerful storytelling serves as a timeless warning about political manipulation, loss of privacy, and the importance of protecting individual freedom and independent thought.",

  reviews: [
    "A chilling and unforgettable dystopian novel.",
    "More relevant today than ever before.",
    "George Orwell's masterpiece is both intelligent and gripping.",
    "A must-read for anyone interested in politics and society."
  ]
},

{
  id: 15,
  title: "The Silent Patient",
  author: "Alex Michaelides",
  category: "Mystery",
  price: 699,
  rating: 4.7,
  language: "English",
  pages: 336,
  publisher: "Celadon Books",
  published: "2019",
  isbn: "9781250301697",
  stock: "Only 8 Left",
  image: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",

  summary:
    "The Silent Patient is a psychological thriller that tells the story of Alicia Berenson, a famous artist who mysteriously stops speaking after being accused of murdering her husband. Criminal psychotherapist Theo Faber becomes determined to uncover the truth behind her silence. As he investigates Alicia's past, shocking secrets and unexpected twists gradually emerge, leading to a breathtaking conclusion. Alex Michaelides creates an atmosphere filled with suspense, emotion, and psychological depth, making this novel one of the most acclaimed thrillers of recent years.",

  reviews: [
    "An absolutely brilliant psychological thriller.",
    "The ending completely surprised me.",
    "Impossible to stop reading once you begin.",
    "One of the best mystery novels in recent years."
  ]
},
{
  id: 16,
  title: "The Monk Who Sold His Ferrari",
  author: "Robin Sharma",
  category: "Self Help",
  price: 399,
  rating: 4.8,
  language: "English",
  pages: 224,
  publisher: "Jaico Publishing House",
  published: "1997",
  isbn: "9788172242237",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9788172242237-L.jpg",

  summary:
    "The Monk Who Sold His Ferrari is an inspiring fable about Julian Mantle, a successful lawyer whose stressful lifestyle leads him to a life-changing spiritual journey. After selling his luxurious possessions, he travels to the Himalayas in search of wisdom and inner peace. There he learns timeless principles for achieving happiness, purpose, self-discipline, and balance in life. Robin Sharma combines storytelling with practical lessons, encouraging readers to focus on personal growth, mindfulness, and meaningful living instead of material success alone.",

  reviews: [
    "A motivational book that completely changed my outlook on life.",
    "Simple language with deep and meaningful lessons.",
    "Perfect for anyone seeking peace and personal growth.",
    "An inspiring story filled with practical wisdom."
  ]
},

{
  id: 17,
  title: "The Kite Runner",
  author: "Khaled Hosseini",
  category: "Fiction",
  price: 599,
  rating: 4.9,
  language: "English",
  pages: 371,
  publisher: "Riverhead Books",
  published: "2003",
  isbn: "9781594631931",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",

  summary:
    "The Kite Runner is an emotionally powerful novel about friendship, betrayal, guilt, forgiveness, and redemption. Set against the changing political landscape of Afghanistan, it follows Amir, a young boy haunted by a childhood mistake involving his loyal friend Hassan. Years later, Amir returns to his homeland seeking forgiveness and a chance to make things right. Khaled Hosseini beautifully portrays family relationships, sacrifice, and the resilience of the human spirit, making this novel one of the most touching works of modern literature.",

  reviews: [
    "An emotional masterpiece that stays with you forever.",
    "Beautiful storytelling with unforgettable characters.",
    "Heartbreaking, powerful, and deeply moving.",
    "One of the finest novels I've ever read."
  ]
},

{
  id: 18,
  title: "Sapiens",
  author: "Yuval Noah Harari",
  category: "Non Fiction",
  price: 899,
  rating: 4.8,
  language: "English",
  pages: 512,
  publisher: "Harper",
  published: "2014",
  isbn: "9780062316097",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",

  summary:
    "Sapiens explores the fascinating history of humankind from the emergence of Homo sapiens to the modern technological era. Yuval Noah Harari explains how biology, culture, economics, science, and politics have shaped human civilization over thousands of years. Written in an engaging and accessible style, the book challenges many common beliefs about history and society while encouraging readers to think critically about humanity's past, present, and future. It is widely regarded as one of the most influential nonfiction books of the 21st century.",

  reviews: [
    "A fascinating journey through human history.",
    "Thought-provoking and incredibly informative.",
    "Every chapter offers a fresh perspective on civilization.",
    "One of the best nonfiction books ever written."
  ]
},

{
  id: 19,
  title: "Pride and Prejudice",
  author: "Jane Austen",
  category: "Romance",
  price: 599,
  rating: 4.8,
  language: "English",
  pages: 432,
  publisher: "T. Egerton",
  published: "1813",
  isbn: "9780141439518",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",

  summary:
    "Pride and Prejudice is one of the greatest romantic novels ever written, following the intelligent and independent Elizabeth Bennet as she navigates love, family expectations, and social class in nineteenth-century England. Her relationship with the proud but honorable Mr. Darcy develops through misunderstandings, personal growth, and mutual respect. Jane Austen masterfully blends romance, humor, and social commentary, creating memorable characters and timeless lessons about love, humility, and self-discovery that continue to captivate readers around the world.",

  reviews: [
    "A timeless romance filled with wit and elegance.",
    "Elizabeth and Darcy remain one of literature's greatest couples.",
    "Jane Austen's writing is simply brilliant.",
    "A classic that never loses its charm."
  ]
},

{
  id: 20,
  title: "Me Before You",
  author: "Jojo Moyes",
  category: "Romance",
  price: 699,
  rating: 4.8,
  language: "English",
  pages: 480,
  publisher: "Pamela Dorman Books",
  published: "2012",
  isbn: "9780143124542",
  stock: "Only 6 Left",
  image: "https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg",

  summary:
    "Me Before You is a heartfelt romance that tells the story of Louisa Clark, a cheerful young woman whose life changes when she becomes the caregiver for Will Traynor, a wealthy man left paralyzed after an accident. As their friendship grows into something deeper, both characters learn valuable lessons about love, courage, hope, and living life to the fullest. Jojo Moyes delivers an emotional and unforgettable novel that beautifully explores relationships, sacrifice, and the power of human connection.",

  reviews: [
    "A touching love story that will stay with you forever.",
    "Beautifully written and emotionally powerful.",
    "The characters feel incredibly real and relatable.",
    "One of the best contemporary romance novels."
  ]
},
{
  id: 21,
  title: "The Fault in Our Stars",
  author: "John Green",
  category: "Romance",
  price: 599,
  rating: 4.8,
  language: "English",
  pages: 336,
  publisher: "Dutton Books",
  published: "2012",
  isbn: "9780525478812",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg",

  summary:
    "The Fault in Our Stars is a deeply moving novel that follows Hazel Grace Lancaster, a teenage girl living with cancer, whose life changes when she meets the charming and optimistic Augustus Waters. Together they embark on a journey filled with love, laughter, heartbreak, and unforgettable memories. John Green beautifully explores themes of mortality, hope, friendship, and the importance of living life despite its uncertainties. With emotional depth and memorable dialogue, the novel reminds readers that even a short life can leave a lasting impact on others.",

  reviews: [
    "An emotional rollercoaster that made me laugh and cry.",
    "Beautifully written with unforgettable characters.",
    "One of the best young adult romance novels ever written.",
    "A touching story that stays with you long after finishing."
  ]
},

{
  id: 22,
  title: "It Ends With Us",
  author: "Colleen Hoover",
  category: "Romance",
  price: 799,
  rating: 4.7,
  language: "English",
  pages: 384,
  publisher: "Atria Books",
  published: "2016",
  isbn: "9781501110368",
  stock: "Best Seller",
  image: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",

  summary:
    "It Ends With Us tells the emotional story of Lily Bloom, a young woman determined to build a better future while confronting painful memories from her past. As she falls in love with the successful neurosurgeon Ryle Kincaid, unexpected challenges force her to make difficult choices about love, family, and self-respect. Inspired by real-life experiences, Colleen Hoover addresses sensitive topics with honesty and compassion, delivering a powerful novel about courage, resilience, and breaking harmful cycles for future generations.",

  reviews: [
    "Heartbreaking, emotional, and impossible to put down.",
    "A beautifully written novel with important life lessons.",
    "Colleen Hoover's best work.",
    "Powerful characters and an unforgettable story."
  ]
},

{
  id: 23,
  title: "Love Story",
  author: "Erich Segal",
  category: "Romance",
  price: 499,
  rating: 4.6,
  language: "English",
  pages: 160,
  publisher: "Harper Perennial",
  published: "1970",
  isbn: "9780061000188",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780061000188-L.jpg",

  summary:
    "Love Story is a timeless romantic novel about Oliver Barrett IV, a wealthy Harvard student, and Jennifer Cavilleri, a brilliant music student from a modest background. Despite their different worlds, they fall deeply in love and build a life together while overcoming family conflicts and personal struggles. Their journey celebrates unconditional love, sacrifice, and devotion, making it one of the most memorable romances ever written. Erich Segal's heartfelt storytelling continues to move readers decades after its original publication.",

  reviews: [
    "A beautiful classic romance.",
    "Simple yet emotionally unforgettable.",
    "An iconic love story that touches every heart.",
    "A timeless novel about love and sacrifice."
  ]
},

{
  id: 24,
  title: "The Notebook",
  author: "Nicholas Sparks",
  category: "Romance",
  price: 699,
  rating: 4.8,
  language: "English",
  pages: 214,
  publisher: "Warner Books",
  published: "1996",
  isbn: "9780446605236",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780446605236-L.jpg",

  summary:
    "The Notebook tells the unforgettable love story of Noah Calhoun and Allie Nelson, whose romance begins in their youth but is interrupted by family expectations and life's unexpected turns. Years later, fate brings them together once again, proving that true love can endure time, distance, and hardship. Nicholas Sparks beautifully portrays themes of loyalty, forgiveness, and everlasting commitment. This emotional novel has become one of the world's most beloved romantic stories and continues to inspire readers of every generation.",

  reviews: [
    "One of the most beautiful romance novels ever written.",
    "Heartwarming, emotional, and unforgettable.",
    "Nicholas Sparks at his very best.",
    "A love story that remains with you forever."
  ]
},

{
  id: 25,
  title: "The Lord of the Rings: The Fellowship of the Ring",
  author: "J. R. R. Tolkien",
  category: "Fantasy",
  price: 899,
  rating: 4.9,
  language: "English",
  pages: 576,
  publisher: "George Allen & Unwin",
  published: "1954",
  isbn: "9780261102354",
  stock: "Best Seller",
  image: "https://covers.openlibrary.org/b/isbn/9780261102354-L.jpg",

  summary:
    "The Fellowship of the Ring is the first installment of J. R. R. Tolkien's legendary Lord of the Rings trilogy. The story follows Frodo Baggins, a humble hobbit entrusted with the dangerous mission of destroying the One Ring before it falls into the hands of the Dark Lord Sauron. Joined by a fellowship of loyal companions, Frodo embarks on an epic adventure across the breathtaking landscapes of Middle-earth. Filled with courage, friendship, sacrifice, and unforgettable battles between good and evil, this novel is widely regarded as one of the greatest fantasy masterpieces ever written.",

  reviews: [
    "An epic fantasy masterpiece unlike any other.",
    "Tolkien's world-building is absolutely incredible.",
    "A thrilling adventure with unforgettable characters.",
    "A must-read for every fantasy lover."
  ]
},
{
  id: 26,
  title: "Percy Jackson and the Lightning Thief",
  author: "Rick Riordan",
  category: "Fantasy",
  price: 599,
  rating: 4.8,
  language: "English",
  pages: 416,
  publisher: "Disney Hyperion",
  published: "2005",
  isbn: "9780786838653",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780786838653-L.jpg",

  summary:
    "Percy Jackson and the Lightning Thief follows twelve-year-old Percy Jackson, who discovers that he is the son of the Greek god Poseidon. After being accused of stealing Zeus's powerful lightning bolt, Percy embarks on a dangerous quest across America to prevent a war among the Olympian gods. Alongside his loyal friends Annabeth and Grover, he battles mythical monsters, uncovers ancient secrets, and learns the true meaning of bravery, friendship, and destiny. Rick Riordan brilliantly combines Greek mythology with modern adventure, creating a thrilling fantasy novel loved by readers of all ages.",

  reviews: [
    "A fun and exciting fantasy adventure.",
    "Greek mythology has never been this entertaining.",
    "Perfect for both teenagers and adults.",
    "Fast-paced, funny, and impossible to put down."
  ]
},

{
  id: 27,
  title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
  author: "C. S. Lewis",
  category: "Fantasy",
  price: 649,
  rating: 4.8,
  language: "English",
  pages: 208,
  publisher: "Geoffrey Bles",
  published: "1950",
  isbn: "9780064471046",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780064471046-L.jpg",

  summary:
    "The Lion, the Witch and the Wardrobe transports readers into the magical world of Narnia through an ordinary wardrobe discovered by four siblings. Once inside, they find a kingdom trapped in endless winter under the rule of the White Witch. Guided by the noble lion Aslan, the children embark on an unforgettable adventure filled with courage, sacrifice, and hope. C. S. Lewis creates a timeless fantasy that celebrates friendship, faith, and the triumph of good over evil, making it one of the world's most cherished children's classics.",

  reviews: [
    "A magical story filled with unforgettable adventures.",
    "Aslan is one of literature's greatest characters.",
    "A timeless fantasy suitable for every age.",
    "Beautiful storytelling from beginning to end."
  ]
},

{
  id: 28,
  title: "A Game of Thrones",
  author: "George R. R. Martin",
  category: "Fantasy",
  price: 999,
  rating: 4.9,
  language: "English",
  pages: 848,
  publisher: "Bantam Spectra",
  published: "1996",
  isbn: "9780553103540",
  stock: "Best Seller",
  image: "https://covers.openlibrary.org/b/isbn/9780553103540-L.jpg",

  summary:
    "A Game of Thrones is the first novel in George R. R. Martin's epic fantasy series, A Song of Ice and Fire. Set across the kingdoms of Westeros, powerful noble families compete for control of the Iron Throne while an ancient threat slowly rises beyond the northern Wall. Filled with political intrigue, unforgettable battles, morally complex characters, and unexpected twists, the novel redefined modern fantasy literature. Its rich world-building and gripping storytelling make it an essential read for fantasy enthusiasts.",

  reviews: [
    "An epic fantasy masterpiece.",
    "Outstanding world-building and unforgettable characters.",
    "Every chapter keeps you completely hooked.",
    "One of the greatest fantasy novels ever written."
  ]
},

{
  id: 29,
  title: "The Name of the Wind",
  author: "Patrick Rothfuss",
  category: "Fantasy",
  price: 799,
  rating: 4.8,
  language: "English",
  pages: 662,
  publisher: "DAW Books",
  published: "2007",
  isbn: "9780756404741",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",

  summary:
    "The Name of the Wind tells the extraordinary life story of Kvothe, a gifted musician, magician, and adventurer whose legendary reputation has spread throughout the world. Narrated by Kvothe himself, the novel explores his difficult childhood, education at a magical university, and relentless search for the mysterious Chandrian who destroyed his family. Patrick Rothfuss combines poetic writing, memorable characters, and an intricately crafted fantasy world to create one of the most celebrated modern fantasy novels.",

  reviews: [
    "Beautifully written with incredible storytelling.",
    "Kvothe is an unforgettable main character.",
    "A fantasy novel unlike any other.",
    "An absolute masterpiece of modern fantasy."
  ]
},

{
  id: 30,
  title: "Dracula",
  author: "Bram Stoker",
  category: "Horror",
  price: 599,
  rating: 4.7,
  language: "English",
  pages: 488,
  publisher: "Archibald Constable and Company",
  published: "1897",
  isbn: "9780486411095",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780486411095-L.jpg",

  summary:
    "Dracula is the legendary Gothic horror novel that introduced the world's most famous vampire, Count Dracula. The story begins when solicitor Jonathan Harker travels to Dracula's mysterious castle in Transylvania, only to uncover terrifying secrets. As Dracula spreads fear across England, a determined group led by Professor Abraham Van Helsing joins forces to stop him. Bram Stoker masterfully blends suspense, mystery, folklore, and supernatural horror, creating a timeless classic that has inspired countless books, films, and adaptations.",

  reviews: [
    "The greatest vampire novel ever written.",
    "Dark, suspenseful, and incredibly atmospheric.",
    "A true masterpiece of Gothic horror.",
    "Essential reading for horror fans."
  ]
},
{
  id: 31,
  title: "Frankenstein",
  author: "Mary Shelley",
  category: "Horror",
  price: 499,
  rating: 4.7,
  language: "English",
  pages: 280,
  publisher: "Lackington, Hughes, Harding, Mavor & Jones",
  published: "1818",
  isbn: "9780486282114",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780486282114-L.jpg",

  summary:
    "Frankenstein is one of the earliest and most influential works of science fiction and Gothic horror. The novel follows Victor Frankenstein, a brilliant scientist who becomes obsessed with creating life through scientific experimentation. His success leads to the birth of a lonely and misunderstood creature whose search for love and acceptance turns into a tragic tale of revenge. Mary Shelley explores themes of ambition, responsibility, loneliness, and the ethical limits of scientific discovery. Rich in emotion and philosophical depth, Frankenstein remains a timeless literary masterpiece.",

  reviews: [
    "A brilliant blend of horror and philosophy.",
    "Far more emotional than I expected.",
    "Mary Shelley's writing is timeless.",
    "A must-read Gothic classic."
  ]
},

{
  id: 32,
  title: "The Shining",
  author: "Stephen King",
  category: "Horror",
  price: 799,
  rating: 4.8,
  language: "English",
  pages: 688,
  publisher: "Doubleday",
  published: "1977",
  isbn: "9780307743657",
  stock: "Best Seller",
  image: "https://covers.openlibrary.org/b/isbn/9780307743657-L.jpg",

  summary:
    "The Shining follows Jack Torrance, an aspiring writer who accepts a winter caretaker position at the isolated Overlook Hotel with his wife and young son, Danny. As harsh weather traps the family inside, the hotel's dark supernatural forces begin influencing Jack's mind while Danny's extraordinary psychic abilities reveal terrifying secrets hidden within the building. Stephen King masterfully combines psychological suspense with supernatural horror, creating an unforgettable story about fear, isolation, addiction, and the destructive power of evil.",

  reviews: [
    "Stephen King's finest horror novel.",
    "Terrifying from beginning to end.",
    "The atmosphere is hauntingly perfect.",
    "An unforgettable psychological thriller."
  ]
},

{
  id: 33,
  title: "Pet Sematary",
  author: "Stephen King",
  category: "Horror",
  price: 749,
  rating: 4.7,
  language: "English",
  pages: 416,
  publisher: "Doubleday",
  published: "1983",
  isbn: "9780385182447",
  stock: "Only 7 Left",
  image: "https://covers.openlibrary.org/b/isbn/9780385182447-L.jpg",

  summary:
    "Pet Sematary tells the chilling story of Dr. Louis Creed and his family after they move into a peaceful home near an ancient burial ground with mysterious powers. Following a heartbreaking tragedy, Louis is tempted to use the cemetery's supernatural ability to bring the dead back to life. What begins as hope soon turns into unimaginable horror. Stephen King explores grief, love, loss, and the consequences of interfering with nature, making this one of his darkest and most disturbing novels.",

  reviews: [
    "One of Stephen King's scariest books.",
    "Emotionally devastating and deeply unsettling.",
    "A horror masterpiece with unforgettable moments.",
    "A gripping story that keeps you awake at night."
  ]
},

{
  id: 34,
  title: "The Exorcist",
  author: "William Peter Blatty",
  category: "Horror",
  price: 699,
  rating: 4.7,
  language: "English",
  pages: 385,
  publisher: "Harper & Row",
  published: "1971",
  isbn: "9780061007224",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780061007224-L.jpg",

  summary:
    "The Exorcist is one of the most iconic horror novels ever written. The story follows young Regan MacNeil, whose mysterious and frightening behavior convinces doctors that something beyond medical science is responsible. Desperate for answers, her mother turns to two priests who attempt a dangerous exorcism against an ancient demonic force. William Peter Blatty creates an intense atmosphere of suspense, fear, and psychological tension while exploring themes of faith, doubt, sacrifice, and the battle between good and evil.",

  reviews: [
    "A chilling horror classic.",
    "Suspenseful, emotional, and unforgettable.",
    "One of the greatest supernatural horror novels.",
    "An absolute masterpiece of Gothic horror."
  ]
},

{
  id: 35,
  title: "Jane Eyre",
  author: "Charlotte Brontë",
  category: "Classic",
  price: 599,
  rating: 4.8,
  language: "English",
  pages: 532,
  publisher: "Smith, Elder & Co.",
  published: "1847",
  isbn: "9780142437209",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780142437209-L.jpg",

  summary:
    "Jane Eyre is a timeless coming-of-age novel that follows the remarkable journey of Jane, an orphan who rises above hardship through intelligence, resilience, and unwavering integrity. After becoming a governess at Thornfield Hall, she develops a deep bond with the mysterious Edward Rochester while uncovering secrets hidden within the estate. Charlotte Brontë skillfully blends romance, mystery, and social criticism, exploring themes of love, independence, morality, and personal dignity. Jane Eyre continues to inspire readers with its strong heroine and emotionally rich storytelling.",

  reviews: [
    "One of the greatest classic novels ever written.",
    "Jane is an inspiring and unforgettable heroine.",
    "Beautiful writing filled with emotion.",
    "A timeless masterpiece of English literature."
  ]
},
{
  id: 36,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  category: "Classic",
  price: 499,
  rating: 4.7,
  language: "English",
  pages: 208,
  publisher: "Charles Scribner's Sons",
  published: "1925",
  isbn: "9780743273565",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",

  summary:
    "The Great Gatsby is a timeless American classic set during the glamorous Jazz Age of the 1920s. The story follows the mysterious millionaire Jay Gatsby, whose lavish parties and extraordinary wealth hide a lifelong obsession with his lost love, Daisy Buchanan. Through the eyes of narrator Nick Carraway, the novel explores ambition, wealth, social status, love, and the illusion of the American Dream. Fitzgerald's elegant writing and unforgettable characters create a powerful reflection on hope, desire, and the consequences of chasing impossible dreams.",

  reviews: [
    "A beautifully written literary masterpiece.",
    "Jay Gatsby is one of fiction's most memorable characters.",
    "An unforgettable story about love and ambition.",
    "A timeless classic worth reading again and again."
  ]
},

{
  id: 37,
  title: "Wuthering Heights",
  author: "Emily Brontë",
  category: "Classic",
  price: 549,
  rating: 4.6,
  language: "English",
  pages: 416,
  publisher: "Thomas Cautley Newby",
  published: "1847",
  isbn: "9780141439556",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg",

  summary:
    "Wuthering Heights is a haunting Gothic romance that tells the passionate and tragic story of Heathcliff and Catherine Earnshaw. Set against the wild Yorkshire moors, the novel explores themes of love, revenge, jealousy, pride, and redemption across multiple generations. Emily Brontë's unforgettable characters and emotionally intense storytelling make this one of the greatest novels in English literature. Its dark atmosphere and psychological depth continue to captivate readers more than a century after its publication.",

  reviews: [
    "A powerful and unforgettable classic.",
    "Dark, emotional, and beautifully written.",
    "Heathcliff is one of literature's most fascinating characters.",
    "An extraordinary Gothic romance."
  ]
},

{
  id: 38,
  title: "Moby-Dick",
  author: "Herman Melville",
  category: "Classic",
  price: 699,
  rating: 4.6,
  language: "English",
  pages: 720,
  publisher: "Harper & Brothers",
  published: "1851",
  isbn: "9780142437247",
  stock: "In Stock",
  image: "https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg",

  summary:
    "Moby-Dick follows the adventurous sailor Ishmael as he joins Captain Ahab aboard the whaling ship Pequod. Driven by an all-consuming obsession, Ahab relentlessly hunts the legendary white whale known as Moby Dick. As the voyage unfolds, the novel explores themes of revenge, fate, humanity's relationship with nature, and the limits of ambition. Herman Melville combines thrilling sea adventures with profound philosophical reflections, making Moby-Dick one of the greatest literary achievements in world literature.",

  reviews: [
    "An epic adventure with remarkable depth.",
    "A true literary masterpiece.",
    "Rich symbolism and unforgettable storytelling.",
    "One of the greatest novels ever written."
  ]
},

{
  id: 39,
  title: "The Adventures of Sherlock Holmes",
  author: "Arthur Conan Doyle",
  category: "Classic",
  price: 649,
  rating: 4.9,
  language: "English",
  pages: 389,
  publisher: "George Newnes",
  published: "1892",
  isbn: "9780141034379",
  stock: "Best Seller",
  image: "https://covers.openlibrary.org/b/isbn/9780141034379-L.jpg",

  summary:
    "The Adventures of Sherlock Holmes is a remarkable collection of twelve detective stories featuring the world's most famous detective, Sherlock Holmes, and his loyal friend Dr. John Watson. Using brilliant observation, logical reasoning, and unmatched deductive skills, Holmes solves some of London's most puzzling mysteries. Arthur Conan Doyle masterfully combines suspense, clever plots, and memorable characters to create stories that have entertained readers for generations. This collection remains one of the finest detective works ever published and continues to inspire modern mystery fiction.",

  reviews: [
    "Sherlock Holmes is simply brilliant.",
    "Each mystery is clever and exciting.",
    "Arthur Conan Doyle created the perfect detective.",
    "A must-read for every mystery lover."
  ]
},
];

export default books;