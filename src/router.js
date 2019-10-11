const express = require('express');
const router = express.Router();
const bodyParser = express.json();
const notefulService = require('./notefulService');


router
  .route('/folders')
  .get((req,res,next) => {
    notefulService.getAllFolders(req.app.get('db'))
      .then(response => res.json(response));
  })
  .post(bodyParser,(req,res,next) => {
    console.log('posted it');
    notefulService.addFolder(req.app.get('db'),req.body)
      .then(response => res.send(201));
  });

router
  .route('/notes')
  .get((req,res,next) => {
    notefulService.getAllNotes(req.app.get('db'))
      .then(response => {
        console.log(response);
        return res.json(response);
      });
  })
  .post(bodyParser,(req,res,next) => {
    let {name, content } = req.body;
    let folderid = req.body.folderId;
    let newNote = {name, content, folderid};
    notefulService.addNote(req.app.get('db'),newNote)
      .then(response => {
        return res.json(response);
      });
  });

router
  .route('/notes/:noteId')
  .delete((req,res,next) => {
    let {noteId} = req.params;
    console.log(noteId);
    notefulService.deleteNote(req.app.get('db'),noteId)
      .then(response => {
        return res.status(204).end();
      });
  });

module.exports = router;