import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs';
import jwt from 'jsonwebtoken';
import * as path from 'path';

import User from '../../models/models';

var privateKey = fs.readFileSync(path.join(__dirname, '../../key/jwtRS256.key'), 'utf8');
var pemPrivateKey = fs.readFileSync(path.join(__dirname, '../../key/jwtRS256.key.pub'), 'utf8');

const ExpiresIn: string = "1h"

const DBuser: User = {
    email: 'mevlut053@icloud.com',
    password: '123456'
}

const AuthLogin = async (email: string, password: string) => {

    const bool: boolean = (email === DBuser.email && password === DBuser.password) ? true : false;

    if (bool === true) {
        const token = jwt.sign({
            email: email,
            uid: "123123-123-12-3123132"
        },
            privateKey,
            {
                expiresIn: ExpiresIn,
                algorithm: 'RS256',
                issuer: "https://localhost:6060"
            }
        )
        return token;
    } else {
        return false;
    }

}

const AuthVerify = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, pemPrivateKey);
        return decoded;
    } catch (e) {
        return false;
    }
}

const AuthRefreshToken = async (email: string, token: string) => {
    try {
        const decoded: any = await jwt.verify(token, pemPrivateKey);

        if (decoded.email !== email) {
            return false;
        } else {
            const newToken = jwt.sign({
                email: email,
                uid: "123123-123-12-3123132"
            },
                privateKey,
                {
                    expiresIn: ExpiresIn,
                    algorithm: 'RS256'
                }
            )
            return newToken;
        }


    } catch (e) {
        return false;
    }
}

export default { AuthLogin, AuthVerify, AuthRefreshToken };