# Notes Section Functionality

class NotesSection:
    def __init__(self):
        self.notes = []

    def add_note(self, title, content):
        note = {
            "title": title,
            "content": content
        }
        self.notes.append(note)

    def edit_note(self, title, new_content):
        for note in self.notes:
            if note["title"] == title:
                note["content"] = new_content
                break

    def delete_note(self, title):
        self.notes = [note for note in self.notes if note["title"] != title]

    def get_notes(self):
        return self.notes

    def search_notes(self, keyword):
        return [note for note in self.notes if keyword in note["content"] or keyword in note["title"]]
