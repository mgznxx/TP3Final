//:::: TP Final Instituto Alfa ::::

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const cursos = [
    {
        tipo: "Salud",
        asing: "Auxiliar de Enfermería",
        duracion: "6 meses",
        valor: 3000,
        id: 1,
        img: "./images/enfer.jpg",
        cantidad: 1,
    },
    {
        tipo: "Salud",
        asing: "Auxiliar de Farmacia",
        duracion: "6 meses",
        valor: 3000,
        id: 2,
        img: "./images/Far.jpg",
        cantidad: 1,
    },
    {
        tipo: "Salud",
        asing: "Acompañante Terapéutico",
        duracion: "6 meses",
        valor: 3000,
        id: 3,
        img: "./images/AT.jpg",
        cantidad: 1,
    },
    {
        tipo: "Idioma",
        asing: "Inglés",
        duracion: "4 años",
        valor: 3000,
        id: 4,
        img: "./images/ingles.jpg",
        cantidad: 1,
    },
    {
        tipo: "Idioma",
        asing: "Portugués",
        duracion: "4 años",
        valor: 3000,
        id: 5,
        img: "./images/Port.jpg",
        cantidad: 1,
    },
    {
        tipo: "computación",
        asing: "Operador de Pc",
        duracion: "6 meses",
        valor: 3000,
        id: 6,
        img: "./images/compu.jpg",
        cantidad: 1,
    },
    {
        tipo: "computación",
        asing: "Diseño Gráfico",
        duracion: "6 meses",
        valor: 3000,
        id: 7,
        img: "./images/DG.jpg",
        cantidad: 1,
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

cursos.forEach((curso) => {
    let content = document.createElement("div");
    content.className = "card"
    content.innerHTML = `
        <img src="${curso.img}">
        <h3>${curso.asing}</h3>
        <p>$${curso.valor}.-</p>
        
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Inscribirse";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatCurso) => repeatCurso.id === curso.id);

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === curso.id) {
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: curso.id,
                img: curso.img,
                asing: curso.asing,
                valor: curso.valor,
                cantidad: curso.cantidad,

            });
        }
        carritoCounter();
        saveLocal();
    });

});

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const pintarCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalbutton = document.createElement("h3");
    modalbutton.innerText = "X";
    modalbutton.className = "modal-header-button";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h2 class="modal-header-title">Te inscribiste en los siguientes cursos:</h2>
    `;
    modalContainer.append(modalHeader);



    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    carrito.forEach((curso) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${curso.img}">
            <h3>${curso.asing}</h3>
            <p>Cuota mensual: $${curso.valor}</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${curso.cantidad}</p>
            <span class="sumar"> + </span>             
            <p>Subtotal: $${curso.cantidad * curso.valor}</p> 
            <span class ="delete-product">🚮</span>
            
                      
        `;

        modalContainer.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (curso.cantidad !== 1){
                curso.cantidad--;

            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
                curso.cantidad++;
            
             
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
        eliminarProducto(curso.id);

        saveLocal();
            pintarCarrito();

        
        
    });

        
    });



    const total = carrito.reduce((acc, el) => acc + el.valor * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar por mes: $${total}.-`;
    modalContainer.append(totalBuying);

};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    console.log(foundId);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;

    });

    carritoCounter();
    saveLocal();
    pintarCarrito();

};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();





        










