import type { SyncItem } from "@/types/sync.types";
import type { AsyncToDoItem } from "@/types/async.types";

export const initialSyncItems: SyncItem[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium noise-cancelling over-ear wireless headphones with deep bass.",
    status: "Active",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Custom RGB mechanical keyboard with brown tactile switches.",
    status: "Pending",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "UltraWide Gaming Monitor",
    description: "34-inch curved ultra-wide gaming monitor with 144Hz refresh rate.",
    status: "Completed",
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
  },
];

export const initialAsyncItems: AsyncToDoItem[] = [
  {
    id: 4161,
    name: "Design System Implementation",
    description: "Create unified accessible component library for web and mobile.",
    isCompleted: false,
    images: [
      {
        id: 6294,
        imageName: "cab19096-8241-49da-a680-05e7a008e57c.jpg",
      },
    ],
  },
  {
    id: 4162,
    name: "Refactor API Services",
    description: "Migrate REST queries to centralized HTTP client with interceptors.",
    isCompleted: true,
    images: [
      {
        id: 6295,
        imageName: "3e5f9bd7-25fd-42ac-8bbc-21a6bcd2d970.png",
      },
    ],
  },
  {
    id: 4163,
    name: "Write Unit Tests",
    description: "Coverage verification for core business logic and state managers.",
    isCompleted: false,
    images: [],
  },
];
