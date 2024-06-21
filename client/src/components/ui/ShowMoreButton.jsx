const ShowMoreButton = ({ handleShowMore }) => {
	return (
		<button
			onClick={handleShowMore}
			className="w-full text-teal-500 self-center text-sm py-6"
		>
			Show more
		</button>
	);
};

export default ShowMoreButton;
