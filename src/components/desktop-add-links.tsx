"use client";

import { Input, Select, notification } from "antd";
import React, { useState } from "react";

import Image from "next/image";

interface Link {
	id: number;
	platform: string;
	url: string;
}

const DdesktopAddLinks = () => {
	const [links, setLinks] = useState<Link[]>([]);

	const addNewLink = () => {
		if (links.length < 3) {
			setLinks([...links, { id: links.length + 1, platform: "", url: "" }]);
		} else {
			notification.info({
				message: "Limit Reached",
				description:
					"You have reached the maximum of 3 links. Please save your work before adding more.",
				duration: 5
			});
		}
	};

	const removeLink = (id: number) => {
		setLinks(links.filter((link) => link.id !== id));
	};

	return (
		<>
			<div className="flex flex-col gap-9 p-[24px]">
				<nav className="flex justify-between items-center px-[20px] bg-[#FFFFFF] rounded-xl text-[16px] font-[600] leading-[24px] h-[78px] sticky top-0 z-10">
					<Image
						src="/assests/icons/logo.svg"
						alt="brandLogo"
						width={185.5}
						height={40}
					/>
					<div className="flex items-center">
						<button className="bg-[#EFEBFF] rounded-lg h-[46px] w-[122px] flex gap-2 items-center justify-center text-[#633CFF]">
							<Image
								src="/assests/icons/link.svg"
								alt="link-icon"
								width={20}
								height={20}
							/>
							Links
						</button>
						<button className="flex gap-2 items-center justify-center text-[#737373] rounded-lg h-[46px] w-[187px] hover:text-[#633CFF]">
							<Image
								src="/assests/icons/user-circle.svg"
								alt="user-circle"
								width={20}
								height={20}
							/>{" "}
							Profile Details
						</button>
					</div>
					<button className="items-center text-[#633CFF] hover:bg-[#EFEBFF] rounded-lg h-[46px] w-[114px] border border-[#633CFF]">
						Preview
					</button>
				</nav>

				<div className="flex items-center gap-10 w-[100%]">
					<div className="flex justify-center items-center w-[40%] bg-[#FFFFFF] h-[834px] rounded-xl">
						<div className="flex justify-center h-[631px]">
							<Image
								src="/assests/icons/frame1.svg"
								alt="frame1"
								width={307}
								height={631}
							/>
							<Image
								src="/assests/icons/frame2.svg"
								alt="frame2"
								className="absolute mt-2"
								width={285}
								height={611}
							/>
							<div className="absolute mt-14 flex flex-col gap-12 items-center justify-center w-[20%] p-[5px]">
								<div className="bg-[#EEEEEE] h-[96px] w-[96px] rounded-[50%]"></div>

								<div className="flex flex-col gap-4 items-center">
									<div className="w-[160px] h-[16px] bg-[#EEEEEE] rounded-[104px]"></div>
									<div className="w-[78px] h-[8px] bg-[#EEEEEE] rounded-[104px]"></div>
								</div>

								<div className="flex flex-col gap-2">
									{links.map((link) => (
										<React.Fragment key={link.id}>
											<div className="bg-[#EEEEEE] rounded-lg h-[40px] w-[237px] flex items-center px-[8px] text-nowrap overflow-hidden">
												{link.platform}
											</div>
											<div className="bg-[#EEEEEE] rounded-lg h-[40px] w-[237px] flex items-center px-[8px] text-nowrap overflow-hidden">
												{link.url}
											</div>
										</React.Fragment>
									))}
									{Array(3 - links.length)
										.fill(null)
										.map((_, index) => (
											<React.Fragment key={index}>
												<div className="bg-[#EEEEEE] rounded-lg h-[40px] w-[237px]"></div>
												<div className="bg-[#EEEEEE] rounded-lg h-[40px] w-[237px]"></div>
											</React.Fragment>
										))}
								</div>
							</div>
						</div>
					</div>
					<div className="w-[60%] flex flex-col justify-between bg-[#FFFFFF] h-[834px] rounded-xl">
						<div className="h-[100%] p-[40px] flex flex-col gap-8 overflow-y-scroll">
							<div className="flex flex-col">
								<h1 className="text-[#333333] leading-[48px] text-[32px] font-[700]">
									Customize your links
								</h1>
								<p className="text-[#737373] text-[16px] leading-[24px] font-[400]">
									Add/edit/remove links below and then share all your profiles
									with the world!
								</p>
							</div>
							<div className="w-[100%]">
								<button
									onClick={addNewLink}
									className="flex justify-center items-center border border-[#633CFF] w-[100%] rounded-lg h-[46px] text-[#633CFF] font-[600] text-[16px] leading-[24px] hover:bg-[#EFEBFF]"
								>
									+ Add new link
								</button>
							</div>
							{links.length === 0 ? (
								<div className="bg-[#FAFAFA] h-[469px] flex justify-center items-center py-4">
									<div className="flex flex-col gap-8 items-center text-center w-[488px]">
										<Image
											src="/assests/icons/started.svg"
											alt="started-Imageage"
											width={249.53}
											height={160}
										/>
										<h1 className="text-[#333333] font-[700] text-[32px] leading-[48px]">
											Let’s get you started
										</h1>
										<p className="text-[#737373] leading-[24px] font-[400] text-[16px]">
											Use the “Add new link” button to get started. Once you
											have more than one link, you can reorder and edit them.
											We’re here to help you share your profiles with
											everyone!
										</p>
									</div>
								</div>
							) : null}

							{links.map((link, index) => (
								<div
									key={link.id}
									className="bg-[#FAFAFA] h-[228px] rounded-xl p-[20px] flex flex-col gap-3"
								>
									<div className="flex justify-between text-[#737373] text-[16px] leading-[24px]">
										<h2 className="font-[700]">Link #{index + 1}</h2>
										<button
											className="font-[400]"
											onClick={() => removeLink(link.id)}
										>
											Remove
										</button>
									</div>
									<div className="flex flex-col">
										<p className="font-[400] text-[12px] leading-[18px] text-[#333333]">
											Platform
										</p>
										<Select
											placeholder="Platform"
											style={{ flex: 1 }}
											options={[
												{ value: "jack", label: "Jack" },
												{ value: "lucy", label: "Lucy" },
												{ value: "Yiminghe", label: "yiminghe" }
											]}
											value={link.platform}
											onChange={(value) =>
												setLinks(
													links.map((l) =>
														l.id === link.id
															? { ...l, platform: value }
															: l
													)
												)
											}
										/>
									</div>
									<div className="flex flex-col">
										<p className="font-[400] text-[12px] leading-[18px] text-[#333333]">
											Link
										</p>
										<div>
											<Image className="relative left-[10px] top-[2rem] -mt-[1rem] z-10"
												src="/assests/icons/link-bold.svg"
												alt="link-bold"
												width={16}
												height={16}
                        />
											<Input
												className="pl-[30px]"
												placeholder="e.g. https://www.github.com/johnappleseed"
												value={link.url}
												onChange={(e) =>
													setLinks(
														links.map((l) =>
															l.id === link.id
																? { ...l, url: e.target.value }
																: l
														)
													)
												}
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="h-[95px] flex justify-end items-center font-[600] text-[16px] leading-[24px] text-[#FFFFFF] px-[40px] border-t-[2px] border-t-[#ececec]">
							<button className="bg-[#633CFF] rounded-lg h-[46px] w-[91px] opacity-15 btn">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DdesktopAddLinks;
