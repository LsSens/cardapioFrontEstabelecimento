import React, { Fragment, useEffect, useState } from "react";
import Products from "./Products";

/// Data
import productData from "../productData";
import { Link } from "react-router-dom";
import Alert from "sweetalert2";
import { getItems } from "../../../../../services/ItemsService";
import Skeleton from "react-loading-skeleton";
import { ProductCreate } from "./ProductCreate";

const ProductGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openProductCreate, setOpenProductCreate] = useState(false);
  const hasFetched = React.useRef(false);

  const handleAddProduct = () => setOpenProductCreate(true)

  // const handleAddProduct = () => {
  //   Alert.fire({
  //     title: "Adicionar produto",
  //     html: `
  //       <form id="addCategoryForm">
  //         <div class="mb-3">
  //           <label for="modalInputText" class="form-label">Nome do produto</label>
  //           <input type="text" id="modalInputText" class="form-control" value="" />
  //         </div>
  //         <div class="mb-3">
  //           <label for="modalInputText" class="form-label">Preço do produto</label>
  //           <input type="text" id="modalInputText" class="form-control" value="" onChange="teste()"/>
  //         </div>
  //         <div class="mb-3">
  //           <label for="modalInputText" class="form-label">Descrição do produto</label>
  //           <textarea id="modalInputText" class="form-control" value="" style="resize:none;height: 200px"></textarea>
  //         </div>
  //         <div class="mb-3">
  //           <label for="modalInputFile" class="form-label">
  //             Imagem do produto <span style="font-size: 10px;">(Recomendado: 80x80px)</span>
  //           </label>
  //           <input type="file" id="modalInputFile" class="form-control" accept="image/jpeg, image/png, image/gif, image/apng, image/tiff" />
  //           <div id="imagePreviewContainer" class="mt-3 text-center"></div>
  //         </div>
  //       </form>
  //     `,
  //     showCancelButton: true,
  //     confirmButtonText: "Adicionar",
  //     cancelButtonText: "Fechar",
  //     preConfirm: async () => {
  //       const nameInput = document
  //         .getElementById("modalInputText")
  //         .value.trim();
  //       const fileInput = document.getElementById("modalInputFile").files[0];

  //       if (!nameInput) {
  //         Alert.showValidationMessage("O nome da categoria é obrigatório.");
  //         return false;
  //       }

  //       let imageBase64 = null;
  //       if (fileInput) {
  //         const maxFileSize = 8 * 1024 * 1024; // 8MB
  //         if (fileInput.size > maxFileSize) {
  //           Alert.showValidationMessage(
  //             "O arquivo é muito grande. O tamanho máximo permitido é de 8MB."
  //           );
  //           return false;
  //         }

  //         imageBase64 = await handleImageUpload(fileInput);
  //       }

  //       return { nameInput, imageBase64 };
  //     },
  //     didOpen: () => {
  //       document
  //         .getElementById("modalInputFile")
  //         .addEventListener("change", (e) => {
  //           const file = e.target.files[0];
  //           if (file) {
  //             const reader = new FileReader();
  //             reader.onload = (event) => {
  //               const previewContainer = document.getElementById(
  //                 "imagePreviewContainer"
  //               );
  //               previewContainer.innerHTML = `
  //               <img src="${event.target.result}" alt="Pré-visualização" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" />
  //             `;
  //             };
  //             reader.readAsDataURL(file);
  //           }
  //         });
  //     },
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       console.log(`handleAddProduct ~ result:`, result)
  //       const { nameInput, imageBase64 } = result.value;

  //       // addNewMenu(nameInput, imageBase64);
  //     }
  //   });
  // };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (!hasFetched.current) {
      setLoading(true);
      const fetchData = async () => {
        await getItems().then(async (response) => {
          setItems(response.data.data);
        });
        setLoading(false);
      };
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={100} />
          </div>
        </div>
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={150} />
          </div>
        </div>
        <div className="col-xl-12 mb-4">
          <Skeleton height={40} width={200} />
          <div className="mt-3">
            <Skeleton height={150} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-xl-12">
        <h2>Produtos</h2>
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
          <div className="input-group search-area2">
            <span className="input-group-text p-0">
              <Link to={"#"}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z"
                    fill="#FC8019"
                  />
                </svg>
              </Link>
            </span>
            <input
              type="text"
              className="form-control p-0"
              placeholder="Procurar"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mt-3 mt-sm-0"
            onClick={() => handleAddProduct()}
          >
            Novo produto
          </button>
          <ProductCreate open={openProductCreate} close={() => setOpenProductCreate(false)} />
        </div>
        {/* <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className="mb-0 cate-title">Categoria</h4>
            <Link to={"/favorite-menu"} className="text-primary">
              Ver todas <i className="fa-solid fa-angle-right ms-2"></i>
            </Link>
          </div>
          <MenuCategorySlider
            menus={menus}
            setMenus={setMenus}
            setLoading={setLoading}
          /> */}
      </div>
      <div className="row">
        {items.map((product) => (
          <Products key={product.key} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductGrid;
