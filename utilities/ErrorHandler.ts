type AsyncFunction<TArgs extends unknown[], TReturn> = (...args: TArgs) => Promise<TReturn>;

const errorHandler = <TArgs extends unknown[], TReturn>(
    fn: AsyncFunction<TArgs, TReturn>,
): AsyncFunction<TArgs, TReturn> => {
    return async (...args: TArgs): Promise<TReturn> => {
        try {
            return await fn(...args);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(
                    `\t Error in ${fn.name} \n Error message --> ${error.message} \n Error stack -->`,
                    error.stack,
                );
                throw new Error(
                    JSON.stringify({
                        isSuccess: false,
                        source: fn.name,
                        message: error.message,
                    }),
                );
            }
            throw new Error(
                JSON.stringify({
                    isSuccess: false,
                    source: fn.name,
                    message: 'An unknown error occured',
                }),
            );
        }
    };
};

export { errorHandler };
