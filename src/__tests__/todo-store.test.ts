import { renderHook, act } from '@testing-library/react';
import { preloadedState } from '../testUtil';
import { useTodoStoreTest } from '../store/todoStore';
import type { Todo } from '../store/todoStore';

describe('Todo Store', () => {
  it('has initialized state of []', () => {
    const { result } = renderHook(() => useTodoStoreTest());

    expect(result.current.todos).toEqual([]);
  });

  it('adds & removes a todo', () => {
    const { result } = renderHook(() => useTodoStoreTest());
    const todo: Todo = {
      id: '1',
      text: 'Test zustand store',
      completed: false,
    };

    // Add todo to store state
    act(() => {
      result.current.addNewTodo(todo);
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos).toEqual([todo]);

    // Remove todo from store state
    act(() => {
      result.current.removeTodo(todo['id']);
    });

    expect(result.current.todos.length).toBe(0);
    expect(result.current.todos).toEqual([]);
  });

  it('should populate store state', () => {
    const { result } = renderHook(() => useTodoStoreTest());

    act(() => {
      result.current.setTodos(preloadedState.todos);
    });

    expect(result.current.todos.length).toBe(3);
  });
});
