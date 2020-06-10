import fetch from 'node-fetch';
import {Agent} from 'http';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const RequestMethod: Record<RequestMethod, RequestMethod> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const doRequest = async <RequestBody, ResponseBody>(
    apiUrl: string,
    method: RequestMethod,
    endpoint: string,
    {
        agent,
        headers,
        body,
    }: {
        agent?: Agent;
        headers?: Record<string, string>;
        body?: RequestBody;
    }
): Promise<ResponseBody> => {
    try {
        const url = `${apiUrl}${endpoint}`;
        const response = await fetch(url, {
            agent,
            method,
            headers,
            body: body && JSON.stringify(body),
        });
        const responseBody = await response.json();

        return responseBody as ResponseBody;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export {doRequest, RequestMethod};
