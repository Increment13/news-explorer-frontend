const BASE_URL = 'https://api.inc13.students.nomoreparties.co';

export const postRequest = (data) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};


export const deleteRequest = (data) => {
    return fetch(`${BASE_URL}/articles/${data}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
    })        
    .then((res) => {
        return res;
    })
    .catch((err) => console.log(err));;
}


export const getRequest = () => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
        },
    })        
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res.statusText)
        }
    })
    .catch((err) => console.log(err));;
}