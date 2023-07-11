import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error("useUserContext must be used inside a UserContext Provider");
    }

    return context;
}

export default useUserContext;