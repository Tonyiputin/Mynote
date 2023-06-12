var notes = []; // 儲存筆記的陣列
var editingNoteId = null; // 正在編輯的筆記 ID

// 檢查本地儲存中是否有筆記
window.onload = function() {
  var savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    displayNotes();
  }
}

// 儲存筆記到本地儲存
function saveNote() {
  var noteText = document.getElementById('note').value;
  var fontSize = document.getElementById('fontSize').value + 'px';
  var fontColor = document.getElementById('fontColor').value;
  if (editingNoteId) {
    // 修改筆記
    var editedNote = notes.find(function(note) {
      return note.id === editingNoteId;
    });
    if (editedNote) {
      editedNote.text = noteText;
      editedNote.createdAt = new Date();
      editingNoteId = null;
      alert('筆記已修改！');
    }
  } else {
    // 新增筆記
    var note = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date(),
      fontSize: fontSize,
      fontColor: fontColor
    };
    notes.push(note);
    alert('筆記已儲存！');
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
  document.getElementById('note').value = '';
  updateNoteStyle();
}

// 顯示筆記列表
function displayNotes() {
  var noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  notes.forEach(function(note) {
    var noteItem = document.createElement('div');
    noteItem.classList.add('note-item');
    noteItem.innerHTML = '<p>' + note.text + '</p><p>建立時間：' + note.createdAt.toLocaleString() + '</p><button onclick="editNote(' + note.id + ')">修改</button><button onclick="deleteNote(' + note.id + ')">刪除</button>';
    noteItem.style.fontSize = note.fontSize; // 設定字型大小
    noteItem.style.color = note.fontColor; // 設定字形顏色
    noteList.appendChild(noteItem);
  });
}

// 編輯筆記
function editNote(id) {
  var note = notes.find(function(note) {
    return note.id === id;
  });
  if (note) {
    document.getElementById('note').value = note.text;
    editingNoteId = note.id;
  }
}

// 刪除筆記
function deleteNote(id) {
  notes = notes.filter(function(note) {
    return note.id !== id;
  });
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

function updateNoteStyle() {
  var fontSize = document.getElementById('fontSize').value + 'px';
  var fontColor = document.getElementById('fontColor').value;

  // 設定字型大小和字形顏色
  document.getElementById('note').style.fontSize = fontSize;
  document.getElementById('note').style.color = fontColor;
}