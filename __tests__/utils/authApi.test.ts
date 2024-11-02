import authApi from "@/utils/authApi.utils"
import * as delayRedirectUtils from "@/utils/delayRedirect.utils"
import * as flashMessageUtils from "@/utils/displayFlashMessage.utils"
import * as localStorageUtils from "@/utils/localStorage.utils"
import * as restApiUtils from "@/utils/restApi.utils"
import { AxiosHeaders, AxiosRequestHeaders, AxiosResponse, AxiosError } from "axios"

const userData = {
    first_name: 'Abhishek',
    last_name: 'kumar',
    is_staff: true,
    email: 'test@test.com',
    password: 'test@123'
}
const loginData = {
    email: 'test@test.com',
    password: 'test@123',
    consumer_or_staff_id: 'I123'
}
const mockUserResponse = {
    data: {
        id: 1,
        email: 'test@test.com',
        username: 'Abhishek kumar',
        is_staff: true,
    },
    status: 200,
    statusText: 'OK',
    headers: {} as AxiosHeaders,
    config: {
        headers: {} as AxiosRequestHeaders
    }
};
const expectedResult = {
    id: mockUserResponse.data.id,
    email: mockUserResponse.data.email,
    name: mockUserResponse.data.username,
    role: mockUserResponse.data.is_staff ? 'staff' : 'consumer'
}
const userDataToUpdate = {
    id: 1,
    first_name: 'Abhishek',
    last_name: 'Kumar',
    is_staff: true,
    email: 'test@test.com',
    consumer_or_staff_id: 'I123',
    is_active: true
}

