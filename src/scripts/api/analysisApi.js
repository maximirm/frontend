import axios from "axios";

const BASE_URL = 'http://localhost:8002';
const ANALYSIS_ENDPOINT = '/analyze';

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchAnalysedQuestion = async (token, questionId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}${ANALYSIS_ENDPOINT}/question/${questionId}/`,
            headers(token)
            );
        return response.data;
    } catch (error) {
        console.error("Error fetching analysed Question", error)
        throw (error);
    }
}

