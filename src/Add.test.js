import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Add from './Add';

describe('Add Component Test Suite', () => {
  test('File Upload Functionality Test', async () => {
    const { getByLabelText, getByText, getByTestId } = render(<Add />);

    const fileInput = getByLabelText('Захиалга зураг').previousElementSibling;
    const testFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    await waitForElement(() => getByText('Амжилттай!'));

    expect(getByTestId('file-upload-log')).toHaveTextContent('File change event triggered.');

    expect(getByTestId('file-upload-log')).toHaveTextContent('Uploading file to Firebase Storage...');

    const selectedImg = getByTestId('selected-image');
    expect(selectedImg.src).toBeTruthy(); // Check if src is set

    expect(getByTestId('file-upload-log')).toHaveTextContent('File uploaded successfully:');
  });
});
