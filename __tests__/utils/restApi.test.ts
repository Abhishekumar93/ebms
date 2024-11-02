import axios from "axios";
import { getApi, postApi, putApi } from "../../src/utils/restApi.utils"
import { waitFor } from "@testing-library/react";

jest.mock('axios')

const mockResponse = {
    data: { message: 'Success' }
}

const mockApiUrl = 'test-endpoint'
const body = { key: 'value' };
const headers = { 'Custom-Header': 'Test' };

process.env.NEXT_PUBLIC_API_DOMAIN = 'https://api.example.com';

describe('Post Api Utils', () => {
    it('Should make a POST request with correct url and header', async () => {
        (axios.post as jest.Mock).mockResolvedValue(mockResponse)
        const result = await postApi(`/${mockApiUrl}`, body, headers);

        expect(axios.post).toHaveBeenCalledWith(
            'https://api.example.com/test-endpoint',
            body,
            {
                headers: expect.objectContaining({
                    'Custom-Header': 'Test',
                }),
            }
        );

        await waitFor(() => {
            expect(result).toEqual(mockResponse)
        })
    })
})

describe('Get Api Utils', () => {
    it('Should make a GET request with correct url and header', async () => {
        (axios.get as jest.Mock).mockResolvedValue(mockResponse)
        const result = await getApi(mockApiUrl, headers);

        expect(axios.get).toHaveBeenCalledWith(
            'https://api.example.com/portal-user/api/test-endpoint',
            {
                headers: expect.objectContaining({
                    'Custom-Header': 'Test',
                }),
            }
        );

        await waitFor(() => {
            expect(result).toEqual(mockResponse)
        })
    })
})

describe('Put Api Utils', () => {
    it('Should make a PUT request with correct url and header', async () => {
        (axios.put as jest.Mock).mockResolvedValue(mockResponse)
        const result = await putApi(mockApiUrl, body, headers);

        expect(axios.put).toHaveBeenCalledWith(
            'https://api.example.com/portal-user/api/test-endpoint',
            body,
            {
                headers: expect.objectContaining({
                    'Custom-Header': 'Test',
                }),
            }
        );

        await waitFor(() => {
            expect(result).toEqual(mockResponse)
        })
    })
})