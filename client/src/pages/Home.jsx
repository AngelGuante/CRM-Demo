import React, { useEffect, useState } from "react";
import { Get } from "../utils/Requests";

const HomeContainer = () => {
    const [tokenValidated, setTokenValidated] = useState(false);

    useEffect(() => {
        const validateToken = async () => {
            if (!tokenValidated) {
                setTokenValidated(true);
                await Get('Home');
            }
        }
        validateToken();
    });

    return (
        <div>
        </div>
    );
}

export { HomeContainer }