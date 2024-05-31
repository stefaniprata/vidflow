const containerVideos = document.querySelector(".videos__container"); 

async function getVideos() {
    try {
    // search na api, return a promise - await aguardar que essa busca seja feita para que continue sendo executado
    const searchApi = await fetch("http://localhost:3000/videos");
    const videos = await searchApi.json();

    //.then(response => response.json())
    //.then(videos => {
        videos.forEach((video) => {
            //regra especifica para manipular um erro
            if (video.categoria === "") {
                throw new Error("Vídeo não tem categoria");
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>
            `
        })
   // })
    } catch (error) {
        containerVideos.innerHTML = `<p class="error-message">Houve um erro ao carregar os vídeos: ${error}</p>`;
    } 
    // finally { //independente se tiver erro ou não ele vai ser executado
    //     alert("Carregado");
    // }
    
}

getVideos();

//search na barra de pesquisa
const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

//function refatorada
function filtrarPesquisa() {    
    const videos = document.querySelectorAll(".videos__item");
    const valorFiltro = barraDePesquisa.value.toLowerCase();
    
    videos.forEach((video) => {
        const titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
        //if em condição ternária
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';

        //video.style.display = (titulo.includes(valorFiltro)) ? "block" : "none";
    });
}
// function filtrarPesquisa() {
//     const videos = document.querySelectorAll(".videos__item");
//     if (barraDePesquisa.value != "") {
//         for (let video of videos) {
//             let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
//             let valorFiltro = barraDePesquisa.value.toLowerCase();

//             if (!titulo.includes(valorFiltro)) {
//                 video.style.display = "none";
//             } else {
//                 video.style.display = "block";
//             }
//         }
//     } else{
//         video.style.display = "block";
//     }
// }

const botaoCategoria = document.querySelectorAll(".superior__item");
botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");

    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro) {   
    const videos = document.querySelectorAll(".videos__item");

    for (let video of videos) {
        let categoriaVideo = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();
        if (!categoriaVideo.includes(valorFiltro) && valorFiltro != "tudo") {
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}