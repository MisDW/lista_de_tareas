// Primer codigo con jquery

var bd_tareas = []
var ultima_id_cookie = 0
var clicks = 0

$("#modo_oscuro").on("click", () =>{
    clicks++
    if (clicks == 1) {
        $("body").css("background", "#342F38");
        $("body").css("color", "#D3CED8");
        $("#modo_oscuro").css("color", "#D3CED8")
        $("#modo_oscuro").html("<span class='material-symbols-outlined'>light_off</span>")
    }else{
        $("body").css("background", "#ffff");
        $("body").css("color", "#342F38");
        $("#modo_oscuro").css("color", "#342F38")
        $("#modo_oscuro").html("<span class='material-symbols-outlined'>lightbulb</span>")
        clicks = 0
    }
})


const cookie = () => {
        // Ejemplo de uso
        const valorTareas = obtenerCookie('tareas');

        if (valorTareas) {
            const arrayTareas = JSON.parse(valorTareas);
            console.warn("Cookie");
            bd_tareas = arrayTareas
            // console.log(bd_tareas);
            $("#contenedor_tareas").html("");
            bd_tareas.forEach(item => {                
                var {id_cookie, titulo, descripcion, datos} = item
                ultima_id_cookie = id_cookie
                
                $("#contenedor_tareas").prepend(`
                <div class="tarea" id="${id_cookie}">
                    <div class="titulo_tarea" id="titulo_tarea">${titulo}</div>
                    <span class="datos">Fecha: ${datos}</span>
                    <div class="descripcion_tarea" id="descripcion_tarea">${descripcion}</div>
                    <button class="btn_completar_tarea" id="btn_completar_tarea" value="${id_cookie}"><strong class="text_completar">Completar</strong><span class="material-symbols-outlined">check_circle</span></button>
                </div>
                `)
            });
        } else {
            console.log('La cookie no existe o está vacía.');
        }
        // console.log(ultima_id_cookie);
}


$("#formulario").on("submit", (e) => {
    e.preventDefault();
    // alert("Haz hecho clic en el botón")
    var titulo = $("#titulo_input").val()
    var descripcion = $("#descripcion_input").val()
    var datos = $("#datos_input").val()
    // console.log(titulo);
    // console.log(descripcion);
    ultima_id_cookie++
    bd_tareas.push({"id_cookie" :ultima_id_cookie ,"titulo": titulo, "descripcion": descripcion, "datos": datos}); 
    document.cookie = `tareas=${JSON.stringify(bd_tareas)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
    cookie()
    $("#contendor_form").toggle()
    titulo = $("#titulo_input").val("")
    descripcion = $("#descripcion_input").val("")
    datos = $("#datos_input").val("")
});

const obtenerCookie = (nombre) => {
    const nombreCookie = `${nombre}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();

        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    return null;
}

window.addEventListener("load", () =>{
    cookie()
    $("#contendor_form").hide()
})

$("#close_form").on("click", ()=>{
    $("#contendor_form").toggle()
})

$("#open_form").on("click", ()=>{
    $("#contendor_form").toggle()
})

var circle = confetti.shapeFromPath({ path: 'M50,10 A40,40 0 1,1 49.9999,10' }, scalar);
var scalar = 2

$(document).ready(function() {
    // ... (código anterior)

    $("#contenedor_tareas").on("click", ".btn_completar_tarea", function(e) {
        var tareaElement = $(this).closest(".tarea");
        // Obten el id_cookie del botón clicado
        var id_cookie_boton = parseInt($(this).val());
        // Encuentra el índice del objeto con el id_cookie correspondiente
        var index = bd_tareas.findIndex(item => item.id_cookie === id_cookie_boton);
        console.log(index);
        if (index != -1) {
            bd_tareas.splice(index, 1);
            // Actualiza la cookie
            document.cookie = `tareas=${JSON.stringify(bd_tareas)}; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/`;
            $(this).closest(".tarea").remove();

            confetti({
                shapes: [circle],
                scalar
            });
        }
        console.log(e);
    });

    // ... (código posterior)
});


