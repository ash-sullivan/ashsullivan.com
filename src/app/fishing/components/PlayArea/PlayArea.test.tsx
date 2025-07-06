import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayArea from './PlayArea';

describe('PlayArea component tests', () => {
  it('loads and displays PlayArea with default settings', async () => {

    const defaultSettings = {
      onClick: jest.fn(),
      onFishHooked: jest.fn(),
      isReelCast: false,
      isFishHooked: false,
      hookPosition: {x: 0, y: 0},
    }

    render(<PlayArea {...defaultSettings} />);

    const feeshImage = screen.getByAltText('Feesh');
    const hookImage = screen.queryByAltText('Fish hook');

    expect(feeshImage).toBeInTheDocument();
    expect(feeshImage).toHaveAttribute('src', expect.stringContaining('feesh.png'));
    expect(hookImage).not.toBeInTheDocument();
  });
});