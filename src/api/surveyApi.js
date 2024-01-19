import axios from "axios";

const baseUrl = 'http://127.0.0.1:8002';

export const fetchSurvey = async (token, surveyId) => {
    try {
        const response = await axios.get(
            `${baseUrl}/surveys/${surveyId}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        console.log("Error fetching Survey", error)
        throw (error);
    }
}

export const fetchAllSurveys = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}/surveys/all/`);
        return response.data;
    } catch (error) {
        console.log("Error fetching all Surveys", error)
        throw (error);
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
        throw (error);
    }
}

export const postSurvey = async (token, survey) => {

    try {
        const response = await axios.post(
            `${baseUrl}/surveys/`,
            survey,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response)
        return response.data

    } catch (error) {
        console.log("Error posting Survey", error)
        throw error;
    }
}


export async function postQuestion (token, question){

    try {
        await axios.post(
            `${baseUrl}/questions/`,
            question,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

    } catch (error) {
        console.log("Error posting Question", error)
        throw error;
    }
}

export async function deleteQuestion(token, questionId){

    try {
        await axios.delete(`${baseUrl}/questions/${questionId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log("Error deleting question", error)
        throw (error);
    }
}
