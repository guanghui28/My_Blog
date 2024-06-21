import { Table } from "flowbite-react";
import moment from "moment";
import { HiClock } from "react-icons/hi";

const SubCommentsTable = ({ comments }) => {
	return (
		<Table hoverable>
			<Table.Head>
				<Table.HeadCell>Comment Content</Table.HeadCell>
				<Table.HeadCell>Likes</Table.HeadCell>
				<Table.HeadCell>
					<HiClock className="w-6 h-6" />
				</Table.HeadCell>
			</Table.Head>
			<Table.Body>
				{comments.length > 0 &&
					comments.map((comment) => (
						<Table.Row
							key={comment._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className="w-70">
								<p className="line-clamp-2">{comment.content}</p>
							</Table.Cell>
							<Table.Cell>{comment.numberOfLikes}</Table.Cell>
							<Table.Cell>{moment(comment.createdAt).fromNow()}</Table.Cell>
						</Table.Row>
					))}
			</Table.Body>
		</Table>
	);
};

export default SubCommentsTable;
