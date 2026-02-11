
export function resolveError (value: unknown) {
	if (value == null) return Error('unknown');
	if (value instanceof Error) return value;
	return Error(value.toString());
}
