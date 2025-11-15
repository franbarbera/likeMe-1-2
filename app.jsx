import { useEffect, useState } from "react";

export default function App() {
    const [posts, setPosts] = useState([]);


    const getPosts = async () => {
        const res = await fetch("http://localhost:3000/posts");
        const data = await res.json();
        setPosts(data);
    };


    const createPost = async () => {
        const titulo = prompt("Título:");
        const img = prompt("URL de imagen:");
        const descripcion = prompt("Descripción:");

        await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, img, descripcion }),
        });

        getPosts();
    };


    const likePost = async (id) => {
        await fetch(`http://localhost:3000/posts/like/${id}`, {
            method: "PUT",
        });
        getPosts();
    };


    const deletePost = async (id) => {
        await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
        });
        getPosts();
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Like Me</h1>

            <button onClick={createPost}>Crear post</button>

            <div style={{ marginTop: 20 }}>
                {posts.map((post) => (
                    <div
                        key={post.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: 10,
                            marginBottom: 10,
                        }}
                    >
                        <h3>{post.titulo}</h3>
                        <img src={post.img} alt="" width={200} />
                        <p>{post.descripcion}</p>

                        <button onClick={() => likePost(post.id)}>
                            ❤️ {post.likes}
                        </button>

                        <button
                            onClick={() => deletePost(post.id)}
                            style={{ marginLeft: 10 }}
                        >
                            🗑 Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
