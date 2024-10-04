# Test To-Do Lists Functionality

import pytest
from to_do_lists import ToDoList

def test_add_task():
    todo = ToDoList()
    todo.add_task("Update resume")
    assert len(todo.get_tasks()) == 1
    assert todo.get_tasks()[0]["task_name"] == "Update resume"

def test_complete_task():
    todo = ToDoList()
    todo.add_task("Prepare for interview")
    todo.complete_task("Prepare for interview")
    assert todo.get_tasks()[0]["completed"] is True

def test_remove_task():
    todo = ToDoList()
    todo.add_task("Apply for jobs")
    todo.remove_task("Apply for jobs")
    assert len(todo.get_tasks()) == 0

def test_update_task_priority():
    todo = ToDoList()
    todo.add_task("Research companies", priority="Low")
    todo.update_task_priority("Research companies", "High")
    assert todo.get_tasks()[0]["priority"] == "High"

def test_get_incomplete_tasks():
    todo = ToDoList()
    todo.add_task("Update LinkedIn")
    todo.add_task("Send thank you email")
    todo.complete_task("Send thank you email")
    incomplete_tasks = todo.get_incomplete_tasks()
    assert len(incomplete_tasks) == 1
    assert incomplete_tasks[0]["task_name"] == "Update LinkedIn"

def test_get_tasks_by_priority():
    todo = ToDoList()
    todo.add_task("Network on LinkedIn", priority="High")
    todo.add_task("Update resume", priority="Medium")
    todo.add_task("Research industry trends", priority="Low")
    high_priority_tasks = todo.get_tasks_by_priority("High")
    assert len(high_priority_tasks) == 1
    assert high_priority_tasks[0]["task_name"] == "Network on LinkedIn"
