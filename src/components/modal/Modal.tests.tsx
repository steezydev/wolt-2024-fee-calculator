import { ModalProps } from '@/types/props/ModalProps';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

const mockOnClose = jest.fn();

export const modalRenderTests = (name: string, Modal: React.FC<ModalProps>) => {
  describe(name, () => {
    describe('when asked to render without children', () => {
      it('matches snapshot', () => {
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

      it('renders correctly', () => {
        render(
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          />
        );

        const modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveAttribute('aria-modal', 'true');
        expect(modal).toHaveAttribute(
          'aria-labelledby',
          'dialogTitletestModal'
        );

        const title = screen.getByText('Test modal');
        expect(title).toBeInTheDocument();
      });
    });

    describe('when asked to render with children', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <Modal
            id='testModal'
            isOpen={true}
            title='Test modal'
            onClose={mockOnClose}
          >
            <div>Test modal content</div>
          </Modal>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with children', () => {
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
