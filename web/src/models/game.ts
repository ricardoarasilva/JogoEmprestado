export default interface Game {
  id: string,
  title: string,
  description: string,
  genre: string,
  friendId: string,
  borrowedTo?: {
    id: string,
    fullname: string,
    address?: string
  }
}