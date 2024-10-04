# Test Interview Scheduling Functionality

import pytest
from datetime import datetime, timedelta
from interview_scheduling import InterviewScheduler

def test_schedule_interview():
    scheduler = InterviewScheduler()
    interview_time = datetime.now() + timedelta(days=1)
    scheduler.schedule_interview("123", interview_time)
    assert len(scheduler.get_interviews()) == 1
    assert scheduler.get_interviews()[0]["date_time"] == interview_time

def test_set_reminder():
    scheduler = InterviewScheduler()
    interview_time = datetime.now() + timedelta(days=1)
    scheduler.schedule_interview("123", interview_time)
    reminder_time = datetime.now() + timedelta(hours=12)
    scheduler.set_reminder("123", reminder_time)
    assert scheduler.get_interviews()[0]["reminder"] == reminder_time

def test_send_notification(capsys):
    scheduler = InterviewScheduler()
    interview_time = datetime.now() + timedelta(days=1)
    scheduler.schedule_interview("123", interview_time)
    scheduler.send_notification("123")
    captured = capsys.readouterr()
    assert "Notification: You have an interview for job 123" in captured.out

def test_get_upcoming_interviews():
    scheduler = InterviewScheduler()
    past_interview = datetime.now() - timedelta(days=1)
    future_interview = datetime.now() + timedelta(days=1)
    scheduler.schedule_interview("123", past_interview)
    scheduler.schedule_interview("456", future_interview)
    upcoming = scheduler.get_upcoming_interviews()
    assert len(upcoming) == 1
    assert upcoming[0]["job_id"] == "456"

def test_multiple_interviews():
    scheduler = InterviewScheduler()
    interview1 = datetime.now() + timedelta(days=1)
    interview2 = datetime.now() + timedelta(days=2)
    scheduler.schedule_interview("123", interview1)
    scheduler.schedule_interview("456", interview2)
    assert len(scheduler.get_interviews()) == 2
    assert scheduler.get_interviews()[0]["job_id"] == "123"
    assert scheduler.get_interviews()[1]["job_id"] == "456"
