import { UserApi, UserModelToSave } from "../types";
import { getAll, get, insert } from "../repository/user";
import { userMapToArray, transformModelToApi, randomDob, randomEmail, randomName, randomPhoneNumber, randomCatUrl, randomTitle } from "../util/user";

export async function getFirstUser(): Promise<UserApi> {
    const allUsers = userMapToArray(await getAll());
    if (!allUsers.length) throw new Error("Can't get first user because length is 0")

    return transformModelToApi(allUsers[0]);
}

export async function getRandomUser(): Promise<UserApi> {
    const allUsers = userMapToArray(await getAll());
    if (!allUsers.length) throw new Error("Can't get random user because length is 0")

    return transformModelToApi(allUsers[Math.floor(Math.random() * allUsers.length)]);
}

export async function getNewRandomUser(): Promise<UserApi> {
    const newUser: UserModelToSave =  {
        id: null,
        dob: randomDob(),
        email: randomEmail(),
        firstName: randomName(),
        lastName: randomName(),
        phone: randomPhoneNumber(),
        pictureLargeUrl: randomCatUrl(),
        pictureThumbnailUrl: randomCatUrl(),
        title: randomTitle()
    }
    const savedUser = {...newUser, id: await insert(newUser)};
    return transformModelToApi(savedUser);
}

export async function getById(id: string): Promise<UserApi> {
    return transformModelToApi(await get(id));
}

export async function getNumber(numToReturn: number): Promise<UserApi[]> {
    const allUsers = userMapToArray(await getAll()).map(transformModelToApi);
    return numToReturn > allUsers.length ? allUsers : allUsers.slice(0, numToReturn)
}