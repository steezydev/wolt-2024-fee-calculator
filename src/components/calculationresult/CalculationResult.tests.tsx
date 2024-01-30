import CalculationResultItem from '@/components/calculationresult/CalculationResultItem';
import { CalculationResultItemProps } from '@/types/props/CalculationResultItemProps';
import { CalculationResultProps } from '@/types/props/CalculationResultProps';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const calculationResultRenderTests = (
  name: string,
  CalculationResult: React.FC<CalculationResultProps>
) => {
  describe(name, () => {
    describe('when asked to render without children', () => {
      it('macthes snapshot', () => {
        const component = TestRenderer.create(<CalculationResult result={7} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with children', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <CalculationResult result={7}>
            <CalculationResultItem label='Cart value' value='20 €' />
            <CalculationResultItem label='Delivery distance' value='900 m' />
            <CalculationResultItem label='Amount of items' value='1' />
            <CalculationResultItem
              label='Order time'
              value='17.01.2024 14:38'
            />
          </CalculationResult>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(
          <CalculationResult result={7}>
            <CalculationResultItem label='Cart value' value='20 €' />
            <CalculationResultItem label='Delivery distance' value='900 m' />
            <CalculationResultItem label='Amount of items' value='1' />
            <CalculationResultItem
              label='Order time'
              value='17.01.2024 14:38'
            />
          </CalculationResult>
        );

        expect(screen.getByText('Cart value')).toBeInTheDocument();
        expect(screen.getByText('20 €')).toBeInTheDocument();

        expect(screen.getByText('Delivery distance')).toBeInTheDocument();
        expect(screen.getByText('900 m')).toBeInTheDocument();

        expect(screen.getByText('Amount of items')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();

        expect(screen.getByText('Order time')).toBeInTheDocument();
        expect(screen.getByText('17.01.2024 14:38')).toBeInTheDocument();

        expect(screen.getByText('€7.00')).toBeInTheDocument();
      });
    });

    describe('when asked to render with additional class', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <CalculationResult className='some-class' result={7}>
            <CalculationResultItem label='Cart value' value='20 €' />
            <CalculationResultItem label='Delivery distance' value='900 m' />
            <CalculationResultItem label='Amount of items' value='1' />
            <CalculationResultItem
              label='Order time'
              value='17.01.2024 14:38'
            />
          </CalculationResult>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with additional class', () => {
        const { container } = render(
          <CalculationResult className='some-class' result={7}>
            <CalculationResultItem label='Cart value' value='20 €' />
            <CalculationResultItem label='Delivery distance' value='900 m' />
            <CalculationResultItem label='Amount of items' value='1' />
            <CalculationResultItem
              label='Order time'
              value='17.01.2024 14:38'
            />
          </CalculationResult>
        );

        expect(container.firstChild).toHaveClass('some-class');
      });
    });

    describe('when asked to render with formatted result', () => {
      it('renders with formatted result', () => {
        render(
          <CalculationResult result={123.45} currency='EUR'>
            <div>Test Content</div>
          </CalculationResult>
        );

        expect(screen.getByText('€123.45')).toBeInTheDocument();
      });
    });
  });
};

export const calculationResultItemRenderTests = (
  name: string,
  CalculationResultItem: React.FC<CalculationResultItemProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <CalculationResultItem label='Cart value' value='20 €' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders correctly', () => {
        render(<CalculationResultItem label='Cart value' value='20 €' />);

        expect(screen.getByText('Cart value')).toBeInTheDocument();
        expect(screen.getByText('20 €')).toBeInTheDocument();
      });
    });

    describe('when asked to render with additional class', () => {
      it('matches snapshot', () => {
        const component = TestRenderer.create(
          <CalculationResultItem
            className='some-class'
            label='Cart value'
            value='20 €'
          />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('renders with additional class', () => {
        const { container } = render(
          <CalculationResultItem
            className='some-class'
            label='Cart value'
            value='20 €'
          />
        );

        expect(container.firstChild).toHaveClass('some-class');
      });
    });
  });
};
