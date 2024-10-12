import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
import logging
import os

class OpenHandsManager:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        handler = logging.StreamHandler()
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        self.logger.addHandler(handler)

        # Download required NLTK data
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)

    def analyze_job_description(self, job_description):
        self.logger.info("Analyzing job description")
        tokens = word_tokenize(job_description.lower())
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
        freq_dist = FreqDist(filtered_tokens)
        top_keywords = freq_dist.most_common(10)

        analysis = {
            "keywords": [{"word": word, "count": count} for word, count in top_keywords],
            "summary": f"This job requires skills in {', '.join([word for word, _ in top_keywords[:5]])}."
        }
        self.logger.info("Job description analysis completed")
        return analysis

    def generate_cover_letter(self, job_description, applicant_info):
        self.logger.info("Generating cover letter")
        analysis = self.analyze_job_description(job_description)
        keywords = [word for word, _ in analysis["keywords"]]

        cover_letter = f"""
Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting. With {applicant_info['experience']} in the field, I believe I am well-suited for this role.

My skills in {', '.join(applicant_info['skills'][:3])} align well with the requirements of the position, particularly in {', '.join(keywords[:3])}.

{analysis['summary']}

I am excited about the opportunity to contribute to your team and look forward to discussing how my experience and skills can benefit your organization.

Sincerely,
{applicant_info['name']}
        """
        self.logger.info("Cover letter generation completed")
        return cover_letter

# Test the OpenHandsManager
if __name__ == "__main__":
    manager = OpenHandsManager()

    # Test job description analysis
    job_description = "We are looking for a Python developer with 5+ years of experience in web development."
    analysis = manager.analyze_job_description(job_description)
    print("Job Analysis:", analysis)

    # Test cover letter generation
    applicant_info = {
        "name": "John Doe",
        "experience": "6 years of Python development",
        "skills": ["Python", "Django", "Flask", "SQL"]
    }
    cover_letter = manager.generate_cover_letter(job_description, applicant_info)
    print("Generated Cover Letter:", cover_letter)
