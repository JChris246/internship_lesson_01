import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Todo from "./screens/Todo";

//User stories
// As a user, I want to add items to a list
// As a user, I want to edit items on a list and view changes
// As a user, I want to remove items from a list

//Acceptance criteria
// A new item must be more than 3 characters long
// A new item cannot be an empty string
// A new item should be unique

//Table
// User Feature | User stories | Acceptance Criteria

describe("Todo", () => {
    // Tests go here
    it("displays initial to-dos", () => {
        const { getByTestId } = render(<Todo />);
        const todos = getByTestId("todos");
        expect(todos.children.length).toBe(2);
    });

    it("fails when adding an empty to-do", async () => {
        //TODO
        // A new item must be more than 3 characters long
        // A new item cannot be an empty string
        // A new item should be unique
    })

    it("fails when new item is not unique", async () => {
        //TODO

    })

    it("fails when new items is less than 3 characters", async () => {
        //TODO

    })

    it("adds a new to-do", async () => {
        const { getByTestId, getByText } = render(<Todo />);
        const input = getByTestId("input");
        const todos = getByTestId("todos");
        // input.value = "Fix failing tests";
        await userEvent.type(input, "Fix failing tests")
        await userEvent.click(getByText(/add task/i));
        // screen.debug()
        expect(todos.children.length).toBe(3);
    });

    it("edits a to-do", async () => {
        //TODO
        const { getByTestId, getAllByTestId } = render(<Todo />);
        const todos = getByTestId("todos");
        const todoValue  = getAllByTestId("todo-values")[0];
        const editButton = getAllByTestId("edit-button")[0];

        await userEvent.click(editButton);
        await userEvent.clear(todoValue);
        await userEvent.type(todoValue, "Edited todo")
        
        // screen.debug()
        // check to make sure todo was indeed edited
        expect(todos.firstChild.children[0].value).toBe("Edited todo");
        // ensure the same number of todos still exist
        expect(todos.children.length).toBe(3);
    })

    it("deletes a to-do", async () => {
        const { getAllByTestId, getByTestId } = render(<Todo />);
        // screen.debug()
        const todos = getByTestId("todos");
        const deleteButtons = getAllByTestId("delete-button");
        const deleteButton = deleteButtons[0];
        await userEvent.click(deleteButton);
        // screen.debug()
        expect(todos.children.length).toBe(2);
    });
})
