function strcmp( s1, s2){
    try{
        var result =1;

        for(var i =0; i< s1.length; i++){
            if(s1[i]!=s2[i]){
                result =0;
            }
        }
        return result;
    }catch(err){
        return 0;
    }
}

$(document).ready(function(){
    
   
    $('#boton').click(function(){

        $('#peliculas').children().remove();

        $.ajax({

            method:'GET',
            crossDomain: true,
            url:'https://api.movie.com.uy/api/shows/rss/data',
            dataType:'json'

        }).done(function(data){
            var cine =  $("#cines").val();
            for(i = 0; i<data.contentCinemaShows.length; i++){
                var contenido = data.contentCinemaShows[i];
                for(p = 0; p< contenido.cinemaShows.length; p++){
                    if (strcmp(contenido.cinemaShows[p].cinema,cine)==1 || strcmp(cine,"Todos")==1 ){
                        var name = contenido.movie.replace(/\./g, "")
                        $('#peliculas').append("<div id='"+name+"' class='pelicula' onclick='mostrar(this, this.id)' ><img class='imgpelicula' src="+contenido.posterURL+"></div>");
                    }
                }
            }
        }).fail(function(){
            alert("error");
            console.log("fali");
        });

    });

   
});

function mostrar(dom,id){

    var ident = '#contenedor'+id.replace(/ /g,'');
    if( strcmp($(dom).find(ident).attr('id'),ident.replace('#','')) ==1 ){
        $(dom).find(ident).remove();
    }else{
        var cines = $('#cines').val();
        $.ajax({

            method:'GET',
            crossDomain: true,
            url:'https://api.movie.com.uy/api/shows/rss/data',
            dataType:'json'

        }).done(function(data){
            var cine =  $("#cines").val();
            var cond = 1;
            for(i = 0; i<data.contentCinemaShows.length && cond; i++){
                var contenido = data.contentCinemaShows[i];
                var aux = contenido.movie.replace(/\./g, '');
                if(strcmp(aux, id)==1){
                    console.log("entro");
                    cond = 0;
                    var show;
                    for(p = 0; p<contenido.cinemaShows.length;p++){
                        if(strcmp(cines, "Todos")==1){
                            show = contenido.cinemaShows[p];
                            var identificador = '#'+id;
                            console.log(identificador);
                            var ver = $(dom).find('#La Pascua en el arte').prevObject;
                            console.log(ver);
                            $(dom).find(identificador).prevObject.append("<div id='contenedor"+id.replace(/ /g, '')+"' class='addContainer'></div> ");
                            identificador = '#contenedor'+id.replace(/ /g,'');
                            var ver = $(dom).find('#contenedorLaPascuaenelarte');
                            console.log(ver);
                            
                            $(dom).find(identificador).append("<div class='agregadoCine'> Cine: "+ show.cinema+"</div> ");
                            for(k = 0;k< show.shows.length; k++){
                                $(dom).find(identificador).append("<br>");
                                $(dom).find(identificador).append("<div class='agregadoShow'> Fecha y Hora: "+ show.shows[k].timeToDisplay+"</div> ");
                                $(dom).find(identificador).append("<div class='agregadoShow'> Formato: "+ show.shows[k].formatLang+"</div> ");
                                $(dom).find(identificador).append("<div class='agregadoShow'> Genero: "+ show.shows[k].genre+"</div> ");
                                $(dom).find(identificador).append("<div class='agregadoShow'> Clasificacion: "+ show.shows[k].ratingDescription+"</div> ");
                                
                            }
                        }
                    }
                }
                
            }
            
        });
    }

}