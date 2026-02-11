
import { Label, TextInput } from 'flowbite-react';
import { Key } from 'lucide-react';
import { User } from 'lucide-react';
import Image from 'next/image';

import PageCommon from '@/components/pages/page-common';

//==================================================================================================

export default function AccessPage () {
	return (
		<PageCommon>
			<div className="mt-8 uppercase">
				<span className="text-[8px]">www</span>.<span className="text-4xl">nneba13</span>.<span className="text-[8px]">com</span>
			</div>
			<div className="overflow-hidden w-64 h-64 rounded-lg">
				<Image
					className="w-full h-full"
					width={256}
					height={256}
					src="/assets/images/Dragon_Head_Silhouette_GreenCircuitBoard_1024x1024.png"
					alt="nneba13.com logo"
				/>
			</div>
			<div className="mt-8 p-12 bg-black rounded-lg">
				<form>
					<div className="max-w-md">
						<div className="block mb-2">
							<Label htmlFor="signin-user">User</Label>
						</div>
						<TextInput id="signin-user" required placeholder="User" addon={(<User />)} />
					</div>
					<div className="max-w-md">
						<div className="block mb-2">
							<Label htmlFor="signin-secret">Secret</Label>
						</div>
						<TextInput id="signin-secret" type="password" required addon={(<Key />)} />
					</div>
					<div className="flex items-center gap-2">
						<span>Forgetful???</span>
					</div>
				</form>
			</div>
		</PageCommon>
	);
}
