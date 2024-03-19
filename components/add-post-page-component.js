import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const headerHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts"></ul>
  </div>`;

  appEl.innerHTML = headerHtml;

  const postsList = document.querySelector(".posts");

  // Страница добавления поста
  const render = () => {
    const appHtml = `
              <div class="form">
                <h3 class="form-title">Добавить пост</h3>
                <div class="form-inputs">
                  <div class="upload-image-container">
                    <div class="upload=image">
                      <label class="file-upload-label secondary-button">
                          <input type="file" class="file-upload-input" style="display:none">
                          Выберите фото
                      </label> 
                    </div>
                  </div>
                  <label>
                    Опишите фотографию:
                    <textarea class="input textarea" rows="4" id="description"></textarea>
                  </label>
                  <button class="button" id="add-button">Добавить</button>
                </div>`;

    postsList.innerHTML = appHtml;

    // Загрузка фотки
    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    // Клик по кнопке «Добавить» — эта мрась не работает
    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.querySelector(".textarea").value;

      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });
    });
  };

  renderHeaderComponent();
  render();
}
