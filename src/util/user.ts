import { Map, UserApi, UserModel, UserApiToSave, UserModelToSave } from '../types';
import { randomInteger } from './number';

export function userMapToArray<T extends {id: string}>(userMap: Map<T>): T[] {
    return Object.values(userMap).sort((a, b) => a.id.localeCompare(b.id));
}

export function userArrayToMap<T extends {id: string}>(userArray: ReadonlyArray<T>): Map<T> {
    const userMap: Map<T> = {};
    userArray.forEach(user => {
        if (userMap[user.id]) throw new Error(`A user with ID '${user.id}' exists multiple times in the array`);
        userMap[user.id] = user;
    });
    return userMap;
}

export function transformApiToModel(apiUser: UserApi): UserModel {
    const { dob, email, id, name, phone, picture } = apiUser;
    return {
        dob: dob.date,
        email,
        firstName: name.first,
        lastName: name.last,
        id,
        phone,
        pictureLargeUrl: picture.large,
        pictureThumbnailUrl: picture.thumbnail,
        title: name.title
    };
}

export function transformApiToModelToSave(apiUser: UserApiToSave): UserModelToSave {
    const { dob, email, name, phone, picture } = apiUser;
    return {
        dob: dob.date,
        email,
        firstName: name.first,
        lastName: name.last,
        id: null,
        phone,
        pictureLargeUrl: picture.large,
        pictureThumbnailUrl: picture.thumbnail,
        title: name.title
    };
}

export function transformModelToApi(modelUser: UserModel): UserApi {
    const {
        id,
        title,
        firstName,
        lastName,
        email,
        dob,
        phone,
        pictureLargeUrl,
        pictureThumbnailUrl,
    } = modelUser;
    return {
        dob: {
            age: new Date().getFullYear() - dob.getFullYear(), // obviously not correct, just an approximation
            date: dob,
        },
        email,
        id,
        name: {
            first: firstName,
            last: lastName,
            title: title
        },
        phone,
        picture: {
            large: pictureLargeUrl,
            thumbnail: pictureThumbnailUrl,
        }
    };
}

export function randomDob() {
    const year = randomInteger(new Date().getFullYear() - 100, new Date().getFullYear());
    const month = randomInteger(0, 11);
    const day = randomInteger(1, 28); // Should get actual possible days in month

    return new Date(year, month, day);
}

const emails = ['puppies%number%@givethemtome.com', 'cats%number%@arethebest.co.nz'];
export function randomEmail(): string {
    return emails[randomInteger(0, emails.length - 1)].replace('%number%', randomInteger(1, 4000).toString());
}

export function randomPhoneNumber(): string {
    return randomInteger(1000000000, 9999999998).toString();
}

const names = ['Jamie', 'Toni', 'Robin', 'Fletch'];
export function randomName(): string {
    return names[randomInteger(0, names.length - 1)];
}

export function randomCatUrl(): string {
    // go get cat url from thecatapi.com
    // until then return a random string
    return randomInteger(0, 10000).toString();
}

const titles = ['Dr', 'Ms', 'Mr', 'Mrs'];
export function randomTitle(): string {
    return titles[randomInteger(0, titles.length - 1)];
}