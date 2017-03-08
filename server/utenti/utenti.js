var express = require('express');
var router = express.Router();
var listaUtenti = require ('./database.json');
var jsonfile = require ('jsonfile');
var path = require ('path');

router.get('/', function(req, res){
                res.status(200).json(listaUtenti);
                                 });

router.get('/id/:id', function(req, res){
            var id= req.params.id;
            // var utente = {};

            // for(let i=0; i<listaUtenti.length; i++){

            //                     if (id==listaUtenti[i].id){

            //                             utente= listaUtenti[i];

            //                             break;
            //                                                 }
            //                                         }
            
var utente = listaUtenti.find(function(el){
                return el.id == id;
                                        });
                if(utente){
                    res.status(200).json(utente);
                    
                          }else{
                    res.status(404).send("utente non trovato");
                                }
});

router.get('/sesso', function(req, res){
    var sesso= req.query.sesso;
    var nome = listaUtenti.filter(function(el){
                    return el.sesso == sesso;
                                             });

            if (listaFiltrata.length){
                        res.status(200).json(listaFiltrata);
                                    }else{
                        res.status(404).send('nessun utente di sesso :'+ sesso);

            }
});
router.get('/nome', function(req, res){
 var nome= req.query.nome;
var lista = listaUtenti.find(function(el){
                   return el.nome == nome;
                                        });
                if(lista){
                    res.status(200).json(lista);
                    
                          }else{
                    res.status(404).send("utente non trovato");
                                }
});

router.delete('/id/:id', function(req, res){
                  var id = req.params.id;
                  var utente = listaUtenti.find(function(el){
                        return el.id == id
                  });
                  var indice =listaUtenti.indexOf(utente);
                  listaUtenti.splice(indice, 1);
                  
                  res.json(listaUtenti);
                  jsonfile.writeFile(path.join(__dirname,'database.json'), listaUtenti, function(err){console.log(err)});
                                    
 });

 router.post('/', function(req, res){
                        var nuovo = req.body;
                        var listaId = [];
                       listaUtenti.forEach(function (el) {
                                            listaId.push(el.id);
                                                    });
                        var max = Math.max(...listaId);
                        console.log(max);
                        nuovo.id = max + 1;
                        listaUtenti.push(nuovo);
                        jsonfile.writeFile(path.join(__dirname,  "database.json"), listaUtenti, function (err) {});
                        res.send(listaUtenti);
                        res.end();
    
                                     }); 


/*oppure si può fare con 
var max= 0;
for(let i=0; i<listaUtenti.length; i++){
                  if(listaUtenti[i].id>=max){
                        max= listaUtenti[i].id;
                                            }
                                         }
                        assegno il nuovo id:
                              nuovo.id= max+1;
                        inserisco nuovo utente
                              listaUtenti.push(nuovo);
                        salvo su file
                              jsonfile.writeFile(path.join(__dirname,  "database.json"), listaUtenti, function (err) {
                              console.log(err);
                        });
                        mando la nuova lista al client
                              res.json(listaUtenti);
                              */    

router.put('/id/:id', function(req, res){
                        var id = req.params.id;
                        var aggiornato = req.body;
                        console.log(id,aggiornato);
                        var vecchio = listaUtenti.find(function(el){
                                                return el.id==id;
                                                                   });
                        var indice = listaUtenti.indexOf(vecchio);
                        listaUtenti.splice(indice, 1, aggiornato);

                        jsonfile.writeFile(path.join(__dirname,  "database.json"), listaUtenti, function (err) {
                              console.log(err);
                        });
                       
                              res.json(aggiornato);
                                          });                   




module.exports = router;