describe('Auth Api Utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should create user', async () => {
        const mockResponse = {
            data: { message: 'User created successfully' },
            status: 200,
            statusText: 'OK',
            headers: {} as AxiosHeaders,
            config: {
                headers: {} as AxiosRequestHeaders
            }
        } as AxiosResponse;

        jest.spyOn(restApiUtils, 'postApi').mockResolvedValue(mockResponse);
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { });
        jest.spyOn(delayRedirectUtils, 'delayRedirect').mockImplementation((routeUrl: string, intervalTimeout?: number) => () => { });

        const result = await authApi.createUser(userData)

        expect(restApiUtils.postApi).toHaveBeenCalledWith('/portal-user/api/create/user/', userData)
        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith('User created successfully');
        expect(delayRedirectUtils.delayRedirect).toHaveBeenCalledWith('/login?role_type=staff');
        expect(result).toEqual({ message: 'User created successfully' });
    })

    it('Should create user with passed params arguments', async () => {
        const mockResponse = {
            data: { message: 'User created successfully' },
            status: 200,
            statusText: 'OK',
            headers: {} as AxiosHeaders,
            config: {
                headers: {} as AxiosRequestHeaders
            }
        } as AxiosResponse;

        jest.spyOn(restApiUtils, 'postApi').mockResolvedValue(mockResponse);
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { });
        jest.spyOn(delayRedirectUtils, 'delayRedirect').mockImplementation((routeUrl: string, intervalTimeout?: number) => () => { });

        const result = await authApi.createUser(userData, '?type=add')

        expect(restApiUtils.postApi).toHaveBeenCalledWith('/portal-user/api/create/user/?type=add', userData)
        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith('User created successfully');
        expect(delayRedirectUtils.delayRedirect).not.toHaveBeenCalled();
        expect(result).toEqual({ message: 'User created successfully' });
    })

    it('Should display error if user not created', async () => {
        const mockFailedResponse = {
            response: {
                data: { consumer_or_staff_id: 'The given staff id is attached with another user. Please check once again.' },
                status: 409,
                statusText: 'Conflict',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;

        jest.spyOn(restApiUtils, 'postApi').mockRejectedValue(mockFailedResponse);
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { });

        const result = await authApi.createUser(userData)


        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalledWith(
            'consumer_or_staff_id',
            [
                { errorKey: 'message', errorMessage: 'An account with the given email id already exists in our system. Please login with valid credentials' },
                { errorKey: 'consumer_or_staff_id', errorMessage: 'The given staff id is attached with another user. Please check once again.' },
            ]
        );
        expect(result).toEqual(false);
    })

    it('Should fetch user basic data', async () => {
        jest.spyOn(restApiUtils, 'getApi').mockResolvedValueOnce(mockUserResponse);

        const result = await authApi.fetchUserBasicData('ABCD1234')

        expect(result).toEqual(expectedResult);
    })

    it('Should display error if user data not fetched', async () => {
        const mockFailedResponse = {
            response: {
                data: null,
                status: 404,
                statusText: 'Not Found',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;

        jest.spyOn(restApiUtils, 'getApi').mockRejectedValue(mockFailedResponse);
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { });

        const result = await authApi.fetchUserBasicData('ABCD1234')

        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalled();
        expect(result).toEqual(false);
    })

    it('Should create token for the login', async () => {
        const mockTokenResponse: AxiosResponse = {
            data: {
                token: 'mockToken123',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: {} as AxiosRequestHeaders
            }
        };

        jest.spyOn(restApiUtils, 'postApi').mockResolvedValueOnce(mockTokenResponse);
        jest.spyOn(restApiUtils, 'getApi').mockResolvedValueOnce(mockUserResponse);
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { });
        jest.spyOn(delayRedirectUtils, 'delayRedirect').mockImplementation((routeUrl: string, intervalTimeout?: number) => () => { });

        const result = await authApi.getTokenKey(loginData)

        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith('Successfully logged in!');
        expect(delayRedirectUtils.delayRedirect).toHaveBeenCalledWith('/');
        expect(result).toEqual(expectedResult);
    })

    it('Should display error if token not generated', async () => {
        const mockFailedResponse = {
            response: {
                data: { message: 'User not found' },
                status: 404,
                statusText: 'Not Found',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;

        jest.spyOn(restApiUtils, 'postApi').mockRejectedValueOnce(mockFailedResponse);
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { });

        const result = await authApi.getTokenKey(loginData)

        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalled();
        expect(result).toEqual(false);
    })

    it('Should update the user', async () => {
        const mockUpdateResponse: AxiosResponse = {
            data: {
                id: 1,
                first_name: 'Abhishek',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: {} as AxiosRequestHeaders
            }
        };

        jest.spyOn(restApiUtils, 'putApi').mockResolvedValueOnce(mockUpdateResponse);
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { });

        const result = await authApi.updateUser(userDataToUpdate)

        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith('User Abhishek successfully updated!');
        expect(result).toEqual(mockUpdateResponse.data);
    })

    it('Should display error if token not generated', async () => {
        const mockFailedResponse = {
            response: {
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;

        jest.spyOn(restApiUtils, 'putApi').mockRejectedValueOnce(mockFailedResponse);
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { });

        const result = await authApi.updateUser(userDataToUpdate)

        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalled();
        expect(result).toEqual(false);
    })

    it('Should generate otp successfully', async () => {
        const generatedOtpResponse: AxiosResponse = {
            data: {
                message: 'otp_sent',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: {} as AxiosRequestHeaders
            }
        }
        jest.spyOn(restApiUtils, 'postApi').mockResolvedValueOnce(generatedOtpResponse)
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { })

        const result = await authApi.generateOtp({ email: 'test@test.com' })

        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith("We have sent an OTP on your email address. Please check your email")
        expect(result).toBe(true)
    })

    it('Should throw error if otp not generated', async () => {
        const mockFailedResponse = {
            response: {
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;
        jest.spyOn(restApiUtils, 'postApi').mockRejectedValueOnce(mockFailedResponse)
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { })

        const result = await authApi.generateOtp({ email: 'test@test.com' })

        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalled()
        expect(result).toBe(false)
    })

    it('Should logout successfully', async () => {
        const mockAuthToken = 'mockToken123'
        const mockResponse: AxiosResponse = {
            data: {
                detail: 'Successfully logged out!',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: {} as AxiosRequestHeaders
            }
        }

        jest.spyOn(localStorageUtils, 'getLocalStorageData').mockReturnValue(mockAuthToken)
        jest.spyOn(restApiUtils, 'postApi').mockResolvedValueOnce(mockResponse)
        jest.spyOn(localStorageUtils, 'clearLocalStorage').mockImplementation(() => { })
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { })
        jest.spyOn(delayRedirectUtils, 'delayRedirect').mockImplementation((routeUrl: string, intervalTimeout?: number) => () => { })

        const result = await authApi.logout()

        expect(flashMessageUtils.displaySuccessMessage).toHaveBeenCalledWith('Successfully logged out!')
        expect(localStorageUtils.clearLocalStorage).toHaveBeenCalled()
        expect(delayRedirectUtils.delayRedirect).toHaveBeenCalledWith('/')
        expect(result).toBe(true)
    })

    it('Should logout successfully and does not display logout message ', async () => {
        const mockAuthToken = 'mockToken123'
        const mockResponse: AxiosResponse = {
            data: {
                detail: null,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                headers: {} as AxiosRequestHeaders
            }
        }

        jest.spyOn(localStorageUtils, 'getLocalStorageData').mockReturnValue(mockAuthToken)
        jest.spyOn(restApiUtils, 'postApi').mockResolvedValueOnce(mockResponse)
        jest.spyOn(flashMessageUtils, 'displaySuccessMessage').mockImplementation(() => { })

        const result = await authApi.logout()

        expect(flashMessageUtils.displaySuccessMessage).not.toHaveBeenCalled()
        expect(result).toBe(false)
    })

    it('Should throw error if not logged out', async () => {
        const mockAuthToken = 'mockToken123'
        const mockFailedResponse = {
            response: {
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {} as AxiosHeaders,
                config: { headers: {} as AxiosRequestHeaders }
            }
        } as AxiosError;

        jest.spyOn(localStorageUtils, 'getLocalStorageData').mockReturnValue(mockAuthToken)
        jest.spyOn(restApiUtils, 'postApi').mockRejectedValueOnce(mockFailedResponse)
        jest.spyOn(flashMessageUtils, 'displayErrorFlashMessage').mockImplementation(() => { })

        const result = await authApi.logout()

        expect(flashMessageUtils.displayErrorFlashMessage).toHaveBeenCalled()
        expect(result).toBe(false)
    })
})