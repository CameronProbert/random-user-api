import path from 'path'
import fs from 'fs'
import util from 'util'
import { UserMap } from '../types';

const jsonPath: Readonly<string> = path.join("./public", "testData.json");

const readFile = util.promisify(fs.readFile);

export async function getAll(): Promise<UserMap> {
    const fileBuffer = await readFile(jsonPath, 'utf8');
    const contents: UserMap = JSON.parse(fileBuffer)
    return contents;
}