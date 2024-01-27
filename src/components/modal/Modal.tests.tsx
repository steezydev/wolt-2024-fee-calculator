import { ModalProps } from '@/types/props/ModalProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnClose = jest.fn();

export const modalRenderTests = (name: string, Modal: React.FC<ModalProps>) => {
  describe(name, () => {
    describe('when asked to render without children', () => {
      it('renders without children', () => {
        const component = TestRenderer.create(
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with children', () => {
      it('renders with children', () => {
        const cp = (
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          >
            <div>Test modal content</div>
          </Modal>
        );

        const component = TestRenderer.create(cp);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        render(cp);
        expect(screen.getByText('Test modal content')).toBeInTheDocument();
      });
    });
  });
};

export const modalEventTests = (name: string, Modal: React.FC<ModalProps>) => {
  describe(name, () => {
    describe('when close button is clicked', () => {
      it('calls the onClose function', () => {
        render(
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          >
            <div>Test modal content</div>
          </Modal>
        );

        const closeButton = screen.getByLabelText('Close modal');

        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    describe('when clicked outside', () => {
      it('calls the onClose function', () => {
        render(
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          >
            <div>Test modal content</div>
          </Modal>
        );

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);

        fireEvent.mouseDown(outsideElement);

        expect(mockOnClose).toHaveBeenCalled();

        document.body.removeChild(outsideElement);
      });
    });
  });
};
