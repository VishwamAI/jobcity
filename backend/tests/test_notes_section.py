# Test Notes Section Functionality

import pytest
from notes_section import NotesSection

def test_add_note():
    notes = NotesSection()
    notes.add_note("Interview Tips", "Research the company")
    assert len(notes.get_notes()) == 1
    assert notes.get_notes()[0]["title"] == "Interview Tips"

def test_edit_note():
    notes = NotesSection()
    notes.add_note("Job List", "Apply to 5 jobs")
    notes.edit_note("Job List", "Apply to 10 jobs")
    assert notes.get_notes()[0]["content"] == "Apply to 10 jobs"

def test_delete_note():
    notes = NotesSection()
    notes.add_note("Follow-up Email", "Send thank you email")
    notes.delete_note("Follow-up Email")
    assert len(notes.get_notes()) == 0

def test_search_notes():
    notes = NotesSection()
    notes.add_note("Networking", "Attend meetup")
    notes.add_note("Preparation", "Update resume")
    search_results = notes.search_notes("resume")
    assert len(search_results) == 1
    assert search_results[0]["title"] == "Preparation"
