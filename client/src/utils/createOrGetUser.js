import jwt_decode from "jwt-decode";

const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const name = decoded.name;
    const picture = decoded.picture;

    const user = {
        name, picture
    };


    console.log(decoded);
    return user;
}

export default createOrGetUser;