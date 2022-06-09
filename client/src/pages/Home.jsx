import React, { useEffect, useRef } from "react";
import { Get } from "../utils/Requests";

const HomeContainer = () => {
    const tokenValidated = useRef(false);

    useEffect(() => {
        const validateToken = async () => {
            if (!tokenValidated.current) {
                tokenValidated.current = true;
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