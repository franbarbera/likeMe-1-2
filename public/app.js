const API = "http://localhost:3000/posts";

document.getElementById("load").addEventListener("click", getPosts);

async function getPosts() {
    const res = await fetch(API);
    const posts = await res.json();
    renderPosts(posts);
}

function renderPosts(posts) {
    const div = document.getElementById("posts");
    div.innerHTML = "";

    posts.forEach(p => {
        div.innerHTML += `
        <div style="margin-bottom:20px;border:1px solid #aaa;padding:10px;width:300px">
            <h3>${p.titulo}</h3>
            <img src="${p.img}" width="200">
            <p>${p.descripcion}</p>
            <p>❤️ ${p.likes}</p>

            <button onclick="likePost(${p.id})">Like</button>
            <button onclick="deletePost(${p.id})">Eliminar</button>
        </div>
        `;
    });
}

async function likePost(id) {
    await fetch(`${API}/like/${id}`, {
        method: "PUT"
    });
    getPosts();
}

async function deletePost(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });
    getPosts();
}
