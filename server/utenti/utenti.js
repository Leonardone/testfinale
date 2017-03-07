var express = require('express');
var router = express.Router();
var listaUtenti = require ('./database.js')

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
                                      




module.exports = router;