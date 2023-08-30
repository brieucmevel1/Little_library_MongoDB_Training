import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    iterations: 10,
    duration: '20s',
};

// Working code to create user on the db

export default function () {
    for (let i = 0; i < 10; i++) {
        let username = 'User' + i;
        let password = 'Password123';

        let payload = {
            Username: username,
            Password: password,
            Possessed: [],
            ID: 1000 + i,
        };

        let headers = { 'Content-Type': 'application/json'};

        let res = http.post('http://localhost:3000/api/users', JSON.stringify(payload), { headers: headers });

        check(res, {
            'User created successfully': (r) => r.status === 201,
        });

        sleep(1); 
    }
}
