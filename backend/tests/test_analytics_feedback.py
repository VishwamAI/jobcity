# Test Analytics and Feedback Mechanism

import pytest
from analytics_feedback import Analytics, Feedback

def test_log_interaction():
    analytics = Analytics()
    analytics.log_interaction(1, "Planner")
    assert len(analytics.get_interactions()) == 1
    assert analytics.get_interactions()[0]["feature"] == "Planner"

def test_submit_feedback():
    feedback = Feedback()
    feedback.submit_feedback(1, "Great feature!")
    assert len(feedback.get_feedback()) == 1
    assert feedback.get_feedback()[0]["feedback"] == "Great feature!"

def test_multiple_interactions():
    analytics = Analytics()
    analytics.log_interaction(1, "Planner")
    analytics.log_interaction(2, "Job Application")
    analytics.log_interaction(1, "Interview Scheduling")
    assert len(analytics.get_interactions()) == 3
    assert analytics.get_interactions()[1]["user_id"] == 2
    assert analytics.get_interactions()[2]["feature"] == "Interview Scheduling"

def test_multiple_feedback():
    feedback = Feedback()
    feedback.submit_feedback(1, "Love the planner!")
    feedback.submit_feedback(2, "Could use more reminders")
    feedback.submit_feedback(1, "Interview prep feature is great")
    assert len(feedback.get_feedback()) == 3
    assert feedback.get_feedback()[1]["user_id"] == 2
    assert "reminders" in feedback.get_feedback()[1]["feedback"]

def test_analytics_user_engagement():
    analytics = Analytics()
    analytics.log_interaction(1, "Planner")
    analytics.log_interaction(1, "Job Application")
    analytics.log_interaction(1, "Planner")
    user_interactions = [interaction for interaction in analytics.get_interactions() if interaction["user_id"] == 1]
    assert len(user_interactions) == 3
    assert user_interactions.count({"user_id": 1, "feature": "Planner"}) == 2

def test_feedback_sentiment():
    feedback = Feedback()
    feedback.submit_feedback(1, "This is awesome!")
    feedback.submit_feedback(2, "Needs improvement")
    feedback.submit_feedback(3, "Very useful tool")
    positive_feedback = [entry for entry in feedback.get_feedback() if "awesome" in entry["feedback"] or "useful" in entry["feedback"]]
    assert len(positive_feedback) == 2
