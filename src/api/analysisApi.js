import axios from "axios";

const baseUrl = 'http://127.0.0.1:8002';

export const fetchAnalysedQuestion = async (token, questionId) => {
    try {
        const response = await axios.get(
            `${baseUrl}/analyze/question/${questionId}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        console.log("Error fetching analysed Question", error)
        throw (error);
    }
}
