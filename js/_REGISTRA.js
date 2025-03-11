 var elUsuario = 'demo1';
 var elCurso = 'curso_240607113724QK1t';
 var elRecurso = 'recurso_240607112117jsSi';


 function registraDato(cualUsuario, cualCurso, cualRecurso) {
     log('registraDato: ', cualUsuario, cualCurso, cualRecurso);

     var onComplete = function(error) {
         if (error) {
             log('Ocurrió un error en la sincronización.');
         } else {
             log('registraDato OK.');
         }
     };

     if (revisaConexion) {

         firebase.database().ref(laUrlBase + 'Lecciones/').once('value').then(function(snapshot) {
             if (snapshot.val() != null) {
                 snapshot.forEach(function(childSnapshot) {
                     if (childSnapshot.key != 'val' && childSnapshot.key != '_foros') {
                         log('childSnapshot.key', childSnapshot.key);

                         cuantasLecciones = childSnapshot.numChildren();
                         log('cuantasLecciones', cuantasLecciones);

                         childSnapshot.forEach(function(childSnapshot2) {
                             //  log('childSnapshot2.key', childSnapshot2.key);

                             if (childSnapshot2.key == elCurso) {
                                 log('childSnapshot2.key', childSnapshot2.key);

                                 //////// dato 1 ////////
                                 var elRef1 = laUrlBase + 'Lecciones/' + childSnapshot.key + '/' + childSnapshot2.key + '/' + 'Temas/tema_1/Recursos/recurso_1/' + cualRecurso;

                                 firebase.database().ref(elRef1).update({
                                     'Calificacion': 5
                                 }, onComplete);
                                 //////// dato 1 ////////

                                 //////// dato 2 ////////
                                 var elRef2 = laUrlBase + 'Lecciones/' + childSnapshot.key + '/' + childSnapshot2.key + '/' + 'Temas/tema_1/Recursos/recurso_1/' + cualRecurso + '/SCORM_12/';

                                 firebase.database().ref(elRef2).update({
                                     'cmi_core_lesson_status': 'passed',
                                     'cmi_core_score_raw': '100'
                                 }, onComplete);
                                 //////// dato 2 ////////

                             }

                         });

                     }
                 });
             }
         });

     }
 }

 //  registraDato(elUsuario, elCurso, elRecurso);










 function leerLecciones() {

     const ruta = 'Lecciones';
     let cuantasKeys = 0;
     let valoresKeys = [];

     firebase.database().ref(laUrlBase + ruta).once('value').then((snapshot) => {
         log('snapshot', snapshot.val());
         cuantasKeys = snapshot.numChildren();
         log('cuantasKeys', cuantasKeys);

         snapshot.forEach(function(childSnapshot) {
             valoresKeys.push(childSnapshot.key);
         });
         log('valoresKeys', valoresKeys);

         leerKeys(ruta, valoresKeys, 0, () => {
             log('Se han leído todos los keys');
             // Ejecutar otra función cuando termine
             otraFuncion();
         });
     });

 }

 function leerKeys(ruta, keys, indice, callback) {
     if (indice >= keys.length) {
         callback();
         return;
     }

     const key = keys[indice];

     firebase.database().ref(laUrlBase + `${ruta}/${key}`).once('value', (snapshot) => {
         const valor = snapshot.val();
         //  log('valor', snapshot.val());
         log(`Key: ${key}, Valor: ${valor}`);
         leerKeys(ruta, keys, indice + 1, callback);
     });
 }

 function otraFuncion() {
     log('Otra función ejecutada');
 }

 //  leerLecciones();