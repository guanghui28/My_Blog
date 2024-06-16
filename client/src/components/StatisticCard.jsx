import { HiArrowNarrowUp } from "react-icons/hi";

const StatisticCard = ({ icon, tag, total, lastMonth }) => {
	return (
		<div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
			<div className="flex justify-between">
				<div className="">
					<h3 className="text-gray-500 font-medium uppercase">Total {tag}</h3>
					<p className="text-2xl">{total}</p>
				</div>
				{icon}
			</div>
			<div className="flex gap-2 text-sm">
				<span className="text-green-500 flex items-center">
					<HiArrowNarrowUp />
					{lastMonth}
				</span>
				<div className="text-gray-500">Last month</div>
			</div>
		</div>
	);
};

export default StatisticCard;
