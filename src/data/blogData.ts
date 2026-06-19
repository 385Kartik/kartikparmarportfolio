export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

export const blogData: BlogPost[] = [
  {
    id: "1",
    slug: "building-uni-brain",
    title: "Building Uni-Brain: The AI Application Architecture",
    date: "2026-06-15",
    excerpt: "A deep dive into how I built the architecture for Uni-Brain using React, Node.js, and modern AI integration.",
    content: "Content coming soon...",
    image: "/placeholder.png",
    tags: ["React", "AI", "Architecture"]
  },
  {
    id: "2",
    slug: "lessons-from-launching-navrang",
    title: "Lessons from Launching NavRang: A D2C E-commerce Journey",
    date: "2025-10-05",
    excerpt: "What I learned building a profitable direct-to-consumer Navratri brand from scratch using modern web technologies.",
    content: "Content coming soon...",
    image: "/navrang0.png",
    tags: ["E-commerce", "React", "Startup"]
  }
];
