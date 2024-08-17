document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/api/getFeed", {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
})
