import { act, renderHook } from '@testing-library/react-hooks';

import useInput from '../useInput';

describe('useInput', () => {
  it('initializes with the given value', () => {
    const initialValue = 'test';
    const { result } = renderHook(() => useInput(initialValue));

    expect(result.current.value).toBe(initialValue);
    expect(result.current.isValid).toBeTruthy();
    expect(result.current.error).toBe('Invalid value'); // Default state before validation
  });

  it('validates required fields', () => {
    const { result } = renderHook(() => useInput('', { required: true }));

    act(() => {
      result.current.handleTouch();
    });

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.error).toBe('This field is required');
  });

  it('validates integer input', () => {
    const { result } = renderHook(() => useInput('', { type: 'integer' }));

    act(() => {
      result.current.handleChange({
        target: { value: '123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBeTruthy();

    act(() => {
      result.current.handleChange({
        target: { value: '123.45' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('123'); // Decimal part should be truncated
  });

  it('validates numeric input', () => {
    const { result } = renderHook(() => useInput('', { type: 'numeric' }));

    act(() => {
      result.current.handleTouch();
    });

    act(() => {
      result.current.handleChange({
        target: { value: '123.45' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isValid).toBeTruthy();

    act(() => {
      result.current.handleChange({
        target: { value: 'abc' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('123.45'); // Invalid input should be ignored
  });

  it('does not update value with invalid numeric input', () => {
    const { result } = renderHook(() => useInput('', { type: 'numeric' }));

    act(() => {
      result.current.handleChange({
        target: { value: 'abc' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('');
  });

  it('does not update value with invalid integer input', () => {
    const { result } = renderHook(() => useInput('', { type: 'integer' }));

    act(() => {
      result.current.handleChange({
        target: { value: 'abc' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('');
  });

  it('updates value with valid input', () => {
    const { result } = renderHook(() => useInput('', { type: 'integer' }));

    act(() => {
      result.current.handleChange({
        target: { value: '123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('123');
  });
});
