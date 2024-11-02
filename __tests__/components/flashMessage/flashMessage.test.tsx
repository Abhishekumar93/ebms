import flashMessage from '@/components/flashmessage/flashMessage';

describe('FlashMessage', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    // Mock the DOM elements
    mockElement = document.createElement('div');
    mockElement.id = 'flash_message_div';
    document.body.appendChild(mockElement);

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.useRealTimers();
  });

  describe('showSuccessMessage', () => {
    it('should display a success message', () => {
      flashMessage.showSuccessMessage('Success message');
      expect(mockElement.innerHTML).toContain('Success message');
      expect(mockElement.innerHTML).toContain('bg-green-200');
    });
  });

  describe('showErrorMessage', () => {
    it('should display an error message', () => {
      flashMessage.showErrorMessage('Error message');
      expect(mockElement.innerHTML).toContain('Error message');
      expect(mockElement.innerHTML).toContain('bg-red-200');
    });
  });

  describe('hideMessage', () => {
    it('should add animation class after 5 seconds', () => {
      flashMessage.showSuccessMessage('Test message');
      jest.advanceTimersByTime(5000);
      expect(mockElement.children[0].classList).toContain('flash_message_animation');
    });

    it('should remove message after 5.75 seconds', () => {
      flashMessage.showSuccessMessage('Test message');
      jest.advanceTimersByTime(5750);
      expect(mockElement.innerHTML).toBe('');
    });
  });
});
