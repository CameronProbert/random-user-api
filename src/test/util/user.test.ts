import { userMapToArray, userArrayToMap } from '../../util/user';
import { UserMap, User } from '../../types';

const userSomeId = {
    dob: {
        age: 30,
        date: new Date(1990, 2, 2)
    },
    email: 'someEmail',
    id: 'someId',
    name: {
        first: 'Jamie',
        last: 'Guthrie',
        title: 'Dr'
    },
    phone: '022 1234 5678',
    picture: {
        large: 'largeUrl',
        thumbnail: 'thumb'
    }
};

const userAsb456a46 = {
    dob: {
        age: 10,
        date: new Date(2010, 0, 31)
    },
    email: 'av3',
    id: 'asb456a46',
    name: {
        first: 'Jamie',
        last: 'Guthrie',
        title: 'Mr'
    },
    phone: '022 1234 5678',
    picture: {
        large: 'largeUrl2',
        thumbnail: 'thumb2'
    }
};

const userQwer = {
    dob: {
        age: 100,
        date: new Date(1919, 9, 12)
    },
    email: 'qwer@',
    id: 'qwer',
    name: {
        first: 'Guy',
        last: 'McGoober',
        title: 'Mr'
    },
    phone: '021 3212 3212',
    picture: {
        large: 'largeUrlqwer',
        thumbnail: 'thumbqwer'
    }
};

const userSomeIdzxc = {
    dob: {
        age: 1,
        date: new Date(2018, 5, 5)
    },
    email: 'someEmailzxc',
    id: 'someIdzxc',
    name: {
        first: 'Bub',
        last: 'Bull',
        title: 'Ms'
    },
    phone: '020 5678 8765',
    picture: {
        large: 'largeUrlbub',
        thumbnail: 'thumbbub'
    }
};

describe('userMapToArray', () => {
    it.each([[userAsb456a46], [userQwer], [userSomeId], [userSomeIdzxc]])('turns a single user in map to single user in array', user => {
        const map: UserMap = {
            [user.id]: user,
        };

        const actual = userMapToArray(map);

        expect(actual).toMatchObject([user]);
    });

    it('turns a single user in map to single user in array', () => {
        const map: UserMap = {
            [userSomeId.id]: userSomeId,
            [userAsb456a46.id]: userAsb456a46,
            [userSomeIdzxc.id]: userSomeIdzxc,
            [userQwer.id]: userQwer,
        };

        const actual = userMapToArray(map);

        expect(actual).toMatchObject([userAsb456a46, userQwer, userSomeId, userSomeIdzxc]);
    });
});

describe('userMapToArray', () => {
    it.each([[userAsb456a46], [userQwer], [userSomeId], [userSomeIdzxc]])('turns a single user in array to single user in map', (user) => {
        const array: User[] = [user];

        const actual = userArrayToMap(array);

        expect(actual).toMatchObject({[user.id]: user});
    });

    it.each([
        [[userAsb456a46], [userQwer], [userSomeId], [userSomeIdzxc]],
        [[userQwer], [userAsb456a46], [userSomeId], [userSomeIdzxc]],
        [[userQwer], [userSomeId], [userAsb456a46], [userSomeIdzxc]],
        [[userSomeIdzxc], [userAsb456a46], [userQwer], [userSomeId]]
    ])('turns a an array of users into a map of users', (userArray) => {
        const actual = userArrayToMap(userArray);

        expect(actual).toMatchObject({
            [userAsb456a46.id]: userAsb456a46,
            [userSomeId.id]: userSomeId,
            [userSomeIdzxc.id]: userSomeIdzxc,
            [userQwer.id]: userQwer,
        });
    });
});