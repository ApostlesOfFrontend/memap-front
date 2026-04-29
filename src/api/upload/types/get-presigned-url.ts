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

export type BatchPresignedURLResponse = Array<{
	signedUrl: string;
	uuid: string;
	type: string;
	pointId: number;
	clientId: string;
}>;

export type BatchPresignedURLDTO = {
	tripId: number;
	points: Array<{
		pointId: number;
		files: Array<{
			clientId: string;
			name: string;
			size: number;
			type: string;
		}>;
	}>;
};
