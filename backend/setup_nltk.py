import nltk

def download_nltk_data():
    """Download required NLTK datasets."""
    datasets = ['punkt', 'stopwords', 'wordnet']
    for dataset in datasets:
        nltk.download(dataset)

if __name__ == "__main__":
    download_nltk_data()
