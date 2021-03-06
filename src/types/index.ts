export type UserApi = {
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

export type UserApiToSave = {
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
  picture: {
    large: string,
    thumbnail: string
  }
}

export type UserModel = {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  dob: Date,
  phone: string,
  pictureLargeUrl: string,
  pictureThumbnailUrl: string,
}

export type UserModelToSave = {
  id: null,
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  dob: Date,
  phone: string,
  pictureLargeUrl: string,
  pictureThumbnailUrl: string,
}

export type Map<T> = {[id: string]: T}

export type FilterOptions = Partial<{
  numToReturn: number,
  firstName: string,
  lastName: string,
}>
