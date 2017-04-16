angular.module('notesapp.notesfactory', [])

  .factory('NotesFactory', function() {

    var notes = angular.fromJson(window.localStorage['notes'] || '[]'); // selocalStorage restituisce false, inizializza array vuoto

    function persist () {
      window.localStorage['notes'] = angular.toJson(notes);
    }

    return {

      list: function() {
        return notes;
      },

      get: function(noteId) {

        var totNotes = notes.length;

        for (var i = 0; i < totNotes; i++ ) {

          if (notes[i].id === noteId)
            return notes[i];

        }
        return null;

      },

      update: function (note) {

        var totNotes = notes.length;
        for (var i = 0; i < totNotes; i++) {

          if (notes[i].id === note.id)
            notes[i] = note;

        }
        persist();

      },

      create: function (note) {

        notes.push(note);
        persist();
      },

      delete: function(noteId) {

        var totNotes = notes.length;
        for (var i = 0; i < totNotes; i++) {
          if (notes[i].id === noteId) {

            notes.splice(i, 1);
            persist();
            return;
          }
        }
      },

      reorder: function (note, fromIndex, toIndex) {
        notes.splice(fromIndex, 1);
        notes.splice(toIndex, 0, note);

        persist();
      }
    };


  });