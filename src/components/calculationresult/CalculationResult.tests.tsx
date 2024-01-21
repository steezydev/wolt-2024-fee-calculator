import CalculationResultItem from '@/components/calculationresult/CalculationResultItem';
import { CalculationResultItemProps } from '@/types/props/CalculationResultItemProps';
import { CalculationResultProps } from '@/types/props/CalculationResultProps';
import React from 'react';
import TestRenderer from 'react-test-renderer';

export const calculationResultRenderTests = (
  name: string,
  CalculationResult: React.FC<CalculationResultProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
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
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
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
    });
  });
};

export const calculationResultItemRenderTests = (
  name: string,
  CalculationResultItem: React.FC<CalculationResultItemProps>
) => {
  describe(name, () => {
    describe('when asked to render', () => {
      it('renders', () => {
        const component = TestRenderer.create(
          <CalculationResultItem label='Cart value' value='20 €' />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when asked to render with additional class', () => {
      it('renders with additional class', () => {
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
    });
  });
};
