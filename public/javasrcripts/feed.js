const imageUploader = document.querySelector("#imageUploader");
const postImgInput = document.querySelector("#postImgInput");
const allPostsContainer = document.querySelector(".allPostsContainer");
const userId = document.querySelector('.userDetails').dataset.userId;

// calculateTime start from here
const calculateTime = (dbTime) => {
    const givenTime = new Date(dbTime);
    const currentTime = new Date();
    const diffTimeInMilli = currentTime - givenTime;
    const timeInMin = Math.ceil(diffTimeInMilli / 60000);

    if (timeInMin < 60) {
        return `${timeInMin} min ago`;
    } else if (timeInMin < 1440) { // 1440 minutes = 24 hours
        const timeInHours = Math.floor(timeInMin / 60);
        return `${timeInHours} hour${timeInHours > 1 ? 's' : ''} ago`;
    } else {
        const timeInDays = Math.floor(timeInMin / 1440);
        return `${timeInDays} day${timeInDays > 1 ? 's' : ''} ago`;
    }
};


document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("/api/getFeed", {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();

    allPostsContainer.innerHTML = "";

    if (!data) {
        allPostsContainer.innerHTML = `
        <div class="w-full h-[20rem] flex flex-col gap-5 items-center justify-center p-5">
        <p>Oops! No posts here yet. Start following more awesome people to fill your feed with exciting content.</p>
        <button class="w-[10rem] h-10 bg-blue-500 rounded-lg">View Suggestions</button>
    </div>`
    } else {
        data.forEach(post => {
            const postContainer = document.createElement("div");
            postContainer.classList.add("postContainer", "border-2", "border-zinc-200", "rounded-lg", "w-full", "h-fit", "p-4", "max-h-[30rem]");

            postContainer.innerHTML = `
            <div class="userDetails flex items-center gap-1 h-12">
                <div class="profilePicDiv w-10 h-10 rounded-full overflow-hidden">
                    <a href="/user/${post.author._id}">
                    <img class="w-10" src="/media/uploads/${post.author.profilePicture}" alt="">
                    </a>
                </div>
    
                <div class="nameAndTimeDiv flex-col items-start justify-center">
                    <div class="flex gap-2 items-center justify-center">
                        <a href="/user/${post.author._id}" class="font-bold hover:text-blue-600">${post.author.fullname}</a>
                        <i class="fa-solid fa-check" style="color: #74C0FC;"></i>
                    </div>
                    <p class="leading-none text-sm">
                        ${calculateTime(post.createdAt)}
                    </p>
                </div>
            </div> <!-- userDetails ends -->
    
            <div class="postContent h-fit w-full max-w-full">
                <p class="break-words">${post.content}</p>
            </div> <!-- postContent ends -->
    
            <div class="postImage w-full h-fit flex items-center justify-center">
                <img class=" max-h-[15rem]"
                    src="/media/uploads/${post.image}"
                    alt="">
            </div> <!-- postImage ends -->
    
            <div class="postInteractionsDiv flex gap-10 items-center justify-start mt-3">
    
                <div
                    class="group likesDiv rounded-lg border-2 border-zinc-300 p-2 flex gap-1 items-center justify-center cursor-pointer">
                    <i class="likeSticker ${post.likes.includes(userId) ? "liked fa-solid text-red-500" : "fa-regular text-blue-400"} fa-heart group-hover:text-red-500"></i>
                    <p class="likesCount">${post.likes.length}</p>
                </div>
    
                <div
                    class="commentDiv rounded-lg border-2 border-zinc-300 p-2  flex gap-1 items-center justify-center cursor-pointer">
                    <i class="fa-regular fa-comment-dots text-green-500"></i>
                    <p>${post.comments.length}</p>
                </div>
    
                <div
                    class="shareDiv rounded-lg border-2 border-zinc-300 p-2 flex gap-1 items-center justify-center cursor-pointer">
                    <i class="fa-solid fa-share text-orange-400"></i>
                    <p>Share</p>
                </div>
            </div> <!-- postInteractions ends -->`

            allPostsContainer.appendChild(postContainer);

            const likesDiv = postContainer.querySelector(".likesDiv");
            const likesCount = postContainer.querySelector(".likesCount");
            const likeSticker = likesDiv.querySelector(".likeSticker");

            likesDiv.addEventListener("click", async () => {

                likeSticker.classList.toggle("liked");

                const isLiked = likeSticker.classList.contains('liked');

                if (isLiked) {
                    likesCount.innerText = parseInt(likesCount.innerText) + 1;
                    likeSticker.classList.replace("fa-regular", "fa-solid");
                    likeSticker.classList.replace("text-blue-400", "text-red-500");

                } else {
                    likesCount.innerText = parseInt(likesCount.innerText) - 1;
                    likeSticker.classList.replace("fa-solid", "fa-regular");
                    likeSticker.classList.replace("text-red-500", "text-blue-400");
                }

                const res = await fetch(`/post/like/${post._id}`, {
                    method: 'POST',
                    credentials: 'include'
                });

                const data = await res.json();
                console.log(data);
                likesCount.innerText = data;
            });
        });
    }
});


// _________________________________________________
//		imageUploader start from here
//_________________________________________________
imageUploader.addEventListener("click", () => {
    postImgInput.click();
});

postImgInput.addEventListener("change", () => {
    const file = postImgInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove("hidden");
        }
        reader.readAsDataURL(file);
    }
});
