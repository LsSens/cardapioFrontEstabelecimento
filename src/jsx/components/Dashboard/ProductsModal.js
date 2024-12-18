import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getItems } from './../../../services/ItemsService';
import Skeleton from "react-loading-skeleton";
import { putItemsIntoMenu } from "../../../services/MenuService";
import Swal from "sweetalert2";
import { SpinnerLoader } from './../bootstrap/SpinnerLoader';
import { Link } from "react-router-dom";

export const ProductsModal = ({ open, close, menuId }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const hasFetched = React.useRef(false);
  
  const getProducts = (page) => {
    setLoading(true);
    const fetchData = async () => {
      await getItems({menuId, page}).then(async (response) => {
        setItems(response.data);
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
            {!items?.data?.length && <h4>Não há produtos disponíveis para vincular.</h4>}
            {items?.data?.map((item, ind) => (
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
      <div className="d-flex align-items-center justify-content-xl-between justify-content-center flex-wrap pagination-bx" style={{marginRight: 'auto'}}>
        <div className="mb-sm-0 mb-3 pagination-title">
          <p className="mb-0">
            <span>Mostrando {items?.data?.length}</span> de <span>{items?.totalItems}</span> produtos
          </p>
        </div>
        <nav>
          <ul className="pagination pagination-gutter">
            <li className="page-item page-indicator">
              <Link to={"#"} className="page-link" onClick={() => getProducts(items?.currentPage - 1)} style={items?.currentPage === 1 ? { pointerEvents: 'none', opacity: 0.5} : {}}>
                <i className="la la-angle-left"></i>
              </Link>
            </li>
            {Array.of(...Array(items?.totalPages)).map((_, index) => (
              <li className={items?.currentPage === index + 1 ? "page-item active" : "page-item"}>
                <Link to={"#"} className="page-link" onClick={() => getProducts(index + 1)}>
                  {index + 1}
                </Link>
              </li>
            ))}
            <li className="page-item page-indicator">
              <Link to={"#"} className="page-link" onClick={() => getProducts(items?.currentPage + 1)} style={items?.currentPage === items?.totalPages ? { pointerEvents: 'none', opacity: 0.5} : {}}>
                <i className="la la-angle-right"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
        <Button variant="danger light" onClick={close}>
          Fechar
        </Button>
        <Button variant="" type="button" disabled={!items?.data?.length} className="btn btn-primary" onClick={() => saveProductsIntoCategory()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
