# Test Application Tracking Functionality

import pytest
from application_tracking import ApplicationTracker

def test_log_application():
    tracker = ApplicationTracker()
    tracker.log_application("123", "Company A", "Engineer", "Applied")
    assert len(tracker.get_applications()) == 1
    assert tracker.get_applications()[0]["company_name"] == "Company A"

def test_update_status():
    tracker = ApplicationTracker()
    tracker.log_application("123", "Company A", "Engineer", "Applied")
    tracker.update_status("123", "Interview")
    assert tracker.get_applications()[0]["status"] == "Interview"

def test_multiple_applications():
    tracker = ApplicationTracker()
    tracker.log_application("123", "Company A", "Engineer", "Applied")
    tracker.log_application("456", "Company B", "Developer", "Pending")
    assert len(tracker.get_applications()) == 2

def test_update_nonexistent_application():
    tracker = ApplicationTracker()
    tracker.log_application("123", "Company A", "Engineer", "Applied")
    tracker.update_status("456", "Interview")  # Should not raise an error
    assert tracker.get_applications()[0]["status"] == "Applied"

def test_get_applications():
    tracker = ApplicationTracker()
    tracker.log_application("123", "Company A", "Engineer", "Applied")
    tracker.log_application("456", "Company B", "Developer", "Pending")
    applications = tracker.get_applications()
    assert len(applications) == 2
    assert applications[0]["job_id"] == "123"
    assert applications[1]["job_id"] == "456"
