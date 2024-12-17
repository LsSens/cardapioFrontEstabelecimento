import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getItems } from './../../../services/ItemsService';
import Skeleton from "react-loading-skeleton";
import { putItemsIntoMenu } from "../../../services/MenuService";
import Swal from "sweetalert2";
import { SpinnerLoader } from './../bootstrap/SpinnerLoader';

export const ProductsModal = ({ open, close, menuId }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const hasFetched = React.useRef(false);
  
  const getProducts = () => {
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

  const handleItemClick = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((selectedItem) => selectedItem.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };
  
  const saveProductsIntoCategory = () => {
    setLoadingSpinner(true);
    const fetchData = async () => {
      await putItemsIntoMenu(menuId, selectedItems.map(item => item.id)).then(async (response) => {
        Swal.fire("Sucesso", "Produtos vinculados com sucesso.", "success");
        close({editedCategory: true})
      });
      setLoadingSpinner(false);
    };
    fetchData();
    hasFetched.current = true;
  }

  useEffect(() => {
    if(open){
      getProducts()
    } else {
      setSelectedItems([])
    }
  }, [open]);

  const LoadingSkeleton = () => {
    return (
      <div className="row">
        {Array.of(...Array(10)).map((_, index) => (
          <div
            key={index}
            className="col-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
          >
            <Skeleton height={200} width={250} />
          </div>
        ))}
      </div>
    )
  }

  if(loadingSpinner) return <SpinnerLoader loading={loadingSpinner}/>

  return (
    <Modal className="fade bd-example-modal-lg" show={open} size="xl" scrollable={true}>
      <Modal.Header>
        <Modal.Title>Vincular produtos</Modal.Title>
        <Button variant="" className="btn-close" onClick={close}></Button>
      </Modal.Header>
      <Modal.Body>
        {loading ? <LoadingSkeleton/> : 
          <div className="row">
            {items.map((item, ind) => (
              <React.Fragment key={ind}>
                <div className="col-xl-3 col-xxl-3 col-sm-6 cursor-pointer" key={ind} onClick={() => handleItemClick(item)}>
                  <div className="card dishe-bx b-hover style-1">
                    <Form.Check type={'radio'} className="position-absolute" checked={selectedItems.map(i => i.id).includes(item.id)} style={{top: 20, left: 20}} onChange={() => handleItemClick(item)}/>
                    <div className="card-body pb-0 pt-3">
                      <div className="text-center mb-2">
                        {item.image ? (
                          <img
                            className="text-truncate"
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              paddingRight: "8px",
                            }}
                          />
                        ) : (
                          <i
                            className="bi bi-image-fill"
                            style={{
                              fontSize: "60px",
                              display: "block",
                              textAlign: "center",
                              lineHeight: "60px",
                              color: "#ccc",
                              paddingRight: "8px",
                            }}
                            title={item.name}
                          ></i>
                        )}
                      </div>
                      <div className="border-bottom pb-3">
                        <h4 className="font-w500 mb-1">{item.name}</h4>
                      </div>
                    </div>
                    <div className="card-footer border-0 pt-2">
                      <div className="common d-flex align-items-center justify-content-between">
                        <div>
                          <h4>{item.title}</h4>
                          <h3 className=" mb-0 text-primary">R$ {item.price}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger light" onClick={close}>
          Fechar
        </Button>
        <Button variant="" type="button" className="btn btn-primary" onClick={() => saveProductsIntoCategory()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
