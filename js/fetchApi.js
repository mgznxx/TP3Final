function cargarCursos(){    
    (fetch("cursos.json"))
        .then(respuesta => respuesta.json())
        .then(respuesta => console.log(respuesta))

}

cargarCursos();