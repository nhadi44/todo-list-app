import React, { useEffect, useState } from "react";
import { Card, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addActivity,
  deleteActivity,
  getActivity,
  isLoading,
  selectActivity,
} from "../../features/activity/activitySlice";

export const Activity = () => {
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: "",
    title: "",
  });
  const [message, setMessage] = useState(false);

  const activities = useSelector(selectActivity);
  const navigate = useNavigate();
  const loading = useSelector(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  const handleShow = (e) => {
    setDataModal({ ...dataModal, id: e.id, title: e.title });
    setShow(true);
  };

  return (
    <>
      <header className="d-flex justify-content-between">
        <h1 className="m-0 fs-1 fw-bold">Activity</h1>
        <button
          className="btn btn-add d-flex align-items-center justify-content-center gap-1"
          onClick={async () => {
            await dispatch(addActivity());
            await dispatch(getActivity());
          }}
        >
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <>
              <i className="bi bi-plus fs-3 d-flex align-items-center"></i>
              Tambah
            </>
          )}
        </button>
      </header>
      <main
        className={
          activities.length > 0
            ? "row row-cols-lg-4 g-2 g-lg-3 py-4"
            : "row g-2 g-lg-3 py-4"
        }
      >
        {activities.length > 0 ? (
          activities.map((item, index) => (
            <div className="px-2 d-flex align-items-stretch" key={index}>
              <Card
                className="col mx-0 position-relative px-3 py-2"
                style={{ height: "220px" }}
              >
                <Link
                  to={`/detail/${item.id}`}
                  className="card-activity-body text-decoration-none text-dark"
                >
                  <Card.Body>
                    <Card.Title className="fs-5 fw-bold">
                      {item.title}
                    </Card.Title>
                  </Card.Body>
                </Link>
                <footer className="row px-3 py-2 align-items-center">
                  <div className="col-md-8">
                    <p className="text-muted m-0">26 Agustus 2022</p>
                  </div>
                  <div className="col-md-4 text-end">
                    <i
                      className="bi bi-trash3 fs-5 icon-delete"
                      onClick={() => {
                        handleShow(item);
                      }}
                    ></i>
                  </div>
                </footer>
              </Card>
            </div>
          ))
        ) : (
          <div className="col">
            <div
              className="d-flex justify-content-center"
              onClick={async () => {
                await dispatch(addActivity());
                await dispatch(getActivity());
              }}
            >
              <img
                src="/assets/icons/activity-empty-state.svg"
                alt="empty-activity"
              />
            </div>
          </div>
        )}
      </main>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body className="d-flex flex-column align-items-center mx-5 gap-4">
          <img src="/assets/icons/modal-delete-icon.svg" alt="icons" />
          <p className="text-center">
            Apakah anda yakin menghapus activity
            <strong> "{dataModal.title}"? </strong>
          </p>
          <div className="d-flex gap-4">
            <button
              className="btn btn-light"
              style={{ borderRadius: "2.5rem", padding: ".7rem 2rem" }}
              onClick={() => setShow(false)}
            >
              Close
            </button>
            <button
              className="btn btn-danger"
              style={{ borderRadius: "2.5rem", padding: ".7rem 2rem" }}
              onClick={async () => {
                await dispatch(deleteActivity(dataModal.id));
                await dispatch(getActivity());
                setShow(false);
                setMessage(true);
              }}
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {message && (
        <Modal show={message} onHide={() => setMessage(false)}>
          <Modal.Body>
            <div className="d-flex align-items-center gap-2 px-3">
              <img src="/assets/icons/modal-information-icon.svg" alt="icons" />
              <span className="text-center pt-1">
                Berhasil menghapus activity
              </span>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
