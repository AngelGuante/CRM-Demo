import React, { useEffect } from "react";
import { Get } from "../utils/Requests";

const HomeContainer = () => {
    let tokenValidated = false;

    useEffect(() => {
        const validateToken = async () => {
            if (!tokenValidated) {
                tokenValidated = !tokenValidated;
                await Get('Home');
            }
        }
        validateToken();
    });

    return (
        <div>
            {tokenValidated ?? <h1>dasda</h1>}
        </div>
    );
}

export { HomeContainer }