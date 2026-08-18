export const ALL_STORE_PRODUCTS = [
  // 1. Book Stall
  { id: 'book_1', name: 'The Alchemist', category: 'Book Stall', price: 299, stock: 45, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80', description: 'A fable about following your dream.' },
  { id: 'book_2', name: 'Atomic Habits', category: 'Book Stall', price: 450, stock: 32, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80', description: 'An easy & proven way to build good habits.' },
  { id: 'book_3', name: 'Deep Work', category: 'Book Stall', price: 380, stock: 20, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&q=80', description: 'Rules for focused success in a distracted world.' },

  // 2. Bags
  { id: 'bag_1', name: 'Urban Explorer Backpack', category: 'Bags', price: 1499, stock: 18, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', description: 'Durable water-resistant commuter backpack.' },
  { id: 'bag_2', name: 'Classic Leather Tote', category: 'Bags', price: 2299, stock: 12, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80', description: 'Handcrafted genuine leather tote bag.' },

  // 3. Cosmetics
  { id: 'cosmetic_1', name: 'Matte Liquid Lipstick', category: 'Cosmetics', price: 599, stock: 60, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80', description: 'Long-lasting vibrant matte lip color.' },
  { id: 'cosmetic_2', name: 'Hydrating Glow Serum', category: 'Cosmetics', price: 899, stock: 25, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', description: 'Hyaluronic acid infused radiance face serum.' },

  // 4. Costumes
  { id: 'costume_1', name: 'Superhero Party Outfit', category: 'Costumes', price: 1299, stock: 15, image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80', description: 'High quality heroic party costume.' },
  { id: 'costume_2', name: 'Royal Velvet Cape Set', category: 'Costumes', price: 1799, stock: 8, image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80', description: 'Elegant velvet theatrical cape.' },

  // 5. Ice Cream
  { id: 'icecream_1', name: 'Belgian Chocolate Tub', category: 'Ice Cream', price: 280, stock: 40, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&q=80', description: 'Rich dark chocolate artisanal ice cream.' },
  { id: 'icecream_2', name: 'Mango Passion Sundae', category: 'Ice Cream', price: 220, stock: 35, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80', description: 'Fresh Alphonso mango gelato with toppings.' },

  // 6. Shoes
  { id: 'shoe_1', name: 'Pro Runner Sneakers', category: 'Shoes', price: 2499, stock: 22, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', description: 'Lightweight cushioned performance running shoes.' },
  { id: 'shoe_2', name: 'Urban Streetwear Loafers', category: 'Shoes', price: 1999, stock: 14, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80', description: 'Premium suede casual slip-on shoes.' },

  // 7. Sports
  { id: 'sport_1', name: 'Carbon Badminton Racket', category: 'Sports', price: 1899, stock: 20, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&q=80', description: 'Ultra-light graphite frame badminton racket.' },
  { id: 'sport_2', name: 'FIFA Standard Soccer Ball', category: 'Sports', price: 899, stock: 30, image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&q=80', description: 'Match-grade size 5 football.' },

  // 8. Watches
  { id: 'watch_1', name: 'Chronograph Leather Watch', category: 'Watches', price: 3499, stock: 10, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80', description: 'Classic analog watch with genuine leather strap.' },
  { id: 'watch_2', name: 'Minimalist Mesh Smartwatch', category: 'Watches', price: 4299, stock: 15, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80', description: 'Fitness tracking smartwatch with AMOLED display.' },

  // 9. Fragrance
  { id: 'fragrance_1', name: 'Luxury Velvet Rose Perfume', category: 'Fragrance', price: 1999, stock: 28, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80', description: 'Exquisite floral fragrance with woody notes.' },
  { id: 'fragrance_2', name: 'Ocean Mist Eau De Parfum', category: 'Fragrance', price: 1699, stock: 19, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80', description: 'Refreshing aquatic scent for daily luxury.' },

  // 10. Tickets
  { id: 'ticket_1', name: 'IMAX VIP Movie Ticket', category: 'Tickets', price: 650, stock: 100, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80', description: 'Recliner seat VIP movie experience.' },
  { id: 'ticket_2', name: 'Mall Express Waterpark Pass', category: 'Tickets', price: 1200, stock: 80, image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=500&q=80', description: 'Full day unlimited access to water rides.' }
];
