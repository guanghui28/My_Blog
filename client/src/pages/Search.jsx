import { Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CATEGORIES } from "../data";

const Search = () => {
	const { search } = useLocation();
	const [sidebarData, setSidebarData] = useState({
		searchTerm: "",
		sort: "desc",
		category: "uncategorized",
	});
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const urlParams = new URLSearchParams(search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		const sortFromUrl = urlParams.get("sort");
		const categoryFromUrl = urlParams.get("category");

		if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
			setSidebarData((prev) => ({
				...prev,
				searchTerm: searchTermFromUrl || "",
				sort: sortFromUrl || "",
				category: categoryFromUrl || "",
			}));
		}

		const fetchPosts = async () => {
			try {
				setLoading(true);
				const searchQuery = urlParams.toString();
				const res = await fetch(`/api/post/get-posts?${searchQuery}`);
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message);
				}
				setPosts(data.posts);

				if (data.posts.length > 9) {
					setShowMore(true);
				} else {
					setShowMore(false);
				}
			} catch (error) {
				console.log(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [search]);

	const handleChange = (e) => {
		if (e.target.id === "searchTerm") {
			setSidebarData((prev) => ({ ...prev, searchTerm: e.target.value }));
		} else if (e.target.id === "sort") {
			const sort = e.target.value || "desc";
			setSidebarData((prev) => ({ ...prev, sort }));
		} else if (e.target.id === "category") {
			const category = e.target.value || "uncategorized";
			setSidebarData((prev) => ({ ...prev, category }));
		}
	};

	return (
		<div className="flex flex-col md:flex-row">
			<div className="p-7 border-b md:border-r md:min-h-screen border-gray">
				<form className="flex flex-col gap-8">
					<div className="flex items-center gap-2">
						<label
							className="whitespace-nowrap font-semibold"
							htmlFor="searchTerm"
						>
							Search Term:
						</label>
						<TextInput
							placeholder="Search..."
							id="searchTerm"
							type="text"
							value={sidebarData.searchTerm}
							onChange={handleChange}
						/>
					</div>

					<div className="flex items-center gap-2">
						<label className="font-semibold" htmlFor="sort">
							Sort:
						</label>
						<Select onChange={handleChange} value={sidebarData.sort} id="sort">
							<option value="desc">Latest</option>
							<option value="asc">Oldest</option>
						</Select>
					</div>

					<div className="flex items-center gap-2">
						<label className="font-semibold" htmlFor="category">
							Category:
						</label>
						<Select
							onChange={handleChange}
							value={sidebarData.category}
							id="category"
						>
							{CATEGORIES.map((opt) => (
								<option key={opt.value} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Select>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Search;
