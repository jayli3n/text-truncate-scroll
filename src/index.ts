interface IOptions {
    className?: string
}

export const activateTextTruncateScroll = (options?: IOptions) => {
    const className = options?.className || "text-truncate-scroll"

    console.log("test hi")
}
