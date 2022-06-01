const URL = 'http://localhost:3000/Api/login/Access';

const Post = async (data) => {
    const json = await (await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();

    return json;
}

export { Post };