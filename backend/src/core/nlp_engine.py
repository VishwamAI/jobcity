import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class NLPEngine:
    def __init__(self):
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)
        nltk.download('wordnet', quiet=True)
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
        self.vectorizer = TfidfVectorizer()

    def preprocess_text(self, text):
        tokens = word_tokenize(text.lower())
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens if token.isalnum()]
        tokens = [token for token in tokens if token not in self.stop_words]
        return ' '.join(tokens)

    def extract_keywords(self, text, num_keywords=10):
        preprocessed_text = self.preprocess_text(text)
        tfidf_matrix = self.vectorizer.fit_transform([preprocessed_text])
        feature_names = self.vectorizer.get_feature_names_out()
        sorted_items = sorted(zip(feature_names, tfidf_matrix.toarray()[0]), key=lambda x: x[1], reverse=True)
        return [item[0] for item in sorted_items[:num_keywords]]

    def calculate_similarity(self, text1, text2):
        preprocessed_text1 = self.preprocess_text(text1)
        preprocessed_text2 = self.preprocess_text(text2)
        tfidf_matrix = self.vectorizer.fit_transform([preprocessed_text1, preprocessed_text2])
        return cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])[0][0]

    def match_profile_with_job(self, job_description, applicant_profile):
        job_keywords = self.extract_keywords(job_description)
        profile_keywords = self.extract_keywords(applicant_profile)
        common_keywords = set(job_keywords) & set(profile_keywords)
        similarity_score = self.calculate_similarity(job_description, applicant_profile)
        return {
            'common_keywords': list(common_keywords),
            'similarity_score': similarity_score,
            'match_percentage': (len(common_keywords) / len(job_keywords)) * 100
        }

    def analyze_job_description(self, job_description):
        preprocessed_text = self.preprocess_text(job_description)
        keywords = self.extract_keywords(preprocessed_text, num_keywords=20)
        sentences = nltk.sent_tokenize(job_description)

        requirements = [sent for sent in sentences if any(keyword in sent.lower() for keyword in ['require', 'qualification', 'skill'])]
        responsibilities = [sent for sent in sentences if any(keyword in sent.lower() for keyword in ['responsibilit', 'duty', 'task'])]

        return {
            'keywords': keywords,
            'requirements': requirements,
            'responsibilities': responsibilities
        }
