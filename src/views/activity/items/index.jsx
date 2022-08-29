import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getActivityById,
  isLoading,
  selectActivity,
  selectTitle,
  updateActivity,
} from "../../../features/activity/activitySlice";
import {
  addItem,
  getItems,
  selectItems,
} from "../../../features/items/itemSlice";

export const Items = () => {
  const { id } = useParams();
  const [header, setHeader] = useState("");
  const [show, setShow] = useState(false);
  const [priority, setPriority] = useState("very-high");
  const [checked, setChecked] = useState(false);
  const [itemName, setItemName] = useState("");

  const title = useSelector(selectTitle);
  const items = useSelector(selectItems);
  const loading = useSelector(isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getItems(id));
  }, [dispatch, id]);

  const handleUpdate = async (e) => {
    await dispatch(getActivityById(id));
    setHeader(title);
    document.querySelector(".items__header-input").classList.remove("d-none");
    document.querySelector(".items__header-input").focus();
    e.target.classList.add("d-none");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const showPriority = () => {
    document.getElementById("showPriority").classList.toggle("d-none");
  };

  const submitItem = async (e) => {
    e.preventDefault();
    await dispatch(addItem({ id, itemName, priority }));
    setShow(false);
  };

  return (
    <div>
      <header className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="btn btn-light pt-2">
            <i className="bi bi-chevron-left fw-bold fs-3"></i>
          </Link>
          <h1 className="items__header" onClick={handleUpdate}>
            {title}
          </h1>
          <input
            type="text"
            className="items__header-input d-none"
            defaultValue={header}
            onChange={(e) =>
              dispatch(updateActivity({ id: id, title: e.target.value }))
            }
          />
          <i className="bi bi-pencil"></i>
        </div>
        <div>
          <Button
            onClick={handleShow}
            className="btn btn-add d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-plus fs-3 d-flex align-items-center"></i>
            Tambah
          </Button>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Tambah List Item
              </Modal.Title>
              <Button onClick={handleClose} className="btn-close"></Button>
            </Modal.Header>
            <Modal.Body className="px-4 py-5">
              <Form>
                <Form.Group className="mb-4" controlId="formBasicListName">
                  <Form.Label className="form_input-label">
                    Nama List Item
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tambahkan Nama List Item"
                    className="p-3"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicListName">
                  <label htmlFor="select_items" className="form_input-label">
                    Priority
                  </label>
                  <div className="position-relative">
                    <button
                      className="btn w-25 d-flex border p-3"
                      type="button"
                      onClick={showPriority}
                    >
                      {priority === "very-high" ? (
                        <>
                          <i className="bi bi-circle-fill very-high"></i>
                          <span className="ms-2">Very High</span>
                        </>
                      ) : priority === "high" ? (
                        <>
                          <i className="bi bi-circle-fill high"></i>
                          <span className="ms-2">High</span>
                        </>
                      ) : priority === "normal" ? (
                        <>
                          <i className="bi bi-circle-fill medium"></i>
                          <span className="ms-2">Medium</span>
                        </>
                      ) : priority === "low" ? (
                        <>
                          <i className="bi bi-circle-fill low"></i>
                          <span className="ms-2">Low</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-circle-fill very-low"></i>
                          <span className="ms-2">Very Low</span>
                        </>
                      )}
                    </button>
                    <div
                      className="d-flex flex-column w-25 border border-1 d-none position-absolute bg-light"
                      id="showPriority"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPriority("very-high");
                          document
                            .getElementById("showPriority")
                            .classList.add("d-none");
                        }}
                        className="btn d-flex align-items-center py-2"
                      >
                        <i className="bi bi-circle-fill very-high"></i>
                        <span className="ms-2">Very High</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPriority("high");
                          document
                            .getElementById("showPriority")
                            .classList.add("d-none");
                        }}
                        className="btn d-flex align-items-center py-2"
                      >
                        <i className="bi bi-circle-fill high"></i>
                        <span className="ms-2">High</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPriority("normal");
                          document
                            .getElementById("showPriority")
                            .classList.add("d-none");
                        }}
                        className="btn d-flex align-items-center py-2"
                      >
                        <i className="bi bi-circle-fill medium"></i>
                        <span className="ms-2">Medium</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPriority("low");
                          document
                            .getElementById("showPriority")
                            .classList.add("d-none");
                        }}
                        className="btn d-flex align-items-center py-2"
                      >
                        <i className="bi bi-circle-fill low"></i>
                        <span className="ms-2">Low</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPriority("very-low");
                          document
                            .getElementById("showPriority")
                            .classList.add("d-none");
                        }}
                        className="btn d-flex align-items-center py-2"
                      >
                        <i className="bi bi-circle-fill very-high"></i>
                        <span className="ms-2">Very High</span>
                      </button>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={submitItem}>
                Simpan
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </header>
      <main>
        <section className="py-4">
          {items.map((item, index) => (
            <Card className="mb-2" key={index}>
              <Card.Body>
                <Form>
                  <Form.Group
                    className="d-flex align-items-center gap-2"
                    controlId="formBasicCheckbox"
                    onChange={(e) => setChecked(e.target.checked)}
                  >
                    <Form.Check type="checkbox" />
                    <span className="d-flex gap-3">
                      <i className="bi bi-circle-fill very-high"></i>
                      <span>{item.title}</span>
                    </span>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
};
