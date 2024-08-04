import axios, { Method } from "axios";

export const axiosInstance = axios.create({});

interface ApiConnectorParams {
    method: Method;
    url: string;
    bodyData?: any;
    headers?: Record<string, string>;
    params?: Record<string, any>;
}

export const apiConnector = ({
    method,
    url,
    bodyData,
    headers,
    params,
}: ApiConnectorParams) => {
    return axiosInstance({
        method,
        url,
        data: bodyData ?? null,
        headers: headers ?? undefined,
        params: params ?? undefined,
    });
};
