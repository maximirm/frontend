import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8002';
const SURVEYS_ENDPOINT = '/surveys';
const QUESTIONS_ENDPOINT = '/questions';
const RESPONSES_ENDPOINT = '/responses';

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchSurvey = async (token, surveyId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}${SURVEYS_ENDPOINT}/${surveyId}/`,
            headers(token)
        );
        return response.data;
    } catch (error) {
        console.log("Error fetching Survey", error)
        throw (error);
    }
}

export const fetchAllSurveys = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}${SURVEYS_ENDPOINT}/all/`);
        return response.data;
    } catch (error) {
        console.log("Error fetching all Surveys", error);
        throw (error);
    }
}


export const fetchSurveysByCreatorId = async (token, creatorId) => {

    try {
        const response = await axios.get(
            `${BASE_URL}${SURVEYS_ENDPOINT}/by_creator/${creatorId}/`,
            headers(token)
        );
        return response.data;
    } catch (error) {
        console.log("Error fetching Surveys by CreatorId", error);
        throw (error);
    }
}

export const postSurvey = async (token, survey) => {

    try {
        const response = await axios.post(
            `${BASE_URL}${SURVEYS_ENDPOINT}/`,
            survey,
            headers(token)
        );
        console.log(response);
        return response.data;

    } catch (error) {
        console.log("Error posting Survey", error);
        throw error;
    }
}


export async function deleteSurvey(token, surveyId) {

    try {
        await axios.delete(
            `${BASE_URL}${SURVEYS_ENDPOINT}/${surveyId}/`,
            headers(token)
        );

    } catch (error) {
        console.log("Error deleting survey", error);
        throw (error);
    }
}


export async function postQuestion(token, question) {

    try {
        await axios.post(
            `${BASE_URL}${QUESTIONS_ENDPOINT}/`,
            question,
            headers(token)
        );

    } catch (error) {
        console.log("Error posting Question", error);
        throw error;
    }
}

export async function deleteQuestion(token, questionId) {

    try {
        await axios.delete(
            `${BASE_URL}${QUESTIONS_ENDPOINT}/${questionId}/`,
            headers(token)
        );
    } catch (error) {
        console.log("Error deleting question", error);
        throw (error);
    }
}


export async function postResponse(response) {

    try {
        await axios.post(
            `${BASE_URL}${RESPONSES_ENDPOINT}/`,
            response
        );
    } catch (error) {
        console.log("Error posting Response", error);
        throw error;
    }
}
