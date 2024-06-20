import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteModal = ({ objectName, showModal, setShowModal, handleClick }) => {
	return (
		<Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
					<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
						Are you sure you want to delete this {objectName}?
					</h3>
					<div className="flex justify-between items-center">
						<Button color="failure" onClick={handleClick}>
							Yes, I&#39;m sure
						</Button>
						<Button color="gray" onClick={() => setShowModal(false)}>
							No, Cancel
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default DeleteModal;
