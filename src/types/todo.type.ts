export interface Image {
   id: number
   imageName: string
}

export interface ITodo {
   id: number
   name: string
   description: string
   isCompleted: boolean
   images: Image[]
}

export interface IResponse<T> {
   data: T
   errors: string[]
   statusCode: number
}
