export type User = {
    name: {
        title: string,
        first: string,
        last: string
      },
	  email: string,
      dob: {
        date: Date,
        age: number
      },
      phone: string,
      id: string,
      picture: {
        large: string,
        thumbnail: string
      }
}
export type UserMap = {[id: string]: User}