import { useState } from "react";

const LoginContainer = () => {
    const [form, setForm] = useState({
        companynumber: '1000',
        user: 'msuero2',
        pass: '2109'
    });

    const handleIputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const Login = async (event) => {
        event.preventDefault();
        console.log(form)
        let res = await fetch('http://localhost:3000/Api/login/Access', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let json = await res.json();

        console.log(json)
    }

    return (
        <form onSubmit={Login}>
            <input
                value={form.companynumber}
                name="companynumber"
                placeholder="company number"
                maxLength={6}
                onChange={handleIputChange}
            />
            <input
                value={form.user}
                name="user"
                placeholder="username"
                maxLength={15}
                onChange={handleIputChange}
            />
            <input
                value={form.pass}
                name="pass"
                placeholder="password"
                maxLength={30}
                type="password"
                onChange={handleIputChange}
            />
            <button type="submit">
                send
            </button>
        </form>
    )
}

export { LoginContainer }