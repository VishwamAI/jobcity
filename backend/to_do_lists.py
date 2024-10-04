# To-Do Lists Functionality

class ToDoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, task_name, priority="Normal"):
        task = {
            "task_name": task_name,
            "priority": priority,
            "completed": False
        }
        self.tasks.append(task)

    def complete_task(self, task_name):
        for task in self.tasks:
            if task["task_name"] == task_name:
                task["completed"] = True
                break

    def get_tasks(self):
        return self.tasks

    def remove_task(self, task_name):
        self.tasks = [task for task in self.tasks if task["task_name"] != task_name]

    def update_task_priority(self, task_name, new_priority):
        for task in self.tasks:
            if task["task_name"] == task_name:
                task["priority"] = new_priority
                break

    def get_incomplete_tasks(self):
        return [task for task in self.tasks if not task["completed"]]

    def get_tasks_by_priority(self, priority):
        return [task for task in self.tasks if task["priority"] == priority]
