package com.googlopedia.config;

import com.googlopedia.model.Article;
import com.googlopedia.model.Book;
import com.googlopedia.model.EBook;
import com.googlopedia.model.User;
import com.googlopedia.repository.ArticleRepository;
import com.googlopedia.repository.BookRepository;
import com.googlopedia.repository.EBookRepository;
import com.googlopedia.repository.ReviewRepository;
import com.googlopedia.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class DataInitializer {

        @Bean
        public CommandLineRunner initData(
                        UserRepository userRepository,
                        BookRepository bookRepository,
                        ArticleRepository articleRepository,
                        EBookRepository eBookRepository,
                        ReviewRepository reviewRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        
                        if (userRepository.count() == 0) {
                                User admin = new User();
                                admin.setUsername("admin");
                                admin.setEmail("admin@googlopedia.com");
                                admin.setPassword(passwordEncoder.encode("admin123"));
                                admin.setRole(User.Role.ADMIN);
                                userRepository.save(admin);

                                User user = new User();
                                user.setUsername("user");
                                user.setEmail("user@googlopedia.com");
                                user.setPassword(passwordEncoder.encode("user123"));
                                user.setRole(User.Role.USER);
                                userRepository.save(user);

                                System.out.println("Users seeded: admin/admin123, user/user123");
                        }

                        
                        if (bookRepository.count() != 10) {
                                bookRepository.deleteAll();
                                bookRepository.saveAll(List.of(
                                                new Book(null, "The Great Gatsby", "F. Scott Fitzgerald", 15.99,
                                                                "A stunning portrayal of the Jazz Age, this classic explores themes of wealth, love, and the elusive American Dream in 1920s New York.",
                                                                "https://images.unsplash.com/photo-1543005128-d1a129321415?w=800"),
                                                new Book(null, "1984", "George Orwell", 12.50,
                                                                "A chilling dystopian masterpiece that introduced the world to Big Brother and remains a powerful warning against totalitarianism and surveillance.",
                                                                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"),
                                                new Book(null, "The Hobbit", "J.R.R. Tolkien", 18.00,
                                                                "The enchanting prelude to The Lord of the Rings, following Bilbo Baggins on an epic quest through Middle-earth filled with dragons and treasure.",
                                                                "https://images.unsplash.com/photo-1621351123063-2cd0046e7f8a?w=800"),
                                                new Book(null, "Clean Code", "Robert C. Martin", 45.99,
                                                                "A must-read for any serious developer, this book provides timeless principles for writing code that is readable, maintainable, and professional.",
                                                                "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800"),
                                                new Book(null, "Dune", "Frank Herbert", 22.99,
                                                                "Set on the desert planet Arrakis, this complex sci-fi epic blends politics, religion, and ecology in a struggle for the most valuable substance in the universe.",
                                                                "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800"),
                                                new Book(null, "Atomic Habits", "James Clear", 24.00,
                                                                "A practical guide to breaking bad habits and building good ones by making small, incremental changes that lead to remarkable results over time.",
                                                                "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800"),
                                                new Book(null, "The Alchemist", "Paulo Coelho", 14.50,
                                                                "A philosophical tale about a shepherd boy named Santiago who travels to Egypt in search of treasure, teaching us to listen to our hearts.",
                                                                "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"),
                                                new Book(null, "To Kill a Mockingbird", "Harper Lee", 16.20,
                                                                "A profound exploration of racial injustice and the loss of innocence in the American South, seen through the eyes of young Scout Finch.",
                                                                "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800"),
                                                new Book(null, "Thinking, Fast and Slow", "Daniel Kahneman", 19.99,
                                                                "A world-renowned psychologist explains the two systems that drive the way we think—one fast and emotional, the other slow and logical.",
                                                                "https://images.unsplash.com/photo-1490633874781-1c636c2f5d32?w=800"),
                                                new Book(null, "Sapiens", "Yuval Noah Harari", 21.50,
                                                                "An exploration of the history of humankind, from the evolution of archaic human species in the Stone Age up to the twenty-first century.",
                                                                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800")));
                                System.out.println("Books seeded.");
                        }

                        
                        if (articleRepository.count() != 10) {
                                articleRepository.deleteAll();
                                articleRepository.saveAll(List.of(
                                                new Article(null, "The Future of AI: Ethics and Innovation",
                                                                "As Artificial Intelligence becomes more integrated into our daily lives, the conversation is shifting from 'what can it do' to 'what should it do'. Ethical frameworks are being developed to ensure that AI remains a tool for human empowerment rather than a source of bias and displacement. From healthcare to finance, the potential for innovation is boundless, but it requires a careful balance of progress and responsibility.",
                                                                "Jane Doe", LocalDateTime.now()),
                                                new Article(null, "Spring Boot 3.2: Modern Microservices",
                                                                "The latest release of Spring Boot brings significant improvements in startup time and memory footprint through Project Leyden and GraalVM support. Developers can now build highly efficient microservices that are cheaper to run in the cloud. We explore the best practices for leveraging Virtual Threads (Project Loom) to handle high-concurrency workloads without the complexity of reactive programming.",
                                                                "John Smith", LocalDateTime.now()),
                                                new Article(null, "Mastering React 19: Actions and Beyond",
                                                                "React 19 introduces 'Actions' as a first-class citizen for handling data mutations and state updates. This simplifies the development of complex forms and interactive UIs. Coupled with improved Server Components and better hydration strategies, React continues to push the boundaries of frontend performance and developer experience.",
                                                                "Emily Brown", LocalDateTime.now()),
                                                new Article(null, "The Renaissance of Web Design",
                                                                "Modern web design is moving away from flat, clinical interfaces toward rich, immersive experiences. We're seeing a return to depth through glassmorphism, organic shapes, and sophisticated typography. The focus is no longer just on usability, but on emotional resonance and storytelling through interaction.",
                                                                "Alex Rivera", LocalDateTime.now()),
                                                new Article(null, "A Guide to Quantum Computing",
                                                                "Quantum computing is no longer just theoretical. With giants like IBM and Google making breakthroughs in error correction and qubit stability, we are on the verge of solving problems that are currently impossible for classical computers. From cryptanalysis to materials science, the impact will be revolutionary.",
                                                                "Dr. Sarah Chen", LocalDateTime.now()),
                                                new Article(null, "Sustainable Software Engineering",
                                                                "The environmental impact of our code is becoming a critical consideration. Green software engineering focuses on building applications that consume less energy and generate less carbon. This involves optimizing algorithms, choosing efficient hosting, and being mindful of the data we transfer.",
                                                                "Michael Green", LocalDateTime.now()),
                                                new Article(null, "The Psychology of Peak Performance",
                                                                "What separates the good from the great? We dive into the science of flow states, mental toughness, and the daily habits that allow peak performers to maintain consistency in high-pressure environments.",
                                                                "Sarah Jenkins", LocalDateTime.now()),
                                                new Article(null, "Cybersecurity Trends for 2026",
                                                                "As threats become more sophisticated, the defense must evolve. We examine the rise of AI-driven security systems, zero-trust architectures, and the importance of quantum-resistant encryption in the coming years.",
                                                                "David Miller", LocalDateTime.now()),
                                                new Article(null, "The Art of Minimalist Living",
                                                                "In a world of constant noise and distraction, minimalism offers a path to clarity. Discover how reducing physical and digital clutter can lead to a more intentional and fulfilling lifestyle.",
                                                                "Sophia Lane", LocalDateTime.now()),
                                                new Article(null, "Biodiversity and Ecosystem Services",
                                                                "Our survival depends on the intricate web of life. We explore how preserving biodiversity is not just about saving species, but about maintaining the essential services that nature provides, from pollination to climate regulation.",
                                                                "Dr. Robert Forest", LocalDateTime.now())));
                                System.out.println("Articles seeded.");
                        }

                        
                        if (eBookRepository.count() != 5) {
                                eBookRepository.deleteAll();
                                eBookRepository.saveAll(List.of(
                                                new EBook(null, "Eloquent JavaScript", "Marijn Haverbeke",
                                                                "A comprehensive guide to JavaScript, from the basics to advanced concepts like functional programming and asynchronous execution.",
                                                                "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
                                                                "https://eloquentjavascript.net/"),
                                                new EBook(null, "Introduction to Algorithms", "Thomas H. Cormen",
                                                                "The definitive guide to algorithms, covering everything from sorting and searching to graph algorithms and dynamic programming.",
                                                                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
                                                                "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/"),
                                                new EBook(null, "Clean Code: A Handbook of Agile Software Craftsmanship",
                                                                "Robert C. Martin",
                                                                "Essential reading for any software developer who wants to write clean, maintainable, and professional code.",
                                                                "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500",
                                                                "https://www.oreilly.com/library/view/clean-code-a/9780136083238/"),
                                                new EBook(null, "Designing Data-Intensive Applications",
                                                                "Martin Kleppmann",
                                                                "An in-depth look at the principles and trade-offs involved in designing systems that handle large amounts of data.",
                                                                "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=500",
                                                                "https://dataintensive.net/"),
                                                new EBook(null, "The Pragmatic Programmer", "Andrew Hunt",
                                                                "A classic book that provides practical advice and tips for becoming a better and more efficient programmer.",
                                                                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500",
                                                                "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/")));
                                System.out.println("E-Books seeded.");
                        }
                };
        }
}
