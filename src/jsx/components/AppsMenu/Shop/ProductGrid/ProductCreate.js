import { Button, Modal } from "react-bootstrap";
import InputMask from "react-input-mask";

export const ProductCreate = ({ open, close }) => {
  return (
    <Modal className="fade bd-example-modal-lg" show={open} size="lg">
      <Modal.Header>
        <Modal.Title>Novo produto</Modal.Title>
        <Button variant="" className="btn-close" onClick={close}></Button>
      </Modal.Header>
      <Modal.Body>
        <form id="addCategoryForm">
          <div class="mb-3">
            <label for="modalInputText" class="form-label">
              Nome do produto
            </label>
            <input
              type="text"
              id="modalInputText"
              class="form-control"
              value=""
            />
          </div>
          <div class="mb-3">
            <label for="modalInputText" class="form-label">
              Preço do produto
            </label>
            <InputMask
              mask="R$ 99.999,99"
              name="phone"
              className="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="modalInputText" class="form-label">
              Descrição do produto
            </label>
            <textarea
              id="modalInputText"
              class="form-control"
              value=""
              style={{ resize: "none", height: 200 }}
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="modalInputFile" class="form-label">
              Imagem do produto{" "}
              <span style={{ fontSize: 10 }}>(Recomendado: 80x80px)</span>
            </label>
            <input
              type="file"
              id="modalInputFile"
              class="form-control"
              accept="image/jpeg, image/png, image/gif, image/apng, image/tiff"
            />
            <div id="imagePreviewContainer" class="mt-3 text-center"></div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={close}>
          Fechar
        </Button>
        <Button variant="" type="button" className="btn btn-primary">
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
