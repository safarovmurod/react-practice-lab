export interface ToDoImage {
  id: number;
  imageName: string;
}

export interface AsyncToDoItem {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  images: ToDoImage[];
}

export interface EditToDo {
  id: number
  name: string
  description: string
}

export interface AsyncForm {
  name: string
  description: string
  images: FileList
}
