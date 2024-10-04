# Analytics and Feedback Mechanism

class Analytics:
    def __init__(self):
        self.user_interactions = []

    def log_interaction(self, user_id, feature):
        interaction = {
            "user_id": user_id,
            "feature": feature
        }
        self.user_interactions.append(interaction)

    def get_interactions(self):
        return self.user_interactions

class Feedback:
    def __init__(self):
        self.feedback_entries = []

    def submit_feedback(self, user_id, feedback):
        entry = {
            "user_id": user_id,
            "feedback": feedback
        }
        self.feedback_entries.append(entry)

    def get_feedback(self):
        return self.feedback_entries
