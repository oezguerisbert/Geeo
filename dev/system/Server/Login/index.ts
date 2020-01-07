import express from 'express';
import url from 'url';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { createAccessToken } from '../';
function RLogin() {
    let router: express.Router = express.Router({ mergeParams: true });

    router.get('/', function(req: express.Request, res: express.Response) {
        let q = req.query || req.body;

        let cookies = req.cookies;
        if (typeof q.forced !== 'undefined') {
            console.log('Forced login...');
            return res.render('login');
        } else if (!cookies || Object.keys(cookies).length == 0) {
            console.log('No cookie set');
            return res.render('login');
        } else if (!cookies.user) {
            console.log(typeof cookies);

            console.log("No 'user' cookie set", cookies);
            return res.render('login');
        } else if (cookies.user === 'empty') {
            console.log('empty cookie...');
            return res.render('login');
        }

        return res.redirect('/');
    });
    return router;
}
export default RLogin();
