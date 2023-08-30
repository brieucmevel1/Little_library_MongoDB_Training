import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    iterations: 10,
    duration: '20s',
};

// the get function is not complete since the
// id is too long to do a simple function

export default function () {
    let id = '64ec8ea60f43b920b60afc70';
    for (let i = 0; i < 10; i++) {
        id = increment_id(id);

        let payload = {
            _id: id,
        };

        let headers = { 'Content-Type': 'application/json'};

        let res = http.post('http://localhost:3000/api/users', JSON.stringify(payload), { headers: headers });

        check(res, {
            'User gotten successfully': (r) => r.status === 201,
        });

        sleep(1); 
    }
}

function increment_id(id) {
    const half = Math.floor(id.length / 2);
    const first_half = id.substring(0, half);
    const second_half = id.substring(half);
    const new_second_half = (parseInt(second_half, 16) + 1).toString(16);
    const new_id = first_half + new_second_half;
    console.log("id:", new_id);
    return new_id;
}