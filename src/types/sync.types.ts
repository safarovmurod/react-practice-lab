export interface SyncItem {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Pending" | "Completed";
  img: string;
}
