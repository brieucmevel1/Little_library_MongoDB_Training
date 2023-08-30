import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    iterations: 10,
    duration: '20s',
};

// same problem as get user for the id

export default function () {
    let id = '64e74d274bb6162748bac320';
    for (let i = 0; i < 10; i++) {
        id = increment_id(id);

        let payload = {
            _id: id,
        };

        let headers = { 'Content-Type': 'application/json'};

        let res = http.del('http://localhost:3000/api/users', JSON.stringify(payload), { headers: headers });

        check(res, {
            'User deleted successfully': (r) => r.status === 201,
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
