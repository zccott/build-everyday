

from db.database import conn, cursor

def create_snippet(data):
    cursor.execute('''
        INSERT INTO snippets (title, code, language)
        VALUES (?, ?, ?)
    ''', (data['title'], data['code'], data['language']))
    conn.commit()

def get_snippets(search=None):
    if search:
        cursor.execute("SELECT * FROM snippets WHERE title LIKE ?", (f"%{search}%",))
    else:
        cursor.execute("SELECT * FROM snippets")
    return cursor.fetchall()

def delete_snippet(snippet_id):
    cusror.execute("DELETE FROM snippets WHERE id = ?", (snippet_id,))
    conn.commit()