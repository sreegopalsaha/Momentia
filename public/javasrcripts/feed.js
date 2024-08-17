const imageUploader = document.querySelector("#imageUploader");
const postImgInput = document.querySelector("#postImgInput");

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/api/getFeed", {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    console.log(data);
})

imageUploader.addEventListener("click", ()=>{
    postImgInput.click();
});

postImgInput.addEventListener("change", () => {
    const file = postImgInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove("hidden");
        }
        reader.readAsDataURL(file);
    }
});

