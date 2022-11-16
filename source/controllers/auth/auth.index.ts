import { Request, Response, NextFunction } from 'express';
import LoginServices from '../../services/auth/auth.index';

const jwtLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(404).send({
                message: 'Email and password can not be empty!',
            });
        }
        else {
            const result = await LoginServices.AuthLogin(req.body.email, req.body.password);

            if (result === false) {
                res.status(401).json({
                    err: 'Auth Error',
                    message: result
                });
            }
            else {
                res.status(200).json({
                    message: 'success',
                    token: result
                });
            }
        }


    } catch (e) {
        res.status(501).send(e)
    }

};

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const result = await LoginServices.AuthVerify(req.body.token);
        if (result === false) {
            res.status(401).json({
                err: 'Auth Error',
                message: result
            });
        }
        else {
            res.status(200).json({
                result
            });
        }

    } catch (e) {
        res.status(501).send(e)
    }

}

const jwtRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await LoginServices.AuthRefreshToken(req.body.email,req.body.token);
        if (result === false) {
            res.status(401).json({
                err: 'Auth Error',
                message: result
            });
        }
        else {
            res.header('Authorization', result);
            res.status(200).json({
                result
            });
        }

    } catch (e) {
        res.status(501).send(e)
    }

}

export default { jwtLogin, jwtVerify, jwtRefreshToken };