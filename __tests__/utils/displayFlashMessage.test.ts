import flashMessage from "@/components/flashmessage/flashMessage";
import { displayErrorFlashMessage, displaySuccessMessage } from "@/utils/displayFlashMessage.utils";


jest.mock('@/components/flashmessage/flashMessage', () => ({
    showErrorMessage: jest.fn(),
    showSuccessMessage: jest.fn(),
}));

describe('displayFlashMessage utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('displayErrorFlashMessage', () => {
        it('should display default error message when no params are provided', () => {
            displayErrorFlashMessage();
            expect(flashMessage.showErrorMessage).toHaveBeenCalledWith('Something went wrong! Please try again.');
        });

        it('should display specific error message when errorDataKey and errorDataMessage are provided', () => {
            const errorDataKey = 'testError';
            const errorDataMessage = [
                { errorKey: 'testError', errorMessage: 'Test error message' },
                { errorKey: 'otherError', errorMessage: 'Other error message' },
            ];
            displayErrorFlashMessage(errorDataKey, errorDataMessage);
            expect(flashMessage.showErrorMessage).toHaveBeenCalledWith('Test error message');
        });

        it('should display default error message when errorDataKey is not found', () => {
            const errorDataKey = 'nonexistentError';
            const errorDataMessage = [
                { errorKey: 'testError', errorMessage: 'Test error message' },
            ];
            displayErrorFlashMessage(errorDataKey, errorDataMessage);
            expect(flashMessage.showErrorMessage).toHaveBeenCalledWith('Something went wrong! Please try again.');
        });
    });

    describe('displaySuccessMessage', () => {
        it('should call flashMessage.showSuccessMessage with the provided message', () => {
            const message = 'Test success message';
            displaySuccessMessage(message);
            expect(flashMessage.showSuccessMessage).toHaveBeenCalledWith(message);
        });
    });
});