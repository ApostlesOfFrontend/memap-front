export type PresignedURLResponse = {
	signedUrl: string;
	uuid: string;
};

export type PresignedURLDTO = {
	type: string;
	size: number;
	name: string;
	tripId: number;
};
