import { getAll } from '../../repository/user';
import {testJson} from './user.fixture';

const fileUtil: {
    readFile: () => Promise<string>;
    writeFile: () => Promise<void>;
} = jest.requireActual('../../util/file');

function mockReadFile(json: string): () => Promise<string> {
    return () => new Promise(() => json);
}

describe('getAll', () => {
    // failing atm
    it('corrects date of births', async () => {
        const json: string = testJson;
        fileUtil.readFile = jest.fn(mockReadFile(json));
        const actual = await getAll();
        expect(actual).toMatchObject({
            'f0723b52-4aa8-42b2-8a76-41d90b0fe3c5': {
                id: 'f0723b52-4aa8-42b2-8a76-41d90b0fe3c5',
                dob: new Date('2005-04-10T12:00:00.000Z'),
                email: 'puppies2305@givethemtome.com',
                firstName: 'Fletch',
                lastName: 'Toni',
                phone: '3469533194',
                pictureLargeUrl: '2162',
                pictureThumbnailUrl: '4390',
                title: 'Mr'
            }
        });
    });
});