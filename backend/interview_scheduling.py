# Interview Scheduling Functionality

from datetime import datetime

class InterviewScheduler:
    def __init__(self):
        self.interviews = []

    def schedule_interview(self, job_id, date_time, reminder=False):
        interview = {
            "job_id": job_id,
            "date_time": date_time,
            "reminder": reminder
        }
        self.interviews.append(interview)

    def set_reminder(self, job_id, reminder_time):
        for interview in self.interviews:
            if interview["job_id"] == job_id:
                interview["reminder"] = reminder_time
                break

    def get_interviews(self):
        return self.interviews

    def get_upcoming_interviews(self):
        now = datetime.now()
        return [interview for interview in self.interviews if interview["date_time"] > now]

    def send_notification(self, job_id):
        for interview in self.interviews:
            if interview["job_id"] == job_id:
                print(f"Notification: You have an interview for job {job_id} at {interview['date_time']}")
                break
