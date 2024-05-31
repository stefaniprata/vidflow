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
                    <img class="img-canal" src="${video.imagem}" alt="Logo do Canal>
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
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