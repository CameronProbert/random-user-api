import { UserApi, UserModelToSave, FilterOptions, UserApiToSave } from '../types';
import { getAll, get, insert, save } from '../repository/user';
import { userMapToArray, transformModelToApi, randomDob, randomEmail, randomName, randomPhoneNumber, randomCatUrl, randomTitle, transformApiToModelToSave } from '../util/user';

export async function getFirstUser(): Promise<UserApi> {
    const allUsers = userMapToArray(await getAll());
    if (!allUsers.length) throw new Error('Can\'t get first user because length is 0');

    return transformModelToApi(allUsers[0]);
}

export async function getRandomUser(): Promise<UserApi> {
    const allUsers = userMapToArray(await getAll());
    if (!allUsers.length) throw new Error('Can\'t get random user because length is 0');

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
    };
    const savedUser = {...newUser, id: await insert(newUser)};
    return transformModelToApi(savedUser);
}

export async function getById(id: string): Promise<UserApi> {
    return transformModelToApi(await get(id));
}

export async function getFiltered(filters: FilterOptions): Promise<UserApi[]> {
    const allUsers = userMapToArray(await getAll());
    const filteredUsers = allUsers.filter(user => {
        if (filters.firstName && user.firstName !== filters.firstName) return false;
        if (filters.lastName && user.lastName !== filters.lastName) return false;
        return true;
    });
    if (filters.numToReturn) {
        const numToReturn = Math.min(filters.numToReturn, filteredUsers.length);
        return filteredUsers.slice(0, numToReturn).map(transformModelToApi);
    }
    return filteredUsers.map(transformModelToApi);
}

export async function deleteById(id: string): Promise<void> {
    const allUsers = await getAll();
    if (!allUsers[id]) throw new Error(`Could not find user with ID ${id}`)
    try {
        delete allUsers[id];
        save(allUsers);
    } catch (err) {
        throw new Error(`There was a problem deleting user ${id}`);
    }
}

export async function addNewUser(user: UserApiToSave): Promise<string> {
    return insert(transformApiToModelToSave(user));
}
