import axios from "axios";

const baseUrl = 'http://127.0.0.1:8002';
export const fetchAllUsers = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/users/all/`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return response.data
    } catch (error) {
        console.log("Error fetching all Users", error)
    }
}

export async function deleteUser(userId) {
    try {
        const token = this.$store.state.userToken;
        await axios.delete(`${baseUrl}/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log("Error deleting user", error)
    }
}

export const fetchSurveysByCreatorId = async (token, creatorId) => {

    try {
        const response = await axios.get(
            `${baseUrl}/surveys/by_creator/${creatorId}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        console.log("Error fetching Surveys by CreatorId", error)
    }
}

