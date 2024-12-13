import { Button, Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createItem, editItem } from "../../../../../services/ItemsService";

export const ProductCreate = ({ open, close, editProduct }) => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productImageBase64, setProductImageBase64] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProductImageBase64(reader.result)
        document.getElementById("imagePreviewContainer").innerHTML = `<img src="${reader.result}" alt="Preview" style="max-height: 80px;" />`;
      };
      reader.readAsDataURL(file);
    }
  };

  const createProduct = async () => {
    if (!productName || !productPrice || !productDescription || !productImage) {
      Swal.fire("Erro", "Preencha todos os campos.", "error");
      return;
    }
    
    const body = {
      id: productId,
      name: productName,
      price: 50, //////////////
      available: true,
      description: productDescription,
      image: productImageBase64
    }


    if(editProduct){
      await editItem(body).then(() => {
        Swal.fire("Sucesso", "Produto editado com sucesso.", "success");
        close()
      })
    } else {
      await createItem(body).then(() => {
        Swal.fire("Sucesso", "Produto criado com sucesso.", "success");
        close()
      })
    }
  };

  useEffect(() => {
    if(!editProduct) return
    setProductId(editProduct.item_id)
    setProductName(editProduct.name)
    setProductPrice(editProduct.price)
    setProductDescription(editProduct.description)
  }, [editProduct]);

  return (
    <Modal className="fade bd-example-modal-lg" show={open} size="lg">
      <Modal.Header>
        <Modal.Title>Novo produto</Modal.Title>
        <Button variant="" className="btn-close" onClick={close}></Button>
      </Modal.Header>
      <Modal.Body>
        <form id="addCategoryForm">
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Nome do produto
            </label>
            <input
              type="text"
              id="productName"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Preço do produto
            </label>
            <InputMask
              type="money"
              name="price"
              className="form-control"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Descrição do produto
            </label>
            <textarea
              id="productDescription"
              className="form-control"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              style={{ resize: "none", height: 200 }}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">
              Imagem do produto <span style={{ fontSize: 10 }}>(Recomendado: 80x80px)</span>
            </label>
            <input
              type="file"
              id="productImage"
              className="form-control"
              accept="image/jpeg, image/png, image/gif, image/apng, image/tiff"
              onChange={handleImageChange}
            />
            <div id="imagePreviewContainer" className="mt-3 text-center"></div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={close}>
          Fechar
        </Button>
        <Button
          variant=""
          type="button"
          className="btn btn-primary"
          onClick={createProduct}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
