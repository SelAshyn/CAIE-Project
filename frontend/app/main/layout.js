import { Cantarell, Merriweather } from "next/font/google";
import { SideBar } from "../../components/sidebar";
import "../globals.css"

const cantarell = Cantarell({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal"],
	variable: "--font-cantarell",
});

const merriweather = Merriweather({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
	style: ["normal", "italic"],
	variable: "--font-merriweather",
});

export default function Layout({ children }) {
	return (
		<div className={`${cantarell.variable} ${merriweather.variable} h-screen p-3 flex gap-3`}>
			<div className="bg-gray-900 h-full w-1/6 rounded-lg">
				<SideBar />
			</div>
			<main className="bg-gray-900 h-full w-full rounded-lg overflow-auto">
				{children}
			</main>
		</div>
	);
}

