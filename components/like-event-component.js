import { renderPostsPageComponent } from "./posts-page-component.js";
import { posts, getToken, setPosts } from "../index.js";
import { clickLike } from "../api.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderUserPageComponent } from "./user-page-component.js";

// Поставить лайк
export function likeEventListiner({ appEl, pageComponent }) {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const postId = likeButton.dataset.postId;
      const index = likeButton.dataset.index;
      let like;

      posts[index].isLiked ? (like = "dislike") : (like = "like");

      clickLike({ token: getToken(), postId, like }).then((updatedPost) => {
        posts[index] = updatedPost.post;
        setPosts(posts);

        if (POSTS_PAGE) {
          renderPostsPageComponent({ appEl });
        } else if (USER_POSTS_PAGE) {
          renderUserPageComponent({ appEl });
        }
      });
    });
  }
}
