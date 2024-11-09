from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class NLPEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def analyze_job_description(self, description: str) -> Dict[str, Any]:
        """Analyze job description to extract key requirements and skills."""
        # Basic implementation for now
        words = description.lower().split()
        return {
            "word_count": len(words),
            "contains_requirements": "requirements" in words,
            "contains_qualifications": "qualifications" in words
        }

    def match_resume(self, job_description: str, resume_text: str) -> float:
        """Calculate similarity between job description and resume."""
        if not job_description or not resume_text:
            return 0.0

        # Create TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform([job_description, resume_text])

        # Calculate cosine similarity
        similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        return float(similarity)

    def extract_skills(self, text: str) -> List[str]:
        """Extract skills from text using basic keyword matching."""
        # Basic implementation - could be enhanced with ML/NLP
        common_skills = ["python", "java", "javascript", "sql", "aws", "docker"]
        found_skills = []

        text_lower = text.lower()
        for skill in common_skills:
            if skill in text_lower:
                found_skills.append(skill)

        return found_skills
