const notefulService = {

  //Folders
  getAllFolders(db) {
    return db.select('*').from('folders');
  },
  addFolder(db,newFolder) {
    return db.insert(newFolder).into('folders');
  },
  

  //Notes
  getAllNotes(db) {
    return db.select('*').from('notes');
  },
  addNote(db,newNote) {
    return db.insert(newNote).into('notes').returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteNote(db,id) {
    console.log('doing knex delete');
    return db('notes').where('id',id).delete();
  }

};

module.exports = notefulService;
