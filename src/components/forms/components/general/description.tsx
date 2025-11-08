export const Description = ({ description }: { description?: string }) => {
	if (!description) return null;

	return <div className="text-sm text-gray-400">{description}</div>;
};
