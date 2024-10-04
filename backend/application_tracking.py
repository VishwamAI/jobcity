# Application Tracking Functionality

class ApplicationTracker:
    def __init__(self):
        self.applications = []

    def log_application(self, job_id, company_name, position, status):
        application = {
            "job_id": job_id,
            "company_name": company_name,
            "position": position,
            "status": status
        }
        self.applications.append(application)

    def update_status(self, job_id, new_status):
        for application in self.applications:
            if application["job_id"] == job_id:
                application["status"] = new_status
                break

    def get_applications(self):
        return self.applications
