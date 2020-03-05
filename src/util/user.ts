import { UserMap, User } from "../types";

export function UserMapToArray(userMap: UserMap): User[] {
    return Object.values(userMap);
}

export function UserArrayToMap(userArray: ReadonlyArray<User>): UserMap {
    const userMap: UserMap = {};
    userArray.forEach(user => userMap[user.id] = user);
    return userMap;
}