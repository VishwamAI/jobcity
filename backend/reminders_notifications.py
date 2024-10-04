# Reminders and Notifications Functionality

from datetime import datetime

class ReminderSystem:
    def __init__(self):
        self.reminders = []

    def add_reminder(self, event, time, method="email"):
        reminder = {
            "event": event,
            "time": time,
            "method": method
        }
        self.reminders.append(reminder)

    def send_notification(self, event):
        for reminder in self.reminders:
            if reminder["event"] == event:
                print(f"Notification: Reminder for {event} via {reminder['method']}")
                break

    def get_reminders(self):
        return self.reminders

    def get_upcoming_reminders(self):
        now = datetime.now()
        return [reminder for reminder in self.reminders if reminder["time"] > now]

    def remove_reminder(self, event):
        self.reminders = [reminder for reminder in self.reminders if reminder["event"] != event]

    def update_reminder_method(self, event, new_method):
        for reminder in self.reminders:
            if reminder["event"] == event:
                reminder["method"] = new_method
                break
