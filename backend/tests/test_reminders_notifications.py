# Test Reminders and Notifications Functionality

import pytest
from datetime import datetime, timedelta
from reminders_notifications import ReminderSystem

def test_add_reminder():
    reminders = ReminderSystem()
    event_time = datetime.now() + timedelta(days=1)
    reminders.add_reminder("Interview", event_time)
    assert len(reminders.get_reminders()) == 1
    assert reminders.get_reminders()[0]["event"] == "Interview"

def test_send_notification(capsys):
    reminders = ReminderSystem()
    event_time = datetime.now() + timedelta(days=1)
    reminders.add_reminder("Meeting", event_time)
    reminders.send_notification("Meeting")
    captured = capsys.readouterr()
    assert "Notification: Reminder for Meeting" in captured.out

def test_get_upcoming_reminders():
    reminders = ReminderSystem()
    past_event = datetime.now() - timedelta(days=1)
    future_event = datetime.now() + timedelta(days=1)
    reminders.add_reminder("Past Event", past_event)
    reminders.add_reminder("Future Event", future_event)
    upcoming = reminders.get_upcoming_reminders()
    assert len(upcoming) == 1
    assert upcoming[0]["event"] == "Future Event"

def test_remove_reminder():
    reminders = ReminderSystem()
    event_time = datetime.now() + timedelta(days=1)
    reminders.add_reminder("Task", event_time)
    reminders.remove_reminder("Task")
    assert len(reminders.get_reminders()) == 0

def test_update_reminder_method():
    reminders = ReminderSystem()
    event_time = datetime.now() + timedelta(days=1)
    reminders.add_reminder("Deadline", event_time, method="email")
    reminders.update_reminder_method("Deadline", "SMS")
    assert reminders.get_reminders()[0]["method"] == "SMS"
