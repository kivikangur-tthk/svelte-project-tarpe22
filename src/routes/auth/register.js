import * as api from 'api.js';

export function post(req, res) {
    const user = req.body;

    api.post('/users', { ...user }).then(response => {
        console.log(response);
        if (response.user) {
            req.session.user = response.user;
        }

        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify(response));
    });
}