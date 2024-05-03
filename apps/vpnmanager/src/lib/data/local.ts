import { User } from '@/vpnmanager/types';
import fs from 'fs';

const filePath = process.env.NEXT_APP_LOCAL_DATA_FILE_PATH ?? ""

const readJsonFile = (): User[] => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeJsonFile = (data: any): void => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
};

const addUserOrUpdate = (obj: User): void => {
    const jsonData: User[] = readJsonFile();
    const index = jsonData.findIndex(user => user.emailAddress === obj.emailAddress);

    if (index === -1) {
        jsonData.push(obj);
    } else {
        jsonData[index] = obj;
    }
    writeJsonFile(jsonData);
};

export default { addUserOrUpdate, readJsonFile }
