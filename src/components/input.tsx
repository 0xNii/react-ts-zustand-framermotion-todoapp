import React from 'react';
import { styled } from 'styled-components';

type Props = {
  ref: React.RefObject<HTMLInputElement | null>;
  placeholder?: string;
  onKeyUp?: (
    e: any
  ) => void | React.KeyboardEventHandler<HTMLInputElement> /* Event handler */;
};

const TodoInput = ({ ref, placeholder, ...eventHandler }: Props) => {
  return (
    <Input
      ref={ref}
      type="text"
      name="todo-input"
      placeholder={placeholder}
      autoComplete="off"
      {...eventHandler}
    />
  );
};

export default TodoInput;

const Input = styled.input`
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 8px;
  padding: 6px 10px;
  width: 100%;
  transition: 0.3s box-shadow ease-out;

  &:focus-within {
    border: none;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,
      rgba(0, 0, 0, 0.11) 0px 0px 1px 0px,
      rgba(0, 0, 0, 0.11) 0px 0px 0px 3px;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`;
