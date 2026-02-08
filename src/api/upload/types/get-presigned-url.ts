export type PresignedURLResponse = {
	signedUrl: string;
	uuid: string;
	type: string;
};

export type PresignedURLDTO = {
	type: string;
	size: number;
	name: string;
	tripId: number;
};